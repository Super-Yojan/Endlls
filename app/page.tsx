import Link from "next/link";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { InquiryCta } from "@/components/inquiry-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { heroParallaxProducts } from "@/lib/universes";

export default function HomePage() {
  return (
    <>
      <div className="page-frame">
        <SiteHeader />
      </div>
      <main>
        <HeroParallax products={heroParallaxProducts()} />
        <div className="page-frame">
          <section className="studio-statement">
            <p className="eyebrow light">Endlls Studio</p>
            <div className="statement-grid">
              <h2>A small studio for ambitious ideas.</h2>
              <div>
                <p>
                  We partner with forward-thinking teams to turn good questions into clear,
                  meaningful creative work.
                </p>
                <Link className="text-link text-link-light" href="/about">
                  Meet the studio <span aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>

          <section className="capabilities-process">
            <div className="capabilities">
              <p className="eyebrow">What we do</p>
              <ul>
                <li>Brand strategy</li>
                <li>Identity systems</li>
                <li>Digital experiences</li>
                <li>Campaigns</li>
                <li>Creative direction</li>
              </ul>
            </div>
            <div className="process-preview">
              <p className="eyebrow">How we work</p>
              <ol>
                <li>
                  <span>01</span>
                  <h3>Discover</h3>
                  <p>Listen closely, ask better questions, find the essential idea.</p>
                </li>
                <li>
                  <span>02</span>
                  <h3>Shape</h3>
                  <p>Build a clear direction and give the idea a distinctive form.</p>
                </li>
                <li>
                  <span>03</span>
                  <h3>Deliver</h3>
                  <p>Make it real with care, precision, and room to keep growing.</p>
                </li>
              </ol>
            </div>
          </section>
        </div>
      </main>
      <InquiryCta />
      <SiteFooter />
    </>
  );
}
