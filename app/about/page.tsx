import type { Metadata } from "next";
import { InquiryCta } from "@/components/inquiry-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "About",
  description: "Meet Endlls Studio and the thinking behind our brand, digital, and campaign work.",
};

export default function AboutPage() {
  return (
    <>
      <div className="page-frame">
        <SiteHeader />
        <main className="about-page">
          <header className="page-intro about-intro">
            <p className="eyebrow">About Endlls</p>
            <h1>A small studio for ambitious ideas.</h1>
            <p>
              We help forward-thinking people find the clearest, most memorable expression of what
              they are building.
            </p>
          </header>
          <section className="about-image" aria-label="Studio philosophy">
            <div className="about-image-art" />
            <p>
              Endlls is built on a simple belief: creativity is not a finish line. It is a way of
              looking closer, asking better questions, and finding possibility where others stop.
            </p>
          </section>
          <section className="about-capabilities">
            <p className="eyebrow">Capabilities</p>
            <div className="capability-list">
              <article>
                <span>01</span>
                <h2>Brand</h2>
                <p>Strategy, positioning, identity systems, verbal direction, and launch.</p>
              </article>
              <article>
                <span>02</span>
                <h2>Digital</h2>
                <p>Websites, products, editorial platforms, and thoughtful interactive systems.</p>
              </article>
              <article>
                <span>03</span>
                <h2>Campaign</h2>
                <p>Concepts, art direction, motion language, and ideas made to travel.</p>
              </article>
            </div>
          </section>
          <section className="about-process">
            <p className="eyebrow light">Our process</p>
            <ol>
              <li>
                <span>01</span>
                <h2>Discover</h2>
                <p>We listen, research, and uncover the question underneath the brief.</p>
              </li>
              <li>
                <span>02</span>
                <h2>Shape</h2>
                <p>We turn insight into a strong creative direction and a system with range.</p>
              </li>
              <li>
                <span>03</span>
                <h2>Deliver</h2>
                <p>We make it real with precision, then set it up to keep moving without us.</p>
              </li>
            </ol>
          </section>
        </main>
      </div>
      <InquiryCta />
      <SiteFooter />
    </>
  );
}
