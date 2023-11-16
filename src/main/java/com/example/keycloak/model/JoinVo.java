package com.example.keycloak.model;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class JoinVo {
    private String memberId;
    private String passTxt;
    private String memberNm;
    private String birthDt;
    private String telNo;
    private String inflowTp;
    private String sexTp;
    private String emailId;
    private String emailPassYn;

    // 약관 동의 여부
    private String termsAppYn;

    // 개인정보수집동의여부
    private String perAppYn;

    // 광고성정보수신동의여부
    private String advAppYn;

    // 제3자정보제공동의여부
    private String the3AppYn;
}
