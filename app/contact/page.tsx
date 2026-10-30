import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { SitePage } from "@/components/site-chrome";
import { studioEmail } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a brand, film, event, website or app project with Endlls Studio.",
};

export default function ContactPage() {
  return (
    <SitePage
      current="contact"
      talk={
        <div className="grid">
          <div className="col">
            <p className="lead">
              Tell us what you are launching, who it is for and your budget. We reply within two working days{" "}
              <span aria-hidden="true">↘</span>
            </p>
            <div className="hr" />
            <p className="s13 dim">Prefer email?</p>
            <a className="mail" id="email" href={`mailto:${studioEmail}`}>{studioEmail}</a>
            <button className="copy" type="button" id="copy">Copy email</button>
            <span id="copy-msg" className="s13 dim" aria-live="polite" />
          </div>
          <div className="col">
            <ContactForm />
          </div>
        </div>
      }
    />
  );
}
