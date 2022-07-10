package com.example.airbnb.security.service;

import com.example.airbnb.model.Blog;

import java.util.Optional;

public interface BlogService {
    Iterable<Blog> findAll();
    void save(Blog post);
    void delete(Long id);
    Iterable<Blog> findByNameUser(String name);
    Optional<Blog> findById(Long id);
}
