import React, { useState } from "react";

export default function ProductArtwork({ product, className = "" }) {
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <div className={`product-artwork ${className}`} style={{ "--product-bg": product.image.background, "--product-accent": product.image.accent }} role="img" aria-label={`${product.name} illustration`}>
      {product.image.src && !imageFailed ? <img className="product-photo-image" src={product.image.src} alt={product.name} loading="lazy" onError={() => setImageFailed(true)} /> : <span aria-hidden="true">{product.image.emoji}</span>}
      <small>{product.category}</small>
    </div>
  );
}
