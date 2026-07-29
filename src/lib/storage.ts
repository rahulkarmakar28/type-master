import { TestResult } from "@/types";
import { idbGetAll, idbGet, idbPut, idbDelete, idbClear, STORES } from "./db";

const META_KEYS = {
  lessonProgress: "lessonProgress",
  charMistakes: "charMistakes",
  settings: "settings",
} as const;

// ---------- Test history ----------

export async function saveResult(result: TestResult): Promise<void> {
  await idbPut(STORES.history, result);

  // Keep only the most recent 200 results.
  const all = await idbGetAll<TestResult>(STORES.history);
  if (all.length > 200) {
    const sorted = [...all].sort((a, b) => b.date - a.date);
    const overflow = sorted.slice(200);
    await Promise.all(overflow.map((r) => idbDelete(STORES.history, r.id)));
  }
}

export async function getHistory(): Promise<TestResult[]> {
  try {
    const all = await idbGetAll<TestResult>(STORES.history);
    return all.sort((a, b) => b.date - a.date);
  } catch {
    return [];
  }
}

export async function clearHistory(): Promise<void> {
  try {
    await idbClear(STORES.history);
  } catch {
    /* ignore */
  }
}

// ---------- Lesson progress ----------

export async function markLessonComplete(slug: string): Promise<void> {
  const done = await getCompletedLessons();
  if (!done.includes(slug)) {
    done.push(slug);
    await idbPut(STORES.meta, done, META_KEYS.lessonProgress);
  }
}

export async function getCompletedLessons(): Promise<string[]> {
  try {
    const val = await idbGet<string[]>(STORES.meta, META_KEYS.lessonProgress);
    return val ?? [];
  } catch {
    return [];
  }
}

// ---------- Problem-key tracking ----------

export async function recordCharMistakes(errors: Record<string, number>): Promise<void> {
  if (!errors || Object.keys(errors).length === 0) return;
  const current = await getCharMistakes();
  for (const [char, count] of Object.entries(errors)) {
    current[char] = (current[char] ?? 0) + count;
  }
  await idbPut(STORES.meta, current, META_KEYS.charMistakes);
}

export async function getCharMistakes(): Promise<Record<string, number>> {
  try {
    const val = await idbGet<Record<string, number>>(STORES.meta, META_KEYS.charMistakes);
    return val ?? {};
  } catch {
    return {};
  }
}

export async function clearCharMistakes(): Promise<void> {
  try {
    await idbDelete(STORES.meta, META_KEYS.charMistakes);
  } catch {
    /* ignore */
  }
}

export async function topProblemKeys(limit = 8): Promise<{ char: string; count: number }[]> {
  const map = await getCharMistakes();
  return Object.entries(map)
    .map(([char, count]) => ({ char, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

// ---------- Settings ----------

export interface AppSettings {
  soundEnabled: boolean;
  fontSize: "sm" | "md" | "lg";
}

export const DEFAULT_SETTINGS: AppSettings = {
  soundEnabled: false,
  fontSize: "md",
};

export async function getSettings(): Promise<AppSettings> {
  try {
    const val = await idbGet<AppSettings>(STORES.meta, META_KEYS.settings);
    return val ? { ...DEFAULT_SETTINGS, ...val } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(partial: Partial<AppSettings>): Promise<AppSettings> {
  const current = await getSettings();
  const merged = { ...current, ...partial };
  await idbPut(STORES.meta, merged, META_KEYS.settings);
  return merged;
}

// ---------- Backup / restore (export & import as JSON, still no server) ----------

export interface BackupPayload {
  version: 1;
  exportedAt: number;
  history: TestResult[];
  completedLessons: string[];
  charMistakes: Record<string, number>;
  settings: AppSettings;
}

export async function exportBackup(): Promise<BackupPayload> {
  const [history, completedLessons, charMistakes, settings] = await Promise.all([
    getHistory(),
    getCompletedLessons(),
    getCharMistakes(),
    getSettings(),
  ]);
  return { version: 1, exportedAt: Date.now(), history, completedLessons, charMistakes, settings };
}

export async function downloadBackup(): Promise<void> {
  const payload = await exportBackup();
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `typemaster-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function importBackup(payload: BackupPayload): Promise<void> {
  if (!payload || payload.version !== 1) throw new Error("Unrecognized backup file");
  await clearHistory();
  await Promise.all((payload.history ?? []).map((r) => idbPut(STORES.history, r)));
  await idbPut(STORES.meta, payload.completedLessons ?? [], META_KEYS.lessonProgress);
  await idbPut(STORES.meta, payload.charMistakes ?? {}, META_KEYS.charMistakes);
  await idbPut(STORES.meta, payload.settings ?? DEFAULT_SETTINGS, META_KEYS.settings);
}
