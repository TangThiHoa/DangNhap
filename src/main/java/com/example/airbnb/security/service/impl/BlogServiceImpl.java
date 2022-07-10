package com.example.airbnb.security.service.impl;

import com.example.airbnb.model.Blog;
import com.example.airbnb.repository.BlogRepository;
import com.example.airbnb.security.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class BlogServiceImpl implements BlogService {
    @Autowired
    BlogRepository blogRepository;
    @Override
    public Iterable<Blog> findAll() {
        return blogRepository.findAll();
    }

    @Override
    public void save(Blog blog) {
        blogRepository.save(blog);

    }

    @Override
    public void delete(Long id) {
        blogRepository.deleteById(id);

    }

    @Override
    public Iterable<Blog> findByNameUser(String name) {
        return blogRepository.findAllByNameUser(name);
    }

    @Override
    public Optional<Blog> findById(Long id) {
        return blogRepository.findById(id);
    }
}
