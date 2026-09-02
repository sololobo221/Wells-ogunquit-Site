import { assertCloudbedsActive, cloudbedsConfig } from "./config";

const PAY_BY_LINK_URL = "https://api.cloudbeds.com/payments/v2/pay-by-link";

export class CloudbedsApiError extends Error {
  readonly status: number;
  readonly endpoint: string;

  constructor(status: number, message: string, endpoint: string) {
    super(message);
    this.name = "CloudbedsApiError";
    this.status = status;
    this.endpoint = endpoint;
  }
}

type CloudbedsResponseStatus = {
  success?: boolean;
  message?: string;
  error?: string;
};

export async function cloudbedsFetch<T>(path: string, init?: RequestInit): Promise<T> {
  assertCloudbedsActive();

  const url = path.startsWith("http") ? path : `${cloudbedsConfig.apiBaseUrl}${path}`;
  const headers = new Headers(init?.headers);
  headers.set("Authorization", `Bearer ${cloudbedsConfig.apiKey}`);
  if (init?.body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/x-www-form-urlencoded");
  }

  const response = await fetch(url, { ...init, headers, cache: "no-store" });
  const body = (await response.json().catch(() => null)) as (T & CloudbedsResponseStatus) | null;

  if (!response.ok || body === null || body.success === false) {
    const message = body?.message ?? body?.error ?? response.statusText ?? "Cloudbeds request failed";
    throw new CloudbedsApiError(response.status, message, path);
  }

  return body;
}

export interface PostReservationRequest {
  propertyID: string;
  startDate: string;
  endDate: string;
  guestFirstName: string;
  guestLastName: string;
  guestCountry: string;
  guestEmail: string;
  guestPhone?: string;
  roomTypeID: string;
  adults: number;
  children: number;
  promoCode?: string;
}

export interface PostReservationResponse {
  success: boolean;
  reservationID: string;
  status: "not_confirmed" | "confirmed";
  grandTotal: number;
  message?: string;
}

export interface PaymentLinkRequest {
  propertyID: string;
  reservationID: string;
  amount: number;
  description: string;
}

export interface PaymentLinkResponse {
  url: string;
  id: string;
  expires_at: string;
}

export async function postReservation(
  request: PostReservationRequest,
): Promise<PostReservationResponse> {
  const body = new URLSearchParams({
    propertyID: request.propertyID,
    startDate: request.startDate,
    endDate: request.endDate,
    guestFirstName: request.guestFirstName,
    guestLastName: request.guestLastName,
    guestCountry: request.guestCountry,
    guestEmail: request.guestEmail,
    rooms: JSON.stringify([{ roomTypeID: request.roomTypeID, quantity: 1 }]),
    adults: JSON.stringify([{ roomTypeID: request.roomTypeID, quantity: request.adults }]),
    children: JSON.stringify([{ roomTypeID: request.roomTypeID, quantity: request.children }]),
  });
  if (request.guestPhone) {
    body.set("guestPhone", request.guestPhone);
  }
  if (request.promoCode) {
    body.set("promoCode", request.promoCode);
  }

  return cloudbedsFetch<PostReservationResponse>("/postReservation", {
    method: "POST",
    body,
  });
}

export async function createPaymentLink(
  request: PaymentLinkRequest,
): Promise<PaymentLinkResponse> {
  const payload = {
    inventoryObject: { type: "confirmation_number", id: request.reservationID },
    paid: request.amount,
    description: request.description,
    propertyId: request.propertyID,
    expires_after: 7,
    auth_payment: false,
  };

  return cloudbedsFetch<PaymentLinkResponse>(PAY_BY_LINK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Property-Id": request.propertyID,
    },
    body: JSON.stringify(payload),
  });
}
