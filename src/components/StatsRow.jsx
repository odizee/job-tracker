import { weekCount, responseRate, activePipeline } from "../statsUtils";

export default function StatsRow({ applications }) {
  const cards = [
    { figure: applications.length, caption: "Total logged" },
    { figure: weekCount(applications), caption: "Last 7 days" },
    { figure: responseRate(applications), caption: "Response rate" },
    { figure: activePipeline(applications), caption: "In interview / offer" },
  ];

  return (
    <section className="stats">
      {cards.map((c) => (
        <div className="stat-card" key={c.caption}>
          <div className="figure">{c.figure}</div>
          <div className="caption">{c.caption}</div>
        </div>
      ))}
    </section>
  );
}
