package com.example.airbnb.controller;


import com.example.airbnb.model.Category;
import com.example.airbnb.model.Product;
import com.example.airbnb.security.ICategoryService;
import com.example.airbnb.security.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("")
public class ProductController {
    @Autowired
    IProductService productService;
    @Autowired
    ICategoryService categoryService;

    @GetMapping("/products")     //Hiển thị
    public ResponseEntity<Iterable<Product>> findAllProduct() {
        return new ResponseEntity<>(productService.findAll(), HttpStatus.OK);
    }

    @PostMapping("/admin/products")     //Thêm mới
    public ResponseEntity add(@Valid @RequestBody Product product) {
        productService.save(product);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/admin/products/{id}")         //Tìm theo id
    public ResponseEntity<Product> findProductById(@PathVariable Long id) {
        Optional<Product> product = productService.findById(id);
        if (!product.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(product.get(), HttpStatus.OK);
    }

    @PutMapping("/admin/products/{id}")           //Chỉnh sửa theo id
    public ResponseEntity updateProduct(@RequestBody Product product, @PathVariable Long id) {
        Optional<Product> productOptional = productService.findById(id);
        if (!productOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        product.setId(productOptional.get().getId());
        productService.save(product);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/admin/products/{id}")              //Xóa theo id
    public ResponseEntity<Product> deleteProduct(@PathVariable Long id) {
        Optional<Product> productOptional = productService.findById(id);
        if (!productOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        productService.remove(id);
        return new ResponseEntity<>(productOptional.get(), HttpStatus.OK);
    }

    @GetMapping("/orderByPrice")            //sắp xếp theo giá
    public ResponseEntity<Iterable<Product>> findAllByOrderByPrice() {
        Iterable<Product> products = productService.findAllByOrderByPrice();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/top4New")                 //Tìm 4 sản phẩm mới nhất
    public ResponseEntity<Iterable<Product>>getTop4New(){
        Iterable<Product> products = productService.getTop4();
        return new ResponseEntity<>(products, HttpStatus.OK);

    }

    @GetMapping("/priceBetween")               //Tìm trong khoảng giá
    public ResponseEntity<Iterable<Product>> findAllByPriceBetween(@RequestParam int from, @RequestParam int to) {
        return new ResponseEntity<>(productService.findAllByPriceBetween(from, to), HttpStatus.OK);
    }

    @GetMapping("/searchName")              //Tìm theo tên
    public ResponseEntity<Iterable<Product>> findAllByNameContainingProduct(@RequestParam String name) {
        Iterable<Product> products = productService.findAllByNameContaining(name);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/searchCategory/{id}")              //Tìm theo danh mục
    public ResponseEntity<Iterable<Product>> findAllByCategory(@PathVariable Long id) {
        Category category = categoryService.findById(id).get();
        Iterable<Product> products = productService.findAllByCategory(category);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }


}