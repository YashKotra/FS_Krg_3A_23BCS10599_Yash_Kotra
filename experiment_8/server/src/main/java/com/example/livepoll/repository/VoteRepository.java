package com.example.livepoll.repository;

import com.example.livepoll.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {
    boolean existsByUserIdAndOptionId(Long userId, Long optionId);
}

