// pig dice game

//globals
let p1 = {
    totalP: 0,
    turnP: 0,
    id: "p1",
    altId: "p2",
    player: "1",
};

let p2 = {
    totalP: 0,
    turnP: 0, 
    id: "p2",
    altId: "p1",
    player: "2",
};

// event listeners 
document.getElementById("p1-roll").addEventListener("click", function() {playerRoll(p1);});
document.getElementById("p1-hold").addEventListener("click", function() {playerHold(p1);});


//event functions
function playerRoll(aP) {
    // simulate roll of 6 sided die
    let rollNum = Math.randomInt(1, 7);
    document.getElementById(aP.id + "-img").src = "images/dice" + rollNum + ".png";
 
    if (rollNum != 1) {
        aP.turnP += rollNum;
    } else {
        let p1BtnEls = document.querySelectorAll("." + aP.id + "Btns"); // disabled = true;
        for (let i = 0; i < p1BtnEls.length; i++) {
            p1BtnEls[i].disabled = true;
        }
        
        let p2BtnEls = document.querySelectorAll("." + aP.altId + "Btns"); // disabled = false;
        for (let i = 0; i < p2BtnEls.length; i++) {
            p2BtnEls[i].disabled = false;
        }
        
        changeTurn(aP);
    }
    document.getElementById(aP.id + "-turn-points").innerHTML = aP.turnP;
    
}

function playerHold(aP) {
    aP.totalP += aP.turnP;
    aP.turnP = 0;
    document.getElementById(aP.id + "-points").innerHTML = aP.totalP;
    
    if (aP.totalP >= 100) {
        alert("PLAYER " + aP.player + " WINS!");
        location.reload();
    }
    
    document.getElementById(aP.altId + "-roll").disabled = false;
    document.getElementById(aP.altId + "-hold").disabled = false;
    document.getElementById(aP.id + "-roll").disabled = true;
    document.getElementById(aP.id + "-hold").disabled = true;
    document.getElementById(aP.id + "-turn-points").innerHTML = aP.turnP;
    
    changeTurn(aP);
    
}

function changeTurn(aP) {
    //remove highlight from total points
    var element = document.getElementById(aP.id + "-header"); 
    element.classList.remove("active");
    //give active player highlighted border
    var element = document.getElementById(aP.altId + "-header"); 
    element.classList.add("active"); 
    
    aP.turnP = 0;
    
    if (aP.id === "p1") {
        // activates player 2 decision function to run every 1.25 seconds
        p2.timer = setInterval(p2Decision, 1250); 
    } else if (aP.id === "p2") {
        //stops player 2 decision function
        clearInterval(p2.timer);
    }
}

function p2Decision() {
    //generates a randon integer bewteen 1 and 100
    let ranDecision = Math.randomInt(1, 101);
    if (p2.turnP + p2. totalP < 100){
        if (p2.turnP < 20) {
            if (ranDecision > 10) {    
                console.log("roll");
                playerRoll(p2);
            } else {       
                console.log("hold");
                playerHold(p2);
            }
        } else if (p2.turnP >= 20) {
            if (ranDecision > 75) {    
                console.log("roll");
                playerRoll(p2);
            } else {       
                console.log("hold");
                playerHold(p2);
            }
        }
    } else if (p2.turnP + p2. totalP >= 100) {
        console.log("win");
        playerHold(p2);
    }
}
