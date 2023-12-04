import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Tela de login/Login";
import TelaPrincipal from "./Pages/PrincipalTela/TelaPrincipal";
import { NovoChamado } from "./Pages/CadastroNovoChamado/NovoChamado";



function App() {
  return (
  <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/tela-principal" element={<TelaPrincipal/>} />
        <Route path="novo-chamado" element={<NovoChamado/>}/>
      </Routes>
    </Router>
  </div>
  );
}

export default App;
