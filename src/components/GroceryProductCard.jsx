import React from "react";
import { Heart, Minus, Plus, Star } from "lucide-react";
import { formatINR } from "../services/groceryStore";
import ProductArtwork from "./ProductArtwork";

export default function GroceryProductCard({ product, quantity = 0, wishlisted, requiredQuantity, onAdd, onQuantity, onWishlist, onDetails }) {
  return (
    <article className="grocery-product-card">
      <div className="grocery-product-media">
        <button className="product-detail-trigger" type="button" onClick={onDetails} aria-label={`View ${product.name} details`}>
          <ProductArtwork product={product} />
        </button>
        {product.originalPrice && <span className="discount-badge">{Math.round((1 - product.price / product.originalPrice) * 100)}% off</span>}
        <button className={`wishlist-button ${wishlisted ? "wishlisted" : ""}`} type="button" onClick={onWishlist} aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`} title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}>
          <Heart size={18} fill={wishlisted ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="grocery-product-body">
        <div className="product-sku-row"><span>{product.id}</span><span><Star size={13} fill="currentColor" /> {product.rating} <small>({product.reviewCount})</small></span></div>
        <button className="product-name-button" type="button" onClick={onDetails}>{product.name}</button>
        <p className="product-description">{product.description}</p>
        <div className="product-meta-row"><span>{product.category}</span><span>{product.unit}</span></div>
        {requiredQuantity && <div className="required-quantity">Recipe needs <b>{requiredQuantity}</b></div>}
        <div className="product-buy-row">
          <div className="product-price"><strong>{formatINR(product.price)}</strong>{product.originalPrice && <del>{formatINR(product.originalPrice)}</del>}</div>
          {quantity > 0 ? <div className="quantity-control" aria-label={`Cart quantity ${quantity}`}>
            <button type="button" onClick={() => onQuantity(quantity - 1)} aria-label={`Remove one ${product.name}`}><Minus size={15} /></button>
            <span>{quantity}</span>
            <button type="button" onClick={() => onQuantity(quantity + 1)} aria-label={`Add one ${product.name}`}><Plus size={15} /></button>
          </div> : <button className="add-cart-button" type="button" onClick={onAdd}><Plus size={15} /> Add to cart</button>}
        </div>
      </div>
    </article>
  );
}
