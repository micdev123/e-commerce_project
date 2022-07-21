import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDU1ZDRiNmQzMWJkNWY2NTVlNmNkNCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NTgxNzE0OTEsImV4cCI6MTY1ODQzMDY5MX0.u6pgsj_UbqcT7obywU6vEECBEFYd4Ragp0nXZOQ3lgg";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});
  
export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: { token: `Bearer ${TOKEN}` },
});