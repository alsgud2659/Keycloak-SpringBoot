package com.example.keycloak.web.office;

import com.example.keycloak.web.office.model.UserInfoDTO;
import com.example.keycloak.domain.register.AdminClientService;
import com.example.keycloak.domain.corp.CorpService;
import lombok.RequiredArgsConstructor;
import org.keycloak.adapters.springsecurity.token.KeycloakAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequiredArgsConstructor
public class OfficeController {
    private final AdminClientService service;
    private final CorpService corpService;

    @GetMapping(path ="/")
    public String index() {
        return "BeforeLogin";
    }

    @GetMapping("/signUp")
    public String getSignIn() {
        return "SignUp";
    }

    @GetMapping("/home")
    public String getOffice() {
        return "Office";
    }

    @GetMapping("/qna")
    public String getQna() {
        return "qna";
    }

    @GetMapping("/oneOnOne")
    public String getOneOnOne() {
        return "oneOnOne";
    }

    @GetMapping("/notice")
    public String getNotice() {
        return "notice";
    }

    @GetMapping("/programIntro")
    public String getProgramIntro() {
        return "programIntro";
    }

    @GetMapping("/sso-logout")
    public String logout() {
        return "Office";
    }

    @GetMapping("/changeInfo")
    public String changeInfo() {
        return "changeInfo";
    }

    @PostMapping("/getUserInfo")
    @ResponseBody
    public UserInfoDTO getUserInfo() {
        UserInfoDTO result = new UserInfoDTO();
        KeycloakAuthenticationToken authentication = (KeycloakAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        result.setUserId(authentication.getAccount().getKeycloakSecurityContext().getIdToken().getPreferredUsername());
        result.setName(authentication.getAccount().getKeycloakSecurityContext().getIdToken().getName());
        result.setEmail(authentication.getAccount().getKeycloakSecurityContext().getIdToken().getEmail());

        return result;
    }



}
