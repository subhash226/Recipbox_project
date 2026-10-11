import React from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { formatINR, getOrderTotals, getProductById } from "../services/groceryStore";
import { useGroceryCart } from "../context/GroceryCartContext";
import ProductArtwork from "./ProductArtwork";

export default function CartDrawer({ open, onClose }) {
  const { cart, setQuantity, removeFromCart } = useGroceryCart();
  if (!open) return null;
  const lines = cart.map(line => ({ ...line, product: getProductById(line.productId) })).filter(line => line.product);
  const totals = getOrderTotals(cart);

  return (
    <div className="cart-drawer-scrim" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-drawer-title">
        <div className="cart-drawer-header"><div><span className="eyebrow">RECIPEBOX GROCERY</span><h2 id="cart-drawer-title">Your Cart <small>({cart.reduce((sum, line) => sum + line.quantity, 0)})</small></h2></div><button className="icon-btn" type="button" onClick={onClose} aria-label="Close cart"><X size={20}/></button></div>
        {lines.length ? <>
          <div className="cart-drawer-lines">{lines.map(line => <div className="cart-drawer-line" key={line.productId}>
            <ProductArtwork product={line.product} className="cart-line-art" />
            <div className="cart-line-info"><b>{line.product.name}</b><small>{formatINR(line.product.price)} · {line.product.unit}</small><div className="quantity-control compact-quantity"><button type="button" onClick={() => setQuantity(line.productId, line.quantity - 1)} aria-label={`Remove one ${line.product.name}`}><Minus size={13}/></button><span>{line.quantity}</span><button type="button" onClick={() => setQuantity(line.productId, line.quantity + 1)} aria-label={`Add one ${line.product.name}`}><Plus size={13}/></button></div></div>
            <div className="cart-line-end"><b>{formatINR(line.product.price * line.quantity)}</b><button type="button" onClick={() => removeFromCart(line.productId)} aria-label={`Remove ${line.product.name}`}><Trash2 size={15}/></button></div>
          </div>)}</div>
          <div className="cart-drawer-totals"><div><span>Subtotal</span><b>{formatINR(totals.subtotal)}</b></div><div><span>Delivery fee</span><b>{totals.deliveryFee ? formatINR(totals.deliveryFee) : "Free"}</b></div><div><span>Discount</span><b className="discount-value">−{formatINR(totals.discount)}</b></div><div className="cart-grand-total"><span>Total</span><b>{formatINR(totals.total)}</b></div></div>
          <Link className="btn primary full checkout-link" to="/checkout" onClick={onClose}>Proceed to Checkout</Link>
          <button className="continue-shopping" type="button" onClick={onClose}>Continue Shopping</button>
        </> : <div className="cart-empty"><ShoppingBag size={36}/><h3>Your cart is empty</h3><p>Choose ingredients and kitchen essentials to get started.</p><button className="btn primary" type="button" onClick={onClose}>Explore Store</button></div>}
      </aside>
    </div>
  );
}
