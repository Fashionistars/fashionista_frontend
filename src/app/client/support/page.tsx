"use client";

import { useEffect, useState } from "react";

import {
  NewTicketModal,
  SupportTicketList,
  TicketDetailPanel,
  useAddMessage,
  useCreateTicket,
  useMyTickets,
  useTicketDetail,
} from "@/features/support";

export default function ClientSupportPage() {
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const ticketsQuery = useMyTickets();
  const tickets = ticketsQuery.data ?? [];

  useEffect(() => {
    if (!activeTicketId && tickets.length > 0) {
      setActiveTicketId(tickets[0].id);
    }
  }, [activeTicketId, tickets]);

  const ticketDetailQuery = useTicketDetail(activeTicketId);
  const createTicketMutation = useCreateTicket();
  const addMessageMutation = useAddMessage(activeTicketId ?? "");

  return (
    <main className="space-y-6 px-4 py-6 md:px-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#141414]">Support</h1>
          <p className="mt-1 text-sm text-black/60">
            Track disputes, delivery issues, and general help requests.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="rounded-full bg-[#FDA600] px-4 py-2 text-sm font-semibold text-[#141414] transition hover:brightness-95"
        >
          New ticket
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[22rem,minmax(0,1fr)]">
        <SupportTicketList
          tickets={tickets}
          activeTicketId={activeTicketId}
          onSelectTicket={setActiveTicketId}
        />
        <TicketDetailPanel
          ticket={ticketDetailQuery.data ?? null}
          isSending={addMessageMutation.isPending}
          onSendMessage={
            activeTicketId
              ? async (body) => {
                  await addMessageMutation.mutateAsync({ body });
                }
              : undefined
          }
        />
      </div>

      <NewTicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isSubmitting={createTicketMutation.isPending}
        onSubmit={async (payload) => {
          const ticket = await createTicketMutation.mutateAsync(payload);
          setActiveTicketId(ticket.id);
        }}
      />
    </main>
  );
}
