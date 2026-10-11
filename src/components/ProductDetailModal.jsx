import React, { useState } from "react";
import { Minus, Plus, ShoppingCart, Star, X } from "lucide-react";
import { formatINR } from "../services/groceryStore";
import ProductArtwork from "./ProductArtwork";

export default function ProductDetailModal({ product, onClose, onAdd }) {
  const [quantity, setQuantity] = useState(1);
  if (!product) return null;
  const handleBackdrop = event => { if (event.target === event.currentTarget) onClose(); };

  return (
    <div className="product-modal-scrim" onMouseDown={handleBackdrop}>
      <section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-modal-title">
        <button className="product-modal-close" type="button" onClick={onClose} aria-label="Close product details"><X size={20}/></button>
        <ProductArtwork product={product} className="product-modal-art" />
        <div className="product-modal-content">
          <span className="eyebrow">{product.category} · {product.id}</span>
          <h2 id="product-modal-title">{product.name}</h2>
          <p>{product.description}</p>
          <div className="product-modal-rating"><Star size={17} fill="currentColor"/> {product.rating} <span>({product.reviewCount} reviews)</span></div>
          <div className="product-modal-facts"><span>Pack size <b>{product.unit}</b></span><span>Availability <b>{product.stock > 0 ? "In stock" : "Out of stock"}</b></span></div>
          <div className="product-modal-price"><strong>{formatINR(product.price)}</strong>{product.originalPrice && <del>{formatINR(product.originalPrice)}</del>}</div>
          <div className="product-modal-actions"><div className="quantity-control"><button type="button" onClick={() => setQuantity(value => Math.max(1, value - 1))} aria-label="Decrease quantity"><Minus size={15}/></button><span>{quantity}</span><button type="button" onClick={() => setQuantity(value => Math.min(99, value + 1))} aria-label="Increase quantity"><Plus size={15}/></button></div><button className="btn primary" type="button" disabled={!product.stock} onClick={() => { onAdd(product.id, quantity); onClose(); }}><ShoppingCart size={17}/> Add to Cart</button></div>
  </div>
      </section>
    </div>
  );
}
