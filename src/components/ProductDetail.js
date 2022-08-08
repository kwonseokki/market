import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "./style/productdetail.scss";
import { queryData } from "../lib/api";
import { useFetch } from "../hooks/useAsync";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteData } from "../lib/api";
import noUserImage from "../assets/no-user-image.png";
import noImage from "../assets/no-image.jpg";
const ModifyButton = ({ docId, onDelete }) => {
  const history = useHistory();
  return (
    <div className=" product-item-modify">
      <Dropdown>
        <Dropdown.Toggle
          id="dropdown-basic"
          style={{ border: "none", float: "right" }}
        >
          수정/삭제
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => history.push(`/edit/${docId}`)}>
            수정
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              onDelete(docId);
            }}
          >
            삭제
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

const ProductDetail = ({ props, onDelete, createChat}) => {
  const { match } = props;
  const docId = match.params.docid;
  const [state] = useFetch(queryData("product", {filed:'id',operator:'==', value:docId}), []);
  const user = useSelector((state) => state.authReducer);
  const { loading, error, data } = state;

  if (loading) return <div>데이터 가져오는중...</div>;
  if (error) return <div>에러발생</div>;
  if (!data) return null;

  return (
    <div className="item-container product-detail container">
      <div className="product-detail-image">
        <img src={data[0].url !== null ? data[0].url : noImage} />
      </div>
      <div className="product-detail-user">
        <div
          className="product-user-image"
          style={{
            background: `url(${noUserImage}) center center`,
            backgroundSize: "cover",
          }}
        ></div>

        <div className="product-user-text">
          <div className="product-user-price">
            <p>{data[0].displayName}</p>
            <h2>
              <strong>{data[0].price}</strong>원
            </h2>
          </div>
          <div className="product-user-icon">
            {" "}
            <span>{data[0].location}</span>
          </div>
        </div>
      </div>
      <div className="product-info">
        <h2>{data[0].title}</h2>
        <p>
          <span className="product-info-category">{data[0].category}</span>
        </p>
      </div>
      {user.uid == data[0].uid ? (
        <ModifyButton docId={docId} onDelete={onDelete} />
      ) : null}

      <div className="product-detail-content">{data[0].content}</div>

      <button onClick={()=>{createChat(data[0])}}
        type="submit"
        class="text-white bg-orange-300   font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
      >
        채팅하기
      </button>
    </div>
  );
};

export default ProductDetail;
