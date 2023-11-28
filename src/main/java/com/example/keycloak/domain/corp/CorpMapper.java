package com.example.keycloak.domain.corp;

import com.example.keycloak.domain.corp.model.CorpParam;
import com.example.keycloak.domain.corp.model.CorpDTO;
import com.example.keycloak.domain.corp.model.RegisterCorpDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CorpMapper {

    CorpDTO selectItgCorp(CorpParam param);

    /** 통합회원회사정보 테이블에 INSERT */
    int insertItgMemberCorpInfo(RegisterCorpDTO param);

    /** 통합회원회사정보 테이블에 INSERT 하기 전 중복체크 */
    int checkDuplicatedCorp(RegisterCorpDTO param);

    /** 회사 선택 팝업에서 사용자가 등록해둔 회사 목록 조회 */
    List<CorpDTO> selectItgMemberCorpInfo(CorpParam param);

    /** 통합회원회사정보 테이블에서 DELETE */
    int deleteItgMemberCorpInfo(CorpParam param);
}
