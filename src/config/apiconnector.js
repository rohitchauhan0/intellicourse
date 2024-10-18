import axios from "axios";

export const axiosInstance = axios.create({})


export const apiconnector = (method, url, bodyData, headers, params, onuploadprogress)=>{

    return axiosInstance({
        method:method,
        url:`${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers : null,
        params : params ? params : null,
        onUploadProgress:onuploadprogress ? onuploadprogress : null,
    })
}

