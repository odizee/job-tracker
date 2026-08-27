import { openDB } from "idb";

const DB_NAME = "job-tracker-db";
const STORE = "applications";

let dbPromise;

function getDb() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, 1, {
      upgrade(db) {
        const store = db.createObjectStore(STORE, {
          keyPath: "id",
          autoIncrement: true,
        });
        store.createIndex("date", "date");
        store.createIndex("status", "status");
      },
    });
  }
  return dbPromise;
}

export async function getAllApplications() {
  const db = await getDb();
  const all = await db.getAll(STORE);
  return all.sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);
}

export async function addApplication(app) {
  const db = await getDb();
  const id = await db.add(STORE, app);
  return { ...app, id };
}

export async function updateApplication(id, changes) {
  const db = await getDb();
  const existing = await db.get(STORE, id);
  if (!existing) return null;
  const updated = { ...existing, ...changes };
  await db.put(STORE, updated);
  return updated;
}

export async function deleteApplication(id) {
  const db = await getDb();
  await db.delete(STORE, id);
}
