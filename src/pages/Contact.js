import Icon from "../components/Icon";
import Reveal from "../components/Reveal";
import BookingForm from "../components/BookingForm";
import "../contact-premium.css";
import { company, cities } from "../data/siteData";

// Water-inspired decoration: pure CSS, transform/opacity only, hidden from assistive tech.
// const droplets = [
//   { left: 8, size: 10, dur: 9, delay: 0 },
//   { left: 22, size: 7, dur: 11, delay: 3 },
//   { left: 38, size: 12, dur: 10, delay: 6 },
//   { left: 57, size: 8, dur: 12, delay: 2 },
//   { left: 73, size: 11, dur: 9, delay: 5 },
//   { left: 90, size: 7, dur: 13, delay: 8 },
// ];

// const WAVE_PATH = "M0,40 C240,10 480,70 720,40 C960,10 1200,70 1440,40 C1680,10 1920,70 2160,40 C2400,10 2640,70 2880,40 L2880,80 L0,80 Z";

export default function Contact() {
  const whatsappUrl = `https://wa.me/${company.whatsappNumber}`;

  return (
    <section className="contact-premium" id="contact">
      
      <div className="ct-body">
        <div className="container">
          <div className="row g-4 g-lg-5">
            <Reveal className="col-lg-7">
              <BookingForm />
            </Reveal>

            <Reveal className="col-lg-5" delay={150}>
              <aside className="ct-info" aria-label="Contact details">
                <h3>Talk to us directly</h3>
                <p className="ct-info-sub">Prefer a call or a chat? Reach us any of these ways.</p>

                <ul className="ct-cards">
                  {company.phones.map((phone) => (
                    <li key={phone}>
                      <a className="ct-card ct-card-phone" href={`tel:${phone}`}>
                        <span className="ct-card-icon"><Icon name="phone" size={22} /></span>
                        <span className="ct-card-text"><small>Call us</small><strong>{phone}</strong></span>
                        <Icon name="arrow" size={18} />
                      </a>
                    </li>
                  ))}
                  <li>
                    <a className="ct-card ct-card-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">
                      <span className="ct-card-icon"><Icon name="whatsapp" size={22} /></span>
                      <span className="ct-card-text"><small>WhatsApp</small><strong>Chat on WhatsApp</strong></span>
                      <Icon name="arrow" size={18} />
                    </a>
                  </li>
                  <li>
                    <a className="ct-card ct-card-instagram" href={company.instagram} target="_blank" rel="noreferrer">
                      <span className="ct-card-icon"><Icon name="instagram" size={22} /></span>
                      <span className="ct-card-text"><small>Instagram</small><strong>@futurenovacleaningservices</strong></span>
                      <Icon name="arrow" size={18} />
                    </a>
                  </li>
                  {company.email && (
                    <li>
                      <a className="ct-card ct-card-mail" href={`mailto:${company.email}`}>
                        <span className="ct-card-icon"><Icon name="mail" size={22} /></span>
                        <span className="ct-card-text"><small>Email</small><strong>{company.email}</strong></span>
                        <Icon name="arrow" size={18} />
                      </a>
                    </li>
                  )}
                </ul>

                <div className="ct-areas">
                  <h4><Icon name="pin" size={18} /> Where we work</h4>
                  <div className="city-row">
                    {cities.map((city) => <span className="city-chip" key={city}>{city}</span>)}
                  </div>
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
