package com.project.backend.Repositories;

import com.project.backend.Models.Dish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    // find the dish by name
    @Query("SELECT d FROM Dish d WHERE d.name = :name")
    Product findByName(String name);
}
