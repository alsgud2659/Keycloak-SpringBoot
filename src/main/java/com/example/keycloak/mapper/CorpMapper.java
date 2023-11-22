package com.example.keycloak.mapper;

import com.example.keycloak.model.corp.CorpParam;
import com.example.keycloak.model.corp.CorpVo;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CorpMapper {

    CorpVo selectItgCorp(CorpParam param);
}
