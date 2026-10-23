import { useState } from "react";
import Icon from "./Icon";
import { company, navLinks } from "../data/siteData";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container nav-inner">
        <a
          href="#home"
          className="brand"
          onClick={close}
          aria-label="Future Nova Cleaning Service, home"
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

        <nav
          className={`nav-links ${open ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          {navLinks.map(([href, label]) => (
            <a key={href} href={href} onClick={close}>
              {label}
            </a>
          ))}

          <div className="nav-cta-mobile">
            {/* <a
              className="btn-fn btn-fn-primary"
              href="#contact"
              onClick={close}
            >
              Book a cleaning
            </a> */}
          </div>
        </nav>

        <div className="nav-actions">
          <a className="nav-phone" href={`tel:${company.phones[0]}`}>
            <Icon name="phone" size={18} /> {company.phones[0]}
          </a>

          <a className="btn-fn btn-fn-primary" href="#contact">
            Book now
          </a>
        </div>

        <button
          className="nav-toggle"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <Icon name={open ? "close" : "menu"} size={26} />
        </button>
      </div>
    </header>
  );
}