/// MAIN FUNCTIONING VARS ---------------------------------

let kType = 1; // 0 -> Decryption | 1 -> Encryption
let letterValues = ["a", "e", "i", "o", "u"];
let vowelCode = ["0", "1", "2", "3", "4"];
let lastLetters = "aca";
let isReverseWord = true;

/// ACTIVATE JS DOM NODES
createSettingsNodes();

/// COPY OUTPUT TEXT ---------------------------------

document.getElementById("copyButton").onclick = () => {
    copyOutput();
    // set alert when copying
}

/// PASTE INPUT TEXT ---------------------------------

document.getElementById("pasteButton").onclick = () => {
    pasteInput();
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

    /// CREATE ROW FOR LAST LETTERS ---------------------------------------
    const elementContainerLastLetters = document.createElement("div");
    elementContainerLastLetters.classList.add("d-flex", "align-items-center", "mb-3"); // Add Bootstrap classes

    /// CHANGE LAST LETTERS
    const elementLastLettersTitle = document.createElement("label");
    elementLastLettersTitle.classList.add("col-sm-4", "col-form-label", "lead");
    elementLastLettersTitle.textContent = "Change Last Letters";

        // add text input
    const elementLastLettersInput = document.createElement("input");
    elementLastLettersInput.type = "text";
    elementLastLettersInput.id = "lastLettersInput";
    elementLastLettersInput.value = lastLetters;
    elementLastLettersInput.classList.add("col-sm-7", "form-control.w-100", "text-white");
    elementLastLettersInput.disabled = true;
    elementLastLettersInput.maxLength = 10;
    elementLastLettersInput.style = "background-color: rgba(0, 0, 0, 0.5);"

        // add edit image
    const elementEditLettersImg = document.createElement("img");
    elementEditLettersImg.id = "iconLastLettersEdit";
    elementEditLettersImg.src = "Pencil icon.png";
    elementEditLettersImg.classList.add("col-sm-1", "ms-3");
    elementEditLettersImg.style.width = "20px";
    elementEditLettersImg.style.cursor = "pointer"
    elementEditLettersImg.onclick = editLastLettersInput;


    // append to the container
    elementContainerLastLetters.appendChild(elementLastLettersTitle);
    elementContainerLastLetters.appendChild(elementLastLettersInput);
    elementContainerLastLetters.appendChild(elementEditLettersImg)

    // append to the div in the HTML
    elementDiv.appendChild(elementContainerLastLetters);

    /// CREATE ROW FOR REVERSE WORD ---------------------------------------
    const elementContainerReverseWord = document.createElement("div");
    elementContainerReverseWord.classList.add( "align-items-center", "mb-3", "row"); // Add Bootstrap classes


    // create Reverse word text
    const elementReverseTextText = document.createElement("p")
    const reverseTextText = document.createTextNode("Reverse Word");
    
    elementReverseTextText.classList.add("col-sm-4", "lead");
    elementReverseTextText.appendChild(reverseTextText);

    // create label
    const labelSwitch = document.createElement("label");
    labelSwitch.classList.add("switch", "col-sm-1");

    // create input
    const elementInputReverseWord = document.createElement("input");
    elementInputReverseWord.type = "checkbox";
    elementInputReverseWord.checked = isReverseWord; // if true it's checked and it reverses the word
    elementInputReverseWord.onclick = clickReverseSlider;
    
    // create span
    const elementSpanSlider = document.createElement("span");
    elementSpanSlider.classList.add("slider", "round");

        // append to label
    labelSwitch.appendChild(elementInputReverseWord);
    labelSwitch.appendChild(elementSpanSlider);


    // append to the container
    elementContainerReverseWord.appendChild(elementReverseTextText);
    elementContainerReverseWord.appendChild(labelSwitch);
    

    // append container to the HTML
    elementDiv.appendChild(elementContainerReverseWord);
    
    /// CREATE ROW FOR CHANGE VOWEL CODE ---------------------------------------
    document.getElementById("codeA").value = vowelCode[0];
    document.getElementById("codeE").value = vowelCode[1];
    document.getElementById("codeI").value = vowelCode[2];
    document.getElementById("codeO").value = vowelCode[3];
    document.getElementById("codeU").value = vowelCode[4];
/*
    const elementContainerVowelCode = document.createElement("div");
    elementContainerVowelCode.classList.add("container");

    // Create div for row
    const rowVowelCode = document.createElement("div");
    rowVowelCode.classList.add("row");

    // Create both col divs
    const colVowelDivLeft = document.createElement("div");
    colVowelDivLeft.classList.add("col");

    const colVowelDivRight = document.createElement("div");
    colVowelDivRight.classList.add("col");

    // Create text for left div column
    const vowelCodeText = document.createElement("p");
    const vowelCodeTextNode = document.createTextNode("Code for Vowels");
    vowelCodeText.appendChild(vowelCodeTextNode);

    // Create row for right div column
    const vowelCodeRightDivRow = document.createElement("div");
    vowelCodeRightDivRow.classList.add("row");

*/

}

function editLastLettersInput() {
    const elementLastLettersInput = document.getElementById("lastLettersInput");
    elementLastLettersInput.disabled = !elementLastLettersInput.disabled; // It will turn it on/off depending on the current state
    // Change the img src
    const editIconImg = document.getElementById("iconLastLettersEdit");
    if (!elementLastLettersInput.disabled) { // if edit mode
        editIconImg.src = "Verification Mark.png";
    } else { // if disabled mode
        // apply changes
        lastLetters = elementLastLettersInput.value;

        // change img
        editIconImg.src = "Pencil icon.png";
    }
}

function clickReverseSlider() {
    isReverseWord = !isReverseWord;
    console.log("Reverse Word: ", isReverseWord);
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
    console.log("Last three: ", word.substring(word.length - lastLetters.length).toLowerCase());
    if (word.substring(word.length - lastLetters.length).toLowerCase() === lastLetters) {
        word = word.slice(0, -lastLetters.length);
        console.log(word);
    }
    let modWord = word;
    if (isReverseWord) {
        modWord = reverseWord(word);
    } 
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
    let modWord = word;
    if (isReverseWord) {
        modWord = reverseWord(word); // Reverse word
        console.log("Word reversed: " + modWord);
    }
    
    modWord = encLetters(modWord);   // Encrypt letters
    console.log("Encrypted word: " + modWord)
    modWord = modWord + lastLetters;
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

async function pasteInput() {
    try {
        const toPasteText = await navigator.clipboard.readText();
        document.getElementById("inputText").value = toPasteText;
        console.log("Pasted: " + toPasteText);
    }
    catch (error) {
        console.error("Error pasting: " + error);
    }
}

function copyOutput() {
    let copyText = document.getElementById("output").textContent;

    navigator.clipboard.writeText(copyText);
}

function changeLastLetters(newLastLetters) {
    lastLetters = newLastLetters;
}