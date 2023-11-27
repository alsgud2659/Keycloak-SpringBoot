package com.example.keycloak.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.OAuth2Constants;
import org.keycloak.adapters.springboot.KeycloakSpringBootConfigResolver;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
@RequiredArgsConstructor
public class KeycloakConfiguration {

    @Value("${keycloak.auth-server-url}")
    private String authServerUrl = "http://172.23.62.255:8080";

    @Value("${keycloak.realm}")
    private String realm = "my-realm";

    @Value("${keycloak.resource}")
    private String clientId = "test-client";

    @Value("${keycloak.credentials.secret}")
    private String clientSecret = "PRb9BFanT3zAKam8kbor1jaaEfCR8lGu";
    /*
     *  keycloak.json 대신에 Spring Boot yml 파일을 이용하도록 돕는다.
     * */
    @Bean
    public KeycloakSpringBootConfigResolver KeycloakConfigResolver() {
        return new KeycloakSpringBootConfigResolver();
    }
    /*
     *  Keycloak 서버와 통신하기 위한 클라이언트 빌더
     * */
    @Bean
    public Keycloak keycloak() {
        return KeycloakBuilder.builder()
                .serverUrl(authServerUrl)
                .realm(realm)
                .grantType(OAuth2Constants.CLIENT_CREDENTIALS)
                .clientId(clientId)
                .clientSecret(clientSecret)
                .build();
    }
}
