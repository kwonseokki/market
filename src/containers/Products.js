import React from 'react';
import PropTypes from 'prop-types';
import { ProductItem } from '../components';
const Products = ({products}) => {
    return (
        <div className='container'>
         {products.map(product=>(
           <ProductItem product={product} key={product.id} />
         ))}
        </div>
    )
}

Products.propTypes = {
  products:PropTypes.arrayOf(PropTypes.shape({
    id:PropTypes.string.isRequired,
    title:PropTypes.string.isRequired,
    content:PropTypes.string.isRequired,
    likes:PropTypes.number.isRequired,
    location:PropTypes.string.isRequired,
    url:PropTypes.string
  }))
}


export default Products;