package com.example.keycloak.domain.corp;

import com.example.keycloak.domain.corp.model.CorpParam;
import com.example.keycloak.domain.corp.model.CorpDTO;
import com.example.keycloak.domain.corp.model.RegisterCorpDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/corp")
public class CorpController {
    private final CorpService service;

    @PostMapping("/query")
    @ResponseBody
    public CorpDTO getCorp(@RequestBody CorpParam param) {
        return service.getCorp(param);
    }

    @PostMapping("/insert")
    @ResponseBody
    public int registerCorp(@RequestBody RegisterCorpDTO param) {
        return service.registerCorp(param);
    }

    @PostMapping("/query/myCorp")
    @ResponseBody
    public List<CorpDTO> getMyCorp(@RequestBody CorpParam param) {
        return service.getMyCorp(param);
    }

}
