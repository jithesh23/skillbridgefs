
     function Dashboard(){

  return(
    <div style={{padding:"40px"}}>

      <h1>Welcome to SkillBridge 🚀</h1>

      <p>Your account is securely authenticated.</p>

      <br/>

      <button
        onClick={()=>{
          localStorage.removeItem("token");
          window.location.href="/login";
        }}
      >
        Logout
      </button>

    </div>
  )
}

export default Dashboard;



