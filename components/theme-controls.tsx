"use client";
import { ThemeProvider, useTheme } from "next-themes";
import { AdvisoryIcon } from "@/components/brand/advisory-icon";
import { useSyncExternalStore } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
const subscribeHydration = () => () => {};
const clientReady = () => true;
const serverReady = () => false;
export function AppearanceProvider({ children }: { children: React.ReactNode }) {
 return <ThemeProvider attribute="data-theme" defaultTheme="light" storageKey="theme" enableColorScheme enableSystem disableTransitionOnChange>{children}</ThemeProvider>;
}
export function ThemeControls() {
 const { theme, setTheme } = useTheme();
 const ready = useSyncExternalStore(subscribeHydration, clientReady, serverReady);
 const selected = ready ? theme : "light";
 return <DropdownMenu><DropdownMenuTrigger asChild><button className="uk-appearance-trigger" data-ready={ready} type="button" aria-label="Görünüm seçin" title="Görünüm"><AdvisoryIcon kind={selected === "dark" ? "moon" : selected === "system" ? "system" : "sun"} size={28}/><span>Görünüm</span></button></DropdownMenuTrigger><DropdownMenuContent className="uk-theme-menu" align="end" sideOffset={10} collisionPadding={18}><DropdownMenuLabel>Görünüm</DropdownMenuLabel><DropdownMenuRadioGroup value={selected} onValueChange={setTheme}>{([["light","Açık","sun"],["dark","Koyu","moon"],["system","Sistem","system"]] as const).map(([value,label,kind])=><DropdownMenuRadioItem key={value} value={value} className="uk-theme-option"><AdvisoryIcon kind={kind} size={24}/>{label}</DropdownMenuRadioItem>)}</DropdownMenuRadioGroup></DropdownMenuContent></DropdownMenu>;
}
