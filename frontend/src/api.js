import axios from "axios"
import { apiUrl } from "./config"
import expressAsyncHandler from 'express-async-handler'
import { getUserInfo } from "./localStorage";

export const getProducts =expressAsyncHandler (async ({searchKeyword=''})=>{
    try{
        let queryString='?';
        if(searchKeyword) queryString+=`searchKeyword=${searchKeyword}&`;
        const response =await axios({
            url: `${apiUrl}/api/products${queryString}`,
            method:  'GET',
            headers:{
                'Content-Type': 'application/json'
            },
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message); 
        }
        return response.data;
    }catch(err){
        return { error: err.response.data.message || err.message};
    }
});
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
export const createProduct = async () =>{
    try{
        const {token} =getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/products`,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
        });
        if(response.statusText !=='Created'){
            throw new Error(response.data.message);
        }
        return response.data;
    } catch(err){
        return {
            error: err.response.data.message || err.message
        };
    }
};

export const createReview = async ( productId, review)=>{
    try{
        const {token}=getUserInfo();
        const response = await axios({
            url:`${apiUrl}/api/products/${productId}/reviews`,
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: review,
        });
        if(response.statusText !== 'Created'){
            throw new Error(response.data.message);
        }
        return response.data;
    }catch (err){
        return {error:err.response.data.message || err.message};
    }
};
export const editReview = async (productId,{rating,comment})=>{
    try{
        const { token } =getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/products/${productId}/reviews/`,
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              data:{
                rating,
                comment
            },
        });
        // console.log(response.data);
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (err){
        return {error:err.response.data.message || err.message};
    }
};
export const deleteReview = async (productId,reviewId)=>{
    try{
        const { token } =getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/products/${productId}/reviews/`,
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              data:{
                _id:reviewId,
              }
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (err){
        return {error: err.response.data.message || err.message};
    }
};

export const deleteProduct = async (productId)=>{
    try{
        const { token } =getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/products/${productId}`,
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (err){
        return {error: err.response.data.message || err.message};
    }
};
export const updateProduct =async (product)=>{
    try{
        const {token} =getUserInfo();
        const response =await axios({
            url:`${apiUrl}/api/products/${product._id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            data: product,
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    }catch (err){
        return {error:err.response.data.message||err.message};
    }
} ;
export const uploadProductImage = async (formData)=>{
    try{
        const {token} =getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/uploads`,
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
            data: formData,
        });
        if(response.statusText !=='Created'){
            throw new Error(response.data.message);
        } else {
            return response.data;
        }
    } catch (err){
        return { error: err.response.data.message ||err.message };
    }
}
export const signin =expressAsyncHandler( async ({email,password}) =>{
    try{
        const response= await axios({
            url:`${apiUrl}/api/users/signin`,
            method:"POST",
            headers:{
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
            headers:{
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

export const update =expressAsyncHandler( async ({name,email,password}) =>{
    try{
        const { _id, token } =getUserInfo();
        const response= await axios({
            url:`${apiUrl}/api/users/${_id}`,
            method:"PUT",
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${token}`,
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

export const createOrder = async(order) =>{
    try{
        const {token} =getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/orders`,
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${token}`,
            },
            data: order,
        });
        if(response.statusText !== 'Created'){ //as its 201
            throw  new Error(response.data.message);
        }
        return response.data;
    }catch(err){
        console.log(err);
        return { error: err.response ? err.response.data.message : err.message}; //checks if err.response exist
    }
};

export const getOrders= async ()=>{
    try{
        const {token} =getUserInfo();
        const response= await axios({
            url: `${apiUrl}/api/orders`,
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (err){
        return {error : err.response.data.message || err.message};
    }
};

export const deleteOrder =async (orderId)=>{
    try{
        const {token} =getUserInfo();
        const response= await axios({
            url: `${apiUrl}/api/orders/${orderId}`,
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (err){
        return {error : err.response.data.message || err.message};
    }
};


export const getOrder =async (id) =>{
    try{
        const {token} =getUserInfo();
        const response =await axios({
            url :`${apiUrl}/api/orders/${id}`,
            headers:{
                'Content-Type' :'application/json',
                'Authorization':`Bearer ${token}`,
            },
        });
        if(response.statusText !=='OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    }catch(err){
        return {error:err.message}
    }
};

export const getMyOrders =async ()=>{
    try{
        const {token} =getUserInfo();
        const response = await axios({
            url:`${apiUrl}/api/orders/mine`,
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`,
            },
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data,message);
        }
        return response.data;
    }catch(err){
        return {error:err.response?err.response.data.message :err.message}
    }
};

export const getPaypalClientId =async () =>{
    const response = await axios({
        url:`${apiUrl}/api/paypal/clientId`,
        headers:{
            'Content-Type':'applicatiom/json',
        },
        
    });
    if(response.statusText !=='OK'){
        throw new Error(response.data.message);
    }
    return response.data.clientId;
};

export const payOrder = async (orderId,paymentResult)=>{
    try{
        const {token}=  getUserInfo();
        const response = await axios({
            url:`${apiUrl}/api/orders/${orderId}/pay`,
            method:'PUT',
            headers:{
                'Content-Type' :'application/json',
                'Authorization':`Bearer ${token}`,
            },
            data:paymentResult
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    }catch (err) {
        return {error:err.response?err.response.data.message :err.message}
    }
};


export const deliverOrder = async (orderId)=>{
    try{
        const {token} = getUserInfo();
        const response =await axios({
            url:`${apiUrl}/api/orders/${orderId}/deliver`,
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
        });
        if(response.statusText !=='OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    } catch(err){
        return {error :err.response ? err.response.data.message :err.message}
    }
};

export const getSummary = async () =>{
    try{
        const {token}=getUserInfo();
        const response =await axios({
            url:`${apiUrl}/api/orders/summary`,
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json',
            },
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (err){
        return {error: err.response ?err.response.data.message :err.message}
    }
};