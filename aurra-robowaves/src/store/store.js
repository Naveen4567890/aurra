import { configureStore } from "@reduxjs/toolkit";
import userReducer  from "../slice/slice";
export const store =configureStore({
    reducer:{
        user:userReducer,       
    }})