let statusBar;

let selectedPixel;

let colorPalette = ["#ff4500", "#ff9100", "#ffd635", "#7eed56", "#00a368", "#51e9f4", "#3690ea", "#2450a4", "#811e9f", "#b44ac0", "#ff99aa", "#9c6926", "#ffffff", "#d4d7d9", "#898d90", "#000000"];

const handleResponse = async (response) => {

};

const requestUpdate = async (userForm) => {

};

const sendPost = async (nameForm) => {

}

export function init() {
    // const nameForm = document.querySelector("#pixelGrid");
    setupUI();
};

function setupUI() {
    statusBar = document.querySelector("status-bar");

    document.onclick = e => {
        //if they click on anything but a color picker modal, hide all color picker modals
        if (e.target.tagName != "PIXEL-GRID" && e.target.tagName != "STATUS-BAR") {
            setSelectedPixel(null);
            hideStatusBar();
        }
    }

}

export function setSelectedPixel(pixel) {
    if (selectedPixel != null) {
        selectedPixel.pixelCell.classList.remove('selected');
    }
    if (pixel != null) {
        pixel.pixelCell.classList.add('selected');
    }
    selectedPixel = pixel;
}

export function getColorAmount() {
    return colorPalette.length;
}

export function getColorFromPalette(index) {
    return colorPalette[index];
}

export function getSelectedPixel() {
    return selectedPixel;
}

export function showStatusBar() {
    statusBar.bar.style.transform = "translateY(0)";
}

export function hideStatusBar() {
    statusBar.bar.style.transform = "translateY(100%)";
}

export { selectedPixel };