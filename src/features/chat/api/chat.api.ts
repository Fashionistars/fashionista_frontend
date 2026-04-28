/**
 * features/chat/api/chat.api.ts
 *
 * REST API client for the chat domain.
 * - DRF (Axios) sync endpoints: /api/v1/chat/
 * - Ninja (Ky) async endpoints: /api/v1/ninja/chat/ (future extension)
 *
 * REST polling fallback strategy:
 *   WebSocket connected → REST used only for initial load + pagination
 *   WebSocket unavailable → REST polling every 10s via refetchInterval
 */

import axiosInstance from "@/lib/axios";
import type {
  Conversation,
  ConversationFeed,
  ConversationDetail,
  Message,
  MessagePage,
  SendMessageInput,
  StartConversationInput,
} from "../types/chat.types";

const BASE = "/api/v1/chat";

// ─────────────────────────────────────────────────────────────────────────────
// CONVERSATIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fetch the authenticated user's conversation feed.
 * Returns both conversations list and total unread count.
 */
export async function fetchConversationFeed(): Promise<ConversationFeed> {
  const { data } = await axiosInstance.get<ConversationFeed>(
    `${BASE}/conversations/`
  );
  return data;
}

/**
 * Fetch a single conversation's detail including the latest page of messages.
 * @param conversationId - UUID of the conversation
 */
export async function fetchConversationDetail(
  conversationId: string
): Promise<ConversationDetail> {
  const { data } = await axiosInstance.get<ConversationDetail>(
    `${BASE}/conversations/${conversationId}/`
  );
  return data;
}

/**
 * Start a new conversation with a vendor.
 * Idempotent: returns an existing conversation for the same vendor+order combination.
 */
export async function startConversation(
  input: StartConversationInput
): Promise<Conversation> {
  const { data } = await axiosInstance.post<Conversation>(
    `${BASE}/conversations/`,
    input
  );
  return data;
}

// ─────────────────────────────────────────────────────────────────────────────
// MESSAGES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fetch a paginated page of messages for a conversation.
 * Page 1 = newest messages (desc order, reversed client-side for display).
 *
 * @param conversationId - UUID of the conversation
 * @param page - Page number (1-indexed)
 */
export async function fetchMessages(
  conversationId: string,
  page: number = 1
): Promise<MessagePage> {
  const { data } = await axiosInstance.get<MessagePage>(
    `${BASE}/conversations/${conversationId}/messages/`,
    { params: { page } }
  );
  return data;
}

/**
 * Send a message to a conversation.
 * Returns the confirmed Message from the server.
 *
 * @param conversationId - UUID of the conversation
 * @param input - Message content, type, attachments
 */
export async function sendMessage(
  conversationId: string,
  input: SendMessageInput
): Promise<Message> {
  const { data } = await axiosInstance.post<Message>(
    `${BASE}/conversations/${conversationId}/messages/`,
    input
  );
  return data;
}

/**
 * Mark all messages in a conversation as read.
 * Called when user opens a conversation window.
 *
 * @param conversationId - UUID of the conversation
 */
export async function markConversationRead(
  conversationId: string
): Promise<{ status: string; marked_read: number }> {
  const { data } = await axiosInstance.post<{ status: string; marked_read: number }>(
    `${BASE}/conversations/${conversationId}/read/`
  );
  return data;
}

// ─────────────────────────────────────────────────────────────────────────────
// OFFERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Accept an offer message in a conversation.
 *
 * @param conversationId - UUID of the conversation
 * @param messageId - UUID of the offer message
 */
export async function acceptOffer(
  conversationId: string,
  messageId: string
): Promise<Message> {
  const { data } = await axiosInstance.post<Message>(
    `${BASE}/conversations/${conversationId}/messages/${messageId}/accept-offer/`
  );
  return data;
}

/**
 * Reject an offer message.
 */
export async function rejectOffer(
  conversationId: string,
  messageId: string
): Promise<Message> {
  const { data } = await axiosInstance.post<Message>(
    `${BASE}/conversations/${conversationId}/messages/${messageId}/reject-offer/`
  );
  return data;
}
