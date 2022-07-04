package com.example.airbnb.security;

import java.util.Optional;

public interface IService<T> {
    void save(T t);

    Iterable<T> findAll();

    Optional<T> findById(Long id);

    void remove(Long id);

}
