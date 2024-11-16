package com.project.backend.repositories;

import com.project.backend.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    // find the category by name
    Category findByName(String name);
}
