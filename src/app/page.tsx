import Nav from "@/components/Nav";
import Home from "@/components/Home";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Page() {
  return (
    <>
      <ScrollReveal />
      <Nav />
      <main>
        <Home />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
