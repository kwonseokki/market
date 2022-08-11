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
import { useSelector } from "react-redux";
import { deleteData } from "./lib/api";

function App() {
  const user = useSelector((state) => state.authReducer);
  const { displayName, uid, url: userImage } = user;
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
    const file = e.target.files[0]; // 파일정보 file 변수에 저장
    setImgUrl(file); // 파일정보를 setImgUrl 상태가 보관
  };

  // 상품업로드
  const onSubmit = async (e) => {
    e.preventDefault();
    const url = await getUrl(imgUrl); // 스토리지에 업로드된 이미지 경로 받아오기
    await uploadData("product", form, url, uid, displayName, userImage); // 데이터베이스에 새정보 업로드
    setToggle(!toggle);
    reset(); // 폼 초기화
    history.push("/");
  };

  // 상품삭제
  const onDelete = (docId) => { // 문서번호 파라미터로 받아오기
    deleteData("product", docId); // product 컬렉션의 문서명을 deleteDaata 함수로 전달
    setToggle(!toggle); // 재렌더링 위한 토글 상태 변경
    history.push("/"); // 메인페이지로 이동 
  };

  // 채팅방생성
  const createChat = async (postData) => { // 포스트 정보를 받아옴
    const userUid = uid; // 나의 uid를 userUid 변수에 저장
    const response = await createChatRoom({ ...postData, userUid }); // 포스트정보, 자신의 uid 채팅방생성 함수호출
    history.push(`/chatroom/${response}`); // 반환받은 채팅방 고유번호로 이동
  };

  // 상품검색

  useEffect(() => {}, [loggedIn]);

  if (loading) return <Loading message={"로딩중 입니다."} />; // 로딩상태시 로딩컴포넌트 렌더링
  if (error) return <div>에러발생</div>;
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
        <Route path="/info" render={(props) => <MyPage props={props} />} />
        <Route render={() => <PageNotFound />} />
      </Switch>
    </div>
  );
}

export default App;
