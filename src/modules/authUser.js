const LOGGEDIN = 'LOGGEDIN';
const LOGGEDOUT = 'LOGGEDOUT';

const initialState = {
    email:'',
    uid:'',
    isLogin:false
}

export const loggedIn = payload => ({type:LOGGEDIN, payload});
export const loggedOut = ({type:LOGGEDOUT});

export default function authReducer(state=initialState, action) {
    switch(action.type) {
        case LOGGEDIN:
        return {
            ...state,
            email:action.payload.email,
            uid:action.payload.uid,
            displayName:action.payload.displayName,
            url:action.payload.url,
            isLogin:true
        }
        case LOGGEDOUT : 
        return {
        ...initialState
        }
        default : 
        return state
    } 
}

