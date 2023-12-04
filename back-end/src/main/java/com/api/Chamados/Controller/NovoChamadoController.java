package com.api.Chamados.Controller;
import com.api.Chamados.DTO.NovoChamadoDto;
import com.api.Chamados.model.NovoChamadoModel;
import com.api.Chamados.service.NovoChamadoService;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/chamado")
public class NovoChamadoController {

    final NovoChamadoService novoChamadoService;

    public NovoChamadoController(NovoChamadoService novoChamadoService){this.novoChamadoService = novoChamadoService;}

    @PostMapping
    public ResponseEntity<Object> salvarChamado(@RequestBody @Valid NovoChamadoDto novoChamadoDto){
        var novoChamadoModel = new NovoChamadoModel();
        BeanUtils.copyProperties(novoChamadoDto, novoChamadoModel);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoChamadoService.salvarChamado(novoChamadoModel));
    }
    @GetMapping
    public ResponseEntity<List<NovoChamadoModel>> getAllUsuarios(){
        return ResponseEntity.status(HttpStatus.OK).body(novoChamadoService.findAll());
    }
    @GetMapping("/{id}")
    public ResponseEntity<Object> getChamado(@PathVariable(value = "id") UUID id){
        Optional<NovoChamadoModel> novoChamadoModelOptional = novoChamadoService.findById(id);
        if (!novoChamadoModelOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Chamado não encontrado." +id);
        }
        return ResponseEntity.status(HttpStatus.OK).body(novoChamadoModelOptional.get());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteChamado(@PathVariable(value = "id") UUID id){
        Optional<NovoChamadoModel> novoChamadoModelOptional = novoChamadoService.findById(id);
        if (!novoChamadoModelOptional.isPresent()){
            return ResponseEntity.status((HttpStatus.NOT_FOUND)).body("Chamado não encontrado.");
        }
       novoChamadoService.delete(novoChamadoModelOptional.get());
        return ResponseEntity.status(HttpStatus.OK).body("Chamado deletado com sucesso");
    }
    @PutMapping("/{id}")
    public  ResponseEntity<Object> updateChamado(@PathVariable(value = "id") UUID id,
                                                 @RequestBody @Valid NovoChamadoDto novoChamadoDto){
        Optional<NovoChamadoModel> novoChamadoModelOptional =novoChamadoService.findById(id);
        if (!novoChamadoModelOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Chamado não encontrado.");
        }
        var novoChamadoModel  = novoChamadoModelOptional.get();
        novoChamadoModel.setAssunto(novoChamadoDto.getAssunto());
        novoChamadoModel.setTipo(novoChamadoDto.getTipo());
        novoChamadoModel.setDescricao(novoChamadoDto.getDescricao());
        return ResponseEntity.status(HttpStatus.OK).body(novoChamadoService.salvarChamado(novoChamadoModel));
    }
}
