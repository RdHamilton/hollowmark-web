import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Stats from "./components/Stats";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Features />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
