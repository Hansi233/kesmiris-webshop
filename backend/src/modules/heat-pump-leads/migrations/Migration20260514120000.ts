import { Migration } from "@mikro-orm/migrations"

export class Migration20260514120000 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`
      CREATE TABLE IF NOT EXISTS "heat_pump_lead" (
        "id" TEXT NOT NULL,
        "customer_name" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "phone" TEXT NULL,
        "address" TEXT NULL,
        "postal_code" TEXT NULL,
        "building_type" TEXT NULL CHECK ("building_type" IN ('single_family','multi_family','apartment','commercial','other')),
        "current_heating" TEXT NULL CHECK ("current_heating" IN ('gas','oil','electric','district','wood','none','other')),
        "desired_power_kw" NUMERIC NULL,
        "message" TEXT NULL,
        "status" TEXT NOT NULL DEFAULT 'new' CHECK ("status" IN ('new','contacted','quoted','won','lost')),
        "metadata" JSONB NULL,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMPTZ NULL,
        CONSTRAINT "heat_pump_lead_pkey" PRIMARY KEY ("id")
      );
    `)

    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_heat_pump_lead_email" ON "heat_pump_lead" ("email") WHERE "deleted_at" IS NULL;`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_heat_pump_lead_status" ON "heat_pump_lead" ("status") WHERE "deleted_at" IS NULL;`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_heat_pump_lead_created_at" ON "heat_pump_lead" ("created_at");`
    )
  }

  override async down(): Promise<void> {
    this.addSql(`DROP TABLE IF EXISTS "heat_pump_lead";`)
  }
}
