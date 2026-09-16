import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { VisitorProvider } from "@/context/VisitorContext";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { Projects } from "@/sections/Projects";
import { Experience } from "@/sections/Experience";
import { TechStack } from "@/sections/TechStack";
import { GithubActivity } from "@/sections/GithubActivity";
import { SectionDivider, PageShell } from "@/components/Layout";
import { Konami } from "@/components/konami";
import { Analytics } from "@vercel/analytics/react";
import { motion } from "framer-motion";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const t = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function FadeSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Home scroll order:
 * Home → About → Projects → Timeline → Tech Stack → GitHub → Contact → Footer
 */
function MainLayout() {
  return (
    <>
      <Hero />
      <SectionDivider />
      <FadeSection>
        <About />
      </FadeSection>
      <SectionDivider />
      <FadeSection>
        <Projects isSearchable={false} />
      </FadeSection>
      <SectionDivider />
      <FadeSection>
        <Experience />
      </FadeSection>
      <SectionDivider />
      <FadeSection>
        <TechStack />
      </FadeSection>
      <SectionDivider />
      <FadeSection>
        <GithubActivity />
      </FadeSection>
      <SectionDivider />
      <FadeSection>
        <Contact />
      </FadeSection>
    </>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <VisitorProvider>
        <BrowserRouter>
          <Analytics />
          <ScrollToTop />
          <Konami />
          <div className="relative flex min-h-screen flex-col bg-[var(--bg)] font-sans text-[var(--fg)] antialiased transition-colors duration-300">
            <Nav />
            <main className="relative z-10 flex-1">
              <Routes>
                <Route path="/" element={<MainLayout />} />
                <Route
                  path="/about"
                  element={
                    <PageShell>
                      <About />
                    </PageShell>
                  }
                />
                <Route
                  path="/projects"
                  element={
                    <PageShell>
                      <Projects isSearchable={false} />
                    </PageShell>
                  }
                />
                <Route
                  path="/experience"
                  element={
                    <PageShell>
                      <Experience />
                    </PageShell>
                  }
                />
                <Route
                  path="/tech"
                  element={
                    <PageShell>
                      <TechStack />
                    </PageShell>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <PageShell>
                      <Contact />
                    </PageShell>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </VisitorProvider>
    </ThemeProvider>
  );
}

export default App;
