export default   function loginFecth(){
  const idusername = document.getElementById("username")
  const idpassword = document.getElementById("password")
  const dataEnviarLogin =  document.querySelector("[data-enviar-login]")

  async function logar(event){
    event.preventDefault()
      const response = await fetch("https://dogsapi.origamid.dev/json/jwt-auth/v1/token",{
        method:"POST",
      headers:{
        'Content-type': "application/json"
      },
      body:JSON.stringify({
        username:idusername.value,
        password:idpassword.value
      })
    })
    const dados =  await response.json()
    window.localStorage.setItem("tokenLogin",dados.token)
    window.location.href = "../../index.html"
  }
  if(window.location.href !== "/PageLogin/pageLogin.html" && window.localStorage.getItem("tokenLogin") != null){
    window.location.href = "../../index.html"
  }else{
    console.log("olá")
  }

  dataEnviarLogin.addEventListener("click",(event)=>{
    logar(event)
  })
}