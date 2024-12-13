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

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class BackEndApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(BackEndApplication.class, args);
	}

	private final UserAppService userAppService;
	private final CategoryService categoryService;
	private final ProductService productService;

	public BackEndApplication(UserAppService userAppService, CategoryService categoryService,
			ProductService productService) {
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
				.provider("local")
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

		List<Category> catList = new ArrayList<>();
		catList.add(cat1);

		Product prod1 = Product.builder()
				.id(1L)
				.name("Strawberry Cake")
				.price(22.9)
				.weight(700)
				.url("https://cdn.pixabay.com/photo/2017/03/14/05/49/small-cake-2142072_1280.jpg")
				.description(
						"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")
				.categories(categoryService.getAllCategories())
				.build();
		Product prod2 = Product.builder()
				.id(2L)
				.name("Vanilla Cake")
				.price(15.5)
				.weight(550)
				.url("https://cdn.pixabay.com/photo/2019/04/29/21/52/cake-4167209_1280.jpg")
				.description(
						"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")
				.categories(categoryService.getAllCategories())
				.build();
		Product prod3 = Product.builder()
				.id(3L)
				.name("Coconut Cake")
				.price(18.2)
				.weight(600)
				.url("https://cdn.pixabay.com/photo/2015/04/17/19/20/cake-727854_1280.jpg")
				.description(
						"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")
				.categories(categoryService.getAllCategories()).build();
		Product prod4 = Product.builder()
				.id(4L)
				.name("Carrot Cake")
				.price(14.3)
				.weight(500)
				.url("https://cdn.pixabay.com/photo/2020/02/29/15/20/cake-4890393_1280.jpg")
				.description(
						"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")
				.categories(categoryService.getAllCategories()).build();
		Product prod5 = Product.builder()
				.id(5L)
				.name("Red velvet Cake")
				.price(17.4)
				.weight(500)
				.url("https://cdn.pixabay.com/photo/2019/01/28/10/00/strawberry-cake-3959998_1280.jpg")
				.description(
						"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")
				.categories(catList).build();
		Product prod6 = Product.builder()
				.id(6L)
				.name("12x Assorted macarons")
				.price(20.0)
				.weight(500)
				.url("https://cdn.pixabay.com/photo/2023/01/13/17/30/macarons-7716584_1280.jpg")
				.description(
						"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")
				.categories(catList).build();
		Product prod7 = Product.builder()
				.id(7L)
				.name("6x Assorted macarons")
				.price(11.5)
				.weight(500)
				.url("https://cdn.pixabay.com/photo/2023/01/13/17/30/macarons-7716584_1280.jpg")
				.description(
						"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")
				.categories(catList).build();
		Product prod8 = Product.builder()
				.id(8L)
				.name("12x Assorted cookies")
				.price(11.5)
				.weight(500)
				.url("https://cdn.pixabay.com/photo/2022/01/19/16/35/cookies-6950467_1280.jpg")
				.description(
						"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")
				.categories(catList).build();
		Product prod9 = Product.builder()
				.id(9L)
				.name("6x Assorted cookies")
				.price(11.5)
				.weight(500)
				.url("https://cdn.pixabay.com/photo/2022/01/19/16/35/cookies-6950467_1280.jpg")
				.description(
						"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")
				.categories(catList).build();
		productService.addProduct(prod1);
		productService.addProduct(prod2);
		productService.addProduct(prod3);
		productService.addProduct(prod4);
		productService.addProduct(prod5);
		productService.addProduct(prod6);
		productService.addProduct(prod7);
		productService.addProduct(prod8);
		productService.addProduct(prod9);
	}
}
