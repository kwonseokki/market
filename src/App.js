import "./App.css";
import { useState, useEffect } from "react";
import { Header, Login, PageNotFound, ProductDetail, Register } from "./components";
import { Products, Upload, EditPage } from "./containers";
import { useFetch } from "./hooks/useAsync";
import { getData, uploadData, getUrl } from "./lib/api";
import { Route } from "react-router-dom";
import { Switch, useHistory } from "react-router-dom";
import { useInput } from "./hooks/useInput";
import { initialForm } from "./assets/initialForm";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteData } from "./lib/api";

function App() {
  const [toggle, setToggle] = useState(false);
  const [state] = useFetch(getData("product"), [toggle]);
  const { loading, error, data } = state;
  const [form, onChange, reset] = useInput(initialForm);
  const [loggedIn, setLoggedIn] = useState(false);
  const [imgUrl, setImgUrl] = useState();
  const history = useHistory();
  const user = useSelector(state=>state.authReducer);
    // 이미지 url 상태 임시저장
  const selecteImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setImgUrl(file);
  };

  // 상품업로드
  const onSubmit = async (e) => {
    e.preventDefault();
    const url = await getUrl(imgUrl); // 데이터베이스 저장된 url 비동기로 받아옴
    await uploadData("product", form, url, user.uid); // 데이터베이스에 새정보 업로드
    setToggle(!toggle); 
    reset();
    history.push("/");
  };

  // 상품삭제
  const onDelete = (docId) => {
    deleteData('product', docId);
    setToggle(!toggle); 
    history.push('/');
  };


  useEffect(()=>{
    if(user.isLogin) {
      console.log('로그인');
    }
    else {
      console.log('로그아웃');
    }
  },[loggedIn])

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러발생 페이지를 리로드 해주세요.</div>;
  if (!data) return null;

  return (
    <div className="App">
      <Header />

      <Link to="/upload" className="move-upload-page">
        글쓰기 버튼
      </Link>
      <Switch>
        <Route path="/" render={() => <Products products={data}/>} exact />
        <Route
          path="/upload"
          render={() => (
            <Upload
              onChange={onChange}
              onSubmit={onSubmit}
              selecteImage={selecteImage}
            />
          )}
        />
        <Route path="/detail/:docid" render={(props) => <ProductDetail props={props} onDelete={onDelete} />} />
        <Route path='/edit/:docid' component={EditPage}/>
        <Route path='/login' render={()=><Login setLoggedIn={setLoggedIn}/>}/>
        <Route path='/register' render={()=><Register/>}/>
        <Route render={() => <PageNotFound />} />
   
      </Switch>
    </div>
  );
}

export default App;
