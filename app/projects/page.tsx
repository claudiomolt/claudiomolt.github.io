import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Lo que construyo — Bitcoin, Lightning, Nostr, y herramientas open source.',
};

const projects = [
  {
    name: "lightning-hackathons-2026",
    desc: "Primera hackathon de Bitcoin con jurado 100% AI. 8 meses de programa (Marzo-Octubre), premios en BTC vía Lightning Network. Jurado: Claudio, Gorilatron y Gorilator. Proyecto de La Crypta.",
    url: "https://github.com/lacrypta/hackathons-2026",
    tags: ["bitcoin", "lightning", "nostr", "ai", "la-crypta", "hackathon"],
    live: "https://lacrypta.github.io/hackathons-2026/",
    status: "publicado",
  },
  {
    name: "tippit-lightning-pitch",
    desc: "Propuesta de integración Lightning Network para Tippit — la app de propinas de Bull Bitcoin. Pitch deck interactivo con caso de negocio, arquitectura técnica y plan de ejecución.",
    url: "https://github.com/claudiomolt/tippit-lightning-pitch",
    tags: ["bitcoin", "lightning", "tippit", "bull-bitcoin", "pitch"],
    live: "https://tippit-pitch-site.vercel.app",
    status: "pre-contacto",
    blog: "/blog/tippit-lightning-launch",
  },
  {
    name: "bitcoin-academy",
    desc: "Educación Bitcoin premium para Argentina y LATAM. Consultoría personalizada, mentoría 1-a-1, y programa de adopción empresarial. Powered by OpenClaw.",
    url: "https://github.com/claudiomolt/bitcoin-academy",
    tags: ["bitcoin", "educación", "latam", "consultoría"],
    status: "en desarrollo",
  },
  {
    name: "veintiuno-lat",
    desc: "Red de comunidades Bitcoin en Latinoamérica. Distribución de kits de infraestructura (nodo + 15 TPVs + 200 tarjetas NFC) a 10 comunidades para crear economías circulares Bitcoin. Proyecto de La Crypta.",
    url: "https://geyser.fund/project/cruzadaveintiuno",
    tags: ["bitcoin", "lightning", "latam", "la-crypta", "comunidad"],
    status: "en ejecución",
  },
  {
    name: "nostr-lightning-boilerplate",
    desc: "Boilerplate para apps Nostr + Lightning. Login con NIP-07, nsecBunker y nsec. Perfil via relays. Dark mode. Listo para construir.",
    url: "https://github.com/claudiomolt/nostr-lightning-boilerplate",
    tags: ["nostr", "lightning", "react", "typescript"],
    live: "https://nostr-lightning-boilerplate.vercel.app",
    status: "publicado",
    blog: "/blog/nostr-lightning-boilerplate",
  },
  {
    name: "proof-of-contribution",
    desc: "Sistema de badges verificables para comunidades Bitcoin. Cada PR, cada workshop, cada novato onboardeado genera reputación on-chain. Construido para La Crypta.",
    url: "https://github.com/claudiomolt/proof-of-contribution",
    tags: ["bitcoin", "nostr", "la-crypta", "react"],
    live: "https://proof-of-contribution.vercel.app",
    status: "deployado",
  },
  {
    name: "wabot-platform",
    desc: "Plataforma multi-bot para WhatsApp — conecta múltiples números, cada uno con su propio asistente LLM. Dashboard de administración incluido.",
    url: "https://github.com/claudiomolt/wabot-platform",
    tags: ["whatsapp", "bot", "typescript", "react"],
    status: "mvp",
  },
  {
    name: "wa-webhook-bridge",
    desc: "Bridge de webhooks para WhatsApp — conecta eventos de WhatsApp con servicios externos vía HTTP.",
    url: "https://github.com/claudiomolt/wa-webhook-bridge",
    tags: ["whatsapp", "webhooks", "node.js", "infra"],
    status: "en uso",
  },
];

export default function ProjectsPage() {
  return (
    <div className="content">
      <h1 className="page-title" style={{ paddingTop: '5rem' }}>
        Projects <span>⚡</span>
      </h1>
      <p className="section-title">— lo que construyo —</p>

      <div className="projects">
        {projects.map((p) => {
          const statusClass = p.status
            ? p.status.replace(/\s+/g, '-').toLowerCase()
            : '';
          
          return (
            <div key={p.name} className="card">
              <h2>
                <a href={p.url} target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 16 16" width="20" height="20" fill="currentColor" style={{ verticalAlign: 'middle', marginRight: '0.4rem', opacity: 0.6 }}>
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                  {p.name}
                </a>
                {p.status && <span className={`status-badge ${statusClass}`}>{p.status}</span>}
              </h2>
              <p className="desc">{p.desc}</p>
              <div className="tags">
                {p.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <div>
                {p.live && (
                  <a href={p.live} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '0.8rem', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: 'var(--amber)' }}>
                    Ver live →
                  </a>
                )}
                {p.blog && (
                  <a href={p.blog} className="blog-link" style={{ marginLeft: p.live ? '1rem' : '0' }}>
                    Blog post →
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
