/**
 * features/support/index.ts
 *
 * Public barrel for the `features/support` canonical FSD slice.
 *
 * Import ONLY from 'features/support' — never from deep internal paths.
 */

// ── Types ──────────────────────────────────────────────────────────────────
export type {
  SupportTicket,
  SupportTicketListItem,
  TicketMessage,
  TicketEscalation,
  CreateTicketInput,
  AddMessageInput,
  UpdateStatusInput,
  EscalateInput,
  TicketStatus,
  TicketPriority,
  TicketCategory,
  EscalationStatus,
  TicketListFilters,
} from "./types/support.types";

export {
  supportKeys,
  TICKET_STATUS_LABELS,
  TICKET_STATUS_COLORS,
  TICKET_PRIORITY_COLORS,
} from "./types/support.types";

// ── API Functions ──────────────────────────────────────────────────────────
export {
  fetchMyTickets,
  fetchTicketDetail,
  createTicket,
  addTicketMessage,
  updateTicketStatus,
  escalateTicket,
  fetchAdminQueue,
} from "./api/support.api";

// ── TanStack Query Hooks ───────────────────────────────────────────────────
export {
  useMyTickets,
  useTicketDetail,
  useAdminQueue,
  useCreateTicket,
  useAddMessage,
  useUpdateTicketStatus,
  useEscalateTicket,
} from "./hooks/use-support";

export {
  SupportTicketList,
} from "./components/SupportTicketList";

export {
  TicketDetailPanel,
} from "./components/TicketDetailPanel";

export {
  NewTicketModal,
} from "./components/NewTicketModal";
