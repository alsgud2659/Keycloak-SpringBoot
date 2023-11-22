package com.example.keycloak.controller;

import com.example.keycloak.model.corp.CorpParam;
import com.example.keycloak.model.corp.CorpVo;
import com.example.keycloak.service.CorpService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequiredArgsConstructor
@RequestMapping("/corp")
public class CorpController {
    private final CorpService service;

    @PostMapping("/query")
    @ResponseBody
    public CorpVo getCorp(@RequestBody CorpParam param) {
        return service.getCorp(param);
    }

    @PostMapping("/insert")
    @ResponseBody
    public int insertCorp() {
        return 0;
    }

}
