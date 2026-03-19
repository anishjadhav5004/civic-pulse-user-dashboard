---
description: Scaffold a new service (API + UI) in the Monorepo
---

These are the exact commands to build a new microservice (like `user-service`, `chat-service`) using our True Monorepo architecture. 

When you ask me to run this workflow, please specify the `<service-name>`.

### Optional: Initial Workspace Setup
If this is a brand new project and the Nx monorepo doesn't exist yet, you can use these commented-out commands to initialize the host workspace first:

```bash
# 1. Create the empty Monorepo
# npx create-nx-workspace@latest civic-pulse-user-dashboard --preset=apps --pm=npm --ci=skip --defaultBase=main
# 2. Enter the workspace
# cd civic-pulse-user-dashboard
# 3. Add necessary Nx framework plugins for Backend and Frontend
# npx nx add @nx/nest
# npx nx add @nx/angular
```

### Scaffold New Microservice
// turbo-all
1. cd d:\civic-pulse-user-dashboard
2. npx nx g @nx/nest:app --name=<service-name>-api --directory=apps/<service-name>/api --linter=eslint --unitTestRunner=jest
3. npx nx g @nx/angular:app --name=<service-name>-ui --directory=apps/<service-name>/ui --style=scss --bundler=esbuild --ssr=false --unitTestRunner=jest