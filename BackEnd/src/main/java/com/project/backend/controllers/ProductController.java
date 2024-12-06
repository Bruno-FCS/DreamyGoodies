package com.project.backend.controllers;

import com.project.backend.models.Product;
import com.project.backend.services.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//Rest API
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // get all products
    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    // get product by id
    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Integer id) {
        Product product = this.productService.getProductById(id);
        if (product == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(product);
    }

    // save product
    @PostMapping("/products")
    public ResponseEntity<String> addProduct(@RequestBody Product product) {
        // proceed with adding the product
        try {
            productService.addProduct(product);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }

        return ResponseEntity.ok("Product added successfully");
    }

    // delete product
    @DeleteMapping("/products/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Integer id) {
        try {
            productService.deleteProduct(id);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }

        return ResponseEntity.ok("Product deleted successfully");
    }

    // update product
    @PutMapping("/products/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable Integer id, @RequestBody Product product) {
        try {
            productService.updateProduct(id, product);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }

        return ResponseEntity.ok("Product updated successfully");
    }
}
