import { Hero } from "@/components/sections/hero/hero";
import { Stats } from "@/components/sections/stats/stats";
import { About } from "@/components/sections/about/about";
import { Projects } from "@/components/sections/projects/projects";
import { Skills } from "@/components/sections/skills/skills";
import { Experience } from "@/components/sections/experience/experience";
import { Testimonials } from "@/components/sections/testimonials/testimonials";
import { Contact } from "@/components/sections/contact/contact";
import { Footer } from "@/components/layout/footer";
import { PersonJsonLd } from "@/components/seo/person-jsonld";

export default function Home() {
  return (
    <>
      <PersonJsonLd />
      <Hero />
      <Stats />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
