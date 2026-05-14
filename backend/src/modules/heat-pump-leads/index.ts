import { Module } from "@medusajs/framework/utils"
import HeatPumpLeadsService from "./service"

export const HEAT_PUMP_LEADS_MODULE = "heat_pump_leads"

export default Module(HEAT_PUMP_LEADS_MODULE, {
  service: HeatPumpLeadsService,
})
