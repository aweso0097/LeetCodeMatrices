document.addEventListener("DOMContentLoaded", function () {

const userNameInput = document.querySelector('#user-input');
const searchBtn = document.querySelector('#btn1');
const easyCircle = document.querySelector('#easy-progress');
const medCircle = document.querySelector('#medium-progress');
const hardCircle = document.querySelector('#hard-progress');
const statsCards = document.querySelector(".stats-card");
searchBtn.addEventListener('click' , function() {
    const userName = userNameInput.value;
    console.log("Log In UserName: ",userName);
});

})
