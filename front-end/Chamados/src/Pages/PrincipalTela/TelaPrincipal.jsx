import { useEffect, useState } from 'react';
import './styleTelaPrincipal.css';
import { useNavigate } from 'react-router-dom';
import { Button, FormControl, InputLabel, NativeSelect } from "@mui/material";

const TelaPrincipal = () => {
  const [chamados, setChamados] = useState([]);
  const [filtroOpcao, setFiltroOpcao] = useState('');
  const [filtroValor, setFiltroValor] = useState('');
  const [idsChamadosUnicos, setIdsChamadosUnicos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChamados = async () => {
      try {
        const response = await fetch('http://localhost:8080/chamado');
        if (!response.ok) {
          throw new Error('Falha ao buscar chamado');
        }
        const data = await response.json();
        console.log('Chamados recebidos', data);

        data.forEach(chamado => {
          if (!chamado.id) {
            console.error('Objeto de chamado sem propriedade "id"', chamado);
          }
        });

        const idsUnicos = data.map((chamado) => chamado.id);
        console.log('IDs únicos', idsUnicos);

        setChamados(data);
        
        setIdsChamadosUnicos(idsUnicos);
      } catch (error) {
        console.error('Erro ao buscar chamados', error);
      }
    };

    fetchChamados();
  }, []);

  const chamadosFiltrados = chamados.filter((chamado) => {
    const valorParaComparacao = filtroOpcao === 'id' ? filtroValor.toString() : filtroValor;
    const valorChamado = chamado[filtroOpcao];
    return typeof valorChamado === 'string' && valorChamado.includes(valorParaComparacao);
  });

  return (
    <div className='container'>
      <div className="tela-principal-container">
        <div className="tela-principal-wrap">
          <Button onClick={() => navigate('/')} variant='outlined' style={{ margin: '1px 1px 1px -40px' }}>
            Sair
          </Button>
          <form className="tela-principal-form">
            <span className="tela-principal-form-title">Chamados</span>

            <label className='label-escolha'>
              Escolha um filtro:
              <div className="container-tela-principal">
                <FormControl fullWidth style={{ margin: '-22px' }}>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native" style={{ margin: '-25px 2px 2px 1px', color: '#999999', fontSize: '15px', lineHeight: '1.2' }}>
                    Filtro
                  </InputLabel>
                  <NativeSelect
                    value={filtroOpcao}
                    onChange={(e) => {
                      setFiltroOpcao(e.target.value);
                      setFiltroValor('');
                    }}
                    inputProps={{
                      name: 'filtroOpcao',
                      id: 'uncontrolled-native',
                    }}
                    style={{ lineHeight: '1.2' }}
                  >
                    <option value="">Escolher...</option>
                    <option value="id">ID</option>
                    <option value="tipo">Tipo</option>
                  </NativeSelect>
                </FormControl>
              </div>
            </label>

            {filtroOpcao === 'id' && typeof filtroValor === 'string' && idsChamadosUnicos.length > 0 && (
              <div className='wrap-input'>
                <input
                  className={filtroValor !== "" ? "has-val input" : "input"}
                  type="text"
                  value={filtroValor}
                  onChange={(e) => setFiltroValor(e.target.value)}
                />
                <span className="focus-input" data-placeholder="Filtrar por ID"></span>
                {filtroValor.length > 0 && (
                  <ul className="sugestoes-id">
                    {idsChamadosUnicos
                      .filter((id) => typeof id === 'string' && id.startsWith(filtroValor))
                      .map((id) => (
                        <li key={id} onClick={() => setFiltroValor(id)}>
                          {id}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            )}

            {filtroOpcao === 'tipo' && (
              <label  className='label-filtro'>
                Filtrar por Tipo:
                <div className="container-tela-principal">
                  <FormControl fullWidth style={{margin:'-22px'}}>
                    <InputLabel  variant="standard" htmlFor="uncontrolled-native"  style={{ margin: '-25px 2px 2px 1px', color: '#999999', fontSize: '15px', lineHeight: '1.2' }}>
                      Tipo
                    </InputLabel>
                    <NativeSelect
                      value={filtroValor}
                      onChange={(e) => setFiltroValor(e.target.value)}
                      inputProps={{
                        name: 'filtroValor',
                        id: 'uncontrolled-native',
                      }}
                      style={{ lineHeight: '1.2' }}
                    >
                      <option value="">Todos</option>
                      <option>Problemas com a internet</option>
                      <option>Problemas com email</option>
                      <option>Conexão com internet</option>
                      <option>Problemas de Queda de conexão</option>
                      <option>Outro</option>
                    </NativeSelect>
                  </FormControl>
                </div>
              </label>
            )}

{chamados.length > 0 ? (
  <ul className='strong-style'>
    {chamadosFiltrados.map((chamado) => (
      <li key={chamado.id}>
        <strong>ID:</strong> {chamado.id} <br />
        <strong>Assunto:</strong> {chamado.assunto} <br />
        <strong>Tipo:</strong> {chamado.tipo} <br />
        <strong>Descrição:</strong> {chamado.descricao} <br />
        <hr />
      </li>
    ))}
  </ul>
) : (
  <div style={{ marginTop: '10px' }}>Nenhum chamado pendente.</div>
)}  
            

            <div className="container-novo-chamado-btn">
              <button className='novo-chamado-btn' onClick={() => navigate('/novo-chamado')}>
                Adicionar Chamado
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TelaPrincipal;
