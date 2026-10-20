import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Github,
  Linkedin,
  MapPin,
  Play,
  RotateCw,
} from "lucide-react";
import { site, type Project } from "@/config/site";
import { useGithubHeatmap } from "@/hooks/useGithubHeatmap";

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
    <article id={`project-${index + 1}`} className={`folio-project-card folio-project-${index + 1}`}>
      <a
        className="folio-project-image"
        href={project.links.live || project.links.video || project.links.source}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${project.title}`}
      >
        {project.image ? (
          <img src={project.image} alt={`${project.title} preview`} loading="lazy" />
        ) : (
          <div className="folio-project-placeholder">{project.title}</div>
        )}
        <span className="folio-project-number">0{index + 1}</span>
        <span className="folio-project-open"><ArrowUpRight size={18} /></span>
      </a>
      <div className="folio-project-body">
        <div className="folio-project-heading">
          <div>
            <p className="folio-eyebrow">{project.year} <span>·</span> {project.stack.slice(0, 2).join(" / ")}</p>
            <h3>{project.title}</h3>
          </div>
          <ArrowDownRight className="folio-project-arrow" size={22} />
        </div>
        <p className="folio-project-blurb">{project.blurb}</p>
        <div className="folio-tags">
          {project.stack.slice(0, 5).map((item) => <span key={item}>{item}</span>)}
          {project.stack.length > 5 && <span>+{project.stack.length - 5}</span>}
        </div>
        {project.story && (
          <details className="folio-project-details">
            <summary>How it works</summary>
            <div>{project.story.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          </details>
        )}
        <ProjectActions project={project} />
      </div>
    </article>
  );
}

function Activity() {
  const heatmap = useGithubHeatmap(site.github.username);
  return (
    <section className="folio-section folio-activity" id="activity">
      <div className="folio-section-head">
        <div><p className="folio-eyebrow">05 / Open source &amp; practice</p><h2>Made in public.</h2></div>
        <a className="folio-text-link" href={site.socials.github} target="_blank" rel="noreferrer">GitHub profile <ArrowUpRight size={15} /></a>
      </div>
      <div className="folio-activity-card">
        <div className="folio-activity-stat"><strong>{heatmap.status === "live" ? heatmap.total.toLocaleString() : "—"}</strong><span>contributions this year</span></div>
        <div className="folio-heatmap-wrap" aria-label="GitHub contribution activity">
          <div className="folio-heatmap">{heatmap.cells.map((day, i) => day ? <span key={day.date} title={`${day.count} contributions on ${day.date}`} className={`folio-heat-${day.level}`} /> : <i key={`empty-${i}`} />)}</div>
          <p>{heatmap.status === "loading" ? "Loading public activity…" : heatmap.status === "error" ? "Contribution data is temporarily unavailable." : "A year of learning, shipping and improving."}</p>
        </div>
      </div>
    </section>
  );
}

export function PortfolioPage({ archive = false }: { archive?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileImageIndex, setProfileImageIndex] = useState(0);
  const projects = archive ? site.projects : site.projects.slice(0, 4);
  const featuredProjects = site.projects.slice(0, 4);
  const moreProjects = site.projects.slice(4);

  return (
    <div className="portfolio-v2">
      <header className="folio-header">
        <div className="folio-header-inner">
          <a className="folio-wordmark" href={archive ? "/" : "#top"} aria-label="Sourav Banerjee home"><span>SB</span><b>Sourav Banerjee</b><i>®</i></a>
          <button className="folio-menu-toggle" type="button" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? "Close" : "Menu"}</button>
          <nav className={menuOpen ? "is-open" : ""} aria-label="Main navigation">
            <a href={archive ? "/#about" : "#about"} onClick={() => setMenuOpen(false)}>About</a>
            <a href={archive ? "/#work" : "#work"} onClick={() => setMenuOpen(false)}>Work</a>
            <a href={archive ? "/#experience" : "#experience"} onClick={() => setMenuOpen(false)}>Experience</a>
            <a href={archive ? "/#contact" : "#contact"} onClick={() => setMenuOpen(false)}>Contact</a>
          </nav>
          <a className="folio-resume" href={site.socials.resume} target="_blank" rel="noreferrer">Resume <ArrowUpRight size={14} /></a>
        </div>
      </header>

      {archive ? (
        <main className="folio-archive" id="top">
          <div className="folio-archive-top"><Link to="/" className="folio-text-link"><ArrowDownRight size={15} className="folio-back-arrow" /> Back to home</Link><p className="folio-eyebrow">Selected work / 2025—26</p></div>
          <div className="folio-section-head folio-archive-title"><div><p className="folio-eyebrow">A few things I’ve made</p><h1>Projects<span>.</span></h1></div><p>Web experiences, useful tools, and small experiments built with care.</p></div>
          <div className="folio-project-grid folio-archive-grid">{projects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}</div>
        </main>
      ) : (
        <main id="top">
          <section className="folio-hero">
            <div className="folio-hero-copy">
              <p className="folio-kicker"><span /> OPEN TO JUNIOR & INTERNSHIP ROLES</p>
              <h1>I make the<br />web <em>work</em><br />for people<span className="folio-period">.</span></h1>
              <div className="folio-hero-foot">
                <p>Full-stack web developer building thoughtful products with React, Node.js, and MongoDB.</p>
                <a className="folio-hero-cta" href="#work">Explore my work <ArrowDown size={15} /></a>
              </div>
              <div className="folio-location"><MapPin size={14} /> Kolkata, India <span>·</span> Onsite in Kolkata or remote</div>
            </div>
            <div className="folio-portrait-wrap">
              <div className="folio-portrait-note">DEVELOPER<br />BY CURIOSITY</div>
              <div className="folio-portrait"><img key={site.profileImages[profileImageIndex]} src={site.profileImages[profileImageIndex]} alt={`${site.name}, profile photo ${profileImageIndex + 1}`} /><button className="folio-portrait-switch" type="button" title="Switch profile image" aria-label="Switch profile image" onClick={() => setProfileImageIndex((index) => (index + 1) % site.profileImages.length)}><RotateCw size={15} /></button></div>
              <div className="folio-portrait-caption"><span>0{profileImageIndex + 1} / 0{site.profileImages.length}</span><span>Full stack · MERN</span></div>
              <div className="folio-scribble" aria-hidden="true">✳</div>
            </div>
            <div className="folio-hero-bottom"><span>SCROLL TO EXPLORE</span><span className="folio-scroll-line" /><span>22°34′ N · 88°22′ E</span></div>
          </section>

          <section className="folio-intro-band" id="about">
            <div className="folio-intro-label"><span>01</span><p>A little<br />about me</p></div>
            <div className="folio-intro-copy"><p className="folio-intro-lead">{site.about[0]}</p><div className="folio-intro-sub">{site.about.slice(1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><div className="folio-facts">{site.tldr.map((fact) => <span key={fact}><i />{fact}</span>)}</div></div>
            <aside className="folio-years"><strong>3.5<sup>+</sup></strong><span>years learning<br />by building</span><div className="folio-now"><b>Currently</b><span>Building · {site.status.nowBuilding}</span><span>Learning · {site.status.nowLearning}</span><span>Listening · {site.status.nowListening}</span></div></aside>
          </section>

          <section className="folio-section folio-work" id="work">
            <div className="folio-section-head"><div><p className="folio-eyebrow">02 / Selected work</p><h2>Things I’ve<br className="folio-mobile-break" /> put into the world<span>.</span></h2></div><p>From useful everyday apps to playful interactive experiences. Each project starts with a real problem or a question worth exploring.</p></div>
            <div className="folio-project-grid">{featuredProjects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}</div>
            <div className="folio-more-work"><div><p className="folio-eyebrow">More experiments / 04</p><h3>There’s more where that came from.</h3></div><div className="folio-more-list">{moreProjects.map((project, i) => <div className="folio-more-row" key={project.title}><span>0{i + 5}</span><Link to={`/all-projects#project-${i + 5}`}>{project.title}<ArrowUpRight size={16} /></Link><span>{project.year}</span></div>)}</div><Link className="folio-outline-button" to="/all-projects">Browse all projects <ArrowUpRight size={15} /></Link></div>
          </section>

          <section className="folio-experience" id="experience">
            <div className="folio-experience-inner"><div className="folio-experience-intro"><p className="folio-eyebrow">03 / The journey</p><h2>Different path.<br /><em>Same curiosity.</em></h2><p>From people and process to products and code. Every chapter taught me something I now bring to the work.</p></div><div className="folio-timeline">{site.experience.map((job, index) => <article className="folio-timeline-item" key={job.company}><div className="folio-timeline-meta"><span>0{index + 1}</span><time>{job.period}</time></div><div><h3>{job.role}</h3><p className="folio-company">{job.company}{job.url && <> <a href={job.url} target="_blank" rel="noreferrer" aria-label={`Visit ${job.company}`}><ArrowUpRight size={14} /></a></>}</p><p className="folio-timeline-description">{job.blurb}</p></div></article>)}</div></div>
          </section>

          <section className="folio-skills" id="skills"><div className="folio-skills-head"><p className="folio-eyebrow">04 / Tools I reach for</p><h2>A growing<br /><em>toolbox.</em></h2><p>Curious by default. These are the tools I’ve used while making projects and learning how the web fits together.</p></div><div className="folio-skills-list">{site.skills.map((skill, index) => <span key={skill}><small>{String(index + 1).padStart(2, "0")}</small>{skill}</span>)}</div></section>

          <Activity />

          <section className="folio-contact" id="contact"><div className="folio-contact-stamp">LET’S MAKE<br />SOMETHING<br /><span>MATTER.</span></div><div className="folio-contact-copy"><p className="folio-eyebrow">06 / Your next teammate?</p><h2>Have a good<br />problem?</h2><p>I’m open to junior web developer and internship roles, onsite in Kolkata or remote. If you’re building something interesting, I’d love to hear about it.</p><a className="folio-contact-email" href={site.socials.email}>{site.email}<ArrowUpRight size={17} /></a><div className="folio-socials"><a href={site.socials.linkedin} target="_blank" rel="noreferrer"><Linkedin size={15} /> LinkedIn <ArrowUpRight size={13} /></a><a href={site.socials.github} target="_blank" rel="noreferrer"><Github size={15} /> GitHub <ArrowUpRight size={13} /></a><a href={site.socials.twitter} target="_blank" rel="noreferrer">X <ArrowUpRight size={13} /></a></div></div></section>
        </main>
      )}

      <footer className="folio-footer"><a className="folio-wordmark" href="#top"><span>SB</span><b>Sourav Banerjee</b></a><p>Designed and built with curiosity · Kolkata, India</p><a href="#top">Back to top ↑</a><span>© {new Date().getFullYear()}</span></footer>
    </div>
  );
}
