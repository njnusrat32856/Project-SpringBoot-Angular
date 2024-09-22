package com.nusrat.BmsBank.repository;

import com.nusrat.BmsBank.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TokenRespository extends JpaRepository<Token, Integer> {

    Optional<Token> findByToken(String token);

    @Query("""
select t from Token t inner join User u on t.user.id = u.id
where t.user.id = :userId and t.loggedOut = false
""")
    List<Token> findAllTokensByUserId(Long userId);
}
