import React, { useEffect, useMemo, useState } from "react";
import { useFetch } from "../hooks/useAsync";
import { queryData } from "../lib/api";
import { Loading } from "../components";
import { ProductItem } from "../components";
import '../components/style/search.scss';
import { useHistory } from "react-router-dom";
const Search = () => {
  const [value, setValue] = useState();
  const [isSearch, setIsSearch] = useState(false);
  const history = useHistory();
  const [state] = useFetch(queryData('product', {
    filed:'title',
    operator:'==',
    value:value
  }), [isSearch]);
  const { loading, error, data } = state;

  if(loading) return (<Loading message={'상품정보 가져오는중'}/>);
 
  return (
    <div className="item-container container">
    
      <form onSubmit={(e)=>{e.preventDefault(); setIsSearch(!isSearch)}}>
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
        ></label>
        <div class="relative">
          <div class="flex absolute inset-y-0  items-center pl-3 pointer-events-none" style={{left:'150px'}}>
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
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
          onChange={(e)=>{setValue(e.target.value)}}
            type="search"
            id="default-search"
            class="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:text-white"
            placeholder="상품명을 검색해주세요"
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
      {data && data.map(product=>(
       <span onClick={()=>{history.push(`/detail/${product.id}`)}}><ProductItem  product={product}/></span> 
      ))}
  
      </ul>
    </div>
  );
};

export default Search;
