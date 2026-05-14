import { AbstractNotificationProviderService, MedusaError } from "@medusajs/framework/utils"
import type { Logger, ProviderSendNotificationDTO, ProviderSendNotificationResultsDTO } from "@medusajs/framework/types"
import { Resend } from "resend"

type ResendOptions = {
  apiKey?: string
  fromEmail?: string
  channels?: string[]
}

type InjectedDependencies = {
  logger: Logger
}

/**
 * Resend Notification Provider Service
 *
 * Erfüllt Medusa 2.0 Notification-Provider Interface.
 * Versendet HTML-Mails via Resend API. Wenn kein API-Key gesetzt ist,
 * loggt der Service die Mail nur (Dev-Modus).
 */
class ResendNotificationProviderService extends AbstractNotificationProviderService {
  static identifier = "resend"

  protected readonly logger_: Logger
  protected readonly options_: ResendOptions
  protected readonly client_: Resend | null

  constructor({ logger }: InjectedDependencies, options: ResendOptions) {
    // @ts-ignore - super signature varies by Medusa version
    super(...arguments)
    this.logger_ = logger
    this.options_ = options
    this.client_ = options?.apiKey ? new Resend(options.apiKey) : null

    if (!this.client_) {
      this.logger_.warn(
        "[resend] RESEND_API_KEY nicht gesetzt - Mails werden nur geloggt (Dev-Modus)."
      )
    }
  }

  async send(
    notification: ProviderSendNotificationDTO
  ): Promise<ProviderSendNotificationResultsDTO> {
    if (!notification) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Keine Notification-Daten übergeben"
      )
    }

    const from = (notification as any).from || this.options_.fromEmail
    const to = notification.to
    const subject = (notification.content as any)?.subject || (notification as any).subject || "Kesmiris"
    const html = (notification.content as any)?.html || (notification as any).html || ""
    const text = (notification.content as any)?.text || (notification as any).text

    if (!from) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Resend: fromEmail nicht konfiguriert (RESEND_FROM_EMAIL)"
      )
    }

    if (!this.client_) {
      this.logger_.info(
        `[resend:DEV] to=${to} subject=${subject}\n${text || html}`
      )
      return { id: `dev_${Date.now()}` }
    }

    try {
      const result = await this.client_.emails.send({
        from,
        to,
        subject,
        html,
        text,
      })
      return { id: result.data?.id || `resend_${Date.now()}` }
    } catch (err: any) {
      this.logger_.error(`[resend] Fehler beim Versand: ${err?.message || err}`)
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        `Resend send failed: ${err?.message || err}`
      )
    }
  }
}

export default ResendNotificationProviderService
