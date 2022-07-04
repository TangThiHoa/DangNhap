package com.example.airbnb.security.impl;


import com.example.airbnb.model.Category;
import com.example.airbnb.repository.CategoryRepository;
import com.example.airbnb.security.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class CategoryService implements ICategoryService {
    @Autowired
    CategoryRepository categoryRepository;
    @Override
    public void save(Category category) {
        categoryRepository.save(category);
    }

    @Override
    public Iterable<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Optional<Category> findById(Long id) {
        return categoryRepository.findById(id);
    }

    @Override
    public void remove(Long id) {
        categoryRepository.deleteById(id);

    }
}
