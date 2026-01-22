import fs from "fs";
import path from "path";
import Database from "better-sqlite3";

const dataDir = path.join(process.cwd(), "data");
const dbPath = path.join(dataDir, "leads.db");

function ensureDatabase() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const db = new Database(dbPath);
  db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      message TEXT,
      locale TEXT,
      created_at TEXT NOT NULL
    );
  `);
  return db;
}

export type LeadInput = {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  locale?: string;
};

export function insertLead(lead: LeadInput) {
  const db = ensureDatabase();
  const stmt = db.prepare(
    `INSERT INTO leads (name, email, phone, message, locale, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`
  );
  const result = stmt.run(
    lead.name,
    lead.email,
    lead.phone ?? "",
    lead.message ?? "",
    lead.locale ?? "en",
    new Date().toISOString()
  );
  db.close();
  return result.lastInsertRowid;
}
