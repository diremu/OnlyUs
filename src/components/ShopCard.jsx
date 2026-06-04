// src/components/ShopCard.jsx
import React from "react";

const ShopCard = ({ item, heightCls }) => {
  if (!item) return null;

  return (
    <div className={`shop-card ${heightCls}`}>
      <img src={item.src} alt={item.name} loading="lazy" />
      <div className="shop-card-tag">{item.name}</div>
    </div>
  );
};

export default ShopCard;