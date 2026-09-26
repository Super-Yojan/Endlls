"use client";

import { FormEvent, KeyboardEvent, useState } from "react";

type Fields = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const emptyFields: Fields = {
  name: "",
  email: "",
  company: "",
  projectType: "Brand identity",
  budget: "",
  message: "",
};

function validate(fields: Fields): Errors {
  const errors: Errors = {};
  if (!fields.name.trim()) errors.name = "Please enter your name.";
  if (!fields.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!fields.message.trim()) errors.message = "Please tell us a little about the project.";
  return errors;
}

export function buildInquiryLink(fields: Fields) {
  const subject = `Project inquiry from ${fields.name}${fields.company ? ` — ${fields.company}` : ""}`;
  const body = [
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    fields.company ? `Company: ${fields.company}` : null,
    `Project type: ${fields.projectType}`,
    fields.budget ? `Budget: ${fields.budget}` : null,
    "",
    fields.message,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
  return `mailto:hello@endlls.studio?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm({ onSend }: { onSend?: (href: string) => void }) {
  const [fields, setFields] = useState(emptyFields);
  const [errors, setErrors] = useState<Errors>({});

  const update = (field: keyof Fields, value: string) => {
    setFields((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const href = buildInquiryLink(fields);
    if (onSend) onSend(href);
    else window.location.href = href;
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter" && event.target instanceof HTMLInputElement) {
      event.preventDefault();
      event.currentTarget.requestSubmit();
    }
  };

  return (
    <form className="contact-form" aria-label="Project inquiry" onSubmit={submit} onKeyDown={handleKeyDown} noValidate>
      <div className="field-row">
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            value={fields.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            autoComplete="name"
          />
          {errors.name ? <p id="name-error">{errors.name}</p> : null}
        </div>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={fields.email}
            onChange={(event) => update("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            autoComplete="email"
          />
          {errors.email ? <p id="email-error">{errors.email}</p> : null}
        </div>
      </div>
      <div className="field-row">
        <div className="form-field">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            name="company"
            value={fields.company}
            onChange={(event) => update("company", event.target.value)}
            autoComplete="organization"
          />
        </div>
        <div className="form-field">
          <label htmlFor="projectType">Project type</label>
          <select
            id="projectType"
            name="projectType"
            value={fields.projectType}
            onChange={(event) => update("projectType", event.target.value)}
          >
            <option>Brand identity</option>
            <option>Digital experience</option>
            <option>Campaign</option>
            <option>Creative direction</option>
            <option>Something else</option>
          </select>
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="budget">Estimated budget</label>
        <select
          id="budget"
          name="budget"
          value={fields.budget}
          onChange={(event) => update("budget", event.target.value)}
        >
          <option value="">Select a range</option>
          <option>$5k–$15k</option>
          <option>$15k–$35k</option>
          <option>$35k–$75k</option>
          <option>$75k+</option>
        </select>
      </div>
      <div className="form-field">
        <label htmlFor="message">Tell us about the project</label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={fields.message}
          onChange={(event) => update("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message ? <p id="message-error">{errors.message}</p> : null}
      </div>
      <button className="submit-button" type="submit">
        Send inquiry <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}
