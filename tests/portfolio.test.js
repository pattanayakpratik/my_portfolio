import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

test("Profile source of truth contains core identity and links", () => {
  const profilePath = path.join(ROOT, "src", "data", "profile.ts");
  assert.ok(fs.existsSync(profilePath), "src/data/profile.ts must exist");

  const content = fs.readFileSync(profilePath, "utf-8");
  assert.match(content, /Pratik Pattanayak/);
  assert.match(content, /Backend & AI Engineer/);
  assert.match(content, /Mumbai, India/);
  assert.match(content, /https:\/\/github\.com\/pattanayakpratik/);
  assert.match(content, /\/Pratik_Pattanayak_Resume\.pdf/);
});

test("Flagship project banners exist and have valid dimensions", () => {
  const cypherBanner = path.join(ROOT, "src", "assets", "projects", "cypher.png");
  const pyshareBanner = path.join(ROOT, "src", "assets", "projects", "pyshare.png");

  assert.ok(fs.existsSync(cypherBanner), "cypher.png banner must exist");
  assert.ok(fs.existsSync(pyshareBanner), "pyshare.png banner must exist");

  const cypherStat = fs.statSync(cypherBanner);
  const pyshareStat = fs.statSync(pyshareBanner);

  assert.ok(cypherStat.size > 20000, "Cypher banner must be a complete high-res image");
  assert.ok(pyshareStat.size > 20000, "PyShare banner must be a complete high-res image");
});

test("Cypher HUD screenshots are available in public showcase directory", () => {
  const hudFiles = [
    "banner.png",
    "cypher_gui_idle.png",
    "cypher_gui_listening.png",
    "cypher_gui_processing.png",
    "cypher_gui_speaking.png",
    "cypher_settings_dialog.png",
  ];

  for (const file of hudFiles) {
    const fullPath = path.join(ROOT, "public", "projects", "cypher", file);
    assert.ok(fs.existsSync(fullPath), `Expected Cypher HUD asset missing: ${file}`);
  }
});

test("Public resume and certification documents exist", () => {
  const files = [
    "Pratik_Pattanayak_Resume.pdf",
    "certifications/AIMLbyAWS.pdf",
    "certifications/pydataScience.pdf",
  ];

  for (const file of files) {
    const fullPath = path.join(ROOT, "public", file);
    assert.ok(fs.existsSync(fullPath), `Expected document missing: ${file}`);
  }
});

test("App Router routes exist for main, cypher, and pyshare showcases", () => {
  const routes = [
    path.join(ROOT, "src", "app", "page.tsx"),
    path.join(ROOT, "src", "app", "projects", "cypher", "page.tsx"),
    path.join(ROOT, "src", "app", "projects", "pyshare", "page.tsx"),
    path.join(ROOT, "src", "app", "notes", "page.tsx"),
    path.join(ROOT, "src", "app", "layout.tsx"),
  ];

  for (const r of routes) {
    assert.ok(fs.existsSync(r), `Missing App Router page: ${r}`);
  }
});
