package com.example.keycloak.domain.register;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface JoinMapper {
    int insertItgMember();
}
