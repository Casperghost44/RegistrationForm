const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-next");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");
const input = document.querySelectorAll("input");
const querError = document.querySelectorAll(".error");
const password = document.getElementById("password");
const confPassword = document.getElementById("confirmPassword");
const passErrors = document.querySelectorAll(".pass-error");
const submmit = document.querySelector(".btn-submit");


let formStepsNum = 0;
let inputNum = 0;





nextBtns.forEach((btn) => {
    
    btn.addEventListener("click", () => {

        
        if (input[inputNum].value == "") {

            querError[inputNum].classList.add("error-active");

        }
        else if (input[inputNum + 1].value == "") {
            querError[inputNum].classList.contains("error-active") &&
                querError[inputNum].classList.remove("error-active");
            querError[inputNum + 1].classList.add("error-active");
        }
        else {
            querError[inputNum].classList.contains("error-active") &&
                querError[inputNum].classList.remove("error-active");
            querError[inputNum + 1].classList.contains("error-active") &&
                querError[inputNum + 1].classList.remove("error-active");
            formStepsNum++;
            updateFormSteps();
            updateProgressBar();
            inputNum = inputNum + 2;
            
        }
            
        



    });
});

prevBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        formStepsNum--;
        updateFormSteps();
        updateProgressBar();
        inputNum = inputNum - 2;
    });
});

submmit.addEventListener("click", () => {
    validConfirm(password.value, confPassword.value);
});

function updateFormSteps() {
    formSteps.forEach((formStep) => {
        formStep.classList.contains("form-step-active") &&
            formStep.classList.remove("form-step-active");
    });
    formSteps[formStepsNum].classList.add("form-step-active");
}

function updateProgressBar() {
    progressSteps.forEach((progressStep, indx) => {
        if (indx < formStepsNum + 1) {
            progressStep.classList.add('progress-step-active');
        } else {
            progressStep.classList.remove('progress-step-active');
        }
    });

    const progressActive = document.querySelectorAll(".progress-step-active");
    progress.style.width = ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + '%';
}

function validConfirm(passw, anPass) {
    if (passw == "") {
        passErrors[0].classList.add("error-active");
    }
    else if (anPass == "") {
        if (passw.length > 0) {
            passErrors[0].classList.remove("error-active");
        }
        passErrors[1].classList.add("error-active");
    }
    else {
        passErrors[0].classList.remove("error-active");
        passErrors[1].classList.remove("error-active");
        if (passw.length < 8) {
            passErrors[0].innerHTML = "*Password should contain at least 8 symbols";
            passErrors[0].classList.add("error-active");
        }
        else if (passw.length > 15) {
            passErrors[0].innerHTML = "*Password is too long";
            passErrors[0].classList.add("error-active");
        }
        else if (passw != anPass) {
            passErrors[1].innerHTML = "*Password should be equal";
            passErrors[1].classList.add("error-active");
        }
        else {
            submmit.setAttribute('type', 'submit');;

        }
    }
}


