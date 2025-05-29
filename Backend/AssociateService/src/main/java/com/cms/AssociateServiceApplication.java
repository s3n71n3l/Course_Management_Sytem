package com.cms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableAspectJAutoProxy
@SpringBootApplication
@ComponentScan(basePackages= {"com.*"})
@EnableMongoRepositories("com.cms.repository")
@EnableFeignClients("com.cms.*")
public class AssociateServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AssociateServiceApplication.class, args);
	}

}
