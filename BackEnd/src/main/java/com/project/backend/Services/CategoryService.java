package com.project.backend.Services;

import com.project.backend.Models.Category;
import com.project.backend.Repositories.CategoryRepository;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // find category by name
    public Category getCategoryByName(String name) {
        return categoryRepository.findByName(name);
    }
}
