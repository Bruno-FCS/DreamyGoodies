package com.project.backend.Services;

import com.project.backend.Models.Category;
import com.project.backend.Repositories.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // get all categories
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // get category by id
    public Category getCategoryById(int id) {
        return categoryRepository.findById(id).orElse(null);
    }

    // add category
    public void addCategory(Category category) {
        Category existingCategory = this.categoryRepository.findByName(category.getName());
        if (existingCategory != null) {
            throw new IllegalStateException("Category with name: '" + category.getName() + "' already exists! Insertion failed!");
        }
        categoryRepository.save(category);
    }

    // update category
    public void updateCategory(int categoryId, Category category) {
        boolean existsCategory = this.categoryRepository.existsById(categoryId);
        if (!existsCategory) {
            throw new IllegalStateException("Category with Id: '" + categoryId + "' doesn't exist! Update failed!");
        }
        category.setId(categoryId);
        categoryRepository.save(category);
    }

    // delete category
    public void deleteCategory(int categoryId) {
        boolean existsCategory = this.categoryRepository.existsById(categoryId);
        if (!existsCategory) {
            throw new IllegalStateException("Category with Id: '" + categoryId + "' doesn't exist! Delete failed!");
        }
        categoryRepository.deleteById(categoryId);
    }
}
