import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Image src="/brand/logo.png" alt="Endlls Studio" width={373} height={238} />
        <p>Creativity Never Ends</p>
      </div>
      <nav aria-label="Footer">
        <Link href="/work">Work</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>
      <p className="footer-note">
        Independent creative studio
        <br />
        Available worldwide
      </p>
      <p className="footer-copyright">© {new Date().getFullYear()} ENDLLS</p>
    </footer>
  );
}
