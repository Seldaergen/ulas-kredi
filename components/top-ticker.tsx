import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function TopTicker() {
 return <div className="ef-top-note"><span>ULAŞ KREDİ / FİNANSAL REHBERLİK</span><Link href="/rehber">Rehberi keşfedin <ArrowUpRight size={13}/></Link></div>;
}
