
import { useState } from "react";
import axios from "axios";

function Login(){

  const [formData, setFormData] = useState({
    email:"",
    password:""
  });

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();

    try{

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");

      window.location.href="/dashboard";

    }catch(error){

      alert("Login Failed");

    }
  };

  return(
    <form className="form-box" onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input type="email" name="email" placeholder="Email" onChange={handleChange} />

      <input type="password" name="password" placeholder="Password" onChange={handleChange} />

      <button type="submit">Login</button>
    </form>
  )
}

export default Login;
