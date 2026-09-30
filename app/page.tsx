import { HomeStudio } from "@/components/home-studio";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { heroParallaxProducts } from "@/lib/universes";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <HomeStudio products={heroParallaxProducts()} />
      <SiteFooter />
    </>
  );
}
