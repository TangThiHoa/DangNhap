package com.example.airbnb.repository;


import com.example.airbnb.model.Category;
import com.example.airbnb.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Iterable<Product> findAllByNameContaining(String name);    //Tìm kiểm theo tên

    Iterable<Product> findAllByOrderByPrice();                 //Sắp xếp theo giá tăng dần

    Iterable<Product> findAllByPriceBetween(int from, int to);  //Tìm kiểm trong khoảng giá

    @Query(value = "select * from products order by id desc LIMIT 4", nativeQuery = true)
    Iterable<Product> getTop4();                                  //Tìm 4 sản phẩm mới nhất theo id

    Iterable<Product> findAllByCategory(Category category);       //Tìm theo danh mục
}
