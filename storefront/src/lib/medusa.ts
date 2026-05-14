import Medusa from "@medusajs/js-sdk";

/**
 * Medusa JS SDK client instance.
 *
 * Backend URL and publishable key come from public env vars so the
 * client can be used in Server Components and Client Components alike.
 *
 * For Phase 1 (dropshipping skeleton) we only read products and
 * submit heat-pump leads. Cart + checkout follow in the next session.
 */
export const medusa = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? "http://localhost:9000",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
});

export type HeatPumpLeadInput = {
  name: string;
  email: string;
  phone: string;
  postal_code: string;
  building_type: string;
  current_heating: string;
  desired_kw: string;
  message?: string;
};

/**
 * POST a heat-pump lead to the custom Medusa endpoint built by Agent 2.
 *
 * Uses fetch directly so we can target the custom store route without
 * adding it to the SDK's resource map.
 */
export async function submitHeatPumpLead(input: HeatPumpLeadInput) {
  const url = `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? "http://localhost:9000"}/store/heat-pump-leads`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
        ? { "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY }
        : {}),
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    throw new Error(`Lead submission failed: ${res.status}`);
  }

  return res.json();
}
