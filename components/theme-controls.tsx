"use client";
import { ThemeProvider, useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { useSyncExternalStore } from "react";
const subscribeHydration = () => () => {};
const clientReady = () => true;
const serverReady = () => false;
export function AppearanceProvider({ children }: { children: React.ReactNode }) {
 return <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>{children}</ThemeProvider>;
}
export function ThemeControls() {
 const { theme, setTheme } = useTheme();
 const ready = useSyncExternalStore(subscribeHydration, clientReady, serverReady);
 return <div className="ef-theme" role="group" aria-label="Görünüm teması">{([["light","Açık tema",Sun],["dark","Koyu tema",Moon],["system","Sistem teması",Monitor]] as const).map(([value,label,Icon]) => <button key={value} type="button" aria-label={label} aria-pressed={ready && theme===value} onClick={()=>setTheme(value)}><Icon size={16}/></button>)}</div>;
}
