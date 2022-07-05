package com.example.airbnb.service;

import com.example.airbnb.model.Post;

import java.util.Optional;

public interface PostService {
    Iterable<Post> findAll();
    void save(Post post);
    void delete(Long id);
    Iterable<Post> findByNameUser(String name);
    Optional<Post> findById(Long id);
}