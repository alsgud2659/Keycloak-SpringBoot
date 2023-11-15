package com.example.keycloak.model;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class TokenSet {
    private String accessToken;
    private String refreshToken;
}
