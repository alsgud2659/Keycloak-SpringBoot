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
  await setUserInfo()
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
async function setUserInfo() {
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
  const myCorpUl = document.getElementById('myCorp')

  // 데이터가 있는 경우에만 회사 리스트를 헤더의 회사 선택 셀렉트박스에 넣어줌
  if(myCorp.corpList.length > 0) {
    const newList = myCorp.corpList.map(item =>
        `<li class="option"><span style="display:none">${item.corpCd}</span>${item.corpNm}</li>`
    )
    myCorpUl.innerHTML = newList.join('') + myCorpUl.innerHTML
  }
}

/** 회사 선택 팝업에 사용 가능한 회사 목록을 조회해주는 함수 */
function getMyCorpInPopup() {
  const myCorpPopupUl = document.getElementById('my-corp-popup-ul')

  // 데이터가 있는 경우에만 실행
  if(myCorp.corpList.length > 0) {
    const newList = myCorp.corpList.map(item =>
      `
        <li class="company-select-li">
          <span style="display:none" class="code">${item.corpCd}</span>
          <span class="name">${item.corpNm}</span>
            <div class="btn-box">
              <button class="btn grey">삭제</button>
              <button class="btn black">선택</button>
            </div>
        </li>
      `
    )
    myCorpPopupUl.innerHTML = newList.join('') + myCorpPopupUl.innerHTML
  }
}

// *********************
//   EVENT LISTENER
// *********************

/** 회사등록 팝업에서 등록 버튼 눌렀을 때 이벤트 */
document.getElementById('insert-corp').addEventListener('click', e => {
  const corpCd = document.getElementById('corpCd').innerText
  registerCorp(corpCd);
})

document.addEventListener("click", function (e) {
  const targetElement = e.target;
  const isSelect = targetElement.classList.contains("select") || targetElement.closest(".select");

  if (isSelect) return;

  const allSelectBoxElements = document.querySelectorAll(".select");

  allSelectBoxElements.forEach(boxElement => {
    boxElement.classList.remove("active");
  });
});

document.addEventListener('click', function(event) {
  // 클릭된 요소가 '삭제' 버튼인지 확인합니다.
  if (event.target.classList.contains('btn') && event.target.classList.contains('grey')) {
    // 가장 가까운 'li' 태그를 찾습니다.
    const listItem = event.target.closest('.company-select-li');
    if (listItem) {
      // 'li' 태그 내에서 가장 가까운 'span' 태그를 찾습니다.
      const spanElement = listItem.querySelector('.code');
      if (spanElement) {
        // 'span' 태그의 내용을 가져옵니다.
        const spanText = spanElement.innerText;
        console.log(spanText); // 여기서 spanText를 이용하여 원하는 작업을 수행할 수 있습니다.
      }
    }
  }
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
