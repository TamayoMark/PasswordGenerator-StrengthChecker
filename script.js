var passwordLength = 8;
var strength = "";
var strengthValue = 0;
var lowercase = "abcdefghijklmnopqrstuvwxyz";
var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numbers = "0123456789";
var symbols = "!-$^+";
const passwordField = select('#password');
const errorCon = select('#error-container');
const errorText = select('#error-text');
const progress = select('#progress');
const passwordStrength = select('#password-strength');

function readLength(value) {
    const length = select('#password-length');
    passwordLength = value;
    length.textContent = value;
}

function select(selector) {
    return document.querySelector(selector);
}

function generatePassword() {
    var chkLowercase = select('#lowercase').checked;
    var chkUppercase = select('#uppercase').checked;
    var chkNumbers = select('#numbers').checked;
    var chkSymbols = select('#symbols').checked;
    var chkExcludeDuplicate = select('#exclude-duplicate').checked;
    var chkIncludeSpaces = select('#include-spaces').checked;
    var password = "";
    var characterLength = 0;
    if(chkLowercase) {
        characterLength += lowercase.length;
    }
    if(chkUppercase) {
        characterLength += uppercase.length;
    }
    if(chkNumbers) {
        characterLength += numbers.length;
    }
    if(chkSymbols) {
        characterLength += symbols.length;
    }
    if(!chkLowercase && !chkUppercase && !chkNumbers && !chkSymbols) {
        errorText.textContent = "You must select at least one type of character";
        errorCon.style.display = "block";
    } else if(chkExcludeDuplicate && characterLength < passwordLength) {
        errorText.textContent = "Please select more type of character";
        errorCon.style.display = "block";
    } else {
        errorCon.style.display = "none";
        while(true) {
            var randomNumber = Math.floor(Math.random() * 5);
            switch (randomNumber) {
                case 0:
                    if(!chkLowercase)
                        break;
                    password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
                    break;
                case 1:
                    if(!chkUppercase)
                        break;
                    password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
                    break;
                case 2:
                    if(!chkNumbers)
                        break;
                    password += numbers.charAt(Math.floor(Math.random() * numbers.length));
                    break;
                case 3:
                    if(!chkSymbols)
                        break;
                    password += symbols.charAt(Math.floor(Math.random() * symbols.length));
                    break;
                case 4:
                    if(!chkIncludeSpaces || password.charAt(password.length-1) == " " || password.length == 0)
                        break;
                    password += " ";
                    break;
            }
            if(chkExcludeDuplicate && password.substring(0, password.length - 1).includes(password.charAt(password.length-1)) && password.length > 1)
                password = password.substring(0, password.length - 1);
            if(password.length == passwordLength)
                break;
        }
        passwordField.value = password;
        updatePasswordStrength(password);
    }
}

function updatePasswordStrength(pass) {
    strengthValue = 0;

    if(hasLowerCase(pass)) {
        strengthValue += 15;
    }
    if(hasUpperCase(pass)) {
        strengthValue += 15;
    }
    if(hasNumber(pass)) {
        strengthValue += 15;
    }
    if(hasSymbol(pass)) {
        strengthValue += 15;
    }
    if(hasWhiteSpace(pass)) {
        strengthValue += 15;
    }
    strengthValue += pass.length;

    progress.style.width = strengthValue + "%";

    if(strengthValue == 0) {
        progress.style.backgroundColor = "none";
        progress.style.boxShadow = "0 0 5px 5px transparent";
        passwordStrength.textContent = ""
        passwordStrength.style.color = "transparent";
    } else if(strengthValue < 25) {
        progress.style.backgroundColor = "var(--weak-color)";
        progress.style.boxShadow = "var(--weak-shadow)";
        passwordStrength.textContent = "WEAK PASSWORD"
        passwordStrength.style.color = "var(--weak-color)";
    } else if(strengthValue < 50) {
        progress.style.backgroundColor = "var(--medium-color)";
        progress.style.boxShadow = "var(--medium-shadow)";
        passwordStrength.textContent = "GOOD PASSWORD"
        passwordStrength.style.color = "var(--medium-color)";
    } else if(strengthValue < 75) {
        progress.style.backgroundColor = "var(--strong-color)";
        progress.style.boxShadow = "var(--strong-shadow)";
        passwordStrength.textContent = "STRONG PASSWORD"
        passwordStrength.style.color = "var(--strong-color)";
    } else if(strengthValue >= 75) {
        progress.style.backgroundColor = "var(--very-strong-color)";
        progress.style.boxShadow = "var(--very-strong-shadow)";
        passwordStrength.textContent = "VERY STRONG PASSWORD"
        passwordStrength.style.color = "var(--very-strong-color)";
    }

    function hasLowerCase(pass) {
        return /[a-z]/.test(pass);
    }
    function hasUpperCase(pass) {
        return /[A-Z]/.test(pass);
    }
    function hasNumber(pass) {
        return /\d/.test(pass);
    }
    function hasSymbol(pass) {
        return /[!-$^+]/.test(pass);
    }
    function hasWhiteSpace(pass) {
        return /\s/.test(pass);
    }
}