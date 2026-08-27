import { fmtDate, STATUS_LABEL } from "../statsUtils";

const FILTERS = [
  ["all", "All"],
  ["applied", "Applied"],
  ["watching", "Watching"],
  ["interview", "Interview"],
  ["offer", "Offer"],
  ["rejected", "Rejected"],
];

export default function LogTable({ applications, filter, onFilterChange, onStatusChange, onDelete }) {
  const rows = applications
    .filter((a) => filter === "all" || a.status === filter)
    .sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);

  return (
    <section>
      <div className="section-head">
        <h2>Application log</h2>
        <div className="filters">
          {FILTERS.map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={"chip" + (filter === key ? " active" : "")}
              onClick={() => onFilterChange(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Company / Role</th>
              <th>Location</th>
              <th>Status</th>
              <th>Notes</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr className="empty-row">
                <td colSpan={6}>No applications logged yet — add one above or log a pick.</td>
              </tr>
            )}
            {rows.map((a) => (
              <tr key={a.id}>
                <td className="date">{fmtDate(a.date)}</td>
                <td className="company-role">
                  <div className="company">{a.company}</div>
                  <div className="role">
                    {a.role}
                    {a.link && (
                      <>
                        {" "}
                        ·{" "}
                        <a href={a.link} target="_blank" rel="noopener noreferrer">
                          link
                        </a>
                      </>
                    )}
                  </div>
                </td>
                <td>{a.location || "—"}</td>
                <td>
                  <select
                    className={"status-pill status-" + a.status}
                    value={a.status}
                    onChange={(e) => onStatusChange(a.id, e.target.value)}
                  >
                    {Object.keys(STATUS_LABEL).map((s) => (
                      <option value={s} key={s}>
                        {STATUS_LABEL[s]}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="notes">{a.notes || ""}</td>
                <td>
                  <button className="icon-btn" title="Delete" onClick={() => onDelete(a.id)}>
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
