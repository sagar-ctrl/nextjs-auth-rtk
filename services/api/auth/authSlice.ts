import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserType{
    avatar: string
    email: string
    first_name: string
    id: number
    last_name: string
};

const initialState:{token:string|null,userList:Array<UserType>|null,current:number,total:number|null,per_page:number|null}={
    token:null,
    userList:null,
    current:0,
    total:null,
    per_page:null
}
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setToken(state:any,action:any){
            const json=JSON.stringify(action.payload);
            localStorage.setItem("token",json);
            state.token=action.payload
        },
        setUserList(state:any,action:any)
        {
            state.userList=action.payload.data
            state.current=action.payload.page
            state.total=action.payload.total_pages??20
            state.per_page=action.payload.per_page
            state.token=JSON.stringify(localStorage.getItem("token") ?? "{}");
        },
        logout(state:any,action:any){
            
            if(typeof window !== "undefined")
            {
                console.log(localStorage.getItem("token"));
                window.localStorage.clear();
            }
        }

    }

});

export const {setToken,setUserList,logout}=authSlice.actions;
export default authSlice.reducer

