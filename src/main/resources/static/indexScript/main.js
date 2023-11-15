    // 스크롤에 따른 헤더효과
    const header = document.querySelector('.header')
    let headerMoving = (direction) => {
      if (direction === "up") {
        header.classList.add("down")
      } else if (direction === "down") {
        header.classList.remove("down")
      }
    }
    let prevScrollTop = 0

    document.addEventListener(
      "scroll",
      () => {
          if (window.scrollY === 0) {
            header.classList.remove("header-w")
          } else {
            header.classList.add("header-w")
          }

        let nextScrollTop = window.scrollY || 0
        if (nextScrollTop > prevScrollTop) {
          headerMoving("down")
        } else if (nextScrollTop < prevScrollTop) {
          headerMoving("up")
        }
        prevScrollTop = nextScrollTop
      },
      300
    )
//헤더 클릭 시 이동
const scrollTopMenu = document.querySelectorAll('.header-gnb-li')
const scrollTopSection = document.querySelectorAll('.scroll-top-section')
scrollTopMenu.forEach((li, i) => {
    li.addEventListener('click',()=>{
        scrollTopSection[i].scrollIntoView({ behavior: 'smooth' });
    })
});

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
                qnaLiAn[i].style.height = qnaLiTextH + 20 + 'px'
                li.classList.add('active')
            }
    })
});
window.addEventListener('resize',()=>{
  qnaLiAn.forEach(a => {
    if(a.parentElement.classList.contains('active')){
      console.log(Array.from(a.children))
      const childrenHeight = Array.from(a.children).reduce((acc, child) => {
        return acc + child.offsetHeight;
      }, 0);
      
      a.style.height = childrenHeight + 20 + 'px';
    }
  });
})




       // 애니메이션
       let options = {
        rootMargin: '0px',
        threshold: 0.5
      }
       const observerAni = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("ani-on")
            }
        })
        },options)
        
        const offAni = document.querySelectorAll(".js-ani")
        
         // 반복문을 돌려 모든 DOM에 적용
        offAni.forEach((AniOn) => observerAni.observe(AniOn))


        //푸터 버튼
        
        const toggleLinkBtn = () => {
          const footerLinkBtn = document.querySelector('.footer-link-btn')
          footerLinkBtn.classList.toggle('active')
        }