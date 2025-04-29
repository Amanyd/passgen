const inputSlider = document.querySelector("[lengthslider]");
const lengthDisplay = document.querySelector("[datalength]");
const passwordDisplay = document.querySelector("[passworddisplay]");
const cpyBtn = document.querySelector("[copybutton]");
const cpyMsg = document.querySelector("[copymessage]");
const upperCaseCheck = document.querySelector("#uppercase");
const lowerCaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbols");
const generateBtn = document.querySelector("[generate]");
const indicator = document.querySelector("[dataindicator]");
const allCheckBox=document.querySelectorAll("input[type=checkbox]");
const symbols = "!@#$%^&*()_+{}[]:;<>?,./";
let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
setIndicator("white");
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText= passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLength - min) * 100 / (max - min)) + "% 100%";
}
function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px ${color}`;
    
}

function getRandomInteger(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

function generateRandomNumber(){
    return getRandomInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRandomInteger(97,123));
}

function generateUpperCase(){
    return String.fromCharCode(getRandomInteger(65,91));
}

function generateSymbol(){
    
    const randomNum = getRandomInteger(0, symbols.length);
    return symbols.charAt(randomNum);
}

function calcStrength(){
    let hasUpper = upperCaseCheck.checked;
    let hasLower = lowerCaseCheck.checked;
    let hasNumber = numberCheck.checked;
    let hasSymbol = symbolCheck.checked;
    checkCount = hasUpper + hasLower + hasNumber + hasSymbol;
    
    if(passwordLength < 8){
        setIndicator("#e24a4a");
        
    }
    if(!hasUpper && !hasLower && !hasNumber && !hasSymbol){
        setIndicator("#e24a4a");
        
    }
    if(checkCount === 1){
        setIndicator("#e2c94c");
        
    }
    if(checkCount === 2 && passwordLength >= 8){
        setIndicator("#e2c94c");
        
    }
    if(checkCount === 3 && passwordLength >= 8){
        setIndicator("#86d993");
        
    }
    if(checkCount === 4 && passwordLength >= 8){
        setIndicator("#86d993");
        
    }


}
function shufflePassword(Array){
    for(let i=Array.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        const temp = Array[i];
        Array[i] = Array[j];
        Array[j] = temp;
    }
    let str = "";
    Array.forEach((el) => (str += el));
    return str;
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        cpyMsg.innerText = "Copied";
    }
    catch(e){
        cpyMsg.innerText = "Failed";
    }
    cpyMsg.classList.add("active");
    setTimeout(() => {
        cpyMsg.classList.remove("active");
    }, 860);
    
    
}

inputSlider.addEventListener("input", (e) => {
    passwordLength = e.target.value;
    handleSlider();
});

cpyBtn.addEventListener("click", () => {
    if(passwordDisplay.value){
        copyContent();
    }
});

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
        checkCount = 0;
        allCheckBox.forEach((checkbox) => {
            if(checkbox.checked){
                checkCount++;
            }
        });
        if(passwordLength < checkCount){
            passwordLength = checkCount;
            handleSlider();
        }
        if(checkCount > 4){
            checkCount = 4;
        }
    });
});

generateBtn.addEventListener("click", () => {
    if(checkCount === 0) return;
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
    password = "";
    let funcArr = [];
    if(upperCaseCheck.checked) funcArr.push(generateUpperCase);
    if(lowerCaseCheck.checked) funcArr.push(generateLowerCase);
    if(numberCheck.checked) funcArr.push(generateRandomNumber);
    if(symbolCheck.checked) funcArr.push(generateSymbol);
    
    for(let i=0; i<funcArr.length; i++){
        password += funcArr[i]();
    }
    for(let i=0; i<passwordLength-funcArr.length; i++){
        let randIndex = getRandomInteger(0, funcArr.length);
        password += funcArr[randIndex]();
    }
    password= shufflePassword(Array.from(password));
    passwordDisplay.value = password;
    calcStrength();


});