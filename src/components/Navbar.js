
import { useState } from "react";
import Icon from "./Icon";
import { company, navLinks } from "../data/siteData";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className="site-header luxury-header">
      <div className="container nav-inner">
        <a
          href="#home"
          className="brand"
          onClick={close}
          aria-label="Future Nova home"
        >
          <img
            className="brand-logo"
            src="/futurenova-logo.jpeg"
            alt=""
          />
          <span className="brand-text">
            <span className="brand-title">Future Nova</span>
            <span className="brand-subtitle">Cleaning Service</span>
          </span>
        </a>

        {/* Desktop navigation */}
        <nav className="desktop-nav" aria-label="Desktop navigation">
          {navLinks.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="nav-actions">
          <a className="nav-phone" href={`tel:${company.phones[0]}`}>
            <Icon name="phone" size={18} />
            {company.phones[0]}
          </a>
          <a className="btn-fn btn-fn-primary" href="#contact">
            Book now
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className={`luxury-toggle ${open ? "active" : ""}`}
          onClick={() => setOpen((previous) => !previous)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span className="luxury-toggle-label">
            {open ? "CLOSE" : "MENU"}
          </span>
          <span className="luxury-toggle-circle">
            <span />
            <span />
          </span>
        </button>
      </div>

      {/* Mobile navigation */}
      <nav
  className={`luxury-links ${open ? "is-open" : ""}`}
  aria-label="Mobile navigation"
  aria-hidden={!open}
  inert={!open}
>
  <div className="luxury-menu-inner">
    <div className="luxury-menu-items">
      {navLinks.map(([href, label], index) => (
        <a
          key={href}
          href={href}
          onClick={close}
          className="luxury-menu-link"
          style={{ "--lux-index": index }}
        >
          <span className="luxury-number">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="luxury-link-text">{label}</span>
          <span className="luxury-arrow">↗</span>
        </a>
      ))}
    </div>
  </div>
</nav>
    </header>
  );
}
