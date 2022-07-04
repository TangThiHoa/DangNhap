package com.example.airbnb.security;


import com.example.airbnb.model.Category;
import com.example.airbnb.model.Product;
import org.springframework.data.jpa.repository.Query;

public interface IProductService extends IService<Product> {
    Iterable<Product> findAllByNameContaining(String name);    //Tìm kiểm theo tên

    Iterable<Product> findAllByOrderByPrice();                 //Sắp xếp theo giá tăng dần

    Iterable<Product> findAllByPriceBetween(int from, int to);  //Tìm kiểm trong khoảng giá

    @Query(value = "select * from products order by id desc LIMIT 4", nativeQuery = true)
    Iterable<Product> getTop4();                                  //Tìm 4 sản phẩm mới nhất theo id

    Iterable<Product> findAllByCategory(Category category);       //Tìm theo danh m
}
