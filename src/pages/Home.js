import Icon from "../components/Icon";
import Bubbles from "../components/Bubbles";
import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";
import FAQItem from "../components/FAQItem";
import Contact from "./Contact";
import BeforeAfterGallery from "../components/BeforeAfterGallery";
import PromoSlider from "../components/PromoSlider";
import AboutBackdrop from "../components/AboutBackdrop";
import "../about-premium.css";
import { company, cities, services, steps, whyUs, faqs, promoSlides,  } from "../data/siteData";

// About section photo: public/images/about.jpg (your team photo).
// If that file is ever missing, the section falls back to the photo that was already on the About page.
const ABOUT_IMAGE = "/images/about.jpg";
const ABOUT_IMAGE_FALLBACK = "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=85";

export default function Home() {
  return (
    <>
    <div className="service-marquee">
  <div className="service-marquee-track">
    {[1, 2].map((item) => (
      <div className="service-marquee-content" key={item}>
        {[...services.map((service) => service.title), ...cities].map(
          (item, index) => (
            <span className="service-marquee-item" key={`${item}-${index}`}>
              {item}
              <span className="marquee-star">✦</span>
            </span>
          )
        )}
      </div>
    ))}
  </div>
</div>
{/* Full-width cleaning banner below marquee */}
<div className="home-promo-banner">
  <img
    src="/images/promo/banner-wide.jpg"
    alt="FutureNova Cleaning Services - Complete care for every space"
  />
</div>

     <section className="hero" id="home">
  <Bubbles />
  <div className="container">
    <div className="row align-items-center g-5">
      <div className="col-lg-6">
        <p className="eyebrow rise" style={{ "--i": 0 }}>
          FUTURENOVA CLEANING SERVICES
        </p>

        <h1 className="rise" style={{ "--i": 1 }}>
          A cleaner space. A fresher feeling.
        </h1>

        <p className="lead-text rise" style={{ "--i": 2 }}>
          Professional home, office, upholstery, water tank and solar panel
          cleaning. Tell us what you need and get a quote on WhatsApp.
        </p>

        <div className="button-row rise" style={{ "--i": 3 }}>
          <a className="btn-fn btn-fn-primary" href="#contact">
            Book a cleaning
          </a>

          <a
            className="btn-fn btn-fn-ghost"
            href={`tel:${company.phones[0]}`}
          >
            <Icon name="phone" size={18} /> Call us
          </a>
        </div>

        <ul className="hero-points rise" style={{ "--i": 4 }}>
          <li><Icon name="check" size={18} /> Professional equipment</li>
          <li><Icon name="check" size={18} /> Free quote</li>
          <li><Icon name="check" size={18} /> Convenient booking</li>
        </ul>
      </div>

      <div className="col-lg-6 rise" style={{ "--i": 2 }}>
        <div className="hero-visual">
          <BeforeAfterGallery />
        </div>

      </div>
    </div>
  </div>
</section>
      <section className="section" id="services">
        <div className="container">
          <Reveal><SectionTitle title="Our cleaning services" subtitle="All our services in one place. Choose a service to request a quote." /></Reveal>
          <div className="row g-4">
            {services.map((service, i) => (
              <Reveal className="col-md-6 col-xl-4" delay={Math.min(i * 35, 280)} key={service.id}>
                <article className="service-card service-detail-card">
                  {service.image && (
                    <div className="service-card-image">
                      <img src={service.image} alt={`${service.title} service`} loading="lazy" />
                    </div>
                  )}
                  <span className="icon-tile"><Icon name={service.icon || "sparkles"} size={28}/></span>
                  <h3>{service.title}</h3>
                  <p>{service.short}</p>
                  <div className="service-card-bottom">
                    <strong className="service-price">{service.startingPrice ? `From ₹${service.startingPrice.toLocaleString("en-IN")}` : "Get a quote"}</strong>
                    <a className="btn-fn btn-fn-primary" href={`#contact`} onClick={() => {}}>Book service</a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="note text-center">Prices shown are starting prices. Final cost may vary based on size, condition and service requirements.</p>
        </div>
      </section>

      <PromoSlider slides={promoSlides} />

      <section className="promo-banner" aria-label="FutureNova overview">
        <div className="container">
          {/* <img
            src={promoBanner.src}
            alt={promoBanner.alt}
            width={promoBanner.width}
            height={promoBanner.height}
            loading="lazy"
            decoding="async"
          /> */}
        </div>
      </section>

      <section className="section about-premium" id="about">
        <AboutBackdrop />
        <div className="container">
          <div className="ap-grid">
            <Reveal className="ap-text ap-from-left">
              <SectionTitle title="About FutureNova" subtitle="A practical, professional cleaning service for homes and businesses." />
              <p>FutureNova Cleaning Services helps keep your spaces clean, fresh and hygienic with service options for everyday cleaning and specialist deep cleaning. From floors and bathrooms to sofas, water tanks and rooftop solar panels, our team can help you choose the right service for your needs.</p>
              <p>Contact us with your location and cleaning requirements for a quote and appointment confirmation.</p>
            </Reveal>

            <Reveal className="ap-media-wrap ap-from-right" delay={150}>
              <div className="ap-media">
                <span className="ap-ripple ap-ripple-1" aria-hidden="true" />
                <span className="ap-ripple ap-ripple-2" aria-hidden="true" />
                <span className="ap-ripple ap-ripple-3" aria-hidden="true" />
                <div className="ap-float">
                  <span className="ap-plate" aria-hidden="true" />
                  <div className="ap-frame">
                    <div className="ap-photo">
                      <img
                        src={ABOUT_IMAGE}
                        alt="The FutureNova team in blue uniforms standing outside a home"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          if (e.currentTarget.dataset.fallback) return;
                          e.currentTarget.dataset.fallback = "1";
                          e.currentTarget.src = ABOUT_IMAGE_FALLBACK;
                        }}
                      />
                      <span className="ap-glint" aria-hidden="true" />
                    </div>
                  </div>
                  <span className="ap-orb ap-orb-1" aria-hidden="true" />
                  <span className="ap-orb ap-orb-2" aria-hidden="true" />
                  <span className="ap-orb ap-orb-3" aria-hidden="true" />
                  <span className="ap-gem ap-gem-1" aria-hidden="true" />
                  <span className="ap-gem ap-gem-2" aria-hidden="true" />
                </div>
              </div>
            </Reveal>

            <Reveal className="ap-card-wrap" delay={250}>
              <div className="ap-card">
                <span className="icon-tile"><Icon name="shield" size={30}/></span>
                <h3>One team for multiple cleaning needs</h3>
                <p>Residential and commercial cleaning, specialist surface care, and equipment-based cleaning services.</p>
                <div className="city-row">{cities.map(city => <span className="city-chip" key={city}>{city}</span>)}</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" id="how-it-works">
        <div className="container">
          <Reveal><SectionTitle title="How booking works" subtitle="Four simple steps from your first message to a cleaner space." /></Reveal>
          <ol className="steps">{steps.map((step, i) => <Reveal as="li" delay={i * 80} key={step.title}><h3>{step.title}</h3><p>{step.text}</p></Reveal>)}</ol>
        </div>
      </section>

      <section className="section section-tint" id="why-us">
        <div className="container">
          <Reveal><SectionTitle title="Why choose FutureNova?" subtitle="Clear communication and cleaning solutions for different spaces." /></Reveal>
          <div className="row g-4">{whyUs.map((item, i) => <Reveal className="col-sm-6 col-lg-3" delay={i * 80} key={item.title}><div className="why-item"><span className="why-icon"><Icon name={item.icon} size={28}/></span><h3>{item.title}</h3><p>{item.text}</p></div></Reveal>)}</div>
        </div>
      </section>

      <section className="section section-tint" id="faq">
        <div className="container faq-wrap">
          <Reveal><SectionTitle title="Frequently asked questions" subtitle="Need to know something before booking?" center /></Reveal>
          {faqs.map(faq => <FAQItem key={faq.q} question={faq.q} answer={faq.a}/>)}
        </div>
      </section>

      <Contact />
    </>
  );
}
