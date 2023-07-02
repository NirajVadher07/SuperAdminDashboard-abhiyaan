import React from 'react'
import { toast } from 'react-toastify'
// General API call Function


async function ApiCall(method, url, headers = {}, body = null, errorMessage = 'Error') {
    
    const token = localStorage.getItem("UserToken")
    const defaultHeaders = {
        //TODO: CHECK FOR CONTENT_TYPE IN IMAGE UPLOAD
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`    
    };
    const mergedHeaders = { ...defaultHeaders, ...headers };

   
    const requestOptions = {
        method: method,
        headers: mergedHeaders,
        body: body ? JSON.stringify(body) : null,
    };

    try {
        // Perform the API call
        const response = await fetch(url, requestOptions);
        // Parse the response as JSON and return
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        toast.error(errorMessage);
    }
}


export default ApiCall