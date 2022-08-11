import React, { useEffect, useMemo, useState } from "react";
import { useFetch } from "../hooks/useAsync";
import { queryData } from "../lib/api";
import { Loading } from "../components";
import { ProductItem } from "../components";
import "../components/style/search.scss";
import { useHistory } from "react-router-dom";
const Search = () => {
  const [value, setValue] = useState();
  const [isSearch, setIsSearch] = useState(false);
  const history = useHistory();
  const [state] = useFetch(
    queryData("product", {
      filed: "title",
      operator: "==",
      value: value,
    }),
    [isSearch]
  );
  const { loading, error, data } = state;
  
  if (loading) return <Loading message={"상품정보 가져오는중"} />;
  
  return (
    <div className="item-container container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsSearch(!isSearch);
        }}
      >
        <label
          for="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
        ></label>
        <div className="relative">
          <div
            className="flex absolute inset-y-0  items-center pl-3 pointer-events-none"
        
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            onChange={(e) => {
              setValue(e.target.value);
            }}
            type="search"
            id="default-search"
            className="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:text-white"
            required
          />
          <button
            type="submit"
            class="text-white absolute right-2.5 bottom-2.5   focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 "
            style={{ background: "#FDBA74" }}
          >
            검색
          </button>
        </div>
      </form>

      <ul className="search-list">
        {data === null && <div className="search-result">검색을 해주세요</div>}
        {data && data.length == 0 && <div className="search-result">검색결과가 존재하지 않습니다.</div>}
        {data && data.length >= 1 && <div className="search-result">{data.length}건의 검색결과가 있습니다.</div>}
        {data &&
          data.map((product , index) => (
            <span key={index}
              onClick={() => {
                history.push(`/detail/${product.id}`);
              }}
            >
              <ProductItem product={product} />
            </span>
          ))}
      </ul>
    </div>
  );
};

export default Search;
