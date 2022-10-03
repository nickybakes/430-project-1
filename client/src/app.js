let statusBar;
let pixelGrid;

let selectedPixel;

let colorPalette = ["#ff4500", "#ff9100", "#ffd635", "#7eed56", "#00a368", "#51e9f4", "#3690ea", "#2450a4", "#811e9f", "#b44ac0", "#ff99aa", "#9c6926", "#ffffff", "#d4d7d9", "#898d90", "#000000"];

let lastUpdateTime;

const handleResponse = async (response) => {


    switch (response.status) {
        case 200:
            // console.log("Success");
            break;
        case 201:
            showMessage("Created");
            // console.log("Created");
            break;
        case 204:
            showMessage("Updated");
            // console.log("Updated");
            break;
        case 400:
            let responseText = await response.text();
            let responseJsonObject = JSON.parse(responseText);
            showMessage(responseJsonObject.message);
            return;
        case 404:
            showMessage("Not Found!");
            return;
        default:
            console.log("Status code not implemented by client.");
            return;
    }

    //get the last update timestamp from the response the server gave us
    let serverLastUpdateTime = response.headers.get('lastUpdateTime');

    //we check if the response has any text to see if it was a GET or HEAD request
    let responseText = await response.text();

    //no text means no body means its a HEAD request. if it has
    //text/body, then its a GET
    if (responseText && responseText != '') {
        lastUpdateTime = serverLastUpdateTime;

        let responseJsonObject = JSON.parse(responseText);

        pixelGrid.updateGrid(responseJsonObject.message);
    } else {
        //if our client's last update time is less than the server's, then we need
        //to get the most recent grid data, so call a request!
        if (lastUpdateTime < serverLastUpdateTime) {
            requestUpdate('GET');
        }
    }
};

const requestUpdate = async (method) => {
    let params = {
        method,
        headers: { 'Accept': 'application/json' },
    }

    let response = await fetch('/getGrid', params);
    handleResponse(response);
};

const sendPost = async (data) => {

    let bodyData = `i=${data.i}&c=${data.c}&a=${data.a}`;

    let params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
        },
        body: bodyData,
    }

    let response = await fetch('/setPixel', params);

    handleResponse(response);
}

export function init() {
    // const nameForm = document.querySelector("#pixelGrid");
    setupUI();
    lastUpdateTime = 0;
    requestUpdate('GET');
    setInterval(function () {
        requestUpdate('HEAD');
    }, 2000);
};

function setupUI() {
    statusBar = document.querySelector("status-bar");
    pixelGrid = document.querySelector("pixel-grid");

    document.onclick = e => {
        //if they click on anything but a color picker modal, hide all color picker modals
        if (e.target.tagName != "PIXEL-GRID" && e.target.tagName != "STATUS-BAR") {
            setSelectedPixel(null);
            hideStatusBar();
        }
    }
}

export function placePixel(colorIndex) {
    if (selectedPixel == null)
        return;

    let data = {
        i: (selectedPixel.dataset.i),
        c: colorIndex,
        a: statusBar.getCurrentUsername()
    };

    sendPost(data);
}

export function setSelectedPixel(pixel) {
    requestUpdate('HEAD');
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
    updateStatusBar();
    statusBar.bar.style.transform = "translateY(0)";
}

export function updateStatusBar() {
    statusBar.updateAuthor();
}

export function hideStatusBar() {
    statusBar.bar.style.transform = "translateY(100%)";
}

//shows our message box and then hides it after a second
function showMessage(message) {
    //get our message box
    let messageBox = document.querySelector(".message");
    //set its text to our custom message
    messageBox.innerHTML = message;

    //show the message box!
    messageBox.style.opacity = 1;
    messageBox.style.visibility = "visible";
    messageBox.style.transform = "scaleY(1)";

    //after about a second, hide the message box again
    setTimeout(hideMessage, 2000);
}

//hides our message box
function hideMessage() {
    //get our message box and hide it
    let messageBox = document.querySelector(".message");
    messageBox.style.opacity = 0;
    messageBox.style.visibility = "hidden";
    messageBox.style.transform = "scaleY(0)";
}

export { selectedPixel };