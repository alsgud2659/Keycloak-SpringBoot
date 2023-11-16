package com.example.keycloak.manager;

import com.example.keycloak.model.TokenSet;
import com.nimbusds.oauth2.sdk.TokenResponse;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.apache.http.HttpException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.http.*;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.WebApplicationContext;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class TokenManager implements CommandLineRunner {
    private RestTemplate restTemplate = new RestTemplate();;
    private String authServerUrl = "http://172.26.176.51:8080";
    private final String realm = "master";
    private final String clientId = "admin-cli";
    private final String clientSecret = "9V2I1siDxckmlj3qesFsfUoGFtJ4XRRM";

    private String accessToken;

    private String refreshToken;

    @Override
    public void run(String... args) throws Exception {
        TokenSet token = retrieveToken();
        accessToken = token.getAccessToken();
        refreshToken = token.getRefreshToken();
    }

    @PostConstruct
    public String getAccessToken() {
        if (accessToken == null) {
            // 토큰이 없을 경우 발급 받아서 저장
            TokenSet token = retrieveToken();
            accessToken = token.getAccessToken();
            refreshToken = token.getRefreshToken();
        }

        return accessToken;
    }

    private TokenSet retrieveToken() {
        String tokenUrl = authServerUrl + "/realms/" + realm + "/protocol/openid-connect/token";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "password");
        body.add("client_id", clientId);
        body.add("client_secret", clientSecret);
        body.add("username", "admin");
        body.add("password", "123");

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.exchange(tokenUrl, HttpMethod.POST, request, Map.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            TokenSet tokenSet = new TokenSet();
            tokenSet.setAccessToken("Bearer " + response.getBody().get("access_token").toString());
            tokenSet.setRefreshToken(response.getBody().get("refresh_token").toString());
            System.out.println("REFRESH_TOKEN : " + tokenSet.getRefreshToken());
            return tokenSet;
        } else {
            throw new RuntimeException("Failed to retrieve access token from Keycloak");
        }
    }

}
