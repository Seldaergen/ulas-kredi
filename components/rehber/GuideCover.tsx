"use client";
import { useState } from "react";
import Image from "next/image";
import { GUIDE_COVERS } from "@/lib/content/guide-covers";
import { GuideArtwork } from "@/components/inner-page";
export function GuideCover({slug,label,priority=false}:{slug:string;label:string;priority?:boolean}) {
 const [failed,setFailed]=useState(false);
 const src=GUIDE_COVERS[slug];
 if(!src || failed)return <GuideArtwork label={label}/>;
 return <div className="uk-guide-cover"><Image src={src} alt="" width={800} height={533} priority={priority} onError={()=>setFailed(true)}/></div>;
}
