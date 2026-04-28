/**
 * features/chat/types/chat.types.ts
 *
 * Canonical type system for the features/chat FSD slice.
 * Mirrors the Django Chat domain (apps/chat/models/conversation.py).
 *
 * Import ONLY from 'features/chat' public barrel — never from deep paths.
 */

// ─────────────────────────────────────────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────────────────────────────────────────

export type ConversationStatus =
  | "active"
  | "archived"
  | "blocked"
  | "flagged"
  | "closed";

export type MessageStatus =
  | "sent"
  | "delivered"
  | "read"
  | "failed"
  | "deleted";

export type MessageType =
  | "text"
  | "image"
  | "file"
  | "system"
  | "offer"
  | "custom_order_request";

export type OfferStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "countered"
  | "expired"
  | "completed";

export type WebSocketReadyState = "connecting" | "open" | "closed" | "error";

// ─────────────────────────────────────────────────────────────────────────────
// PARTICIPANTS
// ─────────────────────────────────────────────────────────────────────────────

export interface Participant {
  id: string;
  name: string;
  avatar_url: string | null;
  role: "buyer" | "vendor" | "moderator";
  is_online: boolean;
  last_seen: string | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// MESSAGES
// ─────────────────────────────────────────────────────────────────────────────

export interface Attachment {
  url: string;
  mime_type: string;
  file_name: string;
  size_bytes: number;
}

export interface OfferData {
  amount: number;
  currency: string;
  product_id: string | null;
  product_name: string;
  status: OfferStatus;
  expires_at: string | null;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_name: string;
  sender_avatar: string | null;
  content: string;
  message_type: MessageType;
  status: MessageStatus;
  attachments: Attachment[];
  offer_data: OfferData | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  is_own?: boolean; // Derived client-side from current user ID
}

// Optimistic message added before server confirms
export interface PendingMessage extends Omit<Message, "id" | "status"> {
  id: `pending-${string}`;
  status: "sending";
}

// ─────────────────────────────────────────────────────────────────────────────
// CONVERSATIONS
// ─────────────────────────────────────────────────────────────────────────────

export interface Conversation {
  id: string;
  order_id: string | null;
  product_id: string | null;
  status: ConversationStatus;
  subject: string | null;
  last_message: Message | null;
  last_message_at: string | null;
  buyer: Participant;
  vendor: Participant;
  unread_count: number;
  created_at: string;
  updated_at: string;
}

export interface ConversationDetail extends Conversation {
  messages: Message[];
  has_more_messages: boolean;
  page: number;
}

export interface ConversationFeed {
  conversations: Conversation[];
  total: number;
  unread_total: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// API REQUEST / RESPONSE SHAPES
// ─────────────────────────────────────────────────────────────────────────────

export interface SendMessageInput {
  content: string;
  message_type?: MessageType;
  attachments?: string[];  // Upload URLs
  offer_data?: Partial<OfferData>;
  metadata?: Record<string, unknown>;
}

export interface StartConversationInput {
  vendor_id: string;
  subject?: string;
  product_id?: string;
  order_id?: string;
  initial_message?: string;
}

export interface MessagePage {
  messages: Message[];
  has_more: boolean;
  page: number;
  total: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// WEBSOCKET EVENTS
// ─────────────────────────────────────────────────────────────────────────────

export type WsEventType =
  | "message.new"
  | "message.read"
  | "message.deleted"
  | "user.typing"
  | "user.online"
  | "user.offline"
  | "offer.update"
  | "conversation.status"
  | "error";

export interface WsEvent<T = unknown> {
  type: WsEventType;
  payload: T;
  timestamp: string;
}

export interface WsNewMessagePayload {
  conversation_id: string;
  message: Message;
}

export interface WsTypingPayload {
  conversation_id: string;
  user_id: string;
  user_name: string;
}

export interface WsPresencePayload {
  user_id: string;
  is_online: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// QUERY KEY FACTORY (TanStack Query v5)
// ─────────────────────────────────────────────────────────────────────────────

export const chatKeys = {
  all:                     () => ["chat"] as const,
  conversations:           () => [...chatKeys.all(), "conversations"] as const,
  conversation:            (id: string) => [...chatKeys.conversations(), id] as const,
  messages:                (convId: string) => [...chatKeys.conversation(convId), "messages"] as const,
  messagesPage:            (convId: string, page: number) => [...chatKeys.messages(convId), page] as const,
  unreadCount:             () => [...chatKeys.all(), "unread-count"] as const,
} as const;
