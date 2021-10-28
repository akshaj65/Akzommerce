import axios from "axios"
import { apiUrl } from "../config"
import expressAsyncHandler from 'express-async-handler'

export const getProduct =  expressAsyncHandler( async (id) => {
    try {
        const response = await axios({
            url: `${apiUrl}/api/products/${id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    }
    catch(err) {
        return {
            error: err.response.data.message || err.message
        };
    }
});
export const signin =expressAsyncHandler( async ({email,password}) =>{
    try{
        const response= await axios({
            url:`${apiUrl}/api/users/signin`,
            method:"POST",
            header:{
                'Content-Type': 'application/json'
            },
            data:{
                email,
                password,
            },
        });
        if(response.statusText !=='OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    }catch(err) {
        console.log(err);
        return {
            error: err.response.data.message || err.message
        };
    }
});
export const register =expressAsyncHandler( async ({name,email,password}) =>{
    try{
        const response= await axios({
            url:`${apiUrl}/api/users/register`,
            method:"POST",
            header:{
                'Content-Type': 'application/json'
            },
            data:{
                name,
                email,
                password,
            },
        });
        if(response.statusText !=='OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    }catch(err) {
        console.log(err);
        return {
            error: err.response.data.message || err.message
        };
    }
});