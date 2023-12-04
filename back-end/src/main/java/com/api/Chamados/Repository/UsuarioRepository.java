package com.api.Chamados.Repository;

import com.api.Chamados.model.UsuarioModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioModel, UUID> {
    boolean existsByEmail(String email);
    UsuarioModel findByEmail(String email);
}
