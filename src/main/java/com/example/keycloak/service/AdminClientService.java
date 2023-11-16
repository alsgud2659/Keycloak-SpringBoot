package com.example.keycloak.service;

import com.example.keycloak.config.KeycloakConfiguration;
import com.example.keycloak.manager.TokenManager;
import com.example.keycloak.model.JoinVo;
import jakarta.ws.rs.core.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpException;
import org.keycloak.admin.client.Config;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.http.*;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminClientService {
    Keycloak keycloak = new KeycloakConfiguration().keycloak();
    private final TokenManager tokenManager;
    @PostConstruct
    public void SearchUsers() {
        searchByUsername("asd123", true);
    }

    void searchByUsername(String username, boolean exact) {
        log.info("Searching by username: {} (exact {})", username, exact);
        List<UserRepresentation> users = keycloak.realm("my-realm")
                .users()
                .searchByUsername(username, exact);

        log.info("Users found by username {}", users.stream()
                .map(user -> user.getUsername())
                .collect(Collectors.toList()));
    }
    public void applyUser(JoinVo joinInfo) {
        UserRepresentation user = new UserRepresentation();

        // 비밀번호
        CredentialRepresentation credentialRepresentation = new CredentialRepresentation();
        credentialRepresentation.setTemporary(false);
        credentialRepresentation.setType(CredentialRepresentation.PASSWORD);
        credentialRepresentation.setValue(joinInfo.getPassTxt());

        // 아이디, 이름, 이메일 정보
        user.setEnabled(true);
        user.setUsername(joinInfo.getMemberId());
        user.setFirstName(joinInfo.getMemberNm());
        user.setEmail(joinInfo.getEmailId());
        user.setEmailVerified(true);
        user.setCredentials(Collections.singletonList(credentialRepresentation));

        String url = "http://172.26.176.51:8080/admin/realms/my-realm/users";
        RestTemplate rt = new RestTemplate();

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.add("Authorization", tokenManager.getAccessToken());
            HttpEntity<Object> entity = new HttpEntity<>(user, headers);
            ResponseEntity<Object> result = rt.exchange(url.toString(), HttpMethod.POST, entity, Object.class);

            System.out.println(result.getStatusCode());

        }catch (HttpClientErrorException e) {
            System.out.println("토큰 재발급");
            tokenManager.getAccessToken();
        }

    }

}
