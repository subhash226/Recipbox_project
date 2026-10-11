import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, LockKeyhole, ShoppingCart } from "lucide-react";
import { useGroceryCart } from "../context/GroceryCartContext";
import { createOrder, formatINR, getOrderTotals, getProductById } from "../services/groceryStore";
import ProductArtwork from "../components/ProductArtwork";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart } = useGroceryCart();
  const products = cart.map(line => ({ ...line, product: getProductById(line.productId) })).filter(line => line.product);
  const totals = getOrderTotals(cart);

  const placeOrder = event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      const order = createOrder({
        customer: {
          fullName: String(form.get("fullName")).trim(),
          mobile: String(form.get("mobile")).trim(),
          email: String(form.get("email")).trim(),
          address: String(form.get("address")).trim(),
          city: String(form.get("city")).trim(),
          pincode: String(form.get("pincode")).trim()
        },
        paymentMethod: form.get("paymentMethod")
      });
      navigate(`/order-success/${order.id}`);
    } catch (error) {
      window.dispatchEvent(new CustomEvent("recipebox-toast", { detail: error.message }));
    }
  };

  if (!products.length) return <section className="page-section empty-state checkout-empty"><ShoppingCart size={36}/><h1>Your cart is empty</h1><p>Add some groceries before checking out.</p><Link className="btn primary" to="/shopping-list">Browse grocery store</Link></section>;

  return (
    <section className="page-section checkout-page">
      <Link to="/shopping-list" className="back-link"><ArrowLeft size={15}/> Continue shopping</Link>
      <div className="checkout-heading"><span className="eyebrow">RECIPEBOX GROCERY</span><h1>Checkout</h1><p>Confirm your delivery details and order summary.</p></div>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={placeOrder}>
          <section className="checkout-section"><h2>Customer details</h2><div className="checkout-fields">
            <label>Full name<input name="fullName" required maxLength={100} autoComplete="name" /></label>
            <label>Mobile number<input name="mobile" required type="tel" inputMode="numeric" pattern="[0-9+() -]{8,18}" autoComplete="tel" /></label>
            <label>Email<input name="email" required type="email" maxLength={160} autoComplete="email" /></label>
            <label className="checkout-wide">Delivery address<textarea name="address" required maxLength={400} autoComplete="street-address" /></label>
            <label>City<input name="city" required maxLength={80} autoComplete="address-level2" /></label>
            <label>Pincode<input name="pincode" required inputMode="numeric" pattern="[0-9]{5,8}" autoComplete="postal-code" /></label>
          </div></section>
          <fieldset className="checkout-section payment-section"><legend>Payment method</legend>
            <label className="payment-option"><input type="radio" name="paymentMethod" value="Cash on Delivery" defaultChecked /><span><b>Cash on Delivery</b><small>Pay when your order arrives</small></span></label>
            <label className="payment-option"><input type="radio" name="paymentMethod" value="UPI" /><span><b>UPI</b><small>Demo payment selection</small></span></label>
            <label className="payment-option"><input type="radio" name="paymentMethod" value="Card" /><span><b>Card</b><small>Demo payment selection</small></span></label>
          </fieldset>
          <button className="btn primary place-order-button" type="submit"><LockKeyhole size={17}/> Place Order · {formatINR(totals.total)}</button>
          <p className="checkout-demo-note">Demo checkout only. No payment will be collected.</p>
        </form>
        <aside className="checkout-summary"><h2>Order summary <span>{products.reduce((sum, line) => sum + line.quantity, 0)} items</span></h2>
          <div className="checkout-product-list">{products.map(line => <div className="checkout-product" key={line.productId}><ProductArtwork product={line.product} className="checkout-product-art"/><div><b>{line.product.name}</b><small>{line.quantity} × {formatINR(line.product.price)}</small></div><strong>{formatINR(line.product.price * line.quantity)}</strong></div>)}</div>
          <div className="checkout-totals"><div><span>Subtotal</span><b>{formatINR(totals.subtotal)}</b></div><div><span>Delivery fee</span><b>{totals.deliveryFee ? formatINR(totals.deliveryFee) : "Free"}</b></div><div><span>Discount</span><b className="discount-value">−{formatINR(totals.discount)}</b></div><div className="checkout-grand-total"><span>Total amount</span><strong>{formatINR(totals.total)}</strong></div></div>
        </aside>
      </div>
    </section>
  );
}
