package com.example.airbnb.security.impl;


import com.example.airbnb.model.Category;
import com.example.airbnb.model.Product;
import com.example.airbnb.repository.ProductRepository;
import com.example.airbnb.security.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductService implements IProductService {
    @Autowired
    ProductRepository productRepository;

    @Override
    public void save(Product product) {
        productRepository.save(product);

    }

    @Override
    public Iterable<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public void remove(Long id) {
        productRepository.deleteById(id);

    }

    @Override
    public Iterable<Product> findAllByNameContaining(String name) {
        return productRepository.findAllByNameContaining(name);
    }

    @Override
    public Iterable<Product> findAllByOrderByPrice() {

        return productRepository.findAllByOrderByPrice();
    }

    @Override
    public Iterable<Product> findAllByPriceBetween(int from, int to) {
        return productRepository.findAllByPriceBetween(from, to);
    }

    @Override
    public Iterable<Product> getTop4() {
        return productRepository.getTop4();
    }

    @Override
    public Iterable<Product> findAllByCategory(Category category) {
        return productRepository.findAllByCategory(category);
    }
}
