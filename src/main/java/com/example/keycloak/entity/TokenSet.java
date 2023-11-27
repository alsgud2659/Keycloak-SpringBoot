package com.example.keycloak.entity;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class TokenSet {
    private String accessToken;
    private String refreshToken;
}
