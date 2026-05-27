
import { useState } from "react";
import axios from "axios";

function Register(){

  const [formData, setFormData] = useState({
    name:"",
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
        "http://localhost:5000/api/auth/register",
        formData
      );

      alert(res.data.message);

    }catch(error){
      alert("Registration Failed");
    }
  };

  return(
    <form className="form-box" onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input type="text" name="name" placeholder="Name" onChange={handleChange} />

      <input type="email" name="email" placeholder="Email" onChange={handleChange} />

      <input type="password" name="password" placeholder="Password" onChange={handleChange} />

      <button type="submit">Create Account</button>
    </form>
  )
}

export default Register;
