package com.project.backend.repositories;

import com.project.backend.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    // find the product by name
    Product findByName(String name);
}
