package com.project.backend;

import com.project.backend.models.Category;
import com.project.backend.models.Product;
import com.project.backend.models.RoleEnum;
import com.project.backend.models.UserApp;
import com.project.backend.services.CategoryService;
import com.project.backend.services.ProductService;
import com.project.backend.services.UserAppService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;

@SpringBootApplication
public class BackEndApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(BackEndApplication.class, args);
	}

	private final UserAppService userAppService;
	private final CategoryService categoryService;
	private final ProductService productService;

	public BackEndApplication(UserAppService userAppService, CategoryService categoryService, ProductService productService) {
		this.userAppService = userAppService;
		this.categoryService = categoryService;
		this.productService = productService;
	}

	@Override
	public void run(String... args) throws Exception {
		// TODO For testing purposes
		UserApp admin = UserApp.builder()
				.id(1L)
				.name("Admin")
				.email("admin@admin.com")
				.role(RoleEnum.ADMIN.name())
				.password("1234")
				.build();
		userAppService.saveUserApp(admin);

		Category cat1 = Category.builder()
				.id(1L).name("Vegan").build();
		Category cat2 = Category.builder()
				.id(2L).name("Non-vegan").build();
		Category cat3 = Category.builder()
				.id(3L).name("Gluten free").build();
		categoryService.addCategory(cat1);
		categoryService.addCategory(cat2);
		categoryService.addCategory(cat3);

		Product prod1 = Product.builder()
				.id(1L).name("Strawberry Cake").price(22.9)
				.categories(categoryService.getAllCategories()).build();
		Product prod2 = Product.builder()
				.id(2L).name("Vanilla Cake").price(15.5)
				.categories(categoryService.getAllCategories()).build();
		Product prod3 = Product.builder()
				.id(3L).name("Coconut Cake").price(18.2)
				.categories(categoryService.getAllCategories()).build();
		productService.addProduct(prod1);
		productService.addProduct(prod2);
		productService.addProduct(prod3);
	}
}
