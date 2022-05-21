import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState:{token:string|null}={
    token:null
}
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setToken(state:any,action:any){
            const json=JSON.stringify(action.payload);
            localStorage.setItem("token",json);
            state.token=action.payload
        }
    }

});

export const {setToken}=authSlice.actions;
export default authSlice.reducer