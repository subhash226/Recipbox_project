import React, { useEffect, useState } from "react";
import { ImagePlus, ShoppingBasket, Trash2 } from "lucide-react";
import { api } from "../services/api";

function normalize(item) {
  return { ...item, id: item._id || item.id, quantity: Number(item.quantity) || 1, price: Number(item.price) || 0, image: item.image || "" };
}

export default function PersonalIngredientsList() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [message, setMessage] = useState("");

  const refresh = async () => {
    try {
      const { items: nextItems = [] } = await api("/users/shopping-list", { auth: true });
      setItems(nextItems.map(normalize));
    } catch (error) {
      setMessage(error.message);
    }
  };
  useEffect(() => { refresh(); }, []);

  const add = async () => {
    if (!newItem.trim()) return;
    try {
      await api("/users/shopping-list", { method: "POST", body: { text: newItem.trim() }, auth: true });
      setNewItem("");
      await refresh();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const update = async (item, body) => {
    try {
      const { item: updated } = await api(`/users/shopping-list/${item.id}`, { method: "PATCH", body, auth: true });
      setItems(current => current.map(entry => entry.id === item.id ? normalize(updated) : entry));
    } catch (error) {
      setMessage(error.message);
    }
  };

  const remove = async item => {
    try {
      await api(`/users/shopping-list/${item.id}`, { method: "DELETE", auth: true });
      setItems(current => current.filter(entry => entry.id !== item.id));
    } catch (error) {
      setMessage(error.message);
    }
  };

  const choosePhoto = async (item, event) => {
    const file = event.target.files?.[0];
    if (!file || file.size > 10 * 1024 * 1024 || !file.type.startsWith("image/")) {
      if (file) setMessage("Choose an image smaller than 10 MB.");
      return;
    }
    const bitmap = await createImageBitmap(file);
    const canvas = document.createElement("canvas");
    const scale = Math.min(1, 700 / Math.max(bitmap.width, bitmap.height));
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const image = canvas.toDataURL("image/jpeg", 0.72);
    if (image.length > 120000) {
      setMessage("Choose a smaller image and try again.");
      return;
    }
    await update(item, { image });
  };

  return (
    <details className="personal-list-section">
      <summary><span><ShoppingBasket size={18}/> My saved ingredient list</span><small>Personal checklist</small></summary>
      <div className="personal-list-content">
        <div className="personal-list-add"><input value={newItem} onChange={event => setNewItem(event.target.value)} onKeyDown={event => event.key === "Enter" && add()} placeholder="Add a checklist item..."/><button type="button" onClick={add}>Add item</button></div>
        {message && <p className="form-message" role="alert">{message}</p>}
        {items.length ? items.map(item => <div className={`personal-list-row ${item.done ? "done" : ""}`} key={item.id}>
          <label><input type="checkbox" checked={item.done} onChange={() => update(item, { done: !item.done })}/><span>{item.text}</span></label>
          {item.image && <img src={item.image} alt={`${item.text} product`} />}
          <input type="number" min="1" max="1000" step="1" value={item.quantity} aria-label={`Quantity for ${item.text}`} onChange={event => update(item, { quantity: Number(event.target.value) || 1 })}/>
          <input type="number" min="0" max="1000000" step="0.01" value={item.price} aria-label={`Price for ${item.text}`} onChange={event => update(item, { price: Number(event.target.value) || 0 })}/>
          <label className="personal-photo-button" title={`Add photo for ${item.text}`}><ImagePlus size={17}/><input type="file" accept="image/*" onChange={event => choosePhoto(item, event)}/></label>
          <button type="button" onClick={() => remove(item)} aria-label={`Remove ${item.text}`}><Trash2 size={16}/></button>
        </div>) : <p className="personal-list-empty">No saved checklist items yet. Add ingredients from a recipe or create one here.</p>}
      </div>
    </details>
  );
}
