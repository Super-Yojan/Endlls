import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a brand, digital, or campaign project with Endlls Studio.",
};

export default function ContactPage() {
  return (
    <>
      <div className="page-frame contact-page-frame">
        <SiteHeader />
        <main className="contact-page">
          <header className="page-intro contact-intro">
            <p className="eyebrow light">Start a project</p>
            <h1>Let&apos;s make something.</h1>
            <div className="contact-direct">
              <p>Prefer email?</p>
              <a href="mailto:hello@endlls.studio">hello@endlls.studio</a>
            </div>
          </header>
          <ContactForm />
        </main>
      </div>
      <SiteFooter />
    </>
  );
}
