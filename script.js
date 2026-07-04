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
    if(validateUsername(username)) {
        fetchUSerDetails(username);
    }
})
function validateUsername(username) {
    if(username.trim() == "") {
        alert("Username can not be empty.");
        return false;
    }
    const regex = /^[a-zA-Z0-9_]{1,15}$/;
    const isMatching = regex.test(username);
    if(!isMatching) {
        alert("Invalid Username");
    }
    return isMatching;
}
async function fetchUSerDetails(username) {
    const url = "https://leetcode-stats-api.herokuapp.com/${username}"
    try {
        const response = await fetch (url);
        if(!response.ok) {
            throw new Error ("unable to fetch user details.")
        }
        const data = await response.json();
        console.log("Logging data ",data);
    }
    catch(error) {

    }
    finally {
        
    }
}

})
