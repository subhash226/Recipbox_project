import React from "react";
import { Link, useParams } from "react-router-dom";
import { Check, PackageCheck } from "lucide-react";
import { formatINR, getOrders } from "../services/groceryStore";

export default function OrderSuccess() {
  const { orderId } = useParams();
  const order = getOrders().find(item => item.id === orderId);
  if (!order) return <section className="page-section empty-state"><h1>Order not found</h1><Link className="btn primary" to="/orders">View My Orders</Link></section>;

  return (
    <section className="order-success-page">
      <div className="order-success-mark"><Check size={36}/></div>
      <span className="eyebrow">ORDER CONFIRMED</span>
      <h1>Order Placed Successfully!</h1>
      <p>Thank you for shopping with RecipeBox.</p>
      <div className="order-success-details"><span>Order ID</span><strong>{order.id}</strong><span>Order total</span><strong>{formatINR(order.total)}</strong><span>Payment</span><strong>{order.paymentMethod}</strong><span>Estimated delivery</span><strong>3–5 Business Days</strong></div>
      <div className="order-success-delivery"><PackageCheck size={20}/><span>Your groceries are being prepared for delivery.</span></div>
      <div className="order-success-actions"><Link className="btn primary" to="/shopping-list">Continue Shopping</Link><Link className="btn secondary" to="/orders">View My Orders</Link></div>
    </section>
  );
}
