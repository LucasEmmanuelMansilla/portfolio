import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <div className="relative z-10">
      <Nav />
      <main>
        <Hero />
        <About />
        <Stats />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
    </div>
  );
}
