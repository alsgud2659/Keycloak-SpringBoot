package com.example.keycloak.domain.corp;

import com.example.keycloak.domain.corp.model.CorpParam;
import com.example.keycloak.domain.corp.model.CorpDTO;
import com.example.keycloak.domain.corp.model.RegisterCorpDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CorpService {
    private final CorpMapper mapper;

    public CorpDTO getCorp(CorpParam param) {
        return mapper.selectItgCorp(param);
    }

    public int registerCorp(RegisterCorpDTO param) {
        int checkDuplicate = mapper.checkDuplicatedCorp(param);

        if(checkDuplicate == 0) return mapper.insertItgMemberCorpInfo(param);
        else if(checkDuplicate != 0) return 2;

        return 0;
    }

    public List<CorpDTO> getMyCorp(CorpParam param) {
        return mapper.selectItgMemberCorpInfo(param);
    }
}
