package com.api.Chamados.Repository;

import com.api.Chamados.model.NovoChamadoModel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;


@Repository
public interface NovoChamadoRepository extends JpaRepository<NovoChamadoModel, UUID> {

}
