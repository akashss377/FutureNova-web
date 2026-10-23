import { useState } from "react";
import Button from "./Button";
import { company, cities, services } from "../data/siteData";

const SERVICE_KIND = {
  "sofa-shampoo": "sofa",
  "upholstery-cleaning": "sofa",
  "water-tank": "tank",
  "deep-clean": "deep",
  "solar-panel": "solar",
};

const emptyForm = {
  name: "",
  phone: "",
  address: "",
  city: "",
  service: "",
  date: "",
  message: "",
  seats: "",
  sofaCount: "1",
  tankCapacity: "",
  bhk: "",
  area: "",
  floors: "",
  solarCapacity: "",
};

const isWholeNumber = (value, max) =>
  /^\d+$/.test(String(value).trim()) &&
  Number(value) >= 1 &&
  Number(value) <= max;

const isPositiveNumber = (value, max) => {
  const number = Number(String(value).trim());

  return (
    String(value).trim() !== "" &&
    Number.isFinite(number) &&
    number > 0 &&
    number <= max
  );
};

function Field({ id, label, required, error, hint, children }) {
  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {required && (
          <span className="req" aria-hidden="true">
            {" "}*
          </span>
        )}
      </label>

      {children}

      {hint && !error && (
        <span className="field-hint">{hint}</span>
      )}

      {error && (
        <span className="field-error" id={`err-${id}`}>
          {error}
        </span>
      )}
    </div>
  );
}

export default function BookingForm() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [pendingUrl, setPendingUrl] = useState("");

  const selectedService = services.find(
    (service) => service.title === form.service
  );

  const kind = selectedService
    ? SERVICE_KIND[selectedService.id]
    : null;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: undefined,
      }));
    }

    if (status !== "idle") {
      setStatus("idle");
    }
  };

  const validate = () => {
    const found = {};

    if (!form.name.trim()) {
      found.name = "Enter your full name.";
    }

    if (!form.phone.trim()) {
      found.phone = "Enter your mobile number.";
    } else if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
      found.phone =
        "Enter a valid 10-digit Indian mobile number.";
    }

    if (!form.address.trim()) {
      found.address =
        "Enter your complete address or location.";
    }

    if (!form.city) {
      found.city = "Choose your city.";
    }

    if (!form.service) {
      found.service = "Choose a service.";
    }

    if (kind === "sofa") {
      if (!form.seats.trim()) {
        found.seats = "Enter the number of sofa seats.";
      }
    }

    if (kind === "tank" && !form.tankCapacity.trim()) {
      found.tankCapacity =
        "Enter the water tank capacity in litres.";
    }

    if (kind === "deep") {
      if (!form.bhk.trim()) {
        found.bhk = "Enter the BHK details.";
      }

      if (
        form.area.trim() &&
        !isPositiveNumber(form.area, 1000000)
      ) {
        found.area =
          "Enter a valid property area in sq. ft.";
      }

      if (!isWholeNumber(form.floors, 5)) {
        found.floors =
          "Enter the number of floors, from 1 to 5.";
      }
    }

    if (kind === "solar" && !form.solarCapacity.trim()) {
      found.solarCapacity =
        "Enter the solar panel capacity in kW.";
    }

    return found;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const foundErrors = validate();
    setErrors(foundErrors);

    if (Object.keys(foundErrors).length > 0) {
      setStatus("idle");
      return;
    }

    const lines = [
      "*New Cleaning Booking*",
      "",
      `Name: ${form.name.trim()}`,
      `Mobile: ${form.phone.trim()}`,
      `Location: ${form.address.trim()}`,
      `City: ${form.city}`,
      `Service: ${form.service}`,
    ];

    if (kind === "sofa") {
      lines.push(
        "",
        "*Sofa details*",
        `Number of seats: ${form.seats.trim()}`
      );
    }

    if (kind === "tank") {
      lines.push(
        "",
        "*Water tank details*",
        `Water tank capacity: ${form.tankCapacity.trim()}`
      );
    }

    if (kind === "deep") {
      lines.push(
        "",
        "*Property details*",
        `BHK details: ${form.bhk.trim()}`
      );

      if (form.area.trim()) {
        lines.push(`Property area: ${form.area} sq. ft.`);
      }

      lines.push(`Number of floors: ${form.floors}`);
    }

    if (kind === "solar") {
      const capacity = form.solarCapacity.trim();

      lines.push(
        "",
        "*Solar panel details*",
        `Solar panel capacity: ${capacity}${
          /kw/i.test(capacity) ? "" : " kW"
        }`
      );
    }

    if (form.date) {
      lines.push(`Preferred date: ${form.date}`);
    }

    if (form.message.trim()) {
      lines.push(
        `Additional requirements: ${form.message.trim()}`
      );
    }

    const whatsappNumber = String(
      company.whatsappNumber || ""
    ).replace(/\D/g, "");

    if (!whatsappNumber) {
      setErrors({
        form: "WhatsApp contact number is not configured.",
      });
      return;
    }

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      lines.join("\n")
    )}`;

    const opened = window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );

    if (opened) {
      setStatus("sent");
      setForm({ ...emptyForm });
      setErrors({});
    } else {
      setPendingUrl(url);
      setStatus("blocked");
    }
  };

  const err = (key) => errors[key];

  const common = (key) => ({
    id: `f-${key}`,
    name: key,
    value: form[key],
    onChange: handleChange,
    "aria-invalid": err(key) ? "true" : undefined,
    "aria-describedby": err(key)
      ? `err-f-${key}`
      : undefined,
  });

  return (
    <form
      className="booking-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <h2>Book a cleaning</h2>

      <p>
        Fill in the details and we will confirm on WhatsApp.
        Fields marked <span className="req">*</span> are required.
      </p>

      {err("form") && (
        <p className="field-error" role="alert">
          {err("form")}
        </p>
      )}

      <Field
        id="f-name"
        label="Full name"
        required
        error={err("name")}
      >
        <input
          {...common("name")}
          autoComplete="name"
          placeholder="Enter your full name"
        />
      </Field>

      <Field
        id="f-phone"
        label="Mobile Phone Number"
        required
        error={err("phone")}
        hint="Enter your 10-digit Indian mobile number."
      >
        <input
          {...common("phone")}
          type="tel"
          inputMode="numeric"
          maxLength={10}
          autoComplete="tel-national"
          placeholder="Enter your mobile number"
        />
      </Field>

      <Field
        id="f-address"
        label="Share Your Full Address"
        required
        error={err("address")}
      >
        <input
          {...common("address")}
          autoComplete="street-address"
          placeholder="Enter your complete address or location"
        />
      </Field>

      <div className="row g-3">
        <div className="col-sm-6">
          <Field
            id="f-city"
            label="City"
            required
            error={err("city")}
          >
            <select {...common("city")}>
              <option value="">Select city</option>

              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="col-sm-6">
          <Field
            id="f-service"
            label="Service type"
            required
            error={err("service")}
          >
            <select {...common("service")}>
              <option value="">Select service</option>

              {services.map((service) => (
                <option
                  key={service.id}
                  value={service.title}
                >
                  {service.title}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </div>

      {kind === "sofa" && (
        <div className="service-fields" key="sofa">
          <h3>Sofa details</h3>

          <Field
            id="f-seats"
            label="Number of sofa seats"
            required
            error={err("seats")}
            hint="Enter a value such as 3-seater, 5-seater or 7-seater."
          >
            <input
              {...common("seats")}
              type="text"
              placeholder="e.g. 3-seater, 5-seater"
            />
          </Field>
        </div>
      )}

      {kind === "tank" && (
        <div className="service-fields" key="tank">
          <h3>Water tank details</h3>

          <Field
            id="f-tankCapacity"
            label="Water Tank Capacity (Litres)"
            required
            error={err("tankCapacity")}
            hint="Enter the capacity of the tank in litres."
          >
            <input
              {...common("tankCapacity")}
              type="text"
              placeholder="e.g. 500 litres, 1000 litres, 2000 litres"
            />
          </Field>
        </div>
      )}

      {kind === "solar" && (
        <div className="service-fields" key="solar">
          <h3>Solar panel details</h3>

          <Field
            id="f-solarCapacity"
            label="Solar Panel Capacity (kW)"
            required
            error={err("solarCapacity")}
            hint="Enter the system capacity in kW."
          >
            <input
              {...common("solarCapacity")}
              type="text"
              placeholder="e.g. 3 kW, 5 kW, 10 kW or custom value"
            />
          </Field>
        </div>
      )}

      {kind === "deep" && (
        <div className="service-fields" key="deep">
          <h3>Property details</h3>

          <div className="row g-3">
            <div className="col-sm-6">
              <Field
                id="f-bhk"
                label="BHK details"
                required
                error={err("bhk")}
              >
                <input
                  {...common("bhk")}
                  type="text"
                  placeholder="e.g. 1 BHK, 2 BHK, 3 BHK or custom details"
                />
              </Field>
            </div>

            <div className="col-sm-6">
              <Field
                id="f-floors"
                label="How Many Floors?"
                required
                error={err("floors")}
              >
                <input
                  {...common("floors")}
                  type="number"
                  min="1"
                  max="5"
                  step="1"
                  placeholder="Enter total number of floors"
                />
              </Field>
            </div>

            <div className="col-12">
              <Field
                id="f-area"
                label="sq.ft Area (optional)"
                error={err("area")}
              >
                <input
                  {...common("area")}
                  type="number"
                  min="1"
                  step="any"
                  placeholder="Enter area in sq. ft."
                />
              </Field>
            </div>
          </div>
        </div>
      )}

      <div className="field">
        <label htmlFor="f-date">
          Preferred date (optional)
        </label>

        <input
          id="f-date"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
        />
      </div>

      <div className="field">
        <label htmlFor="f-message">
          Additional requirements (optional)
        </label>

        <textarea
          id="f-message"
          name="message"
          rows="3"
          value={form.message}
          onChange={handleChange}
          placeholder="Any special cleaning instructions or details we should know"
        />
      </div>

      <Button type="submit">
        Send booking on WhatsApp
      </Button>

      {status === "sent" && (
        <p className="form-success" role="status">
          WhatsApp has opened with your details. Press send there
          and we will reply soon.
        </p>
      )}

      {status === "blocked" && (
        <p className="field-error form-blocked" role="alert">
          Your browser blocked WhatsApp from opening.{" "}
          <a
            href={pendingUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open WhatsApp with my booking
          </a>
        </p>
      )}
    </form>
  );
}