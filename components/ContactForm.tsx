"use client";

import { useState } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { enquiryMessage, whatsappHref } from "@/lib/whatsapp";

export function ContactForm() {
  const [details, setDetails] = useState("");
  const href = whatsappHref(enquiryMessage(details));

  return (
    <form
      className="rounded-[1.8rem] border border-line bg-paper p-5 sm:p-7"
      onSubmit={(event) => {
        event.preventDefault();
        window.open(href, "_blank", "noopener,noreferrer");
      }}
    >
      <label className="block text-sm">
        <span className="font-medium">What are you looking for?</span>
        <textarea
          value={details}
          onChange={(event) => setDetails(event.target.value)}
          rows={6}
          placeholder="Occasion, names, colours, or a gift you have in mind"
          className="mt-2 w-full resize-none rounded-2xl border border-line bg-ivory px-4 py-3 text-sm outline-none"
        />
      </label>
      <button
        type="submit"
        className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-5 text-sm font-medium text-white transition hover:bg-[#116848] sm:w-auto"
      >
        <WhatsAppIcon className="h-4 w-4" />
        Chat on WhatsApp
      </button>
    </form>
  );
}
