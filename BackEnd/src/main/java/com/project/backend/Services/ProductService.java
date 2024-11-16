package com.project.backend.Services;

import com.project.backend.Models.Dish;
import com.project.backend.Repositories.DishRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository dishRepository;

    public ProductService(ProductRepository dishRepository) {
        this.dishRepository = dishRepository;
    }

    // get all dishes
    public List<Product> getAllDishes() {
        return dishRepository.findAll();
    }

    // get dish by id
    public Product getDishById(int id) {
        return dishRepository.findById(id).orElse(null);
    }

    // add dish
    public void addDish(Product dish) {
        Product existingDish = this.dishRepository.findByName(dish.getName());
        if (existingDish != null) {
            throw new IllegalStateException("Dish with " + dish.getName() + " already exists! Insert failed!");
        }
        dishRepository.save(dish);
    }

    // update dish
    public void updateDish(int dishId, Product dish) {
        boolean existsDish = this.dishRepository.existsById(dishId);
        if (!existsDish) {
            throw new IllegalStateException("Dish with " + dishId + " doesn't exist! Update failed!");
        }
        dish.setId(dishId);
        dishRepository.save(dish);
    }

    // delete dish
    public void deleteDish(int dishId) {
        boolean existsDish = this.dishRepository.existsById(dishId);
        if (!existsDish) {
            throw new IllegalStateException("Dish with " + dishId + " doesn't exist! Delete failed!");
        }
        dishRepository.deleteById(dishId);
    }
}
