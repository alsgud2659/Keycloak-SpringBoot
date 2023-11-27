import Component from "./Component";

export default class Sidebar extends Component {
    template() {
        return `
            <div class="sidebar">
                <ul class="sidebar-ul">
                    <a href="/home" class="sidebar-li active">
                        <img src="/assets/icon/home-li.svg" alt="홈">
                    </a>
                    <a href='/qna ' class="sidebar-li">
                        <img src="/assets/icon/qna-li.svg" alt="자주하는질문">
                    </a>
                    <a href="/oneOnOne" class="sidebar-li">
                        <img src="/assets/icon/per-qna-li.svg" alt="1:1 문의">
                    </a>
                    <a href="/notice" class="sidebar-li">
                        <img src="/assets/icon/notice-li.svg" alt="공지사항">
                    </a>
                    <a href="/programIntro" class="sidebar-li">
                        <img src="/assets/icon/intro.svg" alt="제품소개">
                    </a>
                </ul>
            </div>        
        `;
    }
}