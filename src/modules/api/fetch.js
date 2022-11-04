import axios from "axios";

const DOMAIN = "https://dummyjson.com";
export const request = (method, url, data) => {
    return axios({
        method,
        url: DOMAIN + url,
        data,
        headers: {
            "Content-Type" : "application/json; charset=utf-8"
        }, // [요청 헤더]
        timeout: 5000, // [타임 아웃 시간]

        responseType: "json" // [응답 데이터 : stream , json]
    })
        .then((res) => res.data)
        .catch((err) => console.log(err));
};
