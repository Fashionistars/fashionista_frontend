/**
 * features/support/api/support.api.ts
 *
 * REST API client for the Support domain.
 * DRF sync endpoints: /v1/support/
 * Ninja async endpoints: /api/v1/ninja/support/
 */

import { apiSync } from "@/core/api/client.sync";
import { apiAsync } from "@/core/api/client.async";
import type {
  SupportTicket,
  SupportTicketListItem,
  TicketMessage,
  TicketEscalation,
  CreateTicketInput,
  AddMessageInput,
  UpdateStatusInput,
  EscalateInput,
  TicketListFilters,
} from "../types/support.types";

const BASE = "/v1/support";

// ─────────────────────────────────────────────────────────────────────────────
// USER ENDPOINTS
// ─────────────────────────────────────────────────────────────────────────────

export async function fetchMyTickets(
  filters?: TicketListFilters
): Promise<SupportTicketListItem[]> {
  const envelope = await apiAsync
    .get("support/tickets/", { searchParams: filters as any })
    .json<{ data?: { tickets: SupportTicketListItem[] }, tickets?: SupportTicketListItem[] }>();
  return envelope?.data?.tickets ?? envelope?.tickets ?? [];
}

export async function fetchTicketDetail(
  ticketId: string
): Promise<SupportTicket> {
  const envelope = await apiAsync
    .get(`support/tickets/${ticketId}/`)
    .json<{ data?: SupportTicket } & SupportTicket>();
  return envelope?.data ?? (envelope as SupportTicket);
}

export async function createTicket(
  input: CreateTicketInput
): Promise<SupportTicket> {
  const { data } = await apiSync.post<SupportTicket>(
    `${BASE}/tickets/`,
    input
  );
  return data;
}

export async function addTicketMessage(
  ticketId: string,
  input: AddMessageInput
): Promise<TicketMessage> {
  const { data } = await apiSync.post<TicketMessage>(
    `${BASE}/tickets/${ticketId}/messages/`,
    input
  );
  return data;
}

// ─────────────────────────────────────────────────────────────────────────────
// STAFF ENDPOINTS
// ─────────────────────────────────────────────────────────────────────────────

export async function updateTicketStatus(
  ticketId: string,
  input: UpdateStatusInput
): Promise<SupportTicket> {
  const { data } = await apiSync.patch<SupportTicket>(
    `${BASE}/tickets/${ticketId}/status/`,
    input
  );
  return data;
}

export async function escalateTicket(
  ticketId: string,
  input: EscalateInput
): Promise<TicketEscalation> {
  const { data } = await apiSync.post<TicketEscalation>(
    `${BASE}/tickets/${ticketId}/escalate/`,
    input
  );
  return data;
}

export async function fetchAdminQueue(
  filters?: TicketListFilters
): Promise<SupportTicketListItem[]> {
  const envelope = await apiAsync
    .get("support/admin/queue/", { searchParams: filters as any })
    .json<{ data?: { tickets: SupportTicketListItem[] }, tickets?: SupportTicketListItem[] }>();
  return envelope?.data?.tickets ?? envelope?.tickets ?? [];
}
