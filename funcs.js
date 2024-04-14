/// MAIN FUNCTIONING VARS ---------------------------------

let kType = 1; // 0 -> Decryption | 1 -> Encryption
const letterValues = ["a", "e", "i", "o", "u"];

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




function reverseWord(word) {
    let newWord = "";

    for (let i = word.length - 1; i >= 0; i--) {
        newWord += word[i];
    }

    return newWord;
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

function isNumber(character) {
    return /\d/.test(character);
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



function decrypt(word) {
    console.log("Last three: ", word.substring(word.length - 3).toLowerCase());
    if (word.substring(word.length - 3).toLowerCase() === "aca") {
        word = word.slice(0, -3);
    }
    let modWord = reverseWord(word);
    modWord = decLetters(modWord);

    return modWord;

}

function encrypt(word) {
    let modWord = reverseWord(word); // Reverse word
    console.log("Word reversed: " + modWord);
    modWord = encLetters(modWord);   // Encrypt letters
    console.log("Encrypted word: " + modWord)
    modWord = modWord + "aca";
    return modWord;
}