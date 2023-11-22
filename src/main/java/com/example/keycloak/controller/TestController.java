package com.example.keycloak.controller;

import com.example.keycloak.service.TestService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/test")
@RequiredArgsConstructor
public class TestController {

    private final TestService service;
    @PostMapping("/getTest")
    @ResponseBody
    public int getTest() {
        return service.getTest();
    }
}
