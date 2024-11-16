package com.project.backend.Controllers;

import com.project.backend.Models.Category;
import com.project.backend.Models.Dish;
import com.project.backend.Services.CategoryServices;
import com.project.backend.Services.DishService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//Rest APIs
@RestController
@RequestMapping("/restaurant/api")
public class DishController {
    private final ProductService dishService;
    private final CategoryService categoryServices;

    public DishController(ProductService dishService, CategoryService categoryServices) {
        this.dishService = dishService;
        this.categoryServices = categoryServices;
    }

    // get all dishes
    @GetMapping("/dishes")
    public ResponseEntity<List<Product>> getAllDishes() {
        return ResponseEntity.ok(dishService.getAllDishes());
    }

    // get dish by id
    @GetMapping("/dishes/{id}")
    public ResponseEntity<Product> getDishById(@PathVariable Integer id) {
        return ResponseEntity.ok(dishService.getDishById(id));
    }

    // save dish
    @PostMapping("/dishes")
    public ResponseEntity<String> addDish(@RequestBody Product dish) {
        // check if the category exists
        Category existingCategory = categoryServices.getCategoryByName(dish.getCategory().getName());

        // if the category exists, set existing category (with the name) to the dish
        // before adding
        // so that a duplicate category is not created
        if (existingCategory != null) {
            dish.setCategory(existingCategory);
        }

        // proceed with adding the dish
        try {
            dishService.addDish(dish);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }

        return ResponseEntity.ok("Dish added successfully");
    }

    // delete dish
    @DeleteMapping("/dishes/{id}")
    public ResponseEntity<String> deleteDish(@PathVariable Integer id) {
        try {
            dishService.deleteDish(id);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }

        return ResponseEntity.ok("Dish deleted successfully");
    }

    // update dish
    @PutMapping("/dishes/{id}")
    public ResponseEntity<String> updateDish(@PathVariable Integer id, @RequestBody Product dish) {
        Category existingCategory = categoryServices.getCategoryByName(dish.getCategory().getName());

        // if the category exists, set existing category (with the name) to the dish
        // before updating
        // so that a duplicate category is not created (we don't want to update existing
        // category, just the dish)
        if (existingCategory != null) {
            dish.setCategory(existingCategory);
        }

        // proceed with updating the dish
        try {
            dishService.updateDish(id, dish);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }

        return ResponseEntity.ok("Dish updated successfully");
    }
}
