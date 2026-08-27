import { useState } from "react";

const EMPTY = { company: "", role: "", location: "", link: "", status: "applied" };

export default function AddForm({ onAdd }) {
  const [form, setForm] = useState(EMPTY);

  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.company.trim()) return;
    onAdd({ ...form, company: form.company.trim() });
    setForm(EMPTY);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input placeholder="Company" value={form.company} onChange={set("company")} required />
      <input placeholder="Role" value={form.role} onChange={set("role")} />
      <input placeholder="Location" value={form.location} onChange={set("location")} />
      <input placeholder="Posting URL" value={form.link} onChange={set("link")} />
      <select value={form.status} onChange={set("status")}>
        <option value="applied">Applied</option>
        <option value="watching">Watching</option>
        <option value="interview">Interview</option>
        <option value="offer">Offer</option>
        <option value="rejected">Rejected</option>
      </select>
      <button type="submit" className="btn-primary">
        Add
      </button>
    </form>
  );
}
