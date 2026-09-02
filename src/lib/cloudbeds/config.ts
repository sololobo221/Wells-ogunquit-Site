export class CloudbedsInactiveError extends Error {
  constructor(message = "Cloudbeds integration is not configured") {
    super(message);
    this.name = "CloudbedsInactiveError";
  }
}

export interface CloudbedsConfig {
  readonly apiKey: string;
  readonly propertyID: string;
  readonly apiBaseUrl: string;
  readonly webhookSecret: string;
}

const DEFAULT_API_BASE_URL = "https://hotels.cloudbeds.com/api/v1.2";

export const cloudbedsConfig: CloudbedsConfig = {
  apiKey: process.env.CLOUDBEDS_API_KEY?.trim() ?? "",
  propertyID: process.env.CLOUDBEDS_PROPERTY_ID?.trim() ?? "",
  apiBaseUrl: process.env.CLOUDBEDS_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL,
  webhookSecret: process.env.CLOUDBEDS_WEBHOOK_SECRET?.trim() ?? "",
};

export const isCloudbedsActive: boolean =
  cloudbedsConfig.apiKey !== "" && cloudbedsConfig.propertyID !== "";

export function assertCloudbedsActive(): void {
  if (!isCloudbedsActive) {
    throw new CloudbedsInactiveError();
  }
}
