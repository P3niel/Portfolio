┌─────────────────────────────────────────────┐
│              Visitor / Recruiter            │
│   scroll → inspect projects → open contact  │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│            Next.js Portfolio UI             │
│                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Home    │  │   CV     │  │ Projects │   │
│  │ hero +   │  │ profile  │  │ case     │   │
│  │ terminal │  │ skills   │  │ studies  │   │
│  └──────────┘  └──────────┘  └──────────┘   │
│                                             │
│  ┌──────────┐  ┌────────────────────────┐   │
│  │   Lab    │  │ Dynamic project pages  │   │
│  │ metrics  │  │ /projects/[slug]       │   │
│  │ status   │  │ proof + architecture   │   │
│  └──────────┘  └────────────────────────┘   │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│              Internal Data Layer            │
│                                             │
│  ┌──────────────────────────────────────┐   │
│  │ lib/config.ts                        │   │
│  │ cv · projects · lab endpoints        │   │
│  └──────────────────────────────────────┘   │
│                                             │
│  ┌──────────────────────────────────────┐   │
│  │ components/                          │   │
│  │ Nav · ProjectCard · CV · Lab panels  │   │
│  └──────────────────────────────────────┘   │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│              API / Runtime Proxies          │
│                                             │
│  ┌────────────┐ ┌────────────┐ ┌──────────┐ │
│  │ /api/      │ │ /api/      │ │ /api/    │ │
│  │ health     │ │ metrics    │ │ mlflow   │ │
│  │ proxy      │ │ proxy      │ │ status   │ │
│  └────────────┘ └────────────┘ └──────────┘ │
│                                             │
│  ┌──────────────────────────────────────┐   │
│  │ /api/lab-events                      │   │
│  │ lab timeline / event feed            │   │
│  └──────────────────────────────────────┘   │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│          External / Target Systems          │
│                                             │
│  FastAPI backend · Prometheus · MLflow      │
│  Grafana · Loki · GitHub repos · LinkedIn   │
└─────────────────────────────────────────────┘

Visitor
  │
  ▼
Next.js Portfolio
  │
  ├─ Home: hero · terminal · method · contact
  ├─ CV: profile · experience · skills
  ├─ Projects: case studies from lib/config.ts
  └─ Lab: runtime-style status panels
       │
       ▼
Next API routes
  ├─ health proxy
  ├─ metrics proxy
  ├─ mlflow status
  └─ lab events
       │
       ▼
External systems
FastAPI · Prometheus · Grafana · MLflow · GitHub