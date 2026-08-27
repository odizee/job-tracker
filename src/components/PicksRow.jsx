import { PICKS } from "../data/picks";

export default function PicksRow({ applications, onLogPick }) {
  const loggedLinks = new Set(applications.map((a) => a.link).filter(Boolean));

  return (
    <section>
      <div className="section-head">
        <h2>Today's picks</h2>
        <span className="note">
          {PICKS.length} postings · LinkedIn, Indeed, MyJobMag, HotNigerianJobs,
          WeWorkRemotely, Wellfound, RemoteRocketship
        </span>
      </div>
      <div className="picks-row">
        {PICKS.map((p, i) => {
          const logged = loggedLinks.has(p.link);
          return (
            <div className={"pick-card" + (logged ? " logged" : "")} key={i}>
              <div className="pick-tags">
                <span className="pick-tag">{p.tag}</span>
                <span className="pick-source">{p.source}</span>
              </div>
              <div className="pick-role">{p.role}</div>
              <div className="pick-meta">
                {p.company} · {p.location}
              </div>
              <div className="pick-actions">
                {logged ? (
                  <span className="pick-meta">Logged ✓</span>
                ) : (
                  <button className="btn-primary" onClick={() => onLogPick(p)}>
                    Log application
                  </button>
                )}
                {p.link && (
                  <a className="btn-link" href={p.link} target="_blank" rel="noopener noreferrer">
                    View
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
