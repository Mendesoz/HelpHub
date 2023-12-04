package com.api.Chamados.service;

import com.api.Chamados.Repository.UsuarioRepository;
import com.api.Chamados.model.UsuarioModel;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UsuarioService {

    final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository){
        this.usuarioRepository = usuarioRepository;
    }
    @Transactional
    public UsuarioModel salvar(UsuarioModel usuarioModel){
      return usuarioRepository.save(usuarioModel);
        }

    public boolean emailExistente(String email) {
        return usuarioRepository.existsByEmail(email);
    }
    public List<UsuarioModel> findAll(){
        return usuarioRepository.findAll();
    }

    public Optional<UsuarioModel> findById(UUID id){
        return usuarioRepository.findById(id);

    }
    @Transactional
    public void delete(UsuarioModel usuarioModel){
         usuarioRepository.delete(usuarioModel);
    }

    public UsuarioModel autenticarUsuario(String email, String senha){
        UsuarioModel usuarioModel = usuarioRepository.findByEmail(email);

        if (usuarioModel !=null && usuarioModel.getSenha().equals(senha))
            return usuarioModel;
            return null;

    }

}
