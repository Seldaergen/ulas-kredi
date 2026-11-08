import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getTopicById } from "@/lib/topics/topics";
import type { Post } from "@/lib/content/posts";
import { GuideCover } from "./GuideCover";
export default function RehberCard({post}:{post:Post}) {
 const topic=getTopicById(post.topicId);
 return <Link href={`/rehber/${encodeURIComponent(post.slug)}`} className="ef-guide-card"><GuideCover slug={post.slug} label={topic?.title??"Kredi rehberi"}/><div className="ef-guide-card-body"><p className="ef-eyebrow">{topic?.title ?? post.category}{post.readingTime ? " · " + post.readingTime : ""}</p><h2>{post.title}</h2><p>{post.excerpt}</p><footer><time dateTime={post.date}>{new Intl.DateTimeFormat("tr-TR",{day:"numeric",month:"long",year:"numeric",timeZone:"UTC"}).format(new Date(post.date))}</time><span>Rehberi okuyun <ArrowUpRight size={15}/></span></footer></div></Link>;
}
