import React from 'react';
import PropTypes from 'prop-types';
import { ProductItem } from '../components';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Products = ({products}) => {
  const history = useHistory();
    return (
        <div bg="dark" className='item-container  container product-container'>
         {products.map((product, index)=>(
          <article onClick={()=>{history.push(`/detail/${product.id}`)}}><ProductItem product={product} key={index}/></article>
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