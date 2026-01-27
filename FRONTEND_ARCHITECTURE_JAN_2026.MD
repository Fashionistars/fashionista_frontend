# FRONTEND_ARCHITECTURE_JAN_2026.MD

# 🏛️ INDUSTRIAL ENTERPRISE GRADE FRONTEND ARCHITECTURE (V6.0)

**Project:** FASHIONISTAR AI (Next-Gen E-Commerce)  
**Target Date:** 2026  
**Framework:** Next.js 15 (App Router) + TypeScript 5.5+  
**Styling Engine:** Tailwind CSS + Shadcn/ui  
**Backend Alignment:** Django 6.0 (DRF Sync + Ninja Async)  
**Author:** Lead Fullstack Architect (AI-Assisted)

---

## 📑 TABLE OF CONTENTS

1.  [The Verdict: UI Component Strategy](#1-the-verdict-ui-component-strategy)
2.  [Executive Architectural Summary](#2-executive-architectural-summary)
3.  [Directory Structure (Feature-Sliced Design)](#3-directory-structure-feature-sliced-design)
4.  [Core Systems & Infrastructure](#4-core-systems--infrastructure)
    - 4.1 [The Dual-Engine API Gateway (Sync vs Async)](#41-the-dual-engine-api-gateway)
    - 4.2 [State Management: The Trinity Strategy](#42-state-management)
    - 4.3 [Unified Notification System (FCM)](#43-unified-notification-system)
5.  [AI Integration & Streaming](#5-ai-integration--streaming)
6.  [PayCore Analysis & Integration](#6-paycore-analysis--integration)
7.  [10 Industrial Professional Recommendations](#7-10-industrial-professional-recommendations)
8.  [Detailed Checklist & Implementation Guide](#8-detailed-checklist--implementation-guide)

---

## 1. THE VERDICT: UI COMPONENT STRATEGY

After exhaustive research of the current 2026 web ecosystem, we have selected **Shadcn/ui** as the winner. It is the only choice that offers the performance of Tailwind, the accessibility of Radix, and the code ownership required for an enterprise asset.

### 🏆 THE WINNER: **shadcn/ui**

**Why this is the ONLY choice for a 2026 Enterprise System:**

1.  **Ownership & Longevity:** Unlike MUI or AntD, Shadcn is **not a dependency** in `package.json` that will break your app when updated. You copy the component code into your project. You own it. If the library author disappears, your project survives.
2.  **Zero Runtime Overhead:** MUI uses Emotion (CSS-in-JS), which adds significant JavaScript bloat and slows down the browser's "Paint" time. Shadcn uses **Tailwind CSS**, which compiles to raw CSS at build time. It is mathematically faster.
3.  **Server Component (RSC) Compatible:** Next.js App Router relies on Server Components. MUI struggles with hydration errors here. Shadcn works natively.
4.  **Headless Accessibility:** It uses **Radix UI** primitives under the hood. This guarantees WAI-ARIA compliance (screen readers, keyboard nav) which is legally required for enterprise apps, without forcing a specific "Google Look."

**❌ The Losers:**

- **Material UI:** Too heavy, looks generic, hydration issues with Next.js 14/15.
- **DaisyUI:** Good for prototypes, but relies on semantic class names that become unmanageable at scale.

---

## 2. EXECUTIVE ARCHITECTURAL SUMMARY

We are moving away from a "Page-Based" architecture to a **"Feature-Sliced Domain" (FSD)** architecture. This separates business logic by domain (Auth, Product, AI-Measurement) rather than by technology (Components, Hooks).

**The Core Pillars:**

1.  **Strict Typing:** Zod Schemas must mirror Pydantic Models 1:1.
2.  **Optimistic UI:** Interactions (Likes, Add to Cart) update instantly visually, then sync with background API.
3.  **Hybrid Rendering:** Marketing pages are Static (SSG), Product pages are Server Rendered (SSR), Dashboard/AI is Client Rendered (CSR).
4.  **Strict Separation of Concerns:**
    - **Sync Operations (Auth, Orders, CRUD):** Handled by `Axios` connecting to Django DRF.
    - **Async Operations (AI, Search, Real-time):** Handled by `Ky/Fetch` connecting to Django Ninja.

---

## 3. DIRECTORY STRUCTURE (FEATURE-SLICED DESIGN)

This structure is non-negotiable for scalability. Ideally suited for teams of 5-50 engineers.

```text
src/
├── app/                        # Next.js App Router (Routing Layer ONLY)
│   ├── (marketing)/            # Public pages (Landing, About)
│   ├── (shop)/                 # Shop, Product Details, Cart
│   ├── (auth)/                 # Login, Register, OTP
│   ├── (dashboard)/            # User & Vendor Dashboards
│   │   ├── vendor/
│   │   └── client/
│   └── api/                    # Next.js API Routes (BFF Layer)
│
├── core/                       # INFRASTRUCTURE (The "Engine")
│   ├── config/                 # Env vars, Constants
│   ├── api/
│   │   ├── client.sync.ts      # Axios Instance for DRF (Auth, Orders)
│   │   └── client.async.ts     # Fetch/Ky Instance for Ninja (AI, Search)
│   ├── types/                  # Global Types (Backend Responses)
│   └── utils/                  # Date formatting, String helpers
│
├── components/                 # SHARED UI (The "LEGO Bricks")
│   ├── ui/                     # Shadcn Components (Button, Input, Dialog)
│   ├── shared/                 # App-wide molecules (Navbar, Footer)
│   └── providers/              # React Context Providers (Theme, Auth)
│
├── features/                   # DOMAIN LOGIC (The "Business")
│   ├── auth/
│   │   ├── components/         # LoginForm, RegisterForm
│   │   ├── hooks/              # useLogin, useUser
│   │   ├── services/           # auth.service.ts (API calls)
│   │   └── schemas/            # Zod schemas matching Pydantic
│   ├── product/
│   ├── cart/
│   ├── ai-measurement/         # COMPLEX AI LOGIC (Async)
│   │   ├── components/         # CameraCapture, MeshVisualizer
│   │   ├── hooks/              # useBodyScan (Async)
│   │   └── services/           # measurement.service.ts
│   └── notifications/          # Firebase Integration
│
├── lib/                        # Third-party wrappers
│   ├── firebase.ts
│   ├── stripe.ts
│   └── sentry.ts
│
└── styles/                     # Global CSS & Tailwind Config
```

---

## 4. CORE SYSTEMS & INFRASTRUCTURE

### 4.1 The Dual-Engine API Gateway (Sync vs Async)

We strictly separate **Transactional (Sync/DRF)** from **Computational (Async/Ninja)** operations to match the backend architecture.

#### **A. The Sync Client (Axios + DRF)**

_Used for: Auth, Checkout, Order History, User Profile._
_Pattern Borrowed from PayCore: Class-based Service with Interceptors_

```typescript
// src/core/api/client.sync.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner"; // Modern toast library
import { useAuthStore } from "@/features/auth/store/auth.store";

export const apiSync = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_V1_URL, // Django DRF
  timeout: 10000,
  withCredentials: true, // For HTTPOnly Cookies
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ROBUST INTERCEPTOR FOR AUTH & ERRORS (From PayCore Best Practices)
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

apiSync.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // 1. Handle 401 (Unauthorized) - Auto Token Refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(apiSync(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Attempt Refresh
        // Note: In real production, this might be a cookie-based refresh endpoint
        const { accessToken } = await refreshTokenCall();
        useAuthStore.getState().setToken(accessToken);

        // Resolve Queue
        refreshSubscribers.forEach((cb) => cb(accessToken));
        refreshSubscribers = [];

        return apiSync(originalRequest);
      } catch (refreshError) {
        // Refresh Failed - Logout
        useAuthStore.getState().logout();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // 2. Handle 500 (Server Error) - Global Toast
    if (error.response?.status && error.response.status >= 500) {
      toast.error("System Busy", {
        description:
          "Our fashion engineers are fixing a stitch. Try again shortly.",
      });
    }

    return Promise.reject(error);
  },
);
```

#### **B. The Async Client (Ky + Django Ninja)**

_Used for: AI Measurement, Search, Recommendation Stream._

```typescript
// src/core/api/client.async.ts
import ky from "ky"; // Lightweight fetch wrapper perfect for Async

export const apiAsync = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_V2_URL, // Django Ninja
  timeout: 30000, // Longer timeout for AI
  retry: {
    limit: 2,
    methods: ["get", "post"], // Safe retry for idempotent AI queries
  },
  hooks: {
    beforeRequest: [
      (request) => {
        // Append lightweight headers
        request.headers.set("X-Client-Version", "2026.1.0");
        // Add Authorization if needed, but keep it lightweight
      },
    ],
  },
});

// Usage Example: Streaming AI Data
export const streamBodyMeasurement = async (imageFile: File) => {
  const formData = new FormData();
  formData.append("file", imageFile);

  // Ky handles streams natively better than Axios
  const response = await apiAsync.post("ai/scan", { body: formData });
  return response.json();
};
```

### 4.2 State Management: The Trinity Strategy

Do not use Redux for everything. Use the right tool for the scope.

1.  **Server State (TanStack Query v5):**
    - _Purpose:_ Fetching Products, Orders, User Data.
    - _Why:_ Caching, deduping requests, background revalidation.
    - _Code:_ `useQuery({ queryKey: ['products'], queryFn: getProducts })`

2.  **Global Client State (Zustand):**
    - _Purpose:_ Shopping Cart, UI Toggles (Sidebar open/close), AI Session Data.
    - _Why:_ Redux is too boilerplate-heavy. Zustand is 1kb and atomic.

3.  **URL State (Nuqs):**
    - _Purpose:_ Filters, Search Queries, Pagination.
    - _Why:_ Shareable URLs. `fashionistar.com/shop?color=red&size=m`.

### 4.3 Unified Notification System (FCM)

We integrate **Firebase Cloud Messaging (FCM)** for a unified push strategy across Web, Android, and iOS.

```typescript
// src/features/notifications/useNotification.ts
import { useEffect } from "react";
import { onMessage } from "firebase/messaging";
import { messaging } from "@/lib/firebase";
import { toast } from "sonner";

export const useCloudMessaging = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const unsubscribe = onMessage(messaging, (payload) => {
        console.log("Foreground Message:", payload);

        // Custom UI Toast for "In-App" feel
        toast.message(payload.notification?.title, {
          description: payload.notification?.body,
          action: {
            label: "View",
            onClick: () => console.log("Navigate to order"),
          },
        });
      });
      return () => unsubscribe();
    }
  }, []);
};
```

---

## 5. AI INTEGRATION & STREAMING

The logic for the AI measurement tool must be isolated in `src/features/ai-measurement`.

**Flow:**

1.  **Capture:** Use `react-webcam` or HTML5 Input with strict constraints (force rear camera on mobile).
2.  **Upload:** Send to **Django Ninja (Async)** endpoint using `apiAsync`.
3.  **Optimistic UI:** Show a skeleton loader of the body mesh immediately.
4.  **Polling/SSE:** If the AI takes > 5 seconds, use Server-Sent Events (SSE) to show a progress bar ("Detecting Shoulders..." -> "Calculating Inseam...").
5.  **Fallback:** If AI fails (confidence < 80%), trigger a "Manual Correction" modal using **Zod** forms.

---

## 6. PAYCORE ANALYSIS & INTEGRATION

_Observations from PayCore Frontend:_

- **Good:** Used decentralized `services/` folder structure (e.g. `api.service.ts`).
- **Good:** Used Toast notifications for errors.
- **Bad:** Middleware/Interceptors were good but tight coupling.
- **Bad:** WebSocket implementation was efficient but needs better typing for our case.

**Architecture Injection from PayCore:**
We will adapt the **"Service Layer Pattern"** from PayCore but strictly typed.

_Example Service Definition:_

```typescript
// src/features/product/product.service.ts
import { apiAsync } from "@/core/api/client.async";
import { ProductSchema, ProductType } from "./product.schema"; // Zod

export const ProductService = {
  getAll: async (): Promise<ProductType[]> => {
    const data = await apiAsync.get("products").json();
    // Runtime Validation: Crashes dev build if API changes, saving prod bugs
    // STRICT ZOD VALIDATION
    return ProductSchema.array().parse(data);
  },

  scanItem: async (id: string) => {
    // ...
  },
};
```

---

## 7. 10 INDUSTRIAL PROFESSIONAL RECOMMENDATIONS

1.  **Implement "Barrel Files" Carefully:**
    Do not use `index.ts` everywhere. It breaks Tree-Shaking in Webpack/Turbopack. Import directly: `import { Button } from "@/components/ui/button"`.

2.  **Strict "Zod-First" Development:**
    Frontend should not "guess" the API response. Define a Zod schema for _every_ API endpoint. If the backend changes a boolean to a string, the Frontend should catch it (via Zod parse error) during development.

3.  **The "Image Blur" Strategy (LCP Optimization):**
    For a fashion site, images are everything. Use `next/image` with `placeholder="blur"`. Generate the `blurDataURL` on the server (Django) and send it with the API response. This makes the site feel _instantly_ loaded.

4.  **Error Boundary Granularity:**
    Don't wrap the whole app in one Error Boundary. Wrap specific widgets.
    - _Example:_ If the "AI Measurement" widget crashes, the "Add to Cart" button should still work. Isolate failures.

5.  **Mobile Thumb-Zone Architecture:**
    Place all primary interactive elements (Nav, Cart, Scan) in the bottom 30% of the viewport. Top of screen is for Viewing, Bottom is for Acting.

6.  **Skeleton Loading > Spinners:**
    Never use a spinning circle for initial page loads. Use Skeleton screens (gray pulsing shapes) that mimic the layout of the product cards. It reduces perceived latency by 40%.

7.  **Debounced Search with URL Sync:**
    When searching for "Gucci Bag", update the URL to `?q=Gucci+Bag` only after the user stops typing for 500ms. This prevents spamming your Django Ninja async endpoint.

8.  **Prefetching on Hover:**
    When a user hovers over a product card, tell TanStack Query to prefetch the details of that product. By the time they click, the data is already there. Instant transition.

9.  **Accessibility (a11y) as a CI Check:**
    Install `eslint-plugin-jsx-a11y`. The build should FAIL if an image is missing an `alt` tag or a button has no label. Legal compliance is not optional.

10. **Environment Variable Validation:**
    Create a `env.mjs` file using T3 Env. This validates that `NEXT_PUBLIC_API_URL` exists at build time. Prevents deploying a broken app because someone forgot to set a variable in Vercel/Docker.

---

## 8. DETAILED CHECKLIST & IMPLEMENTATION GUIDE

### Phase 1: Foundation Setup

- [ ] Initialize Next.js 15 App Router project
- [ ] Install Tailwind CSS & Shadcn/ui CLI
- [ ] Configure `core/api/client.sync.ts` (Axios + Interceptors)
- [ ] Configure `core/api/client.async.ts` (Ky)

### Phase 2: Core Components & Layouts

- [ ] Build "AppShell" (Navbar, Sidebar, Footer) using Shadcn
- [ ] Implement Mobile Bottom Navigation (Thumb Zone)
- [ ] Create `AuthLayout` vs `ShopLayout`

### Phase 3: Infrastructure Integration

- [ ] Setup Zustand Stores (`useCartStore`, `useAuthStore`)
- [ ] Setup TanStack Query Provider with `staleTime: 5 mins`
- [ ] Integrate Firebase Cloud Messaging (FCM) Service Worker

### Phase 4: Feature Implementation (Iterative)

- [ ] **Auth:** Login/Register with Zod Validation
- [ ] **Products:** Product Listing with Infinite Scroll (useIntersectionObserver)
- [ ] **AI:** Camera Capture Component + Streaming API Hook

### Phase 5: Production Polish

- [ ] Run Lighthouse Audits (Aim for 95+ Performance)
- [ ] Verify Accessibility via Screen Reader
- [ ] Configure Sentry for Error Tracking
- [ ] Deploy to Vercel/Docker with Environment Validation
