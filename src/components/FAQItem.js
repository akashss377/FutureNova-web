import { useState } from "react";
import Icon from "./Icon";

export default function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? "is-open" : ""}`}>
      <button onClick={() => setOpen(!open)} aria-expanded={open}>
        {question}
        <Icon name="chevron" size={20} />
      </button>
      {open && <p>{answer}</p>}
    </div>
  );
}
