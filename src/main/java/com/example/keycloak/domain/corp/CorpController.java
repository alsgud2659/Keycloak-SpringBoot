package com.example.keycloak.domain.corp;

import com.example.keycloak.domain.corp.model.CorpParam;
import com.example.keycloak.domain.corp.model.CorpDTO;
import com.example.keycloak.domain.corp.model.RegisterCorpDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/corp")
public class CorpController {
    private final CorpService service;

    @PostMapping("/query")
    public CorpDTO getCorp(@RequestBody CorpParam param) {
        return service.getCorp(param);
    }

    @PostMapping("/insert")
    public int registerCorp(@RequestBody RegisterCorpDTO param) {
        return service.registerCorp(param);
    }

    @PostMapping("/query/myCorp")
    public List<CorpDTO> getMyCorp(@RequestBody CorpParam param) {
        return service.getMyCorp(param);
    }

    @PostMapping("/delete")
    public int deleteCorp(@RequestBody CorpParam param) {
        return service.deleteCorp(param);
    }

}
