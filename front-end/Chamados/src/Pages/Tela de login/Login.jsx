import { useState } from 'react';
import './styleLogin.css';
import { useNavigate } from 'react-router-dom';


function Login() {
const[email, setEmail] = useState("");
const[senha, setSenha] = useState("");
const navigate = useNavigate();
const[mensagem, setMensagem] = useState("");

const handleLogin = (e) => {
  e.preventDefault();
  console.log('Tentado Logar')

console.log('Email',email);
console.log('Senha',senha);

  if(email === 'eric@gmail.com' && senha === 'eric'){
    setMensagem('Login bem-sucedido! Redirecionando...');
    navigate('/tela-principal');
  }else{
    setMensagem('Login falhou, verifique suas credenciais...')
  }
}
  
  return (
 <div className="container">

  <div className="container-login">

  

  <div className="wrap-login">

 

  <form className="login-form">

    <span className="login-form-title">Bem vindo!</span>

    <div className="wrap-input">
      <input 
      className={email !== "" ? "has-val input" : "input"}
      type="email" 
      value={email} 
      onChange={ e => setEmail(e.target.value)}
      />
      <span className="focus-input" data-placeholder="Email"></span>
      
    </div>

    <div className="wrap-input">
      <input 
      className={senha !== "" ? "has-val input" : "input"}
      type="password"
      value={senha} 
      onChange={e => setSenha(e.target.value)}
      />
      <span className="focus-input" data-placeholder="Senha"></span>
    </div>

    <div className="container-login-form-btn">

      <button className="login-form-btn" onClick={handleLogin}>Login</button>
      
    </div>
         </form>
         {mensagem && <label className='label-tela-login'>{mensagem}</label>}
      </div>
    </div>
 </div>
  );
}

export default Login;