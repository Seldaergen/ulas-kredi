import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { PUBLISHED_POSTS } from "@/lib/content/posts";
import { publication } from "@/lib/content/publication";
export default function FeaturedContent() {
 const posts=[...PUBLISHED_POSTS].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,6);
 return <section className="ef-editorial ef-wrap" aria-labelledby="ef-editorial-title"><div className="ef-section-heading"><div><p className="ef-eyebrow">FİNANSAL OKURYAZARLIK</p><h2 id="ef-editorial-title">Bilgiyle daha iyi kararlar.</h2><p>Kaynakları belirtilen rehberler. Canlı haber veya piyasa veri akışı değildir.</p></div><Link className="ef-text-link" href="/rehber">Tüm rehberler <ArrowUpRight size={20}/></Link></div>
 <div className="ef-editorial-track" tabIndex={0} aria-label="Rehberler; yatay kaydırılabilir">{posts.map((post,i)=><article key={post.slug} className="ef-story"><div className={`ef-story-art ef-art-${i%3}`} aria-hidden="true"><BookOpen size={48} strokeWidth={1}/><span>ULAŞ / REHBER</span><b>{String(i+1).padStart(2,"0")}</b></div><div className="ef-story-body"><p className="ef-eyebrow">{post.category} · {post.readingTime}</p><h3><Link href={`/rehber/${encodeURIComponent(post.slug)}`}>{post.title}<ArrowUpRight size={18}/></Link></h3><p>{post.excerpt}</p><footer><time dateTime={post.date}>{new Intl.DateTimeFormat("tr-TR",{day:"numeric",month:"long",year:"numeric",timeZone:"UTC"}).format(new Date(post.date))}</time><span>Ulaş Kredi Rehber</span></footer><p className="ef-story-source">Kaynak: {publication(post).sources.map(source=>source.title).join(" · ")}</p></div></article>)}</div></section>;
}
