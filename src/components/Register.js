import React, { useCallback, useState } from "react";
import './style/authpage.scss';
import { useInput } from "../hooks/useInput";
import { signUp } from "../modules/auth";
import { useHistory } from "react-router-dom";
const Register = () => {
    
    const [form, onChange, reset] = useInput({email:'', password:'', name:'', password_check:''});
    const [msg, setMsg] = useState('');
    const history = useHistory();
    // 유효성 체크
    const memberRegisterCheck = useCallback(form=>{
        const {email, password, name, password_check} = form;
 
        const emailCheck = email.includes('@') && email.includes('.');// @ . 포함여부 검사
        const passwordCheck = password.length >= 6 && password.length <= 12;
        const nameCheck = name.length >= 3;
        const passwordCheck2 = password === password_check;
         
        if(!nameCheck) {setMsg('이름 형식이 올바르지 않습니다.(3글자 이상)'); return false}
        else if(!emailCheck) {setMsg('이메일 형식이 올바르지 않습니다.'); return false}
        else if(!passwordCheck) {setMsg('비밀번호 형식이 올바르지 않습니다 (6글자 이상 12글자 이하)'); return false}
        else if(!passwordCheck2) {setMsg('비밀번호가 서로 다릅니다.'); return false}
        return true;
    },[]);
   
    const onMemberRegister = async (e) => {
        e.preventDefault();
        const memberCheckResult = memberRegisterCheck(form);
        if(memberCheckResult) {
        try {
           await signUp(form);
           setMsg('회원가입 성공');
           history.push('/login');
        }
        catch(e) {
            console.log(e);
            setMsg('회원가입 에러');
        }
        }
    }

    return (
        <div>
<body class="antialiased">
    <div class="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <h1 class="text-4xl font-medium">회원가입</h1>
        {msg}
        <p class="text-slate-500"></p>

    
        <form action="" class="my-10" onSubmit={(e)=>{onMemberRegister(e)}}>
            <div class="flex flex-col space-y-5">
            <label for="email">
                    <p class="font-medium register-text text-slate-700 pb-2">닉네임</p>
                    <input onChange={(e)=>{onChange(e)}} id="email" name="name" type="text" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="이메일을 입력해주세요." required/>
                </label>
                <label for="email">
                    <p class="font-medium register-text text-slate-700 pb-2">Email</p>
                    <input onChange={(e)=>{onChange(e)}} id="email" name="email" type="email" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="이메일을 입력해주세요." required/>
                </label>
                <label for="password">
                    <p class="font-medium register-text text-slate-700 pb-2">비밀번호</p>
                    <input onChange={(e)=>{onChange(e)}} id="password" name="password" type="password" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="비밀번호를 입력해주세요." required/>
                </label>

                <label for="password">
                    <p class="font-medium register-text text-slate-700 pb-2">비밀번호 확인</p>
                    <input onChange={(e)=>{onChange(e)}} id="password" name="password_check" type="password" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="비밀번호를 입력해주세요." required/>
                </label>
                <div class="flex flex-row justify-between">
                    <div>
                       
                    </div>
                    <div>
                       
                    </div>
                </div>
                <button type="sumbit" class="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      <span>가입하기</span>
                </button>
              
            </div>
        </form>
    </div>
    
</body>
        </div>
    )
}

export default Register;