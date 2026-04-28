/**
 * Detail panel for a single support ticket.
 */

"use client";

import { useState } from "react";

import {
  TICKET_PRIORITY_COLORS,
  TICKET_STATUS_COLORS,
  TICKET_STATUS_LABELS,
  type SupportTicket,
} from "../types/support.types";

export interface TicketDetailPanelProps {
  ticket: SupportTicket | null;
  onSendMessage?: (body: string) => Promise<void> | void;
  isSending?: boolean;
}

export function TicketDetailPanel({
  ticket,
  onSendMessage,
  isSending = false,
}: TicketDetailPanelProps) {
  const [reply, setReply] = useState("");

  if (!ticket) {
    return (
      <section className="flex min-h-[28rem] items-center justify-center border border-black/10 bg-[#F4F3EC] text-sm text-black/55">
        Select a ticket to view the thread.
      </section>
    );
  }

  return (
    <section className="flex min-h-[28rem] flex-col border border-black/10 bg-[#F4F3EC]">
      <div className="border-b border-black/10 bg-white px-5 py-4">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-base font-semibold text-[#141414]">{ticket.title}</h3>
          <span className={`rounded-full px-2 py-1 text-[11px] font-medium ${TICKET_STATUS_COLORS[ticket.status]}`}>
            {TICKET_STATUS_LABELS[ticket.status]}
          </span>
          <span className={`rounded-full px-2 py-1 text-[11px] font-medium ${TICKET_PRIORITY_COLORS[ticket.priority]}`}>
            {ticket.priority}
          </span>
        </div>
        <p className="mt-2 text-sm text-black/65">{ticket.description}</p>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-5">
        {ticket.messages.map((message) => (
          <div
            key={message.id}
            className={[
              "max-w-[85%] rounded-2xl px-4 py-3 shadow-sm",
              message.is_staff_reply
                ? "bg-white text-[#141414]"
                : "ml-auto bg-[#01454A] text-white",
            ].join(" ")}
          >
            <div className="mb-1 text-xs opacity-75">{message.author_name}</div>
            <p className="text-sm leading-6">{message.body}</p>
          </div>
        ))}
      </div>

      {onSendMessage ? (
        <div className="border-t border-black/10 bg-white p-4">
          <div className="flex items-end gap-3">
            <textarea
              value={reply}
              onChange={(event) => setReply(event.target.value)}
              rows={3}
              placeholder="Reply to support..."
              className="min-h-24 flex-1 resize-none rounded-lg border border-black/10 px-4 py-3 text-sm text-[#141414] outline-none transition focus:border-[#FDA600]"
            />
            <button
              type="button"
              disabled={isSending || reply.trim().length === 0}
              onClick={async () => {
                const body = reply.trim();
                if (!body) {
                  return;
                }
                await onSendMessage(body);
                setReply("");
              }}
              className="rounded-full bg-[#FDA600] px-4 py-2 text-sm font-semibold text-[#141414] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
