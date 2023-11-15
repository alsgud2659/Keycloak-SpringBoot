//정보변경 팝업
const popBg = document.querySelector('.popup-bg')
const popupChange = document.querySelectorAll('.popup-change')
const form = document.querySelector('form');
function popChangeOpen(index){
  popBg.classList.add('active')
  popupChange[index].classList.add('active')

}
function popChangeClose(){
  popupChange.forEach(pop => {
    pop.classList.remove('active')
    popBg.classList.remove('active')
  });
}

// 비밀번호 변경 보기 숨기기
const pwBtn = document.querySelectorAll('.pw-btn')
const passInput = document.querySelectorAll('.password-input')
pwBtn.forEach((btn, i) => {
  btn.addEventListener('click', ()=>{
    btn.classList.toggle('show')
      if(btn.classList.contains('show')){
        passInput[i].type = 'text'
      }else{
        passInput[i].type = 'password'
      }
    });
    })

// 제픔소개서 사이드바
let windowW = window.innerWidth;
const programLi = document.querySelectorAll('.sidebar-program-li')
const programIntro = document.querySelectorAll('.program-contents')
const mobilePopHeader = document.querySelectorAll('.program-contents-back-header')
  programLi.forEach((li, index) => {
    li.addEventListener('click', ()=>{
      programLi.forEach(lid => {
        lid.classList.remove('active')
      });
      programIntro.forEach(intro => {
        intro.classList.remove('active')
        intro.classList.remove('pop-active')
      });
      mobilePopHeader.forEach(header => {
        header.classList.remove('active')
      });
      if(windowW > 768){
        li.classList.add('active')
        programIntro[index].classList.add('active')
      }else{
        programIntro[index].classList.add('pop-active')
        mobilePopHeader[index].classList.add('active')
      }
    })
  });
  
  function popback(){
    programIntro.forEach(li => {
      li.classList.remove('pop-active')
    });
  }

  //qna
// 자주붇는질문
const qnaLi = document.querySelectorAll('.qna-li')
const qnaLiAn = document.querySelectorAll('.qna-li-a')
const qnaLiText = document.querySelectorAll('.qna-li-a-text')
qnaLi.forEach((li, i) => {
    li.addEventListener('click' , ()=>{

        const qnaLiTextH = qnaLiText[i].offsetHeight
            if(li.classList.contains('active')){
                qnaLiAn[i].style.height = '0'
                li.classList.remove('active')
            }else{
                qnaLi.forEach(li => {
                li.classList.remove('active')
            });
                qnaLiAn.forEach(closeLi => {
                closeLi.style.height = '0'
            });
            if(windowW > 768){
              qnaLiAn[i].style.height = qnaLiTextH + 20 + 'px'
              li.classList.add('active')
            }else{
              qnaLiAn[i].style.height = qnaLiTextH + 8 + 'px'
              li.classList.add('active')
            }
            }
    })
});
