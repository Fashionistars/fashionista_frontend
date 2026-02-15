ifneq (,$(wildcard ./.env))
include .env
export
ENV_FILE_PARAM = --env-file .env
endif

ifneq (,$(wildcard ./.env.local))
include .env.local
export
endif

.PHONY: help install dev build start clean lint test docker-build docker-up docker-down
.DEFAULT_GOAL := help

# ─── Colors ───
CYAN    := \033[0;36m
GREEN   := \033[0;32m
YELLOW  := \033[0;33m
RED     := \033[0;31m
BOLD    := \033[1m
NC      := \033[0m

##@ Help

help: ## Display this help message
	@echo "$(BOLD)$(CYAN)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(BOLD)$(CYAN)  FASHIONISTAR AI — Frontend Developer Commands$(NC)"
	@echo "$(CYAN)  Next.js 15 · TypeScript 5.8+ · Tailwind CSS v4 · Shadcn/ui$(NC)"
	@echo "$(BOLD)$(CYAN)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo ""
	@awk 'BEGIN {FS = ":.*##"; printf "Usage:\n  make $(CYAN)<target>$(NC)\n"} /^[a-zA-Z_0-9-]+:.*?##/ { printf "  $(CYAN)%-22s$(NC) %s\n", $$1, $$2 } /^##@/ { printf "\n$(YELLOW)%s$(NC)\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

# ═══════════════════════════════════════════════════════════════
##@ Development
# ═══════════════════════════════════════════════════════════════

install: ## Install Node.js dependencies
	@echo "$(CYAN)Installing dependencies...$(NC)"
	npm install
	@echo "$(GREEN)✓ Dependencies installed$(NC)"

dev: ## Start Next.js development server (Turbopack — port 3000)
	@echo "$(CYAN)Starting Next.js dev server with Turbopack...$(NC)"
	npm run dev

build: ## Build production bundle
	@echo "$(CYAN)Building for production...$(NC)"
	npm run build
	@echo "$(GREEN)✓ Production build complete$(NC)"

start: ## Start production server (requires build first)
	@echo "$(CYAN)Starting production server...$(NC)"
	npm run start

preview: build start ## Build + start production server locally

setup: install dev ## First-time setup → start dev server

# ═══════════════════════════════════════════════════════════════
##@ Code Quality
# ═══════════════════════════════════════════════════════════════

lint: ## Run ESLint
	@echo "$(CYAN)Running ESLint...$(NC)"
	npm run lint
	@echo "$(GREEN)✓ Linting passed$(NC)"

lint-fix: ## Run ESLint with auto-fix
	@echo "$(CYAN)Running ESLint with auto-fix...$(NC)"
	npx next lint --fix
	@echo "$(GREEN)✓ Lint issues fixed$(NC)"

type-check: ## Run TypeScript type checking
	@echo "$(CYAN)Running TypeScript type check...$(NC)"
	npx tsc --noEmit
	@echo "$(GREEN)✓ Type check passed$(NC)"

format: ## Format code with Prettier
	@echo "$(CYAN)Formatting code...$(NC)"
	npx prettier --write "src/**/*.{ts,tsx,js,jsx,json,css,md}"
	@echo "$(GREEN)✓ Code formatted$(NC)"

format-check: ## Check formatting without writing changes
	npx prettier --check "src/**/*.{ts,tsx,js,jsx,json,css,md}"

quality: lint type-check format-check ## Run all quality checks (lint + types + format)
	@echo "$(GREEN)✓ All quality checks passed$(NC)"

# ═══════════════════════════════════════════════════════════════
##@ Testing
# ═══════════════════════════════════════════════════════════════

test: ## Run unit tests (Vitest)
	@echo "$(CYAN)Running unit tests...$(NC)"
	npx vitest run
	@echo "$(GREEN)✓ Tests passed$(NC)"

test-watch: ## Run tests in watch mode
	npx vitest

test-cov: ## Run tests with coverage report
	@echo "$(CYAN)Running tests with coverage...$(NC)"
	npx vitest run --coverage
	@echo "$(GREEN)✓ Coverage report generated$(NC)"

test-ui: ## Open Vitest UI dashboard
	npx vitest --ui

test-e2e: ## Run Playwright end-to-end tests
	@echo "$(CYAN)Running E2E tests...$(NC)"
	npx playwright test
	@echo "$(GREEN)✓ E2E tests passed$(NC)"

test-e2e-ui: ## Run Playwright tests with headed browser
	npx playwright test --headed

test-e2e-report: ## Show last Playwright test report
	npx playwright show-report

test-e2e-install: ## Install Playwright browsers
	npx playwright install --with-deps

# ═══════════════════════════════════════════════════════════════
##@ Docker — Development
# ═══════════════════════════════════════════════════════════════

docker-dev-build: ## Build development Docker image
	@echo "$(CYAN)Building dev Docker image...$(NC)"
	docker build -t fashionista-frontend:dev -f Dockerfile.dev .
	@echo "$(GREEN)✓ Dev image built$(NC)"

docker-dev: ## Start development container with hot reload
	@echo "$(CYAN)Starting dev container...$(NC)"
	docker-compose -f docker-compose.dev.yml up
	@echo "$(GREEN)✓ Dev server at http://localhost:3000$(NC)"

docker-dev-d: ## Start development container (detached)
	docker-compose -f docker-compose.dev.yml up -d
	@echo "$(GREEN)✓ Dev server at http://localhost:3000$(NC)"

docker-dev-stop: ## Stop development container
	docker-compose -f docker-compose.dev.yml down

docker-dev-logs: ## Tail development container logs
	docker-compose -f docker-compose.dev.yml logs -f

docker-dev-shell: ## Open shell in development container
	docker exec -it fashionista-frontend-dev sh

# ═══════════════════════════════════════════════════════════════
##@ Docker — Production
# ═══════════════════════════════════════════════════════════════

docker-build: ## Build production Docker image
	@echo "$(CYAN)Building production Docker image...$(NC)"
	docker build -t fashionista-frontend:latest \
		--build-arg NEXT_PUBLIC_API_URL=$${NEXT_PUBLIC_API_URL:-http://localhost:8000} \
		-f Dockerfile .
	@echo "$(GREEN)✓ Production image built$(NC)"

docker-up: ## Start production container (detached)
	@echo "$(CYAN)Starting production container...$(NC)"
	docker-compose up -d
	@echo "$(GREEN)✓ Production at http://localhost:3000$(NC)"

docker-down: ## Stop production container
	docker-compose down

docker-restart: docker-down docker-up ## Restart production container

docker-logs: ## Tail production container logs
	docker-compose logs -f fashionista-frontend

docker-shell: ## Open shell in production container
	docker exec -it fashionista-frontend sh

# ═══════════════════════════════════════════════════════════════
##@ Docker — Maintenance
# ═══════════════════════════════════════════════════════════════

docker-clean: ## Remove all Docker containers and images
	@echo "$(YELLOW)Cleaning Docker containers and images...$(NC)"
	docker-compose down -v 2>/dev/null || true
	docker-compose -f docker-compose.dev.yml down -v 2>/dev/null || true
	docker rmi fashionista-frontend:latest fashionista-frontend:dev 2>/dev/null || true
	@echo "$(GREEN)✓ Docker cleaned$(NC)"

docker-stats: ## Show container resource usage
	docker stats fashionista-frontend

docker-inspect: ## Inspect production container
	docker inspect fashionista-frontend

# ═══════════════════════════════════════════════════════════════
##@ CI/CD Pipeline
# ═══════════════════════════════════════════════════════════════

ci: install quality build ## Run full CI pipeline (install → quality → build)
	@echo "$(GREEN)✓ CI pipeline passed$(NC)"

ci-test: install quality test build ## Run CI pipeline with tests
	@echo "$(GREEN)✓ CI pipeline with tests passed$(NC)"

ci-e2e: ci test-e2e ## Run CI pipeline with E2E tests
	@echo "$(GREEN)✓ Full CI + E2E pipeline passed$(NC)"

# ═══════════════════════════════════════════════════════════════
##@ Deployment
# ═══════════════════════════════════════════════════════════════

deploy-vercel: ## Deploy to Vercel (production)
	@echo "$(CYAN)Deploying to Vercel...$(NC)"
	npx vercel --prod
	@echo "$(GREEN)✓ Deployed to Vercel$(NC)"

deploy-vercel-preview: ## Deploy to Vercel (preview)
	@echo "$(CYAN)Deploying preview to Vercel...$(NC)"
	npx vercel
	@echo "$(GREEN)✓ Preview deployed$(NC)"

deploy-docker: docker-build docker-up ## Deploy via Docker
	@echo "$(GREEN)✓ Deployed via Docker$(NC)"

# ═══════════════════════════════════════════════════════════════
##@ Cleanup
# ═══════════════════════════════════════════════════════════════

clean: ## Clean build artifacts (.next, out)
	@echo "$(YELLOW)Cleaning build artifacts...$(NC)"
	rm -rf .next out .turbo
	@echo "$(GREEN)✓ Cleaned$(NC)"

clean-deps: ## Remove node_modules
	@echo "$(YELLOW)Removing node_modules...$(NC)"
	rm -rf node_modules
	@echo "$(GREEN)✓ node_modules removed$(NC)"

clean-all: clean clean-deps docker-clean ## Nuclear clean (build + deps + Docker)
	@echo "$(GREEN)✓ Everything cleaned$(NC)"

# ═══════════════════════════════════════════════════════════════
##@ Environment
# ═══════════════════════════════════════════════════════════════

env-setup: ## Create .env.local from .env.example (safe — won't overwrite)
	@if [ ! -f .env.local ]; then \
		cp .env.example .env.local 2>/dev/null || echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local; \
		echo "$(GREEN)✓ Created .env.local — edit with your values$(NC)"; \
	else \
		echo "$(YELLOW)⚠ .env.local already exists$(NC)"; \
	fi

env-check: ## Display current environment configuration
	@echo "$(CYAN)Environment variables:$(NC)"
	@if [ -f .env.local ]; then \
		grep -v '^\s*#' .env.local | grep -v '^\s*$$'; \
	else \
		echo "$(RED)✗ .env.local not found — run 'make env-setup'$(NC)"; \
	fi

# ═══════════════════════════════════════════════════════════════
##@ Backend Integration
# ═══════════════════════════════════════════════════════════════

backend-check: ## Check if backend API is running
	@echo "$(CYAN)Checking backend connection...$(NC)"
	@curl -sf http://localhost:8000/api/ > /dev/null 2>&1 && \
		echo "$(GREEN)✓ Backend is running at http://localhost:8000$(NC)" || \
		echo "$(RED)✗ Backend not available — run 'make dev' in fashionistar_backend/$(NC)"

full-stack: ## Display instructions for full-stack development
	@echo "$(BOLD)$(CYAN)━━━ Full-Stack Development ━━━$(NC)"
	@echo "  $(CYAN)Terminal 1 (Backend):$(NC)  cd ../fashionistar_backend && make dev"
	@echo "  $(CYAN)Terminal 2 (Frontend):$(NC) make dev"
	@echo "  $(CYAN)Terminal 3 (Workers):$(NC)  cd ../fashionistar_backend && make celery"
	@echo ""
	@echo "$(BOLD)  URLs:$(NC)"
	@echo "  $(CYAN)Frontend:$(NC)  http://localhost:3000"
	@echo "  $(CYAN)Backend:$(NC)   http://localhost:8000"
	@echo "  $(CYAN)Swagger:$(NC)   http://localhost:8000/swagger/"

# ═══════════════════════════════════════════════════════════════
##@ Project Information
# ═══════════════════════════════════════════════════════════════

info: ## Display project information
	@echo "$(BOLD)$(CYAN)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(BOLD)  FASHIONISTAR AI — Frontend$(NC)"
	@echo "$(CYAN)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "  Node:         $$(node --version 2>/dev/null || echo 'not installed')"
	@echo "  NPM:          $$(npm --version 2>/dev/null || echo 'not installed')"
	@echo "  Framework:    Next.js 15 (App Router + Turbopack)"
	@echo "  Language:     TypeScript 5.8+ (Strict Mode)"
	@echo "  Styling:      Tailwind CSS v4 + Shadcn/ui"
	@echo "  State:        Zustand + TanStack Query + Nuqs"
	@echo "  API Clients:  Axios (DRF) + Ky (Ninja)"
	@echo "  Testing:      Vitest (Unit) + Playwright (E2E)"
	@echo "$(CYAN)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"

deps: ## List installed Node packages
	npm list --depth=0

outdated: ## Check for outdated Node packages
	npm outdated

update: ## Update Node packages
	@echo "$(CYAN)Updating dependencies...$(NC)"
	npm update
	@echo "$(GREEN)✓ Dependencies updated$(NC)"

analyze: ## Analyze production bundle size
	@echo "$(CYAN)Analyzing bundle...$(NC)"
	ANALYZE=true npm run build

# ═══════════════════════════════════════════════════════════════
##@ Quick Commands
# ═══════════════════════════════════════════════════════════════

quick-start: install dev ## 🚀 Install dependencies → start dev server

quick-prod: build docker-build docker-up ## 🐳 Build → Docker → deploy

full-reset: clean-all install dev ## 🔄 Nuclear reset → fresh start

lighthouse: ## 🔦 Run Lighthouse audit (requires Chrome)
	@echo "$(CYAN)Running Lighthouse audit...$(NC)"
	npx lighthouse http://localhost:3000 --output html --output-path ./lighthouse-report.html --chrome-flags="--headless" 2>/dev/null || echo "$(YELLOW)Start the dev server first: make dev$(NC)"
