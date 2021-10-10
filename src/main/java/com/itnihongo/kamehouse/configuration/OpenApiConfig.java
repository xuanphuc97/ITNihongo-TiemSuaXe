package com.itnihongo.kamehouse.configuration;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()

                .servers(List.of(new Server().url("http://localhost:8080")))
                // info
                .info(new Info().title("Kamehouse Application API").description("Sample OpenAPI 3.0")
                        .contact(new Contact().email("txp.dut@gmail.com").name("noname").url(""))
                        .license(
                                new License().name("Apache 2.0").url("http://www.apache.org/licenses/LICENSE-2.0.html"))
                        .version("1.0.0"));
    }
}