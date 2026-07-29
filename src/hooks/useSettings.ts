"use client";

import { useCallback, useEffect, useState } from "react";
import { AppSettings, DEFAULT_SETTINGS, getSettings, saveSettings } from "@/lib/storage";

const EVENT_NAME = "typemaster-settings-changed";

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  const load = useCallback(() => {
    getSettings().then(setSettings);
  }, []);

  useEffect(() => {
    load();
    const handler = () => load();
    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
  }, [load]);

  const update = useCallback(async (partial: Partial<AppSettings>) => {
    const merged = await saveSettings(partial);
    setSettings(merged);
    window.dispatchEvent(new Event(EVENT_NAME));
  }, []);

  return { settings, update };
}
