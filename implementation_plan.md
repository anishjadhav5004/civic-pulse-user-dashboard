# Architecture Re-evaluation: Micro-Frontends & CQRS

The user has opted for a **Micro-Frontend** approach and specifically requested that the `cp-complaint` service be split into two separate services: one for *raising* complaints and one for *reading* them. 

This introduces the **CQRS (Command Query Responsibility Segregation)** pattern, which is excellent for performance. Raising a complaint (Command) involves heavy writes, uploading photos, and triggering workflows. Reading complaints (Query) involves fast, frequent reads and filtering for the dashboard.

## 1. The Micro-Frontend & CQRS Architecture

### Directory Structure
```text
civic-pulse/
├── apps/
│   ├── dashboard-host-ui/     # The Shell. Imports other UIs. Provides routing layout.
│   │
│   ├── dashboard-host-ui/     # The Shell. Imports other UIs. Provides routing layout.
│   │
│   ├── user-service/          # [RESTORED] Handles User Profile, Avatars, Preferences
│   │   ├── api/               
│   │   └── ui/                # Exported as `@civic-pulse/ui-user-profile` 
│   │
│   ├── cp-command-service/    # Handles RAISING complaints (Writes/Updates)
│   │   ├── api/               
│   │   └── ui/                # Exported as `@civic-pulse/ui-raise-complaint` (Form)
│   │
│   ├── cp-query-service/      # [NEW] Handles READING complaints (Fast Reads/Filters)
│   │   ├── api/               
│   │   └── ui/                # Exported as `@civic-pulse/ui-read-complaint` (List/Detail views)
│   │
│   ├── data-mining-service/   # Data analysis and insight generation
│   │   ├── api/
│   │   └── ui/                # Exported as `@civic-pulse/ui-analytics` (Widgets)
│   │
│   ├── notification-service/  # Push alerts, Emails, SMS
│   │   ├── api/
│   │   └── ui/                # Exported as `@civic-pulse/ui-notifications` (Bell Popover)
│   │
│   └── chat-service/
│       ├── api/
│       └── ui/                # Exported as `@civic-pulse/ui-chat`
```

### How CQRS Works Here (Example):
1.  **Raise Service** (`cp-command-service`): A citizen submits a new complaint on the UI. The request hits this service. It saves the raw data to a primary Write Database (e.g., PostgreSQL).
2.  **Event Stream**: Upon saving, it publishes a `ComplaintRaisedEvent` to the Message Broker (Kafka/RabbitMQ).
3.  **Read Service** (`cp-query-service`): This service listens to the broker. When it hears the event, it takes the data and formats it for fast reading, saving it into a separate Read Database (e.g., Elasticsearch or a normalized Postgres/Mongo table).
4.  **Reading**: When the dashboard needs to list complaints, the `dashboard-host-ui` only queries the `cp-query-service`, which is highly optimized for fast reads and filtering.

---

## 2. Shared Infrastructure Across Services

### A. Shared Libraries (`packages/`)
Instead of copying DTOs across the separate read and write services, we use a central library.
*   `packages/shared-contracts/`: Contains `CreateComplaintCmd` (used by the command service) and `ComplaintReadDTO` (used by the query service).

### B. Shared API Gateway
The UI makes ONE request to the API Gateway.
*   `POST /v1/complaints` -> Gateway routes this to **`cp-command-service`**.
*   `GET /v1/complaints` -> Gateway routes this to **`cp-query-service`**.

### C. The Message Broker (Event-Driven Communication)
Crucial for syncing the Read and Write databases in the CQRS pattern. It also allows the `notification-service` and `data-mining-service` to process complaints entirely asynchronously without slowing down the citizen's user experience.

---

## 3. Detailed Infrastructure (`infra/`)

To support this micro-frontend and microservice architecture, the following infrastructure components will be defined:

```text
├── infra/                     
│   ├── identity-provider/     # [NEW] Keycloak/ORY Kratos for Auth, Token Generation & Login UI
│   ├── api-gateway/           # Nginx or Kong config for routing all frontend requests and validating Tokens
│   ├── message-broker/        # RabbitMQ or Kafka Docker configurations for event streaming
│   ├── redis-cache/           # Central Redis for rate limiting and fast access session storage
│   ├── monitoring/            # Prometheus & Grafana configs for observing the health of microservices
│   ├── docker-compose.yml     # Local orchestration for spinning up all services + DBs at once
│   └── k8s/                   # Helm charts / Kubernetes deployment manifests for production
└── README.md
```
