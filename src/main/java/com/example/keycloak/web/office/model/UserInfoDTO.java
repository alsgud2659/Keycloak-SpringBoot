package com.example.keycloak.web.office.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter @Setter @NoArgsConstructor
public class UserInfoDTO implements Serializable {
    private String name;
    private String email;
    private String userId;

}
