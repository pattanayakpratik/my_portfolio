import Nav from "@/components/Nav";
import Home from "@/components/Home";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import CommandMenu from "@/components/CommandMenu";
import Toast from "@/components/Toast";

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <ScrollReveal />
      <CommandMenu />
      <Nav />
      <main>
        <Home />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <Toast />
    </>
  );
}
