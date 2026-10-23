import Icon from "./Icon";
import { company, cities, services, navLinks } from "../data/siteData";

export default function Footer() {
  const whatsappUrl = `https://wa.me/${company.whatsappNumber}`;
  const mailUrl = company.email ? `mailto:${company.email}` : null;

  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="row g-4 g-lg-5">
          <div className="col-lg-3">
            <img className="footer-logo" src="/futurenova-logo.jpeg" alt="FutureNova Cleaning Services logo" loading="lazy" />
            <p className="footer-tagline">{company.tagline}</p>

            <ul className="footer-icons" aria-label="Contact FutureNova">
              {/* <li>
                <a className="footer-icon footer-icon-instagram" href={company.instagram} target="_blank" rel="noreferrer" aria-label="FutureNova on Instagram" title="Instagram">
                  <Icon name="instagram" size={22} />
                </a>
              </li>
              <li>
                <a className="footer-icon footer-icon-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Chat with FutureNova on WhatsApp" title="WhatsApp">
                  <Icon name="whatsapp" size={22} />
                </a>
              </li>
              <li>
                <a className="footer-icon footer-icon-phone" href={`tel:${company.phones[0]}`} aria-label={`Call FutureNova on ${company.phones[0]}`} title="Call us">
                  <Icon name="phone" size={22} />
                </a>
              </li> */}
              {mailUrl && (
                <li>
                  <a className="footer-icon footer-icon-mail" href={mailUrl} aria-label={`Email FutureNova at ${company.email}`} title="Email">
                    <Icon name="mail" size={22} />
                  </a>
                </li>
              )}
            </ul>
          </div>

          <nav className="col-6 col-lg-2" aria-label="Footer navigation">
            <h4>Quick links</h4>
            <ul className="footer-links">
              {navLinks.map(([href, label]) => (
                <li key={href}><a href={href}>{label}</a></li>
              ))}
            </ul>
          </nav>

          <div className="col-6 col-lg-3">
            <h4>Our services</h4>
            <ul className="footer-links">
              {services.map((service) => (
                <li key={service.id}><a href="#services">{service.title}</a></li>
              ))}
            </ul>
          </div>

          <div className="col-lg-4">
            <h4>Get in touch</h4>
            <ul className="footer-contact">
              {company.phones.map((phone) => (
                <li key={phone}>
                  <a href={`tel:${phone}`}><span className="fc-icon fc-phone"><Icon name="phone" size={16} /></span>{phone}</a>
                </li>
              ))}
              <li>
                <a href={whatsappUrl} target="_blank" rel="noreferrer"><span className="fc-icon fc-whatsapp"><Icon name="whatsapp" size={16} /></span>Chat on WhatsApp</a>
              </li>
              <li>
                <a href={company.instagram} target="_blank" rel="noreferrer"><span className="fc-icon fc-instagram"><Icon name="instagram" size={16} /></span>@futurenovacleaningservices</a>
              </li>
              {mailUrl && (
                <li>
                  <a href={mailUrl}><span className="fc-icon fc-mail"><Icon name="mail" size={16} /></span>{company.email}</a>
                </li>
              )}
              <li className="footer-cities"><span className="fc-icon fc-pin"><Icon name="pin" size={16} /></span>{cities.join(", ")}</li>
            </ul>
            <a className="btn-fn btn-fn-primary footer-cta" href="#contact">Book a cleaning</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
  <div className="container footer-bottom-inner">
    <p>
      &copy; {new Date().getFullYear()} {company.fullName}. All rights reserved.
    </p>

    <a className="footer-top-link" href="#home">
      Back to top <Icon name="arrow" size={16} />
    </a>
  </div>

  <div className="footer-credit">
    <p>
      Designed &amp; Developed by{" "}
      <a
        href="https://www.linkedin.com/in/akash-ss-4a4682352/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit Akash's LinkedIn profile"
      >
        Akash S S
      </a>
    </p>
  </div>
</div>
    </footer>
  );
}
