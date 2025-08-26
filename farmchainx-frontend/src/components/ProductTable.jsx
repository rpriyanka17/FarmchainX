import React from 'react';
import { useProducts } from '../context/ProductsContext';
import { Link } from 'react-router-dom';

export default function ProductTable() {
  const { products, deleteProduct } = useProducts();

  if (products.length === 0) return <div>No products added yet.</div>;

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Crop Type</th>
          <th>Price</th>

          <th>Soil</th>
          <th>Pesticides</th>
          <th>Quality</th>
          <th>Harvest</th>
          <th>Location</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map(p => (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td>{p.status}</td>
            <td>{p.cropType}</td>
            <td>{p.soilType}</td>
            <td>{p.price}</td>
            <td>{p.pesticides}</td>
            <td>{p.quality}</td>
            <td>{p.harvestDate}</td>
            <td>{p.location}</td>
            <td>{p.price}</td>
            <td>
              <Link to={`/farmer/edit/${p.id}`}>Edit</Link>
              <button onClick={() => deleteProduct(p.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
