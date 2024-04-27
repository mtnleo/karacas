/// |||||||||||||||||||||||||||||||||||||||||||||||||||||||| \\\
/// |||||||||||||||| MAIN FUNCTIONING VARS ||||||||||||||||| |||
/// |||||||||||||||||||||||||||||||||||||||||||||||||||||||| ///

let vowelCode = ["0", "1", "2", "3", "4"];
let lastLetters = "aca";
let isReverseWord = true;

try { // if it's not the first time for the user
    vowelCode = JSON.parse(localStorage.getItem("storeVowelCode"));
    lastLetters = localStorage.getItem("storeLastLetters");
    isReverseWord = JSON.parse(localStorage.getItem("storeIsReverseWord"));
}
catch (err) { // if it's the first time the user accesses the page
    localStorage.setItem("storeVowelCode", JSON.stringify(vowelCode));
    localStorage.setItem("storeLastLetters", lastLetters);
    localStorage.setItem("storeIsReverseWord", JSON.stringify(isReverseWord));

    console.log("New values saved. Welcome");
}

let kType = 1; // 0 -> Decryption | 1 -> Encryption
let letterValues = ["a", "e", "i", "o", "u"];


createSettingsNodes(); // Activate HTML nodes for modal

/// |||||||||||||||||||||||||||||||||||||||||||||||||||||||| \\\
/// |||||||||||||||||| ONCLICK FUNCTIONS ||||||||||||||||||| |||
/// |||||||||||||||||||||||||||||||||||||||||||||||||||||||| ///



/// EDIT ICONS -----------------------------------------------

document.getElementById("editVowelCodeIcon").onclick = () => { /// ENABLE/DISABLE VOWEL CODE CHANGE
    editVowelCodeInput();
}

if (window.location.pathname.endsWith('index.html')) {
    document.getElementById("copyButton").onclick = () => { /// COPY OUTPUT TEXT
        copyOutput();
        // set alert when copying
    }

    document.getElementById("pasteButton").onclick = () => { /// PASTE INPUT TEXT
        pasteInput();
    }


    
    /// CHANGE ENCRYPTION MODE ----------------------------------

    document.getElementById("encrypt").onclick = () => {
        document.getElementById("encrypt").style.borderStyle = "double";
        document.getElementById("encrypt").style.borderColor = "white";
        document.getElementById("decrypt").style.borderStyle = "none";
        document.getElementById("inputText").value = "";
        kType = 1;
    }

    document.getElementById("decrypt").onclick = () => {
        document.getElementById("decrypt").style.borderStyle = "double";
        document.getElementById("decrypt").style.borderColor = "white";
        document.getElementById("encrypt").style.borderStyle = "none";
        document.getElementById("inputText").value = "";
        kType = 0;
    } 

    /// ACTIVATE TEXT PROCESSING ---------------------------------

    document.getElementById("search").onclick = () => {
        processText();
        document.getElementById("inputText").value = "";
    } 

    document.getElementById('inputFormId').addEventListener('submit', function(event) {
        event.preventDefault();
        processText();
        document.getElementById("inputText").value = "";
    });



    /// |||||||||||||||||||||||||||||||||||||||||||||||||||||||| \\\
    /// ||||||||||||||| ENCRYPTING & DECRYPTING |||||||||||||||| |||
    /// |||||||||||||||||||||||||||||||||||||||||||||||||||||||| ///


    /// TEXT PROCESSING FUNCTION ---------------------------------

    function processText() {
        if (kType === 0) {
            document.getElementById("output").innerText = decrypt(document.forms["inputForm"]["inputText"].value);
        }
        else {
            document.getElementById("output").innerText = encrypt(document.forms["inputForm"]["inputText"].value);
        }
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
                    newWord += vowelCode[letterValues.indexOf(word[i].toLowerCase())];
                }
                else {
                    newWord += word[i];
                }
            }
        }
        return newWord;
    }


    /// DECRYPT FUNCTIONS ----------------------------------------

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
                newWord += letterValues[vowelCode.indexOf(word[i])];
            }
            else {
                newWord += word[i];
            }
        }
        return newWord;
    }



    /// USEFUL FUNCTIONS WHEN ENCRYPTING --------------------------

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

    }


    /// |||||||||||||||||||||||||||||||||||||||||||||||||||||||| \\\
    /// |||||||||||||||| CREATE OPTIONS NODES |||||||||||||||||| |||
    /// |||||||||||||||||||||||||||||||||||||||||||||||||||||||| ///



    function createSettingsNodes() {
        // Main DIV Element
        const elementDiv = document.getElementById("modalSettingsFunctions");

            // --------------------------------------------------------------------
            /// CREATE ROW FOR LAST LETTERS ---------------------------------------
            const containerLastLetters = document.createElement("div");
            containerLastLetters.classList.add("container", "align-items-center", "mb-3"); // Add Bootstrap classes

                // ROW for container
                const rowLastLetters = document.createElement("div");
                rowLastLetters.classList.add("row");

                    // COLs for container
                    const colLeftLastLetters = document.createElement("div");
                    const colRightLastLetters = document.createElement("div");
                    colLeftLastLetters.classList.add("col", "d-flex", "align-content-center");
                    colRightLastLetters.classList.add("col", "d-flex");

                            /// CHANGE LAST LETTERS

                            // add title
                            const lastLettersTitle = document.createElement("p");
                            const textLastLettersTitle = document.createTextNode("Change Last Letters")
                            lastLettersTitle.appendChild(textLastLettersTitle);
                            lastLettersTitle.classList.add("lead", "mt-2", "fw-normal");

                            // add input
                            const LastLettersInput = document.createElement("input");
                            LastLettersInput.type = "text";
                            LastLettersInput.id = "lastLettersInput";
                            LastLettersInput.value = lastLetters;
                            LastLettersInput.classList.add( "text-white", "rounded-3", "text-center", "border-0");
                            LastLettersInput.disabled = true;
                            LastLettersInput.maxLength = 10;
                            LastLettersInput.style = "background-color: rgba(0, 0, 0, 0.5);"

                            // add edit icon
                            const editLastLettersIcon = document.createElement("img");
                            editLastLettersIcon.id = "iconLastLettersEdit";
                            editLastLettersIcon.src = "/img/Pencil icon.png";
                            editLastLettersIcon.classList.add("m-3");
                            editLastLettersIcon.style.width = "20px";
                            editLastLettersIcon.style.height = "20px";
                            editLastLettersIcon.style.cursor = "pointer"
                            editLastLettersIcon.onclick = editLastLettersInput;


                    // append to the COL
                    colLeftLastLetters.appendChild(lastLettersTitle); // LEFT

                    colRightLastLetters.appendChild(LastLettersInput); // RIGHT
                    colRightLastLetters.appendChild(editLastLettersIcon);


                // append to the ROW
                rowLastLetters.appendChild(colLeftLastLetters); // LEFT

                rowLastLetters.appendChild(colRightLastLetters); // RIGHT

            // append to the CONTAINER
            containerLastLetters.appendChild(rowLastLetters); 

        // append to the DIV in the HTML
        elementDiv.appendChild(containerLastLetters);

            // -------------------------------------------------------------------------
            /// CREATE ROW FOR REVERSE WORD ---------------------------------------
            const containerReverseWord = document.createElement("div");
            containerReverseWord.classList.add("container", "my-3"); // Add Bootstrap classes

                // create ROW
                const rowReverseWord = document.createElement("div");
                rowReverseWord.classList.add("row", "pt-2");

                    // create COLs
                    const colLeftReverseWord = document.createElement("div");
                    const colRightReverseWord = document.createElement("div");
                    colLeftReverseWord.classList.add("col-sm-5");
                    colRightReverseWord.classList.add("col-sm-5", "d-flex", "ms-auto");

                        /// CREATE SLIDEBOX

                        // create Reverse word text
                        const reverseWordText = document.createElement("p")
                        const reverseTextText = document.createTextNode("Reverse Word");
                        
                        reverseWordText.classList.add("lead", "fw-normal", "w-100");
                        reverseWordText.appendChild(reverseTextText);


                        // create label
                        const labelSwitchReverseWord = document.createElement("label");
                        labelSwitchReverseWord.classList.add("switch");

                        // create input
                        const checkboxReverseWord = document.createElement("input");
                        checkboxReverseWord.type = "checkbox";
                        checkboxReverseWord.checked = isReverseWord; // if true it's checked and it reverses the word
                        checkboxReverseWord.onclick = clickReverseSlider;
                        
                        // create span
                        const elementSpanSlider = document.createElement("span");
                        elementSpanSlider.classList.add("slider", "round");

                        // append to label
                        labelSwitchReverseWord.appendChild(checkboxReverseWord);
                        labelSwitchReverseWord.appendChild(elementSpanSlider);
                    
                    // append to COLs
                    colLeftReverseWord.appendChild(reverseWordText);

                    colRightReverseWord.appendChild(labelSwitchReverseWord);

                // append to the ROW
                rowReverseWord.appendChild(colLeftReverseWord); // LEFT

                rowReverseWord.appendChild(colRightReverseWord); // RIGHT

            // append to the CONTAINER
            containerReverseWord.appendChild(rowReverseWord);
            

        // append container to the HTML
        elementDiv.appendChild(containerReverseWord);
            
            // -------------------------------------------------------------------------
            /// CREATE ROW FOR CHANGE VOWEL CODE ---------------------------------------
            document.getElementById("codeA").value = vowelCode[0];
            document.getElementById("codeE").value = vowelCode[1];
            document.getElementById("codeI").value = vowelCode[2];
            document.getElementById("codeO").value = vowelCode[3];
            document.getElementById("codeU").value = vowelCode[4];


}


/// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| \\\
/// |||||||||||||||| FUNCTIONS FOR OPTIONS NODES |||||||||||||||||| |||
/// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| ///


function editVowelCodeInput() {
    const vowelInputA = document.getElementById("codeA");
    const vowelInputE = document.getElementById("codeE");
    const vowelInputI = document.getElementById("codeI");
    const vowelInputO = document.getElementById("codeO");
    const vowelInputU = document.getElementById("codeU");

    vowelInputA.disabled = !(vowelInputA.disabled);
    vowelInputE.disabled = !(vowelInputE.disabled);
    vowelInputI.disabled = !(vowelInputI.disabled);
    vowelInputO.disabled = !(vowelInputO.disabled);
    vowelInputU.disabled = !(vowelInputU.disabled);

    if(!vowelInputA.disabled) {
        document.getElementById("editVowelCodeIcon").src = "/img/Verification Mark.png"
    }
    else {
        for (let i = 0; i < 5; i++) { // change the array
            if (document.getElementById("code" + letterValues[i].toUpperCase()).value != "") {
                vowelCode[i] = document.getElementById("code" + letterValues[i].toUpperCase()).value;

            }
            else {
                vowelCode[i] = i; // If there isn't any input, it's just gonna be the normal value
                document.getElementById("code" + letterValues[i].toUpperCase()).value = i;
            }
            
        }
        // Overwrite the stored data ########################
        localStorage.setItem("storeVowelCode", JSON.stringify(vowelCode));// ########################

        
        document.getElementById("editVowelCodeIcon").src = "/img/Pencil icon.png"
    }

}

function editLastLettersInput() {
    const elementLastLettersInput = document.getElementById("lastLettersInput");
    elementLastLettersInput.disabled = !elementLastLettersInput.disabled; // It will turn it on/off depending on the current state
    // Change the img src
    const editIconImg = document.getElementById("iconLastLettersEdit");
    if (!elementLastLettersInput.disabled) { // if edit mode
        editIconImg.src = "/img/Verification Mark.png";
    } else { // if disabled mode
        // apply changes
        lastLetters = elementLastLettersInput.value;
        // overwrite the stored data ########################
        localStorage.setItem("storeLastLetters", lastLetters);// ########################


        // change img
        editIconImg.src = "/img/Pencil icon.png";
    }
}

function clickReverseSlider() {
    isReverseWord = !isReverseWord;

    // overwrite the stored data ########################
    localStorage.setItem("storeIsReverseWord", JSON.stringify(isReverseWord));// ########################

    console.log("Reverse Word: ", isReverseWord);
}


/// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| \\\
/// ||||||||||||||||||| COPY/PASTE FUNCTIONS || ||||||||||||||||||| |||
/// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| ///


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

