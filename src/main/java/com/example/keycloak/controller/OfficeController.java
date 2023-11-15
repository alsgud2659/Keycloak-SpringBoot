package com.example.keycloak.controller;

import com.example.keycloak.manager.TokenManager;
import com.example.keycloak.model.UserInfoVo;
import com.example.keycloak.service.AdminClientService;
import com.example.keycloak.service.OfficeService;
import lombok.RequiredArgsConstructor;
import org.apache.http.HttpException;
import org.keycloak.adapters.springsecurity.token.KeycloakAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequiredArgsConstructor
public class OfficeController {
    private final OfficeService service;
    private final AdminClientService aService;

    private final TokenManager tokenManager;

    @GetMapping(path ="/")
    public String index() {
        return "BeforeLogin";
    }

    @GetMapping("signUp")
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

    @PostMapping("/getUserInfo")
    @ResponseBody
    public UserInfoVo getUserInfo() {
        UserInfoVo result = new UserInfoVo();
        KeycloakAuthenticationToken authentication = (KeycloakAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        result.setUserId(authentication.getAccount().getKeycloakSecurityContext().getIdToken().getPreferredUsername());
        result.setName(authentication.getAccount().getKeycloakSecurityContext().getIdToken().getName());
        result.setEmail(authentication.getAccount().getKeycloakSecurityContext().getIdToken().getEmail());

//        aService.applyUser();
        return result;
    }

}
