package com.example.keycloak.domain.register;

import com.example.keycloak.domain.register.model.Register;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class RegisterController {

    private final AdminClientService service;

    @PostMapping("/join")
    public int join(@RequestBody Register joinInfo) {
        try {
            service.applyUser(joinInfo);
        }catch (Exception e) {
            return 0;
        }
        return 1;
    }
}
