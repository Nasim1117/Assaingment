// starting value
let currentValue = 0;

// selecting elements
const valueEl = document.querySelector("#value");
const decreaseBtn = document.querySelector(".minus");
const increaseBtn = document.querySelector(".plus");
const resetBtn = document.querySelector(".clear");

// function to refresh number and color
function refreshCounter() {
    valueEl.innerText = currentValue;

    if (currentValue > 0) {
        valueEl.style.color = "green";
    } else if (currentValue < 0) {
        valueEl.style.color = "red";
    } else {
        valueEl.style.color = "black";
    }
}

// button events
increaseBtn.onclick = function () {
    currentValue += 1;
    refreshCounter();
};

decreaseBtn.onclick = function () {
    currentValue -= 1;
    refreshCounter();
};

resetBtn.onclick = function () {
    currentValue = 0;
    refreshCounter();
};
