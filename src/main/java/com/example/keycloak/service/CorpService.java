package com.example.keycloak.service;

import com.example.keycloak.mapper.CorpMapper;
import com.example.keycloak.model.corp.CorpParam;
import com.example.keycloak.model.corp.CorpVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CorpService {
    private final CorpMapper mapper;

    public CorpVo getCorp(CorpParam param) {
        return mapper.selectItgCorp(param);
    }
}
