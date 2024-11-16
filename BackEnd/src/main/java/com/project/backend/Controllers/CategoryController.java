package com.project.backend.Controllers;

import com.project.backend.Models.Category;
import com.project.backend.Services.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//Rest API
@RestController
@RequestMapping("/api")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    // get all categories
    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    // get category by id
    @GetMapping("/categories/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Integer id) {
        return ResponseEntity.ok(categoryService.getCategoryById(id));
    }

    // save category
    @PostMapping("/categories")
    public ResponseEntity<String> addCategory(@RequestBody Category category) {
        try {
            categoryService.addCategory(category);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }

        return ResponseEntity.ok("Category added successfully");
    }

    // delete category
    @DeleteMapping("/categories/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Integer id) {
        try {
            categoryService.deleteCategory(id);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }

        return ResponseEntity.ok("Category deleted successfully");
    }

    // update category
    @PutMapping("/categories/{id}")
    public ResponseEntity<String> updateCategory(@PathVariable Integer id, @RequestBody Category category) {
        try {
            categoryService.updateCategory(id, category);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }

        return ResponseEntity.ok("Category updated successfully");
    }
}
