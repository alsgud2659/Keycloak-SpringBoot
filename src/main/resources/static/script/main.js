// 셀렉트
const selectBoxElements = document.querySelectorAll(".select");

// 회원 정보
const userInfo = {
  userId: null,
  name: null,
  email: null,
  curCorp: null
}

const myCorp = {
  corpList: []
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
  await getUserInfo()
  setUserInfo()
  await getMyCorp()
  getMyCorpInHeader()
  getMyCorpInPopup()
}
/** 유저정보를 가져오는 함수 */
async function getUserInfo() {
  const { data } = await axios.post('/getUserInfo').catch(err => {
    console.error(err);
    alert('유저 정보 조회 실패');
  });

  userInfo.userId = data.userId;
  userInfo.name = data.name;
  userInfo.email = data.email;
}

/** 유저정보를 헤더 바에 넣어주는 함수 */
function setUserInfo() {
  const userName = document.querySelectorAll('.user-name')
  const largeName = document.getElementById('largeName')

  // largeName은 홈에만 존재하기 때문에 다른 페이지를 열었을 때 오류가 발생하지 않도록 추가함
  if(largeName !== null) largeName.innerHTML = `${userInfo.name}님, 안녕하세요!`

  userName.forEach(u => u.innerHTML = userInfo.name)
}

/**
 * 회사등록 팝업에서 회사코드 입력으로 회사조회
 * @Param 회사코드(corpCd)
 */
async function searchCorp(corpCd) {
  if(corpCd === '' || !corpCd) return alert('회사코드를 입력해주세요')
  const { data } = await axios.post('/corp/query', { corpCd }).catch(err => {
    console.error(err)
    alert('조회중에 오류가 발생했습니다.')
  })

  if(data.length === 0) return alert('검색결과가 없습니다.')

  document.getElementById('corp-search-result').innerHTML = '1'
  document.getElementById('corpCd').innerHTML = data.corpCd
  document.getElementById('corpNm').innerHTML = data.corpNm
  document.getElementById('corpRegNo').innerHTML = data.corpRegNo
  document.getElementById('ceoNm').innerHTML = data.ceoNm
}

/**
 * 회사등록 팝업에서 등록버튼을 눌렀을 때 회사를 등록해주는 함수
 * @Param 회사코드(corpCd)
 */
async function registerCorp(corpCd) {
  if(!corpCd || corpCd === undefined) return
  const $completeRegistration = document.getElementsByClassName('complete-registration')[0];
  const userId = userInfo.userId
  const param = {
    corpCd: corpCd,
    memberId: userId
  }

  const result = await axios.post('/corp/insert', param).catch(err => {
    console.error(err)
    alert('회사등록을 실패했습니다.')
  })

  // 결과값에 따른 분기 처리
  switch (result.data) {
    case 1:
      $completeRegistration.classList.add('active')
      setTimeout(() => {
        $completeRegistration.classList.remove('active')
      }, 1500);
      // 회사선택 팝업 및 회사 셀렉트 박스 회사리스트 갱신
      await getMyCorp();
      getMyCorpInPopup();
      getMyCorpInHeader()
      break;
    case 2:
      alert('이미 등록된 회사입니다.')
  }
}

/**
 * 사용자가 등록했던 회사 목록을 조회하는 함수
 * @returns void
 */
async function getMyCorp() {
  const result = await axios.post('/corp/query/myCorp', {memberId : userInfo.userId}).catch(err => {
    console.error(err)
    alert('조회중 오류가 발생했습니다.')
  })

  myCorp.corpList = result.data
}

/** 헤더의 셀렉트 박스에 사용 가능한 회사 목록을 조회해주는 함수 */
function getMyCorpInHeader() {
  const $myCorpUl = document.getElementById('myCorp')
  // 셀렉트 박스를 재갱신 하는 경우가 있기 때문에 초기화
  $myCorpUl.innerHTML = ''
  
  // 데이터가 있는 경우에만 회사 리스트를 헤더의 회사 선택 셀렉트박스에 넣어줌
  if(myCorp.corpList.length > 0) {
    const newList = myCorp.corpList.map(item =>
        `<li class="option corp-list"><span style="display:none">${item.corpCd}</span>${item.corpNm}</li>`
    )
    $myCorpUl.innerHTML = newList.join('') + $myCorpUl.innerHTML
  }
}

/**
 * 회사 선택 팝업에 사용 가능한 회사 목록을 조회해주는 함수
 * @Param 재갱신 여부 플래그값(flag)
 */
function getMyCorpInPopup() {
  const $myCorpPopupUl = document.getElementById('my-corp-popup-ul')
  // 재갱신을 하는 경우가 있기 때문에 'ul'태그 내부를 초기화
  $myCorpPopupUl.innerHTML = ''

  // 데이터가 있는 경우에만 실행
  if(myCorp.corpList.length > 0) {
    const newList = myCorp.corpList.map(item =>
      `
        <li class="company-select-li">
          <span style="display:none" class="code">${item.corpCd}</span>
          <span class="name corp-name">${item.corpNm}</span>
          <div class="btn-box">
            <button class="btn grey delete">삭제</button>
            <button class="btn black pick">선택</button>
          </div>
        </li>
      `
    )
    $myCorpPopupUl.innerHTML = newList.join('') + $myCorpPopupUl.innerHTML
  }
}

/**
 * 사용자가 등록한 회사를 삭제해주는 함수 삭제 후 리스트 재갱신
 * @Param 회사코드(corpCd)
 */
async function deleteMyCorp(corpCd) {
  const param = {
    corpCd : corpCd,
    memberId : userInfo.userId
  }

  await axios.post('/corp/delete', param).catch(err => {
    console.error(err)
    alert('회사를 삭제하는데 실패했습니다.')
  })
  alert('회사를 삭제했습니다.')

  // 회사 목록 갱신
  await getMyCorp()
  getMyCorpInPopup()
  getMyCorpInHeader()
}

/**
 * 사용자가 선택한 회사에 맞도록 프로필, 헤더를 갱신해주는 함수
 * @Param 회사코드(corpCd)
 * @Param 회사명(corpNm)
 */
function updateProfile(corpCd, corpNm) {
  const $selectedCorp = document.querySelectorAll('.selected-corp')
  const $corpList = document.querySelectorAll('.corp-list')
  $selectedCorp.forEach(item => item.innerHTML = corpNm)
  $corpList.forEach( ({textContent, classList}) => {
    // textContent 사용시 corpCd + corpNm의 형태로 나오기 때문에 textContent === corpCd + corpNm로 비교해야 함
    textContent === corpCd + corpNm ? classList.add('selected-option') : classList.remove('selected-option')
  })
  userInfo.curCorp = corpCd
}

// *********************
//   EVENT LISTENER
// *********************

/** 회사등록 팝업에서 등록 버튼 눌렀을 때 이벤트 */
document.getElementById('insert-corp').addEventListener('click', e => {
  const corpCd = document.getElementById('corpCd').innerText
  registerCorp(corpCd);
})

/** 회사 선택 팝업에서 삭제, 선택 버튼 클릭시 발생하는 이벤트 */
document.getElementById('my-corp-popup-ul').addEventListener('click', e => {
  const clickedElement = e.target
  const listItem = clickedElement.closest('.company-select-li')
  const corpCdElement = listItem?.querySelector('.code')
  const corpNmElement = listItem?.querySelector('.corp-name')
  const corpCd = corpCdElement?.innerText
  const corpNm = corpNmElement?.innerText

  // 삭제버튼 클릭 이벤트
  if(clickedElement.classList.contains('delete')) {
    corpCd && deleteMyCorp(corpCd);
  }

  // 등록버튼 클릭 이벤트
  if(clickedElement.classList.contains('pick')) {
    corpCd && updateProfile(corpCd, corpNm)
  }
});

document.addEventListener("click", function (e) {
  const targetElement = e.target;
  const isSelect = targetElement.classList.contains("select") || targetElement.closest(".select");

  if (isSelect) return;

  const allSelectBoxElements = document.querySelectorAll(".select");

  allSelectBoxElements.forEach(boxElement => {
    boxElement.classList.remove("active");
  });
});

// *********************
//   ETC
// *********************

function toggleSelectBox(selectBox) {
  selectBox.classList.toggle("active");
}

function selectOption(optionElement) {
  const selectBox = optionElement.closest(".select");
  const selectedElement = selectBox.querySelector(".selected-value");
  const optionElements = selectBox.querySelectorAll(".option");

  // 선택된 옵션 텍스트
  const selectedText = optionElement.innerText;

  optionElements.forEach(({ innerText, classList }) => {
    innerText === selectedText ? classList.add("selected-option") : classList.remove("selected-option")
  });

  selectedElement.innerText = selectedText;

  // 회사선택 셀렉트 박스의 경우 선택한 회사의 이름이 프로필에도 들어가야함
  if(selectBox.classList.contains('corp-select-box')) {
    const $selectedCorp = document.querySelectorAll('.selected-corp')
    $selectedCorp.forEach(item => item.innerHTML = selectedElement.innerText)
    userInfo.curCorp = optionElement.querySelector('span').innerText
  }
}

selectBoxElements.forEach(selectBoxElement => {
  selectBoxElement.addEventListener("click", function (e) {
    const targetElement = e.target;
    const isOptionElement = targetElement.classList.contains("option");

    isOptionElement && selectOption(targetElement);

    toggleSelectBox(selectBoxElement);
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
