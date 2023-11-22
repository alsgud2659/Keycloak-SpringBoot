package com.example.keycloak.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface JoinMapper {
    int insertItgMember();
}
