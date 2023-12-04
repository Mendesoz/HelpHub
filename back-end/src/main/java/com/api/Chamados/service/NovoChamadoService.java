package com.api.Chamados.service;

import com.api.Chamados.Repository.NovoChamadoRepository;
import com.api.Chamados.model.NovoChamadoModel;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class NovoChamadoService {

   final NovoChamadoRepository novoChamadoRepository;

    public NovoChamadoService(NovoChamadoRepository novoChamadoRepository){this.novoChamadoRepository = novoChamadoRepository;}

    @Transactional
    public NovoChamadoModel salvarChamado(NovoChamadoModel novoChamadoModel){
        return novoChamadoRepository.save(novoChamadoModel);
    }
    public List<NovoChamadoModel> findAll(){
        return novoChamadoRepository.findAll();
    }

    public Optional<NovoChamadoModel> findById(UUID id){

      return novoChamadoRepository.findById(id) ;
  }
    @Transactional
    public void delete(NovoChamadoModel novoChamadoModel){
            novoChamadoRepository.delete(novoChamadoModel);
    }

}


