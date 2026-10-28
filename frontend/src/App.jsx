import { useEffect, useState } from "react";

const skillFallback = [
  ["Python", "BACKEND", "devicon-python-plain colored"], ["Django", "BACKEND", "devicon-django-plain colored"], ["Django REST Framework", "BACKEND", ""], ["FastAPI", "BACKEND", "devicon-fastapi-plain colored"], ["C++", "BACKEND", "devicon-cplusplus-plain colored"],
  ["PostgreSQL", "DB", "devicon-postgresql-plain colored"], ["SQLite", "DB", "devicon-sqlite-plain colored"], ["Redis", "DB", "devicon-redis-plain colored"], ["MySQL", "DB", "devicon-mysql-plain colored"],
  ["Git", "TOOLS", "devicon-git-plain colored"], ["GitHub", "TOOLS", "devicon-github-original"], ["Docker", "TOOLS", "devicon-docker-plain colored"], ["CMake", "TOOLS", "devicon-cmake-plain colored"],
  ["JavaScript", "FRONTEND", "devicon-javascript-plain colored"], ["Three.js", "FRONTEND", "devicon-threejs-original"], ["HTML", "FRONTEND", "devicon-html5-plain colored"], ["CSS", "FRONTEND", "devicon-css3-plain colored"], ["Pillow", "OTHER", ""], ["ffmpeg", "OTHER", ""], ["REST API", "OTHER", ""]
].map(([name, category, icon_class], id) => ({ id, name, category, icon_class }));

const projectFallback = [
  { title: "XO_OS", short_description: "Система управления задачами и фокусом с интеграциями календаря и локальной AI-моделью.", description: "Backend и интеграции реализованы самостоятельно; UI-прототип собран с использованием AI-инструментов.", stack: ["Python", "FastAPI", "llama.cpp", "Qwen2.5-VL", "aiogram", "PostgreSQL", "Alembic"], status_label: "В разработке", repository_url: "https://github.com/X0L1fe/XO_OS", featured: true, order: 1 },
  { title: "ConstCrane", short_description: "Сайт застройщика с интерактивной 3D-моделью и интеграцией 1С:УНФ.", description: "Дипломный проект с выбором квартиры, заявками и синхронизацией с 1С:УНФ через API и Django signals. Коммерческое внедрение не заявляется.", stack: ["Python", "Django", "DRF", "Three.js", "1С:УНФ", "Redis", "SQLite"], status_label: "Завершён", repository_url: "https://github.com/X0L1fe/myDiplomWeb", featured: true, order: 2 },
  { title: "AllSound", short_description: "Анализ аудио: C++ AudioEngine, Python-обвязка и музыкальные метаданные.", description: "Аудиопризнаки вычисляются в C++-модуле, вызываемом из Python через ctypes. Жанровая классификация находится в доработке.", stack: ["C++", "Python", "CMake", "ctypes", "MusicBrainz", "Last.fm"], status_label: "В разработке", repository_url: "https://github.com/X0L1fe/AllSound", featured: true, order: 3 },
  { title: "Автоматизация мониторинга станков", short_description: "Сбор состояния 40 станков и визуализация производственных простоев.", description: "Парсер собирает данные об оборудовании, а Telegram-бот позволяет указывать причины простоев.", stack: ["Node.js", "Puppeteer", "node-cron", "SQLite3", "Telegram Bot API"], status_label: "Проект по договору", repository_url: "https://github.com/X0L1fe/suraMebel", featured: false, order: 4 },
  { title: "PhotoPainter", short_description: "Учебное веб-приложение для базового редактирования изображений.", description: "Загрузка изображений и редактирование яркости и контраста. Учебный проект.", stack: ["Python", "Flask", "Pillow"], status_label: "Учебный проект", repository_url: "https://github.com/X0L1fe/PhotoPainter", featured: false, order: 5 }
];
const labels = { BACKEND: "Backend", DB: "Базы данных", TOOLS: "Инструменты", FRONTEND: "Frontend", OTHER: "Дополнительно" };
const navItems = [["#skills", "Стек"], ["#projects", "Проекты"], ["#about", "Обо мне"], ["#contacts", "Контакты"]];

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="topbar">
      <div className="container nav">
        <a href="#top" className="brand">
          <span className="brand-mark">RL</span>
          <span>ROMAN LIFANOV</span>
        </a>
        <button
          className={`menu-toggle ${open ? "is-open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
        >
          <span /><span /><span />
        </button>
        <nav
          className={`nav-links ${open ? "open" : ""}`}
          aria-label="Основная навигация"
        >
          {navItems.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a
            href="https://github.com/X0L1fe"
            target="_blank"
            rel="noreferrer"
            className="nav-cta"
          >
            GitHub ↗
          </a>
        </nav>
      </div>
    </header>
  );
}
function Hero() { return <section className="hero" id="top"><div className="container"><div className="eyebrow">Python Backend Developer · Junior</div><h1>Создаю backend, <span>который решает задачи.</span></h1><p className="hero-copy">Разрабатываю приложения, REST API и интеграции с внешними сервисами. Работаю с реляционными базами данных, фоновыми задачами и синхронизацией данных. Сейчас учусь в МАИ и открыт к стажировке или part-time работе.</p><div className="hero-actions"><a className="button button-primary" href="#projects">Смотреть проекты ↘</a><a className="button" href="https://github.com/X0L1fe" target="_blank" rel="noreferrer">GitHub ↗</a><a className="button" href="https://t.me/Inrigt" target="_blank" rel="noreferrer">Связаться</a></div><div className="hero-meta"><span><i className="status-dot" />Открыт к стажировке</span><span>Химки · Московская область</span><span>Удалённо / гибкий график</span></div></div></section> }
function SectionHead({ kicker, title, intro }) { return <div className="section-head"><div><div className="section-kicker">{kicker}</div><h2>{title}</h2></div>{intro && <p className="section-intro">{intro}</p>}</div> }
function SkillIcon({ skill }) { if (skill.custom_icon_url) return <span className="skill-icon"><img src={skill.custom_icon_url} alt="" loading="lazy" /></span>; if (skill.icon_class && /^devicon-[a-z0-9-]+(?:\s+(?:colored|plain|original|line|word))?$/.test(skill.icon_class)) return <span className="skill-icon"><i className={skill.icon_class} /></span>; const initials = skill.name.split(/[\s.-]+/).filter(Boolean).slice(0, 2).map(x => x[0]).join("").toUpperCase(); return <span className="skill-icon"><span className="skill-fallback">{initials || "•"}</span></span> }
function Skills({ skills }) { const order = ["BACKEND", "DB", "TOOLS", "FRONTEND", "OTHER"]; const sorted = [...skills].sort((a, b) => order.indexOf(a.category) - order.indexOf(b.category) || (a.order || 0) - (b.order || 0) || a.name.localeCompare(b.name, "ru")); return <section className="section" id="skills"><div className="container"><SectionHead kicker="01 / Технический стек" title="Инструменты в работе" intro="Основные технологии и инструменты, с которыми работал в проектах." /><div className="skills-grid">{sorted.map(skill => <div className="skill-card" key={skill.id || skill.name}><SkillIcon skill={skill} /><div><div className="skill-name">{skill.name}</div><div className="skill-category">{skill.category_label || labels[skill.category] || "Технология"}</div></div></div>)}</div></div></section> }
function ProjectCard({ project, index }) { return <article className="project-card"><div className="project-top"><span className="project-index">{String(index + 1).padStart(2, "0")} / PROJECT</span><span className="project-status">{project.status_label || "Проект"}</span></div><h3>{project.title}</h3><p className="project-description">{project.short_description || project.description}</p><div className="stack">{(Array.isArray(project.stack) ? project.stack : []).slice(0, 8).map(tag => <span key={tag}>{tag}</span>)}</div>{project.repository_url && <a className="project-link" href={project.repository_url} target="_blank" rel="noreferrer">Открыть репозиторий ↗</a>}</article> }
function Projects({ projects }) { const featured = projects.filter(p => p.featured).sort((a, b) => (a.order || 0) - (b.order || 0)); const main = featured.length ? featured.slice(0, 3) : projects.slice(0, 3); const extra = projects.filter(p => !main.includes(p)).sort((a, b) => (a.order || 0) - (b.order || 0)); return <section className="section" id="projects"><div className="container"><SectionHead kicker="02 / Избранное" title="Проекты и инженерные задачи" intro="Смотрю на проект не только как на код, но и как на систему: интеграции, данные, отказоустойчивость и ограничения." /><div className="project-grid">{main.map((project, i) => <ProjectCard key={project.id || project.slug || project.title} project={project} index={i} />)}</div>{!!extra.length && <div className="other-projects"><div className="other-title">Другие проекты</div>{extra.map(project => <div className="other-project" key={project.id || project.slug || project.title}><strong>{project.title}</strong><p>{project.short_description}</p>{project.repository_url && <a href={project.repository_url} target="_blank" rel="noreferrer">GitHub ↗</a>}</div>)}</div>}</div></section> }
function About() { return <section className="section" id="about"><div className="container"><SectionHead kicker="03 / Путь" title="Опыт и образование" intro="Начинающий backend-разработчик с практикой командной разработки и несколькими проектами разного масштаба." /><div className="about-grid"><div className="info-panel"><h3>Опыт</h3><div className="timeline"><div className="timeline-item"><div className="timeline-date">ИЮЛЬ — АВГ 2024</div><div><strong>Максофт Оптима · Backend-разработчик, стажировка</strong><p>В команде из 6 человек разрабатывал backend магазина на FastAPI и PostgreSQL. Реализовал транзакционное списание монет, обработку конкурентных покупок, SQL-запросы, миграции и тесты.</p></div></div><div className="timeline-item"><div className="timeline-date">2024 — СЕЙЧАС</div><div><strong>Pet-проекты и дипломная работа</strong><p>Разработка API, интеграций, обработка данных, работа с аудио и внешними сервисами.</p></div></div></div></div><div className="info-panel"><h3>Образование</h3><div className="timeline"><div className="timeline-item"><div className="timeline-date">2025 — 2029</div><div><strong>Московский авиационный институт</strong><p>Информатика и вычислительная техника · неоконченное высшее</p></div></div><div className="timeline-item"><div className="timeline-date">2025</div><div><strong>Пензенский колледж информационных и промышленных технологий</strong><p>Информационные системы и программирование · специалист 1С:Предприятие</p></div></div><div className="timeline-item"><div className="timeline-date">2024</div><div><strong>Академия TOP</strong><p>Курс «Web-разработка на Python»</p></div></div></div></div></div></div></section> }
function Contacts() { return <section className="section" id="contacts"><div className="container"><div className="contact-panel"><div><div className="section-kicker">04 / На связи</div><h2>Есть интересная задача?</h2><p>Открыт к стажировке и частичной занятости от 25–30 часов в неделю. Удобнее всего связаться через Telegram или email.</p></div><div className="contact-links"><a className="contact-link" href="https://t.me/Inrigt" target="_blank" rel="noreferrer">Telegram ↗</a><a className="contact-link" href="mailto:r.lifanov.dev@gmail.com">Email ↗</a><a className="contact-link" href="https://github.com/X0L1fe" target="_blank" rel="noreferrer">GitHub ↗</a></div></div></div></section> }
export default function App() { const [skills, setSkills] = useState(skillFallback); const [projects, setProjects] = useState(projectFallback); useEffect(() => { fetch("/api/skills/").then(r => { if (!r.ok) throw Error(); return r.json() }).then(d => { if (d.results?.length) setSkills(d.results) }).catch(() => { }); fetch("/api/projects/").then(r => { if (!r.ok) throw Error(); return r.json() }).then(d => { if (d.results?.length) setProjects(d.results) }).catch(() => { }) }, []); return <><Header /><main><Hero /><Skills skills={skills} /><Projects projects={projects} /><About /><Contacts /></main><footer className="footer"><div className="container footer-inner"><span>© {new Date().getFullYear()} ROMAN LIFANOV</span></div></footer></> }
