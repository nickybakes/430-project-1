//our html elements of our status bar and pixel grid
let statusBar;
let pixelGrid;

//the currently selected pixel (what the user clicked on)
//will be null if clicked off of
let selectedPixel;

//our color palette that we want to use
const colorPalette = ["#ff4500", "#ff9100", "#ffd635", "#7eed56", "#00a368", "#51e9f4", "#3690ea", "#2450a4", "#811e9f", "#b44ac0", "#ff99aa", "#9c6926", "#ffffff", "#d4d7d9", "#898d90", "#000000"];

//the last time the client updated from the server
//compared to the server's timestamp to see if the client needs
//to download the full info of the grid
let lastUpdateTime;

//Handles all reponses from the server
const handleResponse = async (response) => {

    //check the different status codes
    //200, 201, and 204 lead to updating the grid possibly
    //but 400 and 404 should return
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
            //shows a message saying why the user got a bad request
            //usually forgot to type in a username
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

//send a request to the server for the grid info
//method can be GET or HEAD
//GET gets the full grid info
//HEAD just gets the timestamp header
const requestUpdate = async (method) => {
    let params = {
        method,
        headers: { 'Accept': 'application/json' },
    }

    let response = await fetch('/getGrid', params);
    handleResponse(response);
};

//Used when we want to set a pixel on the server
//data is the object that holds the pixel's position index,
//the color index we want to set it to, and the user's name
const sendPost = async (data) => {

    //parse our data so it can be sent to the server
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

//First called when the client loads in, sets up some UI stuff, gets our
//first server request, and sets up an ongoing ping to the server
export function init() {
    // const nameForm = document.querySelector("#pixelGrid");
    setupUI();
    lastUpdateTime = 0;
    requestUpdate('GET');
    //pings our server every couple seconds with HEAD requests
    //so that the grid can stay updated in basically real time
    setInterval(function () {
        requestUpdate('HEAD');
    }, 2000);
};

//sets up onclick for certain things, and gets references to 
//our status bar and pixel grid
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

//called when we click a color selection on the status bar
//collects the data we want to send to the server
//then sends it!
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

//when we click a pixel on the grid, we want to 'select' it
//we also go a HEAD request when we do this to make sure the user
//always has the most recent data
export function setSelectedPixel(pixel) {
    requestUpdate('HEAD');
    //adds the selected class CSS to the new selected pixel
    //and removes it from the previously selected pixel
    if (selectedPixel != null) {
        selectedPixel.pixelCell.classList.remove('selected');
    }
    if (pixel != null) {
        pixel.pixelCell.classList.add('selected');
    }
    selectedPixel = pixel;
}

//gets the length of the color palette
export function getColorAmount() {
    return colorPalette.length;
}

//gets a color from the color palette
export function getColorFromPalette(index) {
    return colorPalette[index];
}

//gets the currently selected pixel
export function getSelectedPixel() {
    return selectedPixel;
}

//shows the Status bar at the bottom of the screen
//and makes it check for updated to the "Author" of
//the pixel being selected
export function showStatusBar() {
    updateStatusBar();
    statusBar.bar.style.transform = "translateY(0)";
}

//makes it check for updated to the "Author" of
export function updateStatusBar() {
    statusBar.updateAuthor();
}

//moves status bar off screen
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