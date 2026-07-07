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

    // FIX 1: Renamed to match the call in your try block, or you can use this name there.
    // FIX 2: Fixed 'allQuestionCount' to 'allQuestionsCount' (added the missing 's')
    function fetchUserData(parsedData) {
        if (!parsedData || !parsedData.data) {
            console.error("Invalid data structure received");
            return;
        }

        const totalQues = parsedData.data.allQuestionsCount[0].count;
        const totalEasyQues = parsedData.data.allQuestionsCount[1].count;
        const totalMedQues = parsedData.data.allQuestionsCount[2].count;
        const totalHardQues = parsedData.data.allQuestionsCount[3].count;  

        const solvedTotal = parsedData.data.matchedUser.submitStats.acSubmissionNum[0].count;
        const solvedEasy = parsedData.data.matchedUser.submitStats.acSubmissionNum[1].count;
        const solvedMed = parsedData.data.matchedUser.submitStats.acSubmissionNum[2].count;
        const solvedHard = parsedData.data.matchedUser.submitStats.acSubmissionNum[3].count;

        console.log("Extracted Data:", { totalQues, solvedTotal, solvedEasy, solvedMed, solvedHard });
        // You can now update your UI elements here using these variables!
    }

    async function fetchUserDetails(username) {
        const proxyUrl = 'https://corsproxy.io/?url=';
        const targetUrl = 'https://leetcode.com/graphql/';
        const myHeaders = new Headers();
        myHeaders.append("content-type", "application/json");

        const graphql = JSON.stringify({
            query: "\n    query userSessionProgress($username: String!) {\n  allQuestionsCount {\n    difficulty\n    count\n  }\n  matchedUser(username: $username) {\n    submitStats {\n      acSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n      totalSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n    }\n  }\n}\n    ",
            variables: { "username": `${username}` }
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: graphql,
            redirect: "follow"
        };

        try {
            searchBtn.textContent = "Searching...";
            searchBtn.disabled = true;

            // FIX 3: Properly encoding the target URL for the proxy
            const response = await fetch(proxyUrl + encodeURIComponent(targetUrl), requestOptions);

            if (!response.ok) {
                throw new Error("Unable to fetch user details.");
            }

            const parsedData = await response.json();
            console.log("logging parsedData ", parsedData);
            
            // FIX 4: Changed displayUserData to fetchUserData to match your function definition above
            fetchUserData(parsedData);

        } catch (error) {
            console.error(error);
            alert("Error fetching data. Check console for details.");
        } finally {
            searchBtn.textContent = "Search";
            searchBtn.disabled = false;
        }
    }

});