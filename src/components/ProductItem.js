import React from "react";
import "./style/productitem.scss";
import noImage from '../assets/no-image.jpg'
const ProductItem = ({ product }) => {
  const { title, id, url, likes, location, price } = product;
  return (
    <div className="product-item-container">
      <div className="product-item-image">
        <img src={url !== null ? url : noImage}/>
      </div>
      <div className="product-item-text">
        <h5>{title}</h5>
        <span>
          <strong>{price}</strong>원
        </span>
        <span className="product-item-location">{location}</span>
      </div>
    </div>
  );
};

export default ProductItem;
