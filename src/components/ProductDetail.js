import React from "react";
import "./style/productdetail.scss";
const ProductDetail = () => {
  return (
    <div className="product-detail container">
      <div className="product-detail-image"></div>
      <div className="product-detail-user">
        <div>
          <img className="product-user-image"/>
        </div>
        <div className="product-user-text">
          <h3>상품명</h3>
          <div className="product-user-icon">
            {" "}
            <span>지역</span>
            <span>좋아요</span>
          </div>
        </div>
      </div>

      <div className="product-detail-content">
          컨텐츠
      </div>

      <button type="submit" class="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900">채팅하기</button>

    </div>
  );
};

export default ProductDetail;
