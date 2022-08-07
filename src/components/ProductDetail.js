import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import "./style/productdetail.scss";
import { queryData } from "../lib/api";
import {useFetch} from '../hooks/useAsync';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteData } from "../lib/api";

const ModifyButton = ({docId, onDelete}) => {
  const history = useHistory();
  return (
    <div className="product-item-modify">
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic" style={{ border:'none', float:'right'}}>
      수정/삭제
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={()=> history.push(`/edit/${docId}`)}>수정</Dropdown.Item>
        <Dropdown.Item onClick={()=>{onDelete(docId)}}>삭제</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </div>
  )
}

const ProductDetail = ({props, onDelete}) => {
  const {match} = props;
  const docId = match.params.docid;
  const [state] = useFetch(queryData('product', docId), []);
  const user = useSelector(state => state.authReducer);
  const {loading, error, data} = state;

  if(loading) return (<div>데이터 가져오는중...</div>);
  if(error) return (<div>에러발생</div>);
  if(!data) return null;

  return (
    <div className="product-detail container">
      <div className="product-detail-image"></div>
      <div className="product-detail-user">
        <div>
          <img className="product-user-image"/>
        </div>
        <div className="product-user-text">
          <div className="product-user-price">
          <h3>{data[0].title}</h3>
          <h2><strong>{data[0].price}</strong>원</h2>
          </div>
          <div className="product-user-icon">
            {" "}
            <span>{data[0].location}</span>
            <span>{data[0].likes}</span>
          </div>
        </div>
      </div>

    {user.uid == data[0].uid ? <ModifyButton docId={docId} onDelete={onDelete}/> : null}

      <div className="product-detail-content">
        {data[0].content}
        
      </div>

      <button type="submit" class="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900">채팅하기</button>

    </div>
  );
};

export default ProductDetail;
