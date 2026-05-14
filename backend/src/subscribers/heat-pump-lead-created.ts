import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"
import { HEAT_PUMP_LEADS_MODULE } from "../modules/heat-pump-leads"
import type HeatPumpLeadsService from "../modules/heat-pump-leads/service"

/**
 * Subscriber: heat_pump_lead.created
 *
 * Wird ausgelöst, sobald die Store-API einen neuen Lead anlegt.
 * Sendet Benachrichtigungsmail an Kesmiris-Admin via Resend Provider.
 */
export default async function heatPumpLeadCreatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const leadsService = container.resolve<HeatPumpLeadsService>(HEAT_PUMP_LEADS_MODULE)
  const notification = container.resolve(Modules.NOTIFICATION)
  const logger = container.resolve("logger")

  const lead = await leadsService.retrieveHeatPumpLead(data.id)

  const adminEmail = process.env.RESEND_ADMIN_NOTIFICATION_EMAIL
  if (!adminEmail) {
    logger.warn(
      "[heat-pump-lead.created] RESEND_ADMIN_NOTIFICATION_EMAIL nicht gesetzt - überspringe Mail."
    )
    return
  }

  const subject = `Neue Wärmepumpen-Anfrage von ${lead.customer_name}`
  const text = [
    `Neue Wärmepumpen-Wunschbestellung eingegangen:`,
    ``,
    `Kunde:       ${lead.customer_name}`,
    `Email:       ${lead.email}`,
    `Telefon:     ${lead.phone ?? "-"}`,
    `PLZ:         ${lead.postal_code ?? "-"}`,
    `Adresse:     ${lead.address ?? "-"}`,
    `Gebäude:     ${lead.building_type ?? "-"}`,
    `Heizung:     ${lead.current_heating ?? "-"}`,
    `Wunsch kW:   ${lead.desired_power_kw ?? "-"}`,
    ``,
    `Nachricht:`,
    lead.message ?? "(keine)",
    ``,
    `Lead-ID: ${lead.id}`,
  ].join("\n")

  await notification.createNotifications({
    to: adminEmail,
    channel: "email",
    template: "heat-pump-lead-created",
    content: {
      subject,
      text,
      html: `<pre style="font-family:monospace">${text.replace(/</g, "&lt;")}</pre>`,
    },
    data: { lead_id: lead.id },
  })
}

export const config: SubscriberConfig = {
  event: "heat_pump_lead.created",
}
