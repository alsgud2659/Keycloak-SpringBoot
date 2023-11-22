package com.example.keycloak.service;

import com.example.keycloak.mapper.TestMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TestService {
    private final TestMapper mapper;

    public int getTest() {
        return mapper.getTest();
    }
}
