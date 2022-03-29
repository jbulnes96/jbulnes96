import React,{useState, useEffect} from "react";
import styled from "styled-components";
import { Link, useHistory } from 'react-router-dom';
import Logo from "../assets/logo.png"
import{ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";



function Login () {
      const navigate = useHistory()
    const[values, setValues] = useState({
      username:"",
      password:"",

    });

    const app_name = 'large21'
function buildPath(route)
{
    if (process.env.NODE_ENV === 'production') 
    {
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    }
    else
    {        
        return 'http://localhost:5000/' + route;
    }
}

  const toastOptions={
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(()=> {
    if(localStorage.getItem('chat-app-user')) {
      navigate('/')
    }
  },[]);

  const handleSubmit = async (event)=> {
    event.preventDefault();
    if(handleValidation()) {
      const {password, username} = values;
        const{data} = await axios.post( {
            username,
            password,
        });
        if(data.status === false){
          toast.error(data.msg, toastOptions);
        }
        if(data.status === true) {
          localStorage.setItem('chat-app-user', JSON.stringify(data.user))
        }
        navigate("/");
    }
  }; 

  const handleValidation =() => {
    const {password, username} = values;
    if(password === ""){
      toast.error(
        "Username and Password Required",
        toastOptions
       );
       return false;
      } else if(username.length=== ""){
        toast.error(
          "Username and Password Required",
          toastOptions
        );
        return false;
      } 
      return true;
  };

  const handleChange =(event) =>{
  setValues({...values, [event.target.name]:event.target.value});
  };

  return(
    <>
    <FormContainer>
    <form onSubmit={(event)=>handleSubmit(event)}>
        <div className="brand">
           <img src = {Logo} alt="Logo"/>
           <h1>NoodleChat</h1> 
      </div>
      
      <input type = "text" 
      placeholder="Username" 
      name="username" 
      onChange={(e) => handleChange(e)}
      />
      
      
      <input type = "password" 
      placeholder="Password" 
      name="password" 
      onChange={(e) => handleChange(e)}
      />
      
      
      <button type="submit">Login</button>
      <span>
        Do Not Have an Account? <Link to="/Register">Register</Link></span>
    </form>
    </FormContainer>
    <ToastContainer/>
    </>
  );
}

const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #FF8C00;
.brand{
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  img{
    height: 12rem;
  }
  h1{
    color: Green;
    
  }
}
form{
  display: flex;
  flex-direction: column;
  gap: 2rem;

  background-color: #00000020;
  border-radius: 2rem;
  padding: 3rem 5rem;
  input{
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #228B22;
    border-radius 0%.4rem;
    color: white;
    width:100%;
    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: white;
    opacity: 1; /* Firefox */
    }
    font-size: 1rem;
    &:focus{
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button{
    background-color: #228B22;
    color: white;
    padding: 1rem 2rem;
    border; none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    &:hover{
      background-color: #9ACD32;
    }
  }
  span{
    color:white;
    text-transform: uppercase;
    a{
      color: #228B22;
      text-decoration: none;
      font-weight: bold;
    }
  }
}

`;

export default Login;