import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FormControl, InputLabel, NativeSelect } from "@mui/material";
import axios from "axios";

export const NovoChamado = () => {
  const [assunto, setAssunto] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipo, setTipo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  const cadastrarChamado = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      if (!assunto || !descricao || !tipo) {
        setErrorMessage('Por favor, preencha todos os campos');
        return;
      }

      const response = await axios.post("http://localhost:8080/chamado", {
        assunto,
        descricao,
        tipo,
      });

      if (response.status === 201) {
        
        setAssunto('');
        setDescricao('');
        setTipo('');

        
        setSuccessMessage('Chamado cadastrado com sucesso!');
        setShowSuccessMessage(true);

        
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      } else {
        setErrorMessage("Erro ao cadastrar chamado");
      }
    } catch (error) {
      setErrorMessage("Erro ao cadastrar chamado", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="container-login">
        <Button onClick={() => navigate('/tela-principal')} variant="outlined" style={{ margin: '10px -100px 440px 100px' }}> Voltar</Button>
        <div className="wrap-login">
          <form className="login-form">
            <span className="login-form-title">Criar novo chamado</span>

            <div className="wrap-input">
              <input
                className={assunto !== "" ? "has-val input" : "input"}
                type="text"
                value={assunto}
                onChange={(e) => setAssunto(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Assunto"></span>
            </div>

            <FormControl fullWidth style={{ margin: '10px 10px 19px 1px', borderBottom: '2px solid rgb(153,153,153)' }}>
              <InputLabel variant="standard" htmlFor="uncontrolled-native" style={{ margin: '-25px 2px 2px 1px', color: '#999999', fontSize: '15px', lineHeight: '1.2' }}>
                Tipo
              </InputLabel>
              <NativeSelect
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                style={{ color: 'black' }}
              >
                <option>Selecione um tipo...</option>
                <option>Problemas com a internet</option>
                <option>Problemas com email</option>
                <option>Conexão com internet</option>
                <option>Problemas de Queda de conexão</option>
                <option>Outro</option>
              </NativeSelect>
            </FormControl>

            <div className="wrap-input">
              <input
                className={descricao !== "" ? "has-val input" : "input"}
                type="text"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Descricao"></span>
            </div>

            {showSuccessMessage && (
              <div style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</div>
            )}

            {errorMessage && (
              <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>
            )}

            <div className="container-login-form-btn">
              <button
                className="login-form-btn"
                onClick={cadastrarChamado}
                disabled={isLoading}
              >
                {isLoading ? 'Cadastrando...' : 'Cadastrar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}