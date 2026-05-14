import { ModuleProvider, Modules } from "@medusajs/framework/utils"
import ResendNotificationProviderService from "./service"

/**
 * Resend Notification Provider
 *
 * Wird in medusa-config.ts unter dem `notification` Modul registriert.
 */
export default ModuleProvider(Modules.NOTIFICATION, {
  services: [ResendNotificationProviderService],
})
