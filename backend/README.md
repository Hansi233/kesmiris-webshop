# Kesmiris Webshop — Medusa 2.0 Backend

Backend-Skeleton für den Kesmiris-Webshop. Verkauft in Phase 1
Klimaanlagen (klassischer Webshop-Checkout) sowie Wärmepumpen
über ein **Lead-Formular** (Wunschbestellung → Beratung → Angebot).

## Stack

- **Medusa 2.0** (`@medusajs/medusa` 2.15.x)
- **Postgres 16** + **Redis 7**
- **Stripe** als Payment Provider
- **Resend** als Notification Provider
- **TypeScript**, Node 20+

## Verzeichnisstruktur

```
backend/
├── medusa-config.ts           # Konfig (Module, Stripe, Resend, Postgres, Redis)
├── package.json
├── tsconfig.json
├── docker-compose.dev.yml     # Lokale Postgres + Redis
├── Dockerfile                 # Multi-Stage Production-Build (Coolify-ready)
├── .env.template              # Vorlage — kopieren nach .env
└── src/
    ├── api/
    │   ├── store/heat-pump-leads/route.ts          # POST (öffentlich)
    │   └── admin/heat-pump-leads/
    │       ├── route.ts                            # GET (Liste)
    │       └── [id]/route.ts                       # GET einzeln + PATCH (Status)
    ├── modules/
    │   ├── heat-pump-leads/                        # Custom Module
    │   │   ├── index.ts                            # Module-Export
    │   │   ├── service.ts                          # MedusaService(HeatPumpLead)
    │   │   ├── models/lead.ts                      # DML Model
    │   │   └── migrations/Migration2026...ts       # DB-Migration
    │   └── resend/                                 # Notification Provider Resend
    │       ├── index.ts
    │       └── service.ts
    └── subscribers/
        └── heat-pump-lead-created.ts               # Event → Admin-Email
```

## Setup (lokal auf deploy-Server)

```bash
# 1. Repo-Pfad
cd /home/steke/projects/kesmiris-webshop-venv/kesmiris-webshop/backend

# 2. Env vorbereiten
cp .env.template .env
# danach .env editieren - Stripe/Resend-Keys eintragen

# 3. Dependencies
npm install --legacy-peer-deps

# 4. Postgres + Redis lokal hochziehen
docker compose -f docker-compose.dev.yml up -d

# 5. Migrationen ausführen (legt heat_pump_lead + Medusa-Core-Tabellen an)
npx medusa db:migrate

# 6. Admin-User anlegen (für /admin Dashboard)
npx medusa user -e admin@kesmiris.local -p change-me

# 7. Dev-Server starten
npm run dev
# → http://localhost:9000        (API)
# → http://localhost:9000/app    (Admin Dashboard)
```

## Heat-Pump-Lead API

### POST `/store/heat-pump-leads`  (öffentlich, vom Storefront)

```jsonc
{
  "customer_name": "Max Mustermann",
  "email": "max@example.com",
  "phone": "+49 ...",
  "postal_code": "10115",
  "address": "Beispielstr. 1, Berlin",
  "building_type": "single_family",       // optional
  "current_heating": "gas",               // optional
  "desired_power_kw": 8,                  // optional
  "message": "Möchte gerne ein Angebot."
}
```

Response: `201 { "lead": { ... } }` + Event `heat_pump_lead.created`
→ Subscriber schickt Mail an `RESEND_ADMIN_NOTIFICATION_EMAIL`.

### GET `/admin/heat-pump-leads?status=new&limit=50`
### GET `/admin/heat-pump-leads/:id`
### PATCH `/admin/heat-pump-leads/:id`  (z. B. `{ "status": "contacted" }`)

Status-Flow: `new → contacted → quoted → won | lost`

## Production-Build (Coolify, später)

```bash
docker build -t kesmiris-backend .
docker run -p 9000:9000 --env-file .env kesmiris-backend
```

## Health-Check

```bash
npm run typecheck   # TypeScript ohne Server-Start
```

## TODO nächste Sessions

- Klimaanlagen-Produkte als echte Medusa-Products via Seed-Script
- Stripe Webhook-Tests (Test-Mode)
- Email-Templates (Mjml/React-Email) statt plaintext
- Admin-UI Widget zur Lead-Verwaltung (`src/admin/`)
- B2B-Phase 2: PLZ-Routing → Installateur-Netz
