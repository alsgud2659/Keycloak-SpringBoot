// 셀렉트
const selectBoxElements = document.querySelectorAll(".select");

// TODO data 분해하기(사유 : userId, userName을 packaging해야하는 이유가 없음)
const userInfo = {
  data: null,
}

// 등록이 하나도 안되어 있으면
// 메인 회사 등록
let registrationCom = 1;
const popupBg = document.querySelector('.popup-bg');
const popupService = document.querySelector('.popup-service');
const popupReg = document.querySelectorAll('.popup-registration')
if(registrationCom === 0){
  popupBg.classList.add('active')
  popupService.classList.add('active')
}

// 렌더링 완료시 실행됨
window.onload = async function () {
  await getUserInfo();
  await setUserInfo();
  getMyCorpInHeader();
}
/** 유저정보를 가져오는 함수 */
async function getUserInfo() {
  // const result = await axios.post('/getUserInfo').catch()
  // if(result) userInfo.data =  result.data;
  // else alert('유저 정보 조회 실패')

  const { data } = await axios.post('/getUserInfo').catch(err => {
    console.error(err);
    alert('유저 정보 조회 실패');
  });

  userInfo.data = data;
}

/** 유저정보를 헤더 바에 넣어주는 함수 */
async function setUserInfo() {
  const userName = document.querySelectorAll('user-name')
  const largeName = document.getElementById('largeName')

  // if(largeName !== null) largeName.innerHTML = userInfo.data.name + '님, 안녕하세요!'
  if(largeName !== null) largeName.innerHTML = `${userInfo.data.name}님, 안녕하세요!`

  userName.forEach(u => u.innerHTML = userInfo.data.name)

  // userName[0].innerHTML = userInfo.data.name
  // userName[1].innerHTML = userInfo.data.name
}

/** 회사등록 팝업에서 회사코드 입력으로 회사조회
 * @Param 회사코드(corpCd) */
async function searchCorp(param) {

  // TODO if -> catch
  const result = await axios.post('/corp/query', {corpCd: param})
  if (result.data) {
    document.getElementById('corp-search-result').innerHTML = '1'
    document.getElementById('corpCd').innerHTML = result.data.corpCd
    document.getElementById('corpNm').innerHTML = result.data.corpNm
    document.getElementById('corpRegNo').innerHTML = result.data.corpRegNo
    document.getElementById('ceoNm').innerHTML = result.data.ceoNm
  } else {
    alert('검색결과가 없습니다.')
  }
}

/** 회사등록 팝업에서 등록버튼을 눌렀을 때 회사를 등록해주는 함수
 * @Param 회사코드(corpCd)
 * */
async function registerCorp(corpCd) {
  if(!corpCd) return
  const $completeRegisteation = document.getElementsByClassName('complete-registration')[0];
  const userId = userInfo.data.userId
  const param = {
    corpCd: corpCd,
    memberId: userId
  }

  // TODO if -> catch
  const result = await axios.post('/corp/insert', param)
  if(result.data === 1) {
    // 회사등록 성공시 성공문구 출력 후 1.5초 뒤에 사라짐
    $completeRegisteation.classList.add('active')
    setTimeout(() => {
      $completeRegisteation.classList.remove('active')
    }, 1500)
  } else if (result.data === 2) alert('이미 등록된 회사입니다.')
  else alert('회사등록을 실패했습니다.')

}

/** 헤더의 셀렉트 박스에 사용 가능한 회사 목록을 조회해주는 함수 */
async function getMyCorpInHeader() {
  const myCorpList = document.getElementById('myCorp')

  // TODO if -> catch
  const result = await axios.post('/corp/query/myCorp', {memberId : userInfo.data.userId})
  // 데이터가 있는 경우에만 회사 리스트를 헤더의 회사 선택 셀렉트박스에 넣어줌
  if(result) {
    // TODO Quest: use map
    result.data.forEach(item => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <span style="display:none">${item.corpCd}</span>
        ${item.corpNm}
      `;
      listItem.classList.add('option')
      myCorpList.appendChild(listItem);
    })
  }

  // TODO JS에서 만드는게 아니라 HTML에서 정적으로 형성되게 바꾸기(사유: JS에서 동적으로 바뀌는 부분이 없음)
  // 데이터가 없는 경우에도 마지막에 회사등록 버튼을 셀렉트 박스에 넣어줌
  const additionalListItem = document.createElement('li');
  additionalListItem.classList.add('option-btn');
  additionalListItem.innerHTML = `
  <button onclick="popupRegOpen(0)">
      <img src="/assets/icon/option-btn.svg" alt="플러스">
      회사 등록
  </button>
  `;
  myCorpList.appendChild(additionalListItem);

}

function toggleSelectBox(selectBox) {
  selectBox.classList.toggle("active");
}

function selectOption(optionElement) {
  const selectBox = optionElement.closest(".select");
  const selectedElement = selectBox.querySelector(".selected-value");
  const optionElements = selectBox.querySelectorAll(".option");

  // 선택된 옵션 텍스트
  const selectedText = optionElement.innerText;

  // option 텍스트와 selected 텍스트가 동일한 경우 클래스 추가
  // optionElements.forEach(option => {
  //   if (option.innerText === selectedText) {
  //     option.classList.add("selected-option");
  //   } else {
  //     option.classList.remove("selected-option");
  //   }
  // });

  optionElements.forEach(({ innerText, classList }) => {
    innerText === selectedText ? classList.add("selected-option") : classList.remove("selected-option")
  });

  selectedElement.innerText = selectedText;
  // console.log(selectedText);
}

selectBoxElements.forEach(selectBoxElement => {
  selectBoxElement.addEventListener("click", function (e) {
    const targetElement = e.target;
    const isOptionElement = targetElement.classList.contains("option");

    // if (isOptionElement) {
    //   selectOption(targetElement);
    // }

    isOptionElement && selectOption(targetElement);

    toggleSelectBox(selectBoxElement);
  });
});

document.addEventListener("click", function (e) {
  const targetElement = e.target;
  const isSelect = targetElement.classList.contains("select") || targetElement.closest(".select");

  if (isSelect) {
    return;
  }

  const allSelectBoxElements = document.querySelectorAll(".select");

  allSelectBoxElements.forEach(boxElement => {
    boxElement.classList.remove("active");
  });
});


//헤더 버튼
function profileToggle(){
  const profileBtn =  document.querySelector('.user-profile-detail');
  const popHeader =  document.querySelector('.program-contents-back-header');
  profileBtn.classList.toggle('active')
  popHeader.classList.toggle('active')
  // e.stopPropagation();
}


function popupClose(){
  popupBg.classList.remove('active');
  popupService.classList.remove('active');
  popupReg.forEach(pop => {
    pop.classList.remove('active')
  });
}

function popupRegOpen(index){
  popupBg.classList.add('active')
  popupReg.forEach(pop => {
    pop.classList.remove('active')
  });
  popupReg[index].classList.add('active')
}

// 모바일 전체 팝업 헤더 
