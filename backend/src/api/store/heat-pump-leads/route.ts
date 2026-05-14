import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { HEAT_PUMP_LEADS_MODULE } from "../../../modules/heat-pump-leads"
import type HeatPumpLeadsService from "../../../modules/heat-pump-leads/service"

type CreateLeadBody = {
  customer_name: string
  email: string
  phone?: string
  address?: string
  postal_code?: string
  building_type?: "single_family" | "multi_family" | "apartment" | "commercial" | "other"
  current_heating?: "gas" | "oil" | "electric" | "district" | "wood" | "none" | "other"
  desired_power_kw?: number
  message?: string
}

/**
 * POST /store/heat-pump-leads
 *
 * Storefront-Endpoint: legt eine neue Wärmepumpen-Wunschbestellung an.
 * Emit Event `heat_pump_lead.created` → Subscriber sendet Admin-Email via Resend.
 */
export const POST = async (
  req: MedusaRequest<CreateLeadBody>,
  res: MedusaResponse
) => {
  const body = req.body as CreateLeadBody

  if (!body?.customer_name || !body?.email) {
    return res.status(400).json({
      type: "invalid_data",
      message: "customer_name und email sind erforderlich",
    })
  }

  const service = req.scope.resolve<HeatPumpLeadsService>(HEAT_PUMP_LEADS_MODULE)
  const eventBus = req.scope.resolve("event_bus")

  const lead = await service.createHeatPumpLeads({
    customer_name: body.customer_name,
    email: body.email,
    phone: body.phone,
    address: body.address,
    postal_code: body.postal_code,
    building_type: body.building_type,
    current_heating: body.current_heating,
    desired_power_kw: body.desired_power_kw,
    message: body.message,
    status: "new",
  })

  await eventBus.emit({
    name: "heat_pump_lead.created",
    data: { id: lead.id },
  })

  return res.status(201).json({ lead })
}
