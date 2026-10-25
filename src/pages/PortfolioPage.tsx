import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Github,
  Home,
  Linkedin,
  MapPin,
  Play,
} from "lucide-react";
import { site, type Project } from "@/config/site";
import { GitHubGraph } from "@/components/github-graph";
import { Icon } from "@iconify/react";
import { getSkillIcon } from "@/lib/skill-icons";

function ProjectActions({ project }: { project: Project }) {
  return (
    <div className="folio-project-actions">
      {project.links.live && (
        <a href={project.links.live} target="_blank" rel="noreferrer">
          Live site <ArrowUpRight size={14} />
        </a>
      )}
      {!project.links.live && project.links.video && (
        <a href={project.links.video} target="_blank" rel="noreferrer">
          Watch preview <Play size={13} fill="currentColor" />
        </a>
      )}
      {project.links.source && (
        <a href={project.links.source} target="_blank" rel="noreferrer">
          Source <Github size={14} />
        </a>
      )}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article
      id={`project-${index + 1}`}
      className={`folio-project-card folio-project-${index + 1}`}
      data-reveal="rise"
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
        event.currentTarget.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
      }}
    >
      <a
        className="folio-project-image"
        href={project.links.live || project.links.video || project.links.source}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${project.title}`}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} preview`}
            loading="lazy"
          />
        ) : (
          <div className="folio-project-placeholder">{project.title}</div>
        )}
        <span className="folio-project-open">
          <ArrowUpRight size={18} />
        </span>
      </a>
      <div className="folio-project-body">
        <div className="folio-project-heading">
          <div>
            <p className="folio-eyebrow">
              {project.year} <span>·</span>{" "}
              {project.stack.slice(0, 2).join(" / ")}
            </p>
            <h3>{project.title}</h3>
          </div>
          <ArrowDownRight className="folio-project-arrow" size={22} />
        </div>
        <p className="folio-project-blurb">{project.blurb}</p>
        <div className="folio-tags">
          {project.stack.slice(0, 5).map((item) => (
            <span key={item}>{item}</span>
          ))}
          {project.stack.length > 5 && <span>+{project.stack.length - 5}</span>}
        </div>
        {project.story && (
          <details className="folio-project-details">
            <summary>How it works</summary>
            <div>
              {project.story.split("\n\n").map((paragraph) => (
                <p key={paragraph}><strong>{paragraph.slice(0, paragraph.indexOf(":"))}:</strong>{paragraph.slice(paragraph.indexOf(":") + 1)}</p>
              ))}
            </div>
          </details>
        )}
        <ProjectActions project={project} />
      </div>
    </article>
  );
}

function Activity() {
  return (
    <section className="folio-section folio-activity" id="activity">
      <div className="folio-section-head" data-reveal="rise">
        <div>
          <p className="folio-eyebrow">Open source &amp; practice</p>
          <h2>Made in public.</h2>
        </div>
        <a
          className="folio-text-link"
          href={site.socials.github}
          target="_blank"
          rel="noreferrer"
        >
          GitHub profile <ArrowUpRight size={15} />
        </a>
      </div>
      <GitHubGraph />
    </section>
  );
}

function highlightCode(code: string) {
  const tokenPattern = /(\"[^\"]*\"|'[^']*'|\b(?:async|await|const|return|function)\b|\b(?:name|role|focus|location|stack|response|contents|text|prompt|history)\b(?=\s*:))/g;
  return code.split(tokenPattern).map((part, index) => {
    if (/^(\"[^\"]*\"|'[^']*')$/.test(part)) return <span className="folio-code-string" key={index}>{part}</span>;
    if (/^(async|await|const|return|function)$/.test(part)) return <span className="folio-code-keyword" key={index}>{part}</span>;
    if (/^(name|role|focus|location|stack|response|contents|text|prompt|history)$/.test(part)) return <span className="folio-code-property" key={index}>{part}</span>;
    return part;
  });
}

function CodeTerminal() {
  const projects = site.projects.map((project) => project.title);
  const snippets = [
    {
      file: "~/sourav/src/config/site.ts",
      code: `const sourav = {
  name: "Sourav",
  role: "Full Stack Developer",
  focus: "MERN Stack",
  location: "Kolkata onsite / remote",
  stack: ["React", "Node.js", "MongoDB"]
};

export default sourav;`,
    },
    {
      file: "~/sourav/src/config/site.ts",
      code: `const projects = [\n${projects.map((title) => `  "${title}",`).join("\n")}\n];`,
    },
  ];
  const [visible, setVisible] = useState(0);
  const [snippetIndex, setSnippetIndex] = useState(0);
  const snippet = snippets[snippetIndex];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(snippet.code.length);
      return;
    }
    let position = 0;
    let timer = 0;
    const typeNext = () => {
      if (position >= snippet.code.length) {
        timer = window.setTimeout(() => {
          position = 0;
          setVisible(0);
          setSnippetIndex((index) => (index + 1) % snippets.length);
          timer = window.setTimeout(typeNext, 500);
        }, 1500);
        return;
      }
      position += 1;
      setVisible(position);
      timer = window.setTimeout(typeNext, 35);
    };
    timer = window.setTimeout(typeNext, 500);
    return () => window.clearTimeout(timer);
  }, [snippetIndex]);

  return (
    <div className="folio-code-window" aria-label="Animated code preview">
      <div className="folio-code-topbar">
        <span className="folio-code-dots"><i /><i /><i /></span>
        <span>{snippet.file}</span>
        <span className="folio-code-live"><i /> LIVE</span>
      </div>
      <pre aria-hidden="true"><code className="folio-code-syntax">{highlightCode(snippet.code.slice(0, visible))}<span className="folio-code-cursor" /></code></pre>
      <div className="folio-code-status"><span>UTF-8</span><span>TypeScript</span><span>⌘ + ENTER</span></div>
      <span className="folio-code-orbit" aria-hidden="true" />
    </div>
  );
}

export function PortfolioPage({ archive = false }: { archive?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuHovered, setMenuHovered] = useState(false);
  const [menuFocused, setMenuFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const hoverArmedRef = useRef(false);
  const menuVisible = menuOpen || menuHovered || menuFocused;
  const projects = archive ? site.projects : site.projects.slice(0, 4);
  const featuredProjects = site.projects.slice(0, 4);
  const moreProjects = site.projects.slice(4);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const observer = new IntersectionObserver(([entry]) => {
      setScrolled(!entry.isIntersecting);
    });
    observer.observe(header);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    hoverArmedRef.current = false;
  }, [scrolled]);
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(".portfolio-v2 [data-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [archive]);

  return (
    <div className="portfolio-v2">
      <header className="folio-header" ref={headerRef}>
        <div className="folio-header-inner">
          <a
            className="folio-wordmark"
            href={archive ? "/" : "#top"}
            aria-label="Sourav home"
          >
            <b>Sourav</b>
          </a>
          <nav className="folio-top-nav" aria-label="Main navigation">
            {[
              ["About", "#about"],
              ["Projects", "#work"],
              ["Timeline", "#experience"],
              ["Tech Stack", "#skills"],
              ["Contact", "#contact"],
            ].map(([label, target]) => (
              <a key={target} href={archive ? `/${target}` : target}>{label}</a>
            ))}
          </nav>
          <a className="folio-resume" href={site.socials.resume} target="_blank" rel="noreferrer">
            Resume <ArrowUpRight size={14} />
          </a>
        </div>
      </header>

      {scrolled && (
        <div
          className={`folio-floating-menu${menuVisible ? " is-open" : ""}`}
          onMouseEnter={() => {
            if (hoverArmedRef.current) setMenuHovered(true);
          }}
          onMouseMove={() => {
            hoverArmedRef.current = true;
            setMenuHovered(true);
          }}
          onMouseLeave={() => {
            hoverArmedRef.current = false;
            setMenuHovered(false);
          }}
          onFocus={() => setMenuFocused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setMenuFocused(false);
          }}
        >
          <div className="folio-menu-top">
            <a
              className="folio-menu-home"
              href={archive ? "/" : "#top"}
              aria-label="Home"
              title="Home"
              onClick={() => setMenuOpen(false)}
            >
              <Home size={19} strokeWidth={1.8} />
            </a>
            <button
              className="folio-menu-toggle"
              type="button"
              aria-label={menuVisible ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuVisible}
              onClick={() => {
                setMenuOpen((open) => !open);
                setMenuHovered(false);
                setMenuFocused(false);
              }}
            >
              <span /><span /><span />
            </button>
          </div>
          <nav aria-label="Quick navigation">
            {[
              ["About", "#about"],
              ["Projects", "#work"],
              ["Timeline", "#experience"],
              ["Tech Stack", "#skills"],
              ["Contact", "#contact"],
            ].map(([label, target]) => (
              <a key={target} href={archive ? `/${target}` : target} onClick={() => setMenuOpen(false)}>
                {label}<ArrowUpRight size={15} />
              </a>
            ))}
          </nav>
        </div>
      )}

      {archive ? (
        <main className="folio-archive" id="top">
          <div className="folio-archive-top">
            <Link to="/" className="folio-text-link">
              <ArrowDownRight size={15} className="folio-back-arrow" /> Back to
              home
            </Link>
            <p className="folio-eyebrow">Selected work · 2025—26</p>
          </div>
          <div className="folio-section-head folio-archive-title">
            <div>
              <p className="folio-eyebrow">A few things I’ve made</p>
              <h1>
                Projects<span>.</span>
              </h1>
            </div>
            <p>
              Web experiences, useful tools, and small experiments built with
              care.
            </p>
          </div>
          <div className="folio-project-grid folio-archive-grid">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </div>
        </main>
      ) : (
        <main id="top">
          <section className="folio-hero">
            <div className="folio-hero-copy" data-reveal="left">
              <p className="folio-kicker">
                <span /> OPEN TO JUNIOR & INTERNSHIP ROLES
              </p>
              <h1>
                I make the
                <br />
                web <em>work</em>
                <br />
                for people<span className="folio-period">.</span>
              </h1>
              <div className="folio-hero-foot">
                <p>
                  Full-stack web developer building thoughtful products with
                  MERN & PERN Stack
                </p>
                <a className="folio-hero-cta" href="#work">
                  Explore my work <ArrowDown size={15} />
                </a>
              </div>
              <div className="folio-location">
                <MapPin size={14} /> Kolkata, India <span>·</span> Onsite in
                Kolkata or remote
              </div>
            </div>
            <div data-reveal="right" className="folio-hero-terminal"><CodeTerminal /></div>


          </section>

          <section className="folio-intro-band" id="about" data-reveal="rise">
            <div className="folio-intro-label">
              <p>
                A little
                <br />
                about me
              </p>
            </div>
            <div className="folio-intro-copy">
              <p className="folio-intro-lead">{site.about[0]}</p>
              <div className="folio-intro-sub">
                {site.about.slice(1).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="folio-facts">
                {site.tldr.map((fact) => (
                  <span key={fact}>
                    <i />
                    {fact}
                  </span>
                ))}
              </div>
            </div>
            <aside className="folio-years">
              <strong>
                3.5<sup>+</sup>
              </strong>
              <span>
                years learning
                <br />
                by building
              </span>
              <div className="folio-now">
                <b>Currently</b>
                <span>Building · {site.status.nowBuilding}</span>
                <span>Learning · {site.status.nowLearning}</span>
              </div>
            </aside>
          </section>

          <section className="folio-section folio-work" id="work">
            <div className="folio-section-head" data-reveal="rise">
              <div>
                <p className="folio-eyebrow">Selected work</p>
                <h2>
                  Things I’ve
                  <br className="folio-mobile-break" /> put into the world
                  <span>.</span>
                </h2>
              </div>
              <p>
                From useful everyday apps to playful interactive experiences.
                Each project starts with a real problem or a question worth
                exploring.
              </p>
            </div>
            <div className="folio-project-grid">
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                />
              ))}
            </div>
            <div className="folio-more-work">
              <div>
                <p className="folio-eyebrow">More experiments</p>
                <h3>There’s more where that came from.</h3>
              </div>
              <div className="folio-more-list">
                {moreProjects.map((project, i) => (
                  <div className="folio-more-row" key={project.title}>
                    <Link to={`/all-projects#project-${i + 5}`}>
                      {project.title}
                      <ArrowUpRight size={16} />
                    </Link>
                    <span>{project.year}</span>
                  </div>
                ))}
              </div>
              <Link className="folio-outline-button" to="/all-projects">
                Browse all projects <ArrowUpRight size={15} />
              </Link>
            </div>
          </section>

          <section className="folio-experience" id="experience" data-reveal="rise">
            <div className="folio-experience-inner">
              <div className="folio-experience-intro">
                <p className="folio-eyebrow">The journey</p>
                <h2>
                  Different path.
                  <br />
                  <em>Same curiosity.</em>
                </h2>
                <p>
                  From people and process to products and code. Every chapter
                  taught me something I now bring to the work.
                </p>
              </div>
              <div className="folio-timeline">
                {site.experience.map((job, index) => (
                  <article className="folio-timeline-item" key={job.company}>
                    <div className="folio-timeline-meta">
                      <time>{job.period}</time>
                    </div>
                    <div>
                      <h3>{job.role}</h3>
                      <p className="folio-company">
                        {job.company}
                        {job.url && (
                          <>
                            {" "}
                            <a
                              href={job.url}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`Visit ${job.company}`}
                            >
                              <ArrowUpRight size={14} />
                            </a>
                          </>
                        )}
                      </p>
                      <p className="folio-timeline-description">{job.blurb}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="folio-skills" id="skills">
            <div className="folio-skills-head" data-reveal="left">
              <p className="folio-eyebrow">Tools I reach for</p>
              <h2>
                A growing
                <br />
                <em>toolbox.</em>
              </h2>
              <p>
                Curious by default. These are the tools I’ve used while making
                projects and learning how the web fits together.
              </p>
            </div>
            <div className="folio-skills-list" data-reveal="right">
              {site.skills.map((skill) => {
                const { icon, className } = getSkillIcon(skill, "dark");
                return (
                  <span key={skill}>
                    <Icon icon={icon} width={19} height={19} className={`folio-skill-icon ${className || ""}`} aria-hidden="true" />
                    {skill}
                  </span>
                );
              })}
            </div>
          </section>

          <Activity />

          <section className="folio-contact" id="contact">
            <figure className="folio-contact-portrait" data-reveal="left">
              <div className="folio-contact-image-frame">
                <img src="/contact-portrait.png" alt={site.name} loading="lazy" />
              </div>
              <figcaption>
                <div>
                  <strong>{site.name}</strong>
                  <span>Full Stack Developer · Kolkata</span>
                </div>
                <i><span /> Available</i>
              </figcaption>
            </figure>
            <div className="folio-contact-copy" data-reveal="right">
              <p className="folio-eyebrow">Your next teammate?</p>
              <h2>
                Have a good
                <br />
                problem?
              </h2>
              <p>
                I’m open to junior web developer and internship roles, onsite in
                Kolkata or remote. If you’re building something interesting, I’d
                love to hear about it.
              </p>
              <a className="folio-contact-email" href={site.socials.email}>
                {site.email}
                <ArrowUpRight size={17} />
              </a>
              <div className="folio-socials">
                <a
                  href={site.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin size={15} /> LinkedIn <ArrowUpRight size={13} />
                </a>
                <a href={site.socials.github} target="_blank" rel="noreferrer">
                  <Github size={15} /> GitHub <ArrowUpRight size={13} />
                </a>
                <a href={site.socials.twitter} target="_blank" rel="noreferrer">
                  X <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </section>
        </main>
      )}

    </div>
  );
}

