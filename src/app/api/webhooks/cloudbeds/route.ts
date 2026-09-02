import { createHmac, timingSafeEqual } from "node:crypto";
import { cloudbedsConfig, isCloudbedsActive } from "@/lib/cloudbeds/config";

type CloudbedsWebhookPayload = {
  event?: string;
  version?: string;
  timestamp?: number;
  reservationID?: string;
  reservationId?: string;
  status?: string;
  transactionId?: string;
};

export async function POST(req: Request): Promise<Response> {
  if (!isCloudbedsActive) {
    return Response.json({ error: "Cloudbeds integration not configured" }, { status: 503 });
  }

  // Read the raw body before parsing so the signature is verified over the exact bytes received.
  const rawBody = await req.text();

  if (cloudbedsConfig.webhookSecret) {
    const signature = req.headers.get("X-Cloudbeds-Signature");
    if (!signature || !isSignatureValid(rawBody, signature, cloudbedsConfig.webhookSecret)) {
      return Response.json({ error: "Invalid signature" }, { status: 401 });
    }
  }

  let payload: CloudbedsWebhookPayload;
  try {
    payload = JSON.parse(rawBody) as CloudbedsWebhookPayload;
  } catch {
    return Response.json({ error: "Invalid payload" }, { status: 400 });
  }

  switch (payload.event) {
    case "reservation/created":
      console.info("[cloudbeds-webhook] reservation/created", {
        reservationID: payload.reservationID ?? payload.reservationId,
      });
      return Response.json({ ok: true });
    case "reservation/status_changed":
      console.info("[cloudbeds-webhook] reservation/status_changed", {
        reservationID: payload.reservationID ?? payload.reservationId,
        status: payload.status,
      });
      return Response.json({ ok: true });
    case "accounting/transaction":
      console.info("[cloudbeds-webhook] accounting/transaction", {
        transactionId: payload.transactionId,
      });
      return Response.json({ ok: true });
    default:
      console.info("[cloudbeds-webhook] ignored event", { event: payload.event });
      return Response.json({ ok: true, ignored: true }, { status: 202 });
  }
}

function isSignatureValid(rawBody: string, signature: string, secret: string): boolean {
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const expectedBuffer = Buffer.from(expected);
  const providedBuffer = Buffer.from(signature);
  if (expectedBuffer.length !== providedBuffer.length) {
    return false;
  }
  return timingSafeEqual(expectedBuffer, providedBuffer);
}
