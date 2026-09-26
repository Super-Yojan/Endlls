import Link from "next/link";

export function InquiryCta() {
  return (
    <section className="inquiry-cta" aria-labelledby="inquiry-heading">
      <p className="eyebrow light">Have a project in mind?</p>
      <h2 id="inquiry-heading">Let&apos;s make something worth remembering.</h2>
      <Link className="large-text-link" href="/contact">
        Start a project <span aria-hidden="true" />
      </Link>
    </section>
  );
}
