let statusBar;

let colorPalette = ["#ff4500", "#FFa800", "#ffd635", "#7eed56", "#00a368", "#51e9f4", "#3690ea", "#2450a4", "#811e9f", "#b44ac0", "#ff99aa", "#9c6926", "#ffffff", "#d4d7d9", "#898d90", "#000000"];

const handleResponse = async (response) => {

};

const requestUpdate = async (userForm) => {

};

const sendPost = async (nameForm) => {

}

export function init(){
    // const nameForm = document.querySelector("#pixelGrid");
    setupUI();
};

function setupUI(){
    statusBar = document.querySelector("status-bar");
}

export function showStatusBar() {
    statusBar.bar.style.transform = "translateY(0)";
}

export function hideStatusBar() {
    statusBar.bar.style.transform = "translateY(100)";
}