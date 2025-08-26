import React, { useState } from 'react';
import { useProducts } from '../context/ProductsContext';

export default function ProductForm({ initial, onSubmit, submitLabel = 'Save' }) {
  const { createProduct, updateProduct } = useProducts();
  const [form, setForm] = useState(initial || {
    name: '', price: '', image: '',
    owner: 'Farmer', cropType: '', soilType: '',
    pesticides: '', quality: '', harvestDate: '', location: ''
  });

  const handle = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const submit = e => {
    e.preventDefault();
    if (!form.name || !form.price) return alert('Name and Price are required');

    if (initial) {
      updateProduct(initial.id, form);
    } else {
      createProduct(form);
    }
    if (onSubmit) onSubmit(form);
  };

  return (
    <form onSubmit={submit} className="product-form">
      <input name="name" placeholder="Name" value={form.name} onChange={handle} />
      <input name="price" type="number" placeholder="Price" value={form.price} onChange={handle} />
      <input name="image" placeholder="Image URL" value={form.image} onChange={handle} />
      <input name="cropType" placeholder="Crop Type" value={form.cropType} onChange={handle} />
      <input name="soilType" placeholder="Soil Type" value={form.soilType} onChange={handle} />
      <input name="pesticides" placeholder="Pesticides" value={form.pesticides} onChange={handle} />
      <input name="quality" placeholder="Quality" value={form.quality} onChange={handle} />
      <input name="harvestDate" type="date" value={form.harvestDate} onChange={handle} />
      <input name="location" placeholder="GPS/Location" value={form.location} onChange={handle} />
      <button type="submit">{submitLabel}</button>
    </form>
  );
}
