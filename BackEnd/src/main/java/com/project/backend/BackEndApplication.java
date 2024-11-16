package com.project.backend;

import com.project.backend.models.RoleEnum;
import com.project.backend.models.UserApp;
import com.project.backend.services.UserAppService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackEndApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(BackEndApplication.class, args);
	}

	private final UserAppService userAppService;

	public BackEndApplication(UserAppService userAppService) {
		this.userAppService = userAppService;
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
	}
}
