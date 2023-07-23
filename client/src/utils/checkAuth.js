import getAxios from "./getAxios";

export default async function checkAuth() {
  const axios = getAxios();
  const res = await axios.get("http://localhost:8000/api/check_auth/");
  const isAuthenticated = res.data.isAuthenticated;
  return isAuthenticated;
}