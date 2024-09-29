package com.rainbowdev.backend.repository;

import com.rainbowdev.backend.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}