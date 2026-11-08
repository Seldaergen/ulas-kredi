"use client";
import type { TopicId } from "@/lib/topics/topics";
import { getTopicById } from "@/lib/topics/topics";
import { GuideCover } from "./GuideCover";

// Retain the legacy interface without probing missing URLs or substituting unrelated photos.
export default function CoverImageClient({slug,topicId,alt,className="",priority=false}: {
 slug:string;coverImage?:string|null;topicId?:TopicId|null;alt:string;className?:string;priority?:boolean;
}) {
 return <div className={className}><GuideCover slug={slug} label={topicId?getTopicById(topicId)?.title??alt:alt} priority={priority}/></div>;
}
