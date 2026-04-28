/**
 * features/support/types/support.types.ts
 *
 * Canonical type system for the features/support FSD slice.
 * Mirrors the Django Support domain (apps/support/models/support_ticket.py).
 */

// ─────────────────────────────────────────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────────────────────────────────────────

export type TicketStatus =
  | "open"
  | "in_review"
  | "awaiting_client"
  | "escalated"
  | "resolved"
  | "closed";

export type TicketPriority = "low" | "medium" | "high" | "critical";

export type TicketCategory =
  | "order_dispute"
  | "payment_issue"
  | "product_complaint"
  | "shipping_problem"
  | "refund_request"
  | "account_issue"
  | "general";

export type EscalationStatus = "open" | "in_progress" | "resolved" | "closed";

// ─────────────────────────────────────────────────────────────────────────────
// ENTITIES
// ─────────────────────────────────────────────────────────────────────────────

export interface TicketMessage {
  id: string;
  author_name: string;
  body: string;
  is_staff_reply: boolean;
  attachments: string[];
  created_at: string;
}

export interface TicketEscalation {
  id: string;
  status: EscalationStatus;
  reason: string;
  resolution_notes: string;
  resolved_at: string | null;
  created_at: string;
}

export interface SupportTicket {
  id: string;
  submitter_email: string | null;
  assigned_to_name: string | null;
  order_id: string | null;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  title: string;
  description: string;
  metadata: Record<string, unknown>;
  resolution_notes: string;
  resolved_at: string | null;
  closed_at: string | null;
  messages: TicketMessage[];
  escalation: TicketEscalation | null;
  created_at: string;
  updated_at: string;
}

export interface SupportTicketListItem {
  id: string;
  submitter_email: string | null;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  title: string;
  order_id: string | null;
  created_at: string;
  updated_at: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// API SHAPES
// ─────────────────────────────────────────────────────────────────────────────

export interface CreateTicketInput {
  title: string;
  description: string;
  category?: TicketCategory;
  priority?: TicketPriority;
  order_id?: string;
  metadata?: Record<string, unknown>;
}

export interface AddMessageInput {
  body: string;
  attachments?: string[];
}

export interface UpdateStatusInput {
  status: TicketStatus;
  notes?: string;
}

export interface EscalateInput {
  reason: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// QUERY KEY FACTORY (TanStack Query v5)
// ─────────────────────────────────────────────────────────────────────────────

export const supportKeys = {
  all:       () => ["support"] as const,
  tickets:   () => [...supportKeys.all(), "tickets"] as const,
  ticket:    (id: string) => [...supportKeys.tickets(), id] as const,
  adminQueue: () => [...supportKeys.all(), "admin-queue"] as const,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// STATUS DISPLAY HELPERS
// ─────────────────────────────────────────────────────────────────────────────

export const TICKET_STATUS_LABELS: Record<TicketStatus, string> = {
  open:             "Open",
  in_review:        "In Review",
  awaiting_client:  "Awaiting Your Response",
  escalated:        "Escalated",
  resolved:         "Resolved",
  closed:           "Closed",
};

export const TICKET_STATUS_COLORS: Record<TicketStatus, string> = {
  open:             "bg-blue-100 text-blue-800",
  in_review:        "bg-yellow-100 text-yellow-800",
  awaiting_client:  "bg-orange-100 text-orange-800",
  escalated:        "bg-red-100 text-red-800",
  resolved:         "bg-green-100 text-green-800",
  closed:           "bg-gray-100 text-gray-600",
};

export const TICKET_PRIORITY_COLORS: Record<TicketPriority, string> = {
  low:      "bg-slate-100 text-slate-600",
  medium:   "bg-blue-100 text-blue-700",
  high:     "bg-amber-100 text-amber-800",
  critical: "bg-red-100 text-red-900 font-semibold",
};
