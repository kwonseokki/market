import "./App.css";
import { useState, useEffect } from "react";
import { Header, PageNotFound, ProductDetail } from "./components";
import { Products, Upload } from "./containers";
import { useFetch } from "./hooks/useAsync";
import { getData, uploadData, getUrl } from "./lib/api";
import { Route } from "react-router-dom";
import { Switch, useHistory } from "react-router-dom";
import {useInput} from './hooks/useInput';
import {initialForm} from './assets/initialForm';
import { Link } from "react-router-dom";


function App() {
  const [toggle, setToggle]= useState(false);
  const [state] = useFetch(getData("product"), [toggle]);
  const { loading, error, data } = state;
  const [form, onChange] = useInput(initialForm);
  const [imgUrl, setImgUrl] = useState();
  const history = useHistory();
 
  const selecteImage = e => {
    e.preventDefault();
    const file = e.target.files[0];
    setImgUrl(file);
  }

  // 상품업로드
  const onSubmit = async (e) => {
      e.preventDefault();
      const url = await getUrl(imgUrl);
      await uploadData('product', form, url);
      setToggle(!toggle);
      history.push('/');
  }

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러발생 페이지를 리로드 해주세요.</div>;
  if (!data) return null;

  return (
    <div className="App">
      <Header />
      
      <Link to='/upload' className="move-upload-page">글쓰기 버튼</Link>
     <Switch>
      <Route path='/' render={()=> <Products products={data} />}exact/>
      <Route path="/upload" render={()=> <Upload onChange={onChange} onSubmit={onSubmit} selecteImage={selecteImage}/>} />
      <Route path="/detail" render={()=> <ProductDetail/>} />
      <Route  render={()=> <PageNotFound/>} />
      </Switch>
    </div>
  );
}

export default App;
