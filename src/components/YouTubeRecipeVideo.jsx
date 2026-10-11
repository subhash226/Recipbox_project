import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Play } from "lucide-react";
import { slugify } from "../services/groceryStore";

export function getYouTubeId(value) {
  if (!value || typeof value !== "string") return null;
  try {
    const url = new URL(value.trim());
    const host = url.hostname.replace(/^www\./, "").toLowerCase();
    let id = null;
    if (host === "youtu.be") id = url.pathname.split("/").filter(Boolean)[0];
    else if (["youtube.com", "m.youtube.com", "youtube-nocookie.com"].includes(host)) {
      if (url.pathname === "/watch") id = url.searchParams.get("v");
      else if (/^\/(embed|shorts)\//.test(url.pathname)) id = url.pathname.split("/")[2];
    }
    return id && /^[\w-]{11}$/.test(id) ? id : null;
  } catch { return null; }
}

export default function YouTubeRecipeVideo({ youtubeUrl, videoUrl, title = "Recipe video" }) {
  const [playing, setPlaying] = useState(false);
  const id = getYouTubeId(youtubeUrl);
  const shopLink = `/shopping-list?recipe=${slugify(title)}`;
  if (videoUrl) return <div className="youtube-card"><h2>🎥 Watch Recipe Video</h2><video className="youtube-frame uploaded-video" controls playsInline preload="metadata" src={videoUrl}>Your browser does not support video playback.</video><div className="video-caption"><b>{title}</b><span>Shared by the recipe creator</span></div><Link className="btn primary shop-recipe-link" to={shopLink}>Shop Ingredients</Link></div>;
  if (!youtubeUrl) return <div className="video-unavailable">Video not available for this recipe.<Link className="btn primary shop-recipe-link" to={shopLink}>Shop Ingredients</Link></div>;
  if (!id) return <div className="video-unavailable">This video link is invalid or unavailable.<Link className="btn primary shop-recipe-link" to={shopLink}>Shop Ingredients</Link></div>;
  return <div className="youtube-card"><h2>🎥 Watch Recipe Video</h2>
    {playing ? <iframe className="youtube-frame" src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /> :
      <button className="video-thumb" onClick={() => setPlaying(true)} aria-label={`Play ${title}`} style={{ backgroundImage: `url(https://img.youtube.com/vi/${id}/hqdefault.jpg)` }}><span><Play fill="currentColor" /></span></button>}
    <div className="video-caption"><b>{title}</b><a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noreferrer">▶ Watch on YouTube <ExternalLink size={15}/></a></div>
    <Link className="btn primary shop-recipe-link" to={shopLink}>Shop Ingredients</Link>
  </div>;
}
