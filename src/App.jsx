import { useEffect, useState } from "react";
import StatsRow from "./components/StatsRow";
import PicksRow from "./components/PicksRow";
import AddForm from "./components/AddForm";
import LogTable from "./components/LogTable";
import { getAllApplications, addApplication, updateApplication, deleteApplication } from "./db";
import { computeStreak, todayStr } from "./statsUtils";

export default function App() {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getAllApplications().then((apps) => {
      setApplications(apps);
      setLoaded(true);
    });
  }, []);

  async function handleAdd(fields) {
    const saved = await addApplication({ ...fields, date: todayStr() });
    setApplications((prev) => [saved, ...prev]);
  }

  async function handleLogPick(pick) {
    const saved = await addApplication({
      company: pick.company,
      role: pick.role,
      location: pick.location,
      link: pick.link,
      status: "applied",
      notes: "",
      date: todayStr(),
    });
    setApplications((prev) => [saved, ...prev]);
  }

  async function handleStatusChange(id, status) {
    const updated = await updateApplication(id, { status });
    setApplications((prev) => prev.map((a) => (a.id === id ? updated : a)));
  }

  async function handleDelete(id) {
    await deleteApplication(id);
    setApplications((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div className="wrap">
      <header className="top">
        <div>
          <h1>Frontend Job Tracker</h1>
          <p className="subtitle">
            Odiri's application log — Nigeria, Africa &amp; remote-anywhere frontend roles
          </p>
        </div>
        <div className="streak">
          <span className="num">{computeStreak(applications)}</span>
          <span className="label">day streak</span>
        </div>
      </header>

      <StatsRow applications={applications} />
      <PicksRow applications={applications} onLogPick={handleLogPick} />

      <section>
        <AddForm onAdd={handleAdd} />
        {loaded && (
          <LogTable
            applications={applications}
            filter={filter}
            onFilterChange={setFilter}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        )}
      </section>

      <footer>Saved locally in your browser's IndexedDB — data stays on this machine.</footer>
    </div>
  );
}
