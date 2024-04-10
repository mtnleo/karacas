let kType = 0; // 0 -> Decryption | 1 -> Encryption


document.getElementById("encrypt").onclick = () => {
    document.getElementById("title").innerText = "Karaca's Encryption Algorithm";
    kType = 1;
}

document.getElementById("decrypt").onclick = () => {
    document.getElementById("title").innerText = "Karaca's Decryption Algorithm";
    kType = 0;
} 

document.getElementById("search").onclick = () => {
    if (kType === 0) {
        document.getElementById("output").innerText = decrypt("0p0paca");
    }
    else {
        document.getElementById("output").innerText = encrypt();
    }
    
    
} 



function reverseWord(word) {
    console.log(word);
}

function decrypt(word) {
    word = word.slice(0, -3);
    let revWord = reverseWord(word);

}

function encrypt(word) {
    let revWord = ;
    revWord = word + "aca";
}