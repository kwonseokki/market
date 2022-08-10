import "./App.css";
import { useState, useEffect } from "react";
import {
  Header,
  Login,
  PageNotFound,
  ProductDetail,
  Register,
  NavigationBar,
  ChatRoom,
  Loading,
  MyPage,
} from "./components";
import { Products, Upload, EditPage, MyChat, Search } from "./containers";
import { useFetch } from "./hooks/useAsync";
import { getData, uploadData, getUrl, createChatRoom } from "./lib/api";
import { Route } from "react-router-dom";
import { Switch, useHistory } from "react-router-dom";
import { useInput } from "./hooks/useInput";
import { initialForm } from "./assets/initialForm";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteData } from "./lib/api";

function App() {
  const user = useSelector((state) => state.authReducer);
  const { displayName, uid, url:userImage } = user;
  const [toggle, setToggle] = useState(false);
  const [state] = useFetch(getData("product"), [toggle]);
  const { loading, error, data } = state;
  const [form, onChange, reset] = useInput({ ...initialForm, displayName });
  const [loggedIn, setLoggedIn] = useState(false);
  const [imgUrl, setImgUrl] = useState();
  const history = useHistory();

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
    await uploadData("product", form, url, uid, displayName, userImage); // 데이터베이스에 새정보 업로드
    setToggle(!toggle);
    reset();
    history.push("/");
  };

  // 상품삭제
  const onDelete = (docId) => {
    deleteData("product", docId);
    setToggle(!toggle);
    history.push("/");
  };

  const createChat = async (postData) => {
    const userUid = uid;
    const response = await createChatRoom({ ...postData, userUid });
    history.push(`/chatroom/${response}`);
  };

  useEffect(() => {}, [loggedIn]);

  if (loading) return <Loading message={"로딩중 입니다."} />;
  if (error) return <div>에러발생 페이지를 리로드 해주세요.</div>;
  if (!data) return null;

  return (
    <div className="App">
      <Header />
      <NavigationBar />

      <Switch>
        <Route path="/" render={() => <Products products={data} />} exact />
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
        <Route
          path="/detail/:docid"
          render={(props) => (
            <ProductDetail
              props={props}
              onDelete={onDelete}
              createChat={createChat}
            />
          )}
        />
        <Route path="/edit/:docid" component={EditPage} />
        <Route
          path="/login"
          render={() => <Login setLoggedIn={setLoggedIn} />}
        />
        <Route path="/register" render={() => <Register />} />
        <Route path="/mychat" render={() => <MyChat uid={uid} />} />
        <Route
          path="/chatroom/:docid"
          render={(props) => <ChatRoom props={props} />}
        />
        <Route path="/search" render={(props) => <Search props={props} />} />
        <Route path="/mypage" render={(props) => <MyPage props={props} />} />
        <Route render={() => <PageNotFound />} />
      </Switch>
    </div>
  );
}

export default App;
