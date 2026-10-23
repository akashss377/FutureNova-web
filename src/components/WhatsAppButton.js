import Icon from "./Icon";
import { company } from "../data/siteData";

// Floating chat button shown on every page.
export default function WhatsAppButton() {
  const url = `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(
    "Hi FutureNova, I would like a cleaning quote."
  )}`;
  return (
    <a className="whatsapp-float" href={url} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
      <Icon name="whatsapp" size={28} />
    </a>
  );
}
