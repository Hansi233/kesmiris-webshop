import { model } from "@medusajs/framework/utils"

/**
 * Heat-Pump Lead
 *
 * Erfasst Kunden-Wunschbestellungen für Wärmepumpen.
 * Status-Flow: new → contacted → quoted → won | lost
 */
export const HeatPumpLead = model.define("heat_pump_lead", {
  id: model.id({ prefix: "hpl" }).primaryKey(),
  customer_name: model.text(),
  email: model.text().searchable(),
  phone: model.text().nullable(),
  address: model.text().nullable(),
  postal_code: model.text().nullable(),
  building_type: model.enum([
    "single_family",
    "multi_family",
    "apartment",
    "commercial",
    "other",
  ]).nullable(),
  current_heating: model.enum([
    "gas",
    "oil",
    "electric",
    "district",
    "wood",
    "none",
    "other",
  ]).nullable(),
  desired_power_kw: model.number().nullable(),
  message: model.text().nullable(),
  status: model.enum([
    "new",
    "contacted",
    "quoted",
    "won",
    "lost",
  ]).default("new"),
  metadata: model.json().nullable(),
})
