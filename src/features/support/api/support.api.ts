/**
 * features/support/api/support.api.ts
 *
 * REST API client for the Support domain.
 * DRF sync endpoints: /api/v1/support/
 */

import axiosInstance from "@/lib/axios";
import type {
  SupportTicket,
  SupportTicketListItem,
  TicketMessage,
  TicketEscalation,
  CreateTicketInput,
  AddMessageInput,
  UpdateStatusInput,
  EscalateInput,
  TicketStatus,
  TicketCategory,
} from "../types/support.types";

const BASE = "/api/v1/support";

// ─────────────────────────────────────────────────────────────────────────────
// USER ENDPOINTS
// ─────────────────────────────────────────────────────────────────────────────

export interface TicketListFilters {
  status?: TicketStatus;
  category?: TicketCategory;
}

export async function fetchMyTickets(
  filters?: TicketListFilters
): Promise<SupportTicketListItem[]> {
  const { data } = await axiosInstance.get<{ data: SupportTicketListItem[] }>(
    `${BASE}/tickets/`,
    { params: filters }
  );
  return data.data;
}

export async function fetchTicketDetail(
  ticketId: string
): Promise<SupportTicket> {
  const { data } = await axiosInstance.get<{ data: SupportTicket }>(
    `${BASE}/tickets/${ticketId}/`
  );
  return data.data;
}

export async function createTicket(
  input: CreateTicketInput
): Promise<SupportTicket> {
  const { data } = await axiosInstance.post<{ data: SupportTicket }>(
    `${BASE}/tickets/`,
    input
  );
  return data.data;
}

export async function addTicketMessage(
  ticketId: string,
  input: AddMessageInput
): Promise<TicketMessage> {
  const { data } = await axiosInstance.post<{ data: TicketMessage }>(
    `${BASE}/tickets/${ticketId}/messages/`,
    input
  );
  return data.data;
}

// ─────────────────────────────────────────────────────────────────────────────
// STAFF ENDPOINTS
// ─────────────────────────────────────────────────────────────────────────────

export async function updateTicketStatus(
  ticketId: string,
  input: UpdateStatusInput
): Promise<SupportTicket> {
  const { data } = await axiosInstance.patch<{ data: SupportTicket }>(
    `${BASE}/tickets/${ticketId}/status/`,
    input
  );
  return data.data;
}

export async function escalateTicket(
  ticketId: string,
  input: EscalateInput
): Promise<TicketEscalation> {
  const { data } = await axiosInstance.post<{ data: TicketEscalation }>(
    `${BASE}/tickets/${ticketId}/escalate/`,
    input
  );
  return data.data;
}

export async function fetchAdminQueue(
  filters?: TicketListFilters
): Promise<SupportTicketListItem[]> {
  const { data } = await axiosInstance.get<{ data: SupportTicketListItem[] }>(
    `${BASE}/admin/queue/`,
    { params: filters }
  );
  return data.data;
}
