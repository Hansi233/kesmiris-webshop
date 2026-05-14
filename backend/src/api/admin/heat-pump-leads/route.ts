import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { HEAT_PUMP_LEADS_MODULE } from "../../../modules/heat-pump-leads"
import type HeatPumpLeadsService from "../../../modules/heat-pump-leads/service"

/**
 * GET /admin/heat-pump-leads
 *
 * Listet alle Heat-Pump-Leads (Admin-only via Medusa auth).
 * Query: ?status=new&limit=50&offset=0
 */
export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const service = req.scope.resolve<HeatPumpLeadsService>(HEAT_PUMP_LEADS_MODULE)

  const limit = Number(req.query.limit ?? 50)
  const offset = Number(req.query.offset ?? 0)
  const status = req.query.status as string | undefined

  const filters: Record<string, unknown> = {}
  if (status) filters.status = status

  const [leads, count] = await service.listAndCountHeatPumpLeads(filters, {
    take: limit,
    skip: offset,
    order: { created_at: "DESC" },
  })

  return res.json({ leads, count, limit, offset })
}
