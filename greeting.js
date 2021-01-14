const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

//이름 저장
function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

//submit 관리
function handleSubmit(event) {
    event.preventDefault();

    const currentValue = input.value;

    paintGreeting(currentValue);
    saveName(currentValue);
}

//텍스트 창
function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    
    //classList.remove(), add()는 각 객체에 class를 추가하는 것 같음
    //SHOWING_CN은 css에서 display: block을 실행하는데, 이건 객체를 보여주는 것 같다.
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadName() {
    //현재 localStorage에 USER_LS라는 key값이 있는지 검사
    const currentUser = localStorage.getItem(USER_LS);

    if (currentUser == null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();