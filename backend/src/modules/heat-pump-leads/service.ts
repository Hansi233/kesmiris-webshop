import { MedusaService } from "@medusajs/framework/utils"
import { HeatPumpLead } from "./models/lead"

/**
 * Service für Heat-Pump-Leads.
 *
 * MedusaService liefert auto-generierte CRUD-Methoden:
 *   - listHeatPumpLeads / listAndCountHeatPumpLeads
 *   - retrieveHeatPumpLead
 *   - createHeatPumpLeads
 *   - updateHeatPumpLeads
 *   - deleteHeatPumpLeads
 *
 * Custom-Methoden bei Bedarf hier ergänzen.
 */
class HeatPumpLeadsService extends MedusaService({
  HeatPumpLead,
}) {}

export default HeatPumpLeadsService
