import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PackageCheck, ShoppingBag } from "lucide-react";
import ProductArtwork from "../components/ProductArtwork";
import { formatINR, getOrders, getProductById } from "../services/groceryStore";

export default function Orders() {
  const [orders] = useState(getOrders);

  return (
    <section className="page-section orders-page">
      <div className="page-title"><span className="eyebrow">YOUR RECIPEBOX GROCERY</span><h1>My Orders</h1><p>Order history from your RecipeBox Grocery Store checkouts.</p></div>
      {!orders.length ? <div className="empty-state"><ShoppingBag size={36}/><h2>No orders yet</h2><p>Your completed demo checkouts will appear here.</p><Link className="btn primary" to="/shopping-list">Explore the grocery store</Link></div> : <div className="orders-list">{orders.map(order => <article className="order-history-card" key={order.id}>
        <div className="order-history-header"><div><span className="eyebrow">{order.id}</span><h2>{new Date(order.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</h2></div><span className="order-status"><PackageCheck size={15}/>{order.status}</span></div>
        <div className="order-history-products">{order.items.map(item => {
          const product = getProductById(item.productId);
          return <div className="order-history-product" key={item.productId}>{product ? <ProductArtwork product={product} className="order-history-art"/> : <span className="order-history-art-fallback">🛒</span>}<span>{item.name}<small>{item.quantity} × {formatINR(item.price)}</small></span></div>;
        })}</div>
        <div className="order-history-footer"><span>{order.paymentMethod}</span><strong>{formatINR(order.total)}</strong><Link to={`/order-success/${order.id}`}>Order details <span aria-hidden="true">→</span></Link></div>
      </article>)}</div>}
    </section>
  );
}
