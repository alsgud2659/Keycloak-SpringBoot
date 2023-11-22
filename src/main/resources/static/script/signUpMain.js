// 모든 약관에 동의 체크박스
const checkAllCheckbox = document.querySelector('.terms-input-box .all-check');
// 하위 체크박스들
const inputCheckboxes = document.querySelectorAll('.terms-input-box input[type="checkbox"]:not(.all-check)');

if(checkAllCheckbox !== null){
    // 모든 약관에 동의 체크박스의 상태에 따라 하위 체크박스들을 변경
    checkAllCheckbox.addEventListener('change', function() {
        inputCheckboxes.forEach((check) => {
            check.checked = checkAllCheckbox.checked;
        });
        checkAllEssentialCheckboxes();
    });

    // 하위 체크박스 중 하나라도 해제될 때 모든 약관에 동의 체크박스 해제
    checkAllCheckbox.addEventListener('change', function() {
        inputCheckboxes.forEach((check) => {
            check.checked = checkAllCheckbox.checked;
        });
        checkAllEssentialCheckboxes();
    });

    // 하위 체크박스 중 하나라도 해제될 때 모든 약관에 동의 체크박스 해제
    inputCheckboxes.forEach((check) => {
        check.addEventListener('change', function() {
            if (!check.checked) {
                checkAllCheckbox.checked = false;
            } else {
                // 모든 하위 체크박스가 체크되었는지 확인
                const allChecked = Array.from(inputCheckboxes).every((checkbox) => checkbox.checked);
                if (allChecked) {
                    checkAllCheckbox.checked = true;
                }
            }
        });
    });


    // 필수체크박스
    const essentialCheckboxes = document.querySelectorAll('.essential-check');
    const checkBtn = document.querySelector('.check-btn');


    function checkAllEssentialCheckboxes() {
        const allChecked = Array.from(essentialCheckboxes).every((checkbox) => checkbox.checked);
        checkBtn.disabled = !allChecked;
    }

    essentialCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', checkAllEssentialCheckboxes);
    });

    checkAllEssentialCheckboxes();
}


// 셀렉트
const selectBoxElements = document.querySelectorAll(".select");

function toggleSelectBox(selectBox) {
    selectBox.classList.toggle("active");

}

function selectOption(optionElement) {
    const selectBox = optionElement.closest(".select");
    const selectedElement = selectBox.querySelector(".selected-value");
    const etc = document.querySelector('.etc-input-box')
    selectedElement.textContent = optionElement.textContent;
    if(selectedElement.textContent === '기타'){
        etc.classList.add('active')
    }else{
        etc.classList.remove('active')
    }
    if(selectBox.classList.contains('blank-input')){
        selectBox.classList.remove('blank-input')
    }
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

const popup = document.querySelector('.popup-login');
const popupBg = document.querySelector('.popup-bg');
const tabBtn = document.querySelectorAll('.popup-content-header-tab-btn');
const searchBox = document.querySelectorAll('.search-box');
const popupForm = document.querySelectorAll('.popup-form');
const popupSub = document.querySelectorAll('.popup-fail-search');
// console.log(popupForm)
function popupOpen(index){
    popup.classList.add('active')
    popupBg.classList.add('active')

    tabBtn.forEach(tab => {
        tab.classList.remove('active')
    });
    tabBtn[index - 1].classList.add('active')

    searchBox.forEach(box => {
        box.classList.remove('active')
    });

    searchBox[index - 1].classList.add('active')
}

function popupClose(){
    popup.classList.remove('active')
    popupBg.classList.remove('active')
}

// 찾기 탭
tabBtn.forEach((tab, i) => {
    tab.addEventListener('click',()=>{
        tabBtn.forEach(active => {
            active.classList.remove('active')
        });
        tab.classList.add('active')

        searchBox.forEach(box => {
            box.classList.remove('active')
        });
        searchBox[i].classList.add('active')

        // 탭버튼시 처음폼으로 초기화
        popupForm.forEach(form => {
            form.classList.remove('active')
        });

        popupForm[0].classList.add('active')
        popupForm[2].classList.add('active')
    })
});

// 아이디찾기
function idSearch() {
    const nameInput = document.getElementById("name-id");
    const emailInput = document.getElementById("email-id");
    const name = nameInput.value;
    const email = emailInput.value;

    // 유효성 검사
    if (name === "" || name !== 'asd' ) {
        popup.classList.remove('active');
        popupSub[0].classList.add('active');
    } else if (email === "" || !isValidEmail(email)) {
        popup.classList.remove('active');
        popupSub[0].classList.add('active');
    } else {
        popupForm[1].classList.add('active')
        popupForm[0].classList.remove('active')
    }
}

// 비밀번호 찾기
function pwSearch() {
    const nameInput = document.getElementById("name-pw");
    const emailInput = document.getElementById("email-pw");
    const name = nameInput.value;
    const email = emailInput.value;

    // 유효성 검사
    if (name === "" || name !== 'asd' ) {
        popup.classList.remove('active');
        popupSub[0].classList.add('active');
    } else if (email === "" || !isValidEmail(email)) {
        popup.classList.remove('active');
        popupSub[0].classList.add('active');
    } else {
        popupForm[3].classList.add('active')
        popupForm[2].classList.remove('active')
    }
}
// 비밀번호 변경
function pwChange(){
    const newPw = document.getElementById("new-pw");
    const newRePw = document.getElementById("new-re-pw");
    if(newPw.value === newRePw.value){
        popupSub[1].classList.add('active')
        popup.classList.remove('active');
    }else{
        popup.classList.remove('active');
        popupSub[0].classList.add('active');
    }
}
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function backBtn(index){
    popupForm.forEach(back => {
        back.classList.remove('active')
    });
    popupForm[index].classList.add('active')
}

function failCheck(){
    popup.classList.add('active')
    popupSub.forEach(fail => {
        fail.classList.remove('active')
    });
}
function clearCheck(){
    popup.classList.remove('active')
    popupSub.forEach(fail => {
        fail.classList.remove('active')
    });
    popupBg.classList.remove('active')
}

// 약관 팝업
const consentPop = document.querySelectorAll('.consent-popup')

function  consentPopupOpen(index){
    popupBg.classList.add('active');
    consentPop[index].classList.add('active')
}

function consentPopupClose(){
    popupBg.classList.remove('active')
    consentPop.forEach(pop => {
        pop.classList.remove('active')
    });
}

// 약관 폼 넘어가기
function nextTermsForm(index){
    const termsForm = document.querySelectorAll('.terms-form');
    termsForm.forEach(form => {
        form.classList.remove('active')
    });
    termsForm[index].classList.add('active');
}

// 회원가입 폼
function validateForm() {
    const signFormInput = document.querySelectorAll('.terms-form.second .input:not(.etc-input)')
    const id = document.querySelector('.id-input');
    const password = document.querySelector('.pw-input');
    const confirmPassword = document.querySelector('.re-pw-input');
    const visitPath = document.querySelector('.selected-value');
    const userName = document.querySelector('.name-input')
    const birthday = document.querySelector('.date-input')
    const gender = document.querySelector('.gender-input')
    const phoneNumber = document.querySelector('.phne-input')
    const email = document.querySelector('.email-input')
    const emailVerifyNum = document.querySelector('.email-certification-input')
    const termsConsent = document.getElementById('termsConsent').checked? '1' : '0'
    const perConsent = document.getElementById('perConsent').checked? '1' : '0'
    const advConsent = document.getElementById('advConsent').checked? '1' : '0'
    const the3Consent = document.getElementById('the3AppYn').checked? '1' : '0'


    const joinInfo = {
        memberId : id.value,
        passTxt : password.value,
        memberNm : userName.value,
        birthDt: birthday.value,
        sexTp : gender.value,
        telNo : phoneNumber.value,
        inflowTp : visitPath.innerHTML,
        emailId : email.value,
        termsAppYn : termsConsent,
        perAppYn : perConsent,
        advConsent : advConsent,
        the3AppYn : the3Consent
    }

    let isValid = true;
    let foundEmptyInput = false;

    const signComplete = async () =>{
        if(isValid) {
            nextTermsForm(2)
            const result = await axios.post('/join', joinInfo)
            console.log(result)
        }

    }

    signFormInput.forEach(input => {
        if (input.value === ""  &&  !foundEmptyInput   ) {
            input.parentElement.classList.add('blank-input');
            input.scrollIntoView({ behavior: "smooth" });
            isValid = false;
            foundEmptyInput = true;
        }else if(!foundEmptyInput){
            if(input.innerText === '선택'){
                input.parentElement.parentElement.classList.add('blank-input');
                input.scrollIntoView({ behavior: "smooth" });
                isValid = false;
                foundEmptyInput = true;
            }
        }
    });
    // if (id.value === '') {
    //     id.parentElement.classList.add('error-input')
    //     isValid = false;
    // }

    // if (password === '') {
    //     password.parentElement.classList.add('error-input')
    //     isValid = false;
    // } else if (password.length < 8 || password.length > 30) {
    //     password.parentElement.classList.add('error-input')
    //     isValid = false;
    // }

    // if (confirmPassword === '') {
    //     confirmPassword.parentElement.classList.add('error-input')
    //     isValid = false;
    // } else if (confirmPassword !== password) {
    //     confirmPassword.parentElement.classList.add('error-input')
    //     isValid = false;
    // }

    // If all checks pass, the form is valid
    return signComplete();
}


// 필수입력항목 입력시 없애기
const signFormInput = document.querySelectorAll('.terms-form.second input')
signFormInput.forEach(form => {
    form.addEventListener('click',()=>{
        if(form.parentElement.classList.contains('blank-input')){
            form.parentElement.classList.remove('blank-input')
        }
    });
})

//메일 인증번호
function emailPopToggle(){
    const emailPop = document.querySelector('.email-popup')
    emailPop.classList.toggle('active')
    popupBg.classList.toggle('active')
}