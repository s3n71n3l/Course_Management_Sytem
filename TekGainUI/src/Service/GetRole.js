const GetRole = () => {
  const role = localStorage.getItem("roles");
  console.log("this is running");
  return role;
}
export default GetRole;