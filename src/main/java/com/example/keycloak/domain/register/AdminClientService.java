package com.example.keycloak.domain.register;

import com.example.keycloak.config.KeycloakConfiguration;
import com.example.keycloak.domain.register.model.Register;
import com.example.keycloak.manager.TokenManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.http.*;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminClientService {
    Keycloak keycloak = new KeycloakConfiguration().keycloak();
    private final TokenManager tokenManager;

    @Deprecated
    @PostConstruct
    public void SearchUsers() {
        searchByUsername("asd123", true);
    }

    @Deprecated
    void searchByUsername(String username, boolean exact) {
        log.info("Searching by username: {} (exact {})", username, exact);
        List<UserRepresentation> users = keycloak.realm("my-realm")
                .users()
                .searchByUsername(username, exact);

        log.info("Users found by username {}", users.stream()
                .map(UserRepresentation::getUsername)
                .collect(Collectors.toList()));
    }

    public void applyUser(Register joinInfo) {
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

        String url = "http://172.28.150.171:8080/admin/realms/my-realm/users";
        RestTemplate rt = new RestTemplate();

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.add("Authorization", tokenManager.getAccessToken());
            HttpEntity<Object> entity = new HttpEntity<>(user, headers);
            ResponseEntity<Object> result = rt.exchange(url, HttpMethod.POST, entity, Object.class);

            System.out.println(result.getStatusCode());

        }catch (HttpClientErrorException e) {
            System.out.println("토큰 재발급");
            tokenManager.getAccessToken();
        }

    }

}
