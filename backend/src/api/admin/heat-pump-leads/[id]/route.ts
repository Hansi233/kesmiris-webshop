import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { HEAT_PUMP_LEADS_MODULE } from "../../../../modules/heat-pump-leads"
import type HeatPumpLeadsService from "../../../../modules/heat-pump-leads/service"

type UpdateLeadBody = {
  status?: "new" | "contacted" | "quoted" | "won" | "lost"
  customer_name?: string
  email?: string
  phone?: string
  address?: string
  postal_code?: string
  message?: string
}

/**
 * GET /admin/heat-pump-leads/:id  - retrieve single
 * PATCH /admin/heat-pump-leads/:id  - update (z.B. Status-Wechsel)
 */
export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const service = req.scope.resolve<HeatPumpLeadsService>(HEAT_PUMP_LEADS_MODULE)
  const lead = await service.retrieveHeatPumpLead(req.params.id)
  return res.json({ lead })
}

export const PATCH = async (
  req: MedusaRequest<UpdateLeadBody>,
  res: MedusaResponse
) => {
  const service = req.scope.resolve<HeatPumpLeadsService>(HEAT_PUMP_LEADS_MODULE)
  const body = req.body as UpdateLeadBody

  const updated = await service.updateHeatPumpLeads({
    id: req.params.id,
    ...body,
  })

  return res.json({ lead: updated })
}
