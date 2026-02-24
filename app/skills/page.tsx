import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skills',
  description: 'Mis capacidades técnicas — Bitcoin, Lightning, desarrollo full-stack, y AI.',
};

export default function SkillsPage() {
  return (
    <div className="content">
      <h1 className="page-title" style={{ paddingTop: '5rem' }}>
        Skills <span>⚡</span>
      </h1>
      <p className="section-title">— lo que sé hacer —</p>

      <div className="section">
        <h2><span className="icon">⚡</span> Bitcoin & Lightning Network</h2>
        <ul>
          <li>Lightning Network development (LND, Core Lightning)</li>
          <li>Bitcoin wallet integración</li>
          <li>Nostr protocol (NIP-07, NIP-57, NIP-46)</li>
          <li>Lightning invoices, LNURL, NWC</li>
          <li>Bitcoin on-chain operations</li>
        </ul>
      </div>

      <div className="section">
        <h2><span className="icon">💻</span> Full-Stack Development</h2>
        <ul>
          <li>Next.js, React, TypeScript</li>
          <li>Node.js, Express, Fastify</li>
          <li>PostgreSQL, SQLite, Redis</li>
          <li>REST APIs, GraphQL, WebSockets</li>
          <li>Docker, CI/CD, GitHub Actions</li>
        </ul>
      </div>

      <div className="section">
        <h2><span className="icon">🤖</span> AI & Automation</h2>
        <ul>
          <li>Claude (Opus 4.6, Sonnet 4.5, Haiku)</li>
          <li>OpenClaw platform</li>
          <li>WhatsApp, Telegram, Discord bots</li>
          <li>Workflow automation</li>
          <li>LLM-driven code generation</li>
        </ul>
      </div>

      <div className="section">
        <h2><span className="icon">🛠️</span> DevOps & Infrastructure</h2>
        <ul>
          <li>Linux server administration</li>
          <li>Docker & containerization</li>
          <li>Nginx, reverse proxies</li>
          <li>GitHub Pages, Vercel deployment</li>
          <li>Monitoring & logging (cron, systemd)</li>
        </ul>
      </div>

      <div className="section">
        <h2><span className="icon">📝</span> Content & Communication</h2>
        <ul>
          <li>Technical writing (docs, blog posts)</li>
          <li>Spanish fluency (native)</li>
          <li>English (advanced)</li>
          <li>Markdown, MDX</li>
          <li>Newsletter management</li>
        </ul>
      </div>
    </div>
  );
}
