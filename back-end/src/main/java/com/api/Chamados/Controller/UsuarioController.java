package com.api.Chamados.Controller;

import com.api.Chamados.DTO.UsuarioDto;
import com.api.Chamados.model.UsuarioModel;
import com.api.Chamados.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/usuario")
public class UsuarioController {

    final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping
    public ResponseEntity<Object> salvarUsuario(@RequestBody @Valid UsuarioDto usuarioDto){
        var usuarioModel = new UsuarioModel();
        BeanUtils.copyProperties(usuarioDto, usuarioModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioService.salvar(usuarioModel));
    }
    @GetMapping
    public ResponseEntity<List<UsuarioModel>> getAllUsuarios(){
        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.findAll());
    }

    @GetMapping("/{id}")
        public ResponseEntity<Object> getUsuario(@PathVariable(value = "id") UUID id){
            Optional<UsuarioModel> usuarioModelOptional = usuarioService.findById(id);
            if (!usuarioModelOptional.isPresent()){
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Usuario não encontrado.");
            }
            return ResponseEntity.status(HttpStatus.OK).body(usuarioModelOptional.get());
        }

        @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteUsuario(@PathVariable(value = "id") UUID id){
        Optional<UsuarioModel> usuarioModelOptional = usuarioService.findById(id);
        if (!usuarioModelOptional.isPresent()){
            return ResponseEntity.status((HttpStatus.NOT_FOUND)).body("Usuario não encontrado.");
        }
        usuarioService.delete(usuarioModelOptional.get());
        return ResponseEntity.status(HttpStatus.OK).body("Usuario deletado com sucesso");
    }
    @PutMapping("/{id}")
    public  ResponseEntity<Object> updateUsuario(@PathVariable(value = "id") UUID id,
                                                 @RequestBody @Valid UsuarioDto usuarioDto){
        Optional<UsuarioModel> usuarioModelOptional =usuarioService.findById(id);
        if (!usuarioModelOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario não encontrado.");
        }
        var usuarioModel  = usuarioModelOptional.get();
        usuarioModel.setEmail(usuarioDto.getEmail());
        usuarioModel.setNome(usuarioDto.getNome());
        usuarioModel.setSenha(usuarioDto.getSenha());
        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.salvar(usuarioModel));
    }
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody Map<String, String> credenciais){
        String email = credenciais.get("email");
        String senha = credenciais.get("senha");

        UsuarioModel usuarioAutenticado = usuarioService.autenticarUsuario(email,senha);
        if(usuarioAutenticado !=null){
            return ResponseEntity.ok(usuarioAutenticado);
        }else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login falhou");
        }
    }

}

