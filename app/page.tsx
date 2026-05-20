import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import Experience from "./components/Experience";
import FeaturedTech from "./components/FeaturedTech";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Contact from "./components/Contact";
import ChatWidget from "./components/chat/ChatWidget";

export default function Home() {
  return (
    <>
      <div className="relative z-10">
        <Nav />
        <main>
          <Hero />
          <About />
          <Stats />
          <Experience />
          <FeaturedTech />
          <Skills />
          <Education />
          <Contact />
        </main>
      </div>
      <ChatWidget />
    </>
  );
}
