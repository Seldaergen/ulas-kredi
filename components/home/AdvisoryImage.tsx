import Image from "next/image";
export type AdvisoryImageName = "hero-advisory" | "service-high-limit" | "service-home-vehicle" | "service-debt-plan" | "service-after-rejection" | "process-discovery" | "process-analysis" | "process-next-steps";

/** Static responsive exports avoid adding image processing to the Starter runtime. */
export function AdvisoryImage({ name, alt, sizes, priority = false }: { name: AdvisoryImageName; alt: string; sizes: string; priority?: boolean }) {
 const hero = name === "hero-advisory";
 const width = hero ? 1672 : 1254;
 const src = `/images/advisory/${name}`;
 return <picture className="cro-advisory-picture"><source type="image/webp" sizes={sizes} srcSet={`${src}-480.webp 480w, ${src}-800.webp 800w, ${src}.webp ${width}w`} /><Image src={`${src}.webp`} alt={alt} width={width} height={hero ? 941 : 1254} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} unoptimized /></picture>;
}
