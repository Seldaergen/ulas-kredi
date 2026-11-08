"use client";
import { useState } from "react";
import { GUIDE_COVERS } from "@/lib/content/guide-covers";
import { GuideArtwork } from "@/components/inner-page";
export function GuideCover({slug,label,priority=false}:{slug:string;label:string;priority?:boolean}) {
 const [failed,setFailed]=useState(false);
 const src=GUIDE_COVERS[slug];
 if(!src || failed)return <GuideArtwork label={label}/>;
 return <div className="uk-guide-cover"><img src={src} alt="" width="800" height="533" loading={priority?"eager":"lazy"} decoding="async" onError={()=>setFailed(true)}/></div>;
}
