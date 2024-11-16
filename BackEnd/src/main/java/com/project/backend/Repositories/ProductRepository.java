package com.project.backend.Repositories;

import com.project.backend.Models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    // find the product by name
    Product findByName(String name);
}
