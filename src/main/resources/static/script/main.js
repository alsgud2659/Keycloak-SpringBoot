// 셀렉트
const selectBoxElements = document.querySelectorAll(".select");

async function getUserInfo() {
  const result = await axios.post('/getUserInfo')
  const userName = document.getElementsByClassName('user-name')
  const largeName = document.getElementById('largeName')
  if(largeName !== null) {
    largeName.innerHTML = result.data.name + '님, 안녕하세요!'
  }
  userName[0].innerHTML = result.data.name
  userName[1].innerHTML = result.data.name
}

getUserInfo()

async function searchCorp(param) {
  const result = await axios.post('/corp/query', {corpCd: param})
  if (result.data) {
    document.getElementById('corpCd').innerHTML = result.data.corpCd
    document.getElementById('corpNm').innerHTML = result.data.corpNm
    document.getElementById('corpRegNo').innerHTML = result.data.corpRegNo
    document.getElementById('ceoNm').innerHTML = result.data.ceoNm
  }else {
    alert('검색결과가 없습니다.')
  }
}

async function registerCorp() {
  
  // 회사등록 성공시 성공문구 출력 후 1.5초 뒤에 사라짐
  document.getElementsByClassName('complete-registration')[0].classList.add('active')
  setTimeout(() => {
    document.getElementsByClassName('complete-registration')[0].classList.remove('active')
  }, 1500)
}

function toggleSelectBox(selectBox) {
  selectBox.classList.toggle("active");
}

function selectOption(optionElement) {
  const selectBox = optionElement.closest(".select");
  const selectedElement = selectBox.querySelector(".selected-value");
  const optionElements = selectBox.querySelectorAll(".option");

  // 선택된 옵션 텍스트
  const selectedText = optionElement.textContent;

  // option 텍스트와 selected 텍스트가 동일한 경우 클래스 추가
  optionElements.forEach(option => {
    if (option.textContent === selectedText) {
      option.classList.add("selected-option");
    } else {
      option.classList.remove("selected-option");
    }
  });

  selectedElement.textContent = selectedText;
  console.log(selectedText);
}

selectBoxElements.forEach(selectBoxElement => {
  selectBoxElement.addEventListener("click", function (e) {
    const targetElement = e.target;
    const isOptionElement = targetElement.classList.contains("option");

    if (isOptionElement) {
      selectOption(targetElement);
    }

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

// 메인 회사 등록

//등록이 하나도 안되어 있으면
let registrationCom = 1;
const popupBg = document.querySelector('.popup-bg');
const popupService = document.querySelector('.popup-service');
const popupReg = document.querySelectorAll('.popup-registration')
if(registrationCom === 0){
  popupBg.classList.add('active')
  popupService.classList.add('active')
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
