import React from 'react';
import PropTypes from 'prop-types';
import { ProductItem } from '../components';
import { Link } from 'react-router-dom';
const Products = ({products}) => {
    return (
        <div className='container'>
         {products.map((product, index)=>(
          <Link to={`/detail/${product.id}`}><ProductItem product={product} key={index}/></Link>
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