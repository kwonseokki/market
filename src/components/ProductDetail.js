import React from "react";
import "./style/productdetail.scss";
import { queryData } from "../lib/api";
import { useFetch } from "../hooks/useAsync";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import noUserImage from "../assets/no-user-image.png";
import noImage from "../assets/no-image.jpg";
import { Loading } from "./index";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import { BsFillPenFill } from "react-icons/bs";

const ModifyButton = ({ docId, onDelete }) => {
  const history = useHistory();
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full px-4 py-2 bg-white text-sm font-medium text-gray-700 focus:outline-none   ">
          <BsFillPenFill size="20" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <span
                  onClick={() => {
                    history.push(`/edit/${docId}`);
                  }}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  수정
                </span>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <span
                  onClick={() => {
                    onDelete(docId);
                  }}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block w-full text-left px-4 py-2 text-sm"
                  )}
                >
                  삭제
                </span>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const ProductDetail = ({ props, onDelete, createChat }) => {
  const { match } = props;
  const docId = match.params.docid;
  const [state] = useFetch(
    queryData("product", { filed: "id", operator: "==", value: docId }),
    []
  );
  const user = useSelector((state) => state.authReducer);
  const { uid } = user;
  const { loading, error, data } = state;
  const history = useHistory();
  
  // 채팅방 있는지 확인하는 함수
  const isChatRoom = async () => {
    const response = await queryData("chatroom", {
      filed: "who",
      operator: "array-contains",
      value: [uid, data[0].uid],
    });
    if (response.length >= 1) {
      // 쿼리결과 채팅방이 존재
      history.push(`/chatroom/${response[0].id}`); // 리턴받은 채팅방의 주소로 이동
    } else {
      createChat(data[0]); // 채팅방생성
    }
  };

  if (loading) return <Loading message={"상품정보 가져오는중"} />;
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
          style={
            data[0].userImage
              ? { background: `url(${data[0].userImage})` }
              : { background: `url(${noUserImage}) center center` }
          }
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
      <hr />
      <div className="product-info">
        <div className="product-info-top">
          <h2>{data[0].title}</h2>
          {user.uid == data[0].uid ? (
            <ModifyButton docId={docId} onDelete={onDelete} />
          ) : null}
        </div>
        <p>
          <span className="product-info-category">{data[0].category}</span>
        </p>
      </div>

      <div className="product-detail-content">{data[0].content}</div>
      {uid && uid !== data[0].uid && (
        <button
          onClick={() => {
            isChatRoom();
          }}
          type="submit"
          className="text-white bg-orange-300   font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
        >
          채팅하기
        </button>
      )}
    </div>
  );
};

export default ProductDetail;
