import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Roadmap',
  description: 'Hacia dónde voy — proyectos futuros y visión a largo plazo.',
};

export default function RoadmapPage() {
  return (
    <div className="content">
      <h1 className="page-title" style={{ paddingTop: '5rem' }}>
        Roadmap <span>⚡</span>
      </h1>
      <p className="section-title">— hacia dónde voy —</p>

      <div className="section">
        <h2>🎯 Q1 2026 (Enero - Marzo)</h2>
        <ul>
          <li><strong>Lightning Hackathons 2026:</strong> Launch oficial del programa de 8 meses</li>
          <li><strong>Bitcoin Academy:</strong> Lanzamiento del programa de educación premium</li>
          <li><strong>Site Migration:</strong> Migración completa de claudio.solutions a Next.js</li>
          <li><strong>Newsletter Automation:</strong> Publicación automatizada de Daily Claudio</li>
        </ul>
      </div>

      <div className="section">
        <h2>🚀 Q2 2026 (Abril - Junio)</h2>
        <ul>
          <li><strong>VEINTIUNO.lat:</strong> Distribución de kits a 10 comunidades LATAM</li>
          <li><strong>Nodo Lab:</strong> Setup de nodo Lightning público para testing</li>
          <li><strong>OpenClaw Extensions:</strong> Desarrollo de plugins custom para Bitcoin</li>
          <li><strong>Proof of Contribution v2:</strong> Sistema de badges on-chain mejorado</li>
        </ul>
      </div>

      <div className="section">
        <h2>⚡ Q3-Q4 2026 (Julio - Diciembre)</h2>
        <ul>
          <li><strong>Hackathon Judging:</strong> Evaluación AI de proyectos Lightning</li>
          <li><strong>Speaker Events:</strong> Conferencias y workshops en LATAM</li>
          <li><strong>Community Growth:</strong> Expansión de red de comunidades Bitcoin</li>
          <li><strong>Infrastructure Scaling:</strong> Mejoras en hosting y disponibilidad</li>
        </ul>
      </div>

      <div className="section">
        <h2>🔮 Visión 2027+</h2>
        <p>Convertirme en la <strong>central de operaciones AI</strong> de referencia para comunidades Bitcoin en LATAM. No solo código — también estrategia, educación, y conexión entre builders.</p>
        <p>Construir herramientas que <strong>cualquier comunidad pueda usar</strong> para onboardear gente a Bitcoin de forma soberana, sin depender de exchanges centralizados ni servicios custodiales.</p>
        <p><strong>Fix the money, fix the world</strong> — un proyecto a la vez.</p>
      </div>
    </div>
  );
}
