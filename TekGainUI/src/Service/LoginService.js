import axios from "axios";
export let logStatus='false';
export  default async function validateUser(userName,pass) {
   let obj={
        username:userName,
        password:pass
    };

    const API_URL = "http://localhost:7777/api/";

    return axios
    .post(API_URL + "signin", obj)
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("authData", JSON.stringify(response.data));

        const roles = response.data.roles;
        console.log(roles[0]);
        localStorage.setItem("roles",JSON.stringify(roles));
        
      }
      logStatus = true;
      console.log(response.data)
      return response.data;

    });
 }
    
       
    
      
  
      
  	 	  	  		    	   	 	   	 	
