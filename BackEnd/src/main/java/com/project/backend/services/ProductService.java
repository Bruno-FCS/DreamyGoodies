package com.project.backend.services;

import com.project.backend.models.Product;
import com.project.backend.repositories.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // get all products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // get product by id
    public Product getProductById(int id) {
        return productRepository.findById(id).orElse(null);
    }

    // add product
    public void addProduct(Product product) {
        Product existingProduct = this.productRepository.findByName(product.getName());
        if (existingProduct != null) {
            throw new IllegalStateException("Product with name: '" + product.getName() + "' already exists! Insertion failed!");
        }
        productRepository.save(product);
    }

    // update product
    public void updateProduct(int productId, Product product) {
        boolean existsProduct = this.productRepository.existsById(productId);
        if (!existsProduct) {
            throw new IllegalStateException("Product with Id: '" + productId + "' doesn't exist! Modification failed!");
        }
        Product existingProduct = this.productRepository.findByName(product.getName());
        if (existingProduct != null && existingProduct.getId() != productId) {
            throw new IllegalStateException("Product with name: '" + product.getName() + "' already exists! Modification failed!");
        }
        product.setId(productId);
        productRepository.save(product);
    }

    // delete product
    public void deleteProduct(int productId) {
        boolean existsProduct = this.productRepository.existsById(productId);
        if (!existsProduct) {
            throw new IllegalStateException("Product with Id: '" + productId + "' doesn't exist! Deletion failed!");
        }
        productRepository.deleteById(productId);
    }
}
