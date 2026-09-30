import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="studio-footer">
      <p className="studio-footer-quote">Creativity never ends.</p>
      <div className="studio-footer-grid">
        <div>
          <p>Location</p>
          <strong>Worldwide</strong>
          <span>Independent studio, available wherever the work is.</span>
        </div>
        <div>
          <p>Contact</p>
          <strong>
            <a href="mailto:hello@endlls.studio">hello@endlls.studio</a>
          </strong>
          <span>New universes, collaborations, and questions.</span>
        </div>
        <div>
          <p>Socials</p>
          <strong>
            <Link href="/work">Work</Link>
            <Link href="/about">Studio</Link>
            <Link href="/contact">Contact</Link>
          </strong>
          <span>The public rooms of the multiverse.</span>
        </div>
      </div>
      <div className="studio-footer-bar">
        <span>© {new Date().getFullYear()} Endlls</span>
        <span>Creativity never ends</span>
      </div>
    </footer>
  );
}
