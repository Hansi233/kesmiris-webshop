"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitHeatPumpLead } from "@/lib/medusa";

const leadSchema = z.object({
  name: z.string().min(2, "Bitte vollständigen Namen angeben."),
  email: z.string().email("Bitte gültige E-Mail-Adresse angeben."),
  phone: z.string().min(5, "Bitte Telefonnummer angeben."),
  postal_code: z.string().regex(/^\d{4,5}$/, "Bitte gültige PLZ angeben."),
  building_type: z.enum(["einfamilienhaus", "mehrfamilienhaus", "gewerbe", "neubau", "sonstiges"]),
  current_heating: z.enum(["gas", "oel", "strom", "fernwaerme", "keine", "sonstiges"]),
  desired_kw: z.string().min(1, "Bitte gewünschte Leistung angeben."),
  message: z.string().max(2000).optional(),
});

type LeadFormValues = z.infer<typeof leadSchema>;

/**
 * Lead-capture form for heat pumps.
 *
 * On submit, POSTs to the custom Medusa endpoint `/store/heat-pump-leads`
 * built by Agent 2. The design is intentionally minimal — the next session
 * will polish copy, layout and validation messages.
 */
export function HeatPumpLeadForm() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      postal_code: "",
      building_type: "einfamilienhaus",
      current_heating: "gas",
      desired_kw: "",
      message: "",
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = form;

  async function onSubmit(values: LeadFormValues) {
    setSubmitError(null);
    try {
      await submitHeatPumpLead(values);
      router.push("/waermepumpe/erfolg");
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Anfrage konnte nicht gesendet werden."
      );
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">E-Mail</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone">Telefon</Label>
          <Input id="phone" type="tel" {...register("phone")} />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="postal_code">PLZ</Label>
          <Input id="postal_code" inputMode="numeric" {...register("postal_code")} />
          {errors.postal_code && (
            <p className="text-sm text-destructive">{errors.postal_code.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="building_type">Gebäudetyp</Label>
          <Select
            value={watch("building_type")}
            onValueChange={(v) => setValue("building_type", v as LeadFormValues["building_type"])}
          >
            <SelectTrigger id="building_type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="einfamilienhaus">Einfamilienhaus</SelectItem>
              <SelectItem value="mehrfamilienhaus">Mehrfamilienhaus</SelectItem>
              <SelectItem value="gewerbe">Gewerbeimmobilie</SelectItem>
              <SelectItem value="neubau">Neubau</SelectItem>
              <SelectItem value="sonstiges">Sonstiges</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="current_heating">Aktuelle Heizung</Label>
          <Select
            value={watch("current_heating")}
            onValueChange={(v) =>
              setValue("current_heating", v as LeadFormValues["current_heating"])
            }
          >
            <SelectTrigger id="current_heating">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gas">Gas</SelectItem>
              <SelectItem value="oel">Öl</SelectItem>
              <SelectItem value="strom">Strom</SelectItem>
              <SelectItem value="fernwaerme">Fernwärme</SelectItem>
              <SelectItem value="keine">Keine / Neubau</SelectItem>
              <SelectItem value="sonstiges">Sonstiges</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <Label htmlFor="desired_kw">Gewünschte Leistung (kW)</Label>
          <Input id="desired_kw" inputMode="decimal" {...register("desired_kw")} />
          {errors.desired_kw && (
            <p className="text-sm text-destructive">{errors.desired_kw.message}</p>
          )}
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <Label htmlFor="message">Nachricht (optional)</Label>
          <Textarea id="message" rows={4} {...register("message")} />
        </div>
      </div>

      {submitError && <p className="text-sm text-destructive">{submitError}</p>}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Senden..." : "Anfrage senden"}
      </Button>
    </form>
  );
}
