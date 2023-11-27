package com.example.keycloak.domain.corp.model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter @Setter
public class RegisterCorpDTO {
    // 회원 아이디
    private String memberId;

    // 순번
    private Integer seq;

    // 회사코드
    private String corpCd;

    // 정렬순서
    private Integer sortSeq;

    // 비고
    private String remarkTxt;

    // 등록일시
    private LocalDate insertDatetime;

    // 수정일시
    private LocalDate updateDatetime;


}
