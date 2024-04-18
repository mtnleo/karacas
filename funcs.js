/// MAIN FUNCTIONING VARS ---------------------------------

let kType = 1; // 0 -> Decryption | 1 -> Encryption
let letterValues = ["a", "e", "i", "o", "u"];
let lastLetters = "aca";

/// ACTIVATE JS DOM NODES
createSettingsNodes();

/// COPY OUTPUT TEXT ---------------------------------

document.getElementById("copyButton").onclick = () => {
    copyOutput();
    // set alert when copying
}
 
/// CHANGE ENCRYPTION MODE ---------------------------------

document.getElementById("encrypt").onclick = () => {
    document.getElementById("title").innerText = "Karaca's Encryption Algorithm";
    document.getElementById("encrypt").style.borderStyle = "double";
    document.getElementById("encrypt").style.borderColor = "white";
    document.getElementById("decrypt").style.borderStyle = "none";
    kType = 1;
}

document.getElementById("decrypt").onclick = () => {
    document.getElementById("title").innerText = "Karaca's Decryption Algorithm";
    document.getElementById("decrypt").style.borderStyle = "double";
    document.getElementById("decrypt").style.borderColor = "white";
    document.getElementById("encrypt").style.borderStyle = "none";
    kType = 0;
} 

/// OPEN SETTINGS ------------------------------

document.getElementById("settingsIcon").onclick = () => {
    // modal
}

/// CREATE SETTINGS NODES
function createSettingsNodes() {
    const elementDiv = document.getElementById("modalSettingsFunctions");

    /// CREATE ROW FOR LAST LETTERS
    const elementContainerLastLetters = document.createElement("div");
    elementContainerLastLetters.classList.add("d-flex", "align-items-center", "mb-3"); // Add Bootstrap classes

    /// CHANGE LAST LETTERS
    const elementLastLettersTitle = document.createElement("label");
    elementLastLettersTitle.classList.add("col-sm-4", "col-form-label");
    elementLastLettersTitle.textContent = "Change Last Letters";

        // add text input
    const elementLastLettersInput = document.createElement("input");
    elementLastLettersInput.type = "text"
    elementLastLettersInput.value = lastLetters;
    elementLastLettersInput.classList.add("col-sm-8", "form-control.w-100", "text-white");
    elementLastLettersInput.disabled = true;
    elementLastLettersInput.style = "background-color: rgba(0, 0, 0, 0.5);"

        // add edit image
    const elementEditLettersImg = document.createElement("img");
    

    // append to the container
    elementContainerLastLetters.appendChild(elementLastLettersTitle);
    elementContainerLastLetters.appendChild(elementLastLettersInput);

    // append to the div in the HTML
    elementDiv.appendChild(elementContainerLastLetters);


}

/// ACTIVATE TEXT PROCESSING ---------------------------------

document.getElementById("search").onclick = () => {
    processText();
} 

document.getElementById('inputFormId').addEventListener('submit', function(event) {
    event.preventDefault();
    processText();
});

/// TEXT PROCESSING FUNCTION ---------------------------------

function processText() {
    if (kType === 0) {
        document.getElementById("output").innerText = decrypt(document.forms["inputForm"]["inputText"].value);
    }
    else {
        document.getElementById("output").innerText = encrypt(document.forms["inputForm"]["inputText"].value);
    }
}

/// USEFUL FUNCTIONS WHEN ENCRYPTING --------------------------------------

function isNumber(character) {
    return /\d/.test(character);
}

function reverseWord(word) {
    let newWord = "";

    for (let i = word.length - 1; i >= 0; i--) {
        newWord += word[i];
    }

    return newWord;
}

/// DECRYPT FUNCTIONS --------------------------------------

function decrypt(word) {
    console.log("Last three: ", word.substring(word.length - 3).toLowerCase());
    if (word.substring(word.length - 3).toLowerCase() === lastLetters) {
        word = word.slice(0, -3);
    }
    let modWord = reverseWord(word);
    modWord = decLetters(modWord);

    return modWord;

}

function decLetters(word) {
    let newWord = "";
    for (let i = 0; i < word.length; i++) {
        if (isNumber(word[i])) {
            newWord += letterValues[word[i]];
        }
        else {
            newWord += word[i];
        }
    }
    return newWord;
}

/// ENCRYPT FUNCTIONS ----------------------------------------

function encrypt(word) {
    let modWord = reverseWord(word); // Reverse word
    console.log("Word reversed: " + modWord);
    modWord = encLetters(modWord);   // Encrypt letters
    console.log("Encrypted word: " + modWord)
    modWord = modWord + "aca";
    return modWord;
}

function encLetters(word) {
    let newWord = "";
    for (let i = 0; i < word.length; i++) {
        if (!isNumber(word[i])) {
            if (letterValues.indexOf(word[i].toLowerCase()) >= 0) {
                newWord += letterValues.indexOf(word[i].toLowerCase());
            }
            else {
                newWord += word[i];
            }
        }
    }
    return newWord;
}

/// EXTRA FUNCTIONS --------------------------------

function copyOutput() {
    let copyText = document.getElementById("output").textContent;

    navigator.clipboard.writeText(copyText);
}

function changeLastLetters(newLastLetters) {
    lastLetters = newLastLetters;
}