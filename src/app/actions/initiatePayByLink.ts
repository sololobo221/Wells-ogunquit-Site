"use server";

import { redirect } from "next/navigation";
import { cloudbedsConfig, isCloudbedsActive } from "@/lib/cloudbeds/config";
import {
  CloudbedsApiError,
  createPaymentLink,
  postReservation,
  type PostReservationRequest,
} from "@/lib/cloudbeds/client";

export interface PayByLinkInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  roomTypeID: string;
  adults: number;
  children: number;
  country?: string;
  promoCode?: string;
  notes?: string;
}

export type PayByLinkResult =
  | { success: true; reservationID: string; redirectUrl: string }
  | { success: false; error: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function validate(input: PayByLinkInput): string | null {
  if (!input.firstName.trim() || !input.lastName.trim()) {
    return "Please provide the guest's first and last name";
  }
  if (!EMAIL_PATTERN.test(input.email)) {
    return "Please provide a valid email address";
  }
  if (!input.phone.trim()) {
    return "Please provide a phone number";
  }
  const checkIn = Date.parse(input.checkIn);
  const checkOut = Date.parse(input.checkOut);
  if (
    !DATE_PATTERN.test(input.checkIn) ||
    !DATE_PATTERN.test(input.checkOut) ||
    Number.isNaN(checkIn) ||
    Number.isNaN(checkOut)
  ) {
    return "Please provide valid check-in and check-out dates";
  }
  if (checkOut <= checkIn) {
    return "Check-out must be after check-in";
  }
  if (!input.roomTypeID.trim()) {
    return "Please choose a room type";
  }
  if (!Number.isInteger(input.adults) || input.adults < 1) {
    return "At least one adult is required";
  }
  if (!Number.isInteger(input.children) || input.children < 0) {
    return "The number of children is invalid";
  }
  return null;
}

function toReservationRequest(input: PayByLinkInput): PostReservationRequest {
  return {
    propertyID: cloudbedsConfig.propertyID,
    startDate: input.checkIn,
    endDate: input.checkOut,
    guestFirstName: input.firstName.trim(),
    guestLastName: input.lastName.trim(),
    guestCountry: input.country?.trim() || "US",
    guestEmail: input.email.trim(),
    guestPhone: input.phone.trim(),
    roomTypeID: input.roomTypeID,
    adults: input.adults,
    children: input.children,
    promoCode: input.promoCode?.trim() || undefined,
  };
}

export async function initiatePayByLink(input: PayByLinkInput): Promise<PayByLinkResult> {
  const invalid = validate(input);
  if (invalid) {
    return { success: false, error: invalid };
  }

  if (!isCloudbedsActive) {
    return { success: false, error: "Booking system temporarily unavailable" };
  }

  let outcome:
    | { ok: true; reservationID: string; url: string }
    | { ok: false; error: string };

  try {
    const reservation = await postReservation(toReservationRequest(input));
    const description = input.notes?.trim()
      ? input.notes.trim()
      : `Reservation ${reservation.reservationID}`;
    const link = await createPaymentLink({
      propertyID: cloudbedsConfig.propertyID,
      reservationID: reservation.reservationID,
      amount: reservation.grandTotal,
      description,
    });
    outcome = { ok: true, reservationID: reservation.reservationID, url: link.url };
  } catch (error) {
    const message =
      error instanceof CloudbedsApiError
        ? "We couldn't complete your booking. Please try again, or call us to reserve."
        : "Booking system temporarily unavailable";
    outcome = { ok: false, error: message };
  }

  if (!outcome.ok) {
    return { success: false, error: outcome.error };
  }

  // redirect() signals by throwing, so it must run outside the try/catch above.
  redirect(outcome.url);
}
