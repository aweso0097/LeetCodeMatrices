document.addEventListener("DOMContentLoaded", function () {

    const userNameInput = document.querySelector("#user-input");
    const searchBtn = document.querySelector("#btn1");

    searchBtn.addEventListener("click", function () {
        const username = userNameInput.value.trim();
        console.log("Logged In Username:", username);

        if (validateUsername(username)) {
            fetchUserDetails(username);
        }
    });

    function validateUsername(username) {
        if (username === "") {
            alert("Username cannot be empty.");
            return false;
        }

        const regex = /^[a-zA-Z0-9_-]{1,15}$/;

        if (!regex.test(username)) {
            alert("Invalid username");
            return false;
        }

        return true;
    }
    function fetchUserData(parsedData) {
        const totalQues = parsedData.data.allQuestionCount[0].count;
        const totalEasyQues = parsedData.data.allQuestionCount[1].count;
        const totalMedQues = parsedData.data.allQuestionCount[2].count;
        const totalHardQues = parsedData.data.allQuestionCount[3].count;  

        const solvedTotal = parsedData.data.matchedUser.submitStats.acSubmissionNum[0].count;
        const solvedEasy = parsedData.data.matchedUser.submitStats.acSubmissionNum[1].count;
        const solvedMed = parsedData.data.matchedUser.submitStats.acSubmissionNum[2].count;
        const solvedHard = parsedData.data.matchedUser.submitStats.acSubmissionNum[3].count;
    }

    async function fetchUserDetails(username) {
    // const response = await fetch(url);
    const proxyUrl = 'https://corsproxy.io/?url=';
    const targetUrl = 'https://leetcode.com/graphql/';
    const myHeaders = new Headers();
    myHeaders.append("content-type", "application/json");

    const graphql = JSON.stringify({
        query: "\n    query userSessionProgress($username: String!) {\n  allQuestionsCount {\n    difficulty\n    count\n  }\n  matchedUser(username: $username) {\n    submitStats {\n      acSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n      totalSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n    }\n  }\n}\n    ",
        variables: { "username": `${username}` }
    })

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: graphql,
        redirect: "follow"
    };

        try {
            searchBtn.textContent = "Searching...";
            searchBtn.disabled = true;

            const response = await fetch(proxyUrl+targetUrl,requestOptions);

            if (!response.ok) {
                throw new Error("Unable to fetch user details.");
            }

            const parsedData = await response.json();
            console.log("logging parsedData ",parsedData);
            displayUserData(parsedData);

        } catch (error) {
            console.error(error);
        } finally {
            searchBtn.textContent = "Search";
            searchBtn.disabled = false;
        }
    }

});