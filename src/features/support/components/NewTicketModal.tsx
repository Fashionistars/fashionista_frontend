/**
 * Lightweight modal form for opening a new support ticket.
 */

"use client";

import { useState } from "react";

import Modal from "@/components/ui/primitives/Modal";
import type {
  CreateTicketInput,
  TicketCategory,
  TicketPriority,
} from "../types/support.types";

export interface NewTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: CreateTicketInput) => Promise<void> | void;
  isSubmitting?: boolean;
}

const categories: TicketCategory[] = [
  "general",
  "order_dispute",
  "payment_issue",
  "product_complaint",
  "delivery_problem",
  "refund_request",
];

const priorities: TicketPriority[] = ["low", "medium", "high", "urgent"];

export function NewTicketModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
}: NewTicketModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<TicketCategory>("general");
  const [priority, setPriority] = useState<TicketPriority>("medium");

  return (
    <Modal isOpen={isOpen}>
      <div className="w-[min(92vw,36rem)] p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-[#141414]">Open a support ticket</h3>
            <p className="mt-1 text-sm text-black/60">
              Give the team enough context to respond quickly.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-black/50 transition hover:text-black"
          >
            Close
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Short summary"
            className="w-full rounded-lg border border-black/10 px-4 py-3 text-sm outline-none transition focus:border-[#FDA600]"
          />
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={5}
            placeholder="Describe the issue"
            className="w-full resize-none rounded-lg border border-black/10 px-4 py-3 text-sm outline-none transition focus:border-[#FDA600]"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value as TicketCategory)}
              className="rounded-lg border border-black/10 px-4 py-3 text-sm outline-none transition focus:border-[#FDA600]"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <select
              value={priority}
              onChange={(event) => setPriority(event.target.value as TicketPriority)}
              className="rounded-lg border border-black/10 px-4 py-3 text-sm outline-none transition focus:border-[#FDA600]"
            >
              {priorities.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-[#141414]"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isSubmitting || title.trim().length < 5 || description.trim().length < 10}
            onClick={async () => {
              await onSubmit({
                title: title.trim(),
                description: description.trim(),
                category,
                priority,
              });
              setTitle("");
              setDescription("");
              setCategory("general");
              setPriority("medium");
              onClose();
            }}
            className="rounded-full bg-[#FDA600] px-4 py-2 text-sm font-semibold text-[#141414] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Create ticket
          </button>
        </div>
      </div>
    </Modal>
  );
}
