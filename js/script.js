const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const email = document.getElementById('email');
const title = document.getElementById('title');
const creditNum = document.getElementById('cc-num');
const zipNum = document.getElementById('zip');
const cvvNum = document.getElementById('cvv');
const otherJobRole = document.getElementById('other-job-role');
const shirtDesigns = document.getElementById('design');
const shirtColors = document.getElementById('shirt-colors');
const shirtSelect = document.getElementById('color');
let totalCost = document.getElementById('activities-cost');
const activities = document.getElementById('activities');
const checkboxes = document.querySelectorAll('input[type=checkbox]');
const paymentMethods = document.getElementById('payment-methods');
const paymentMethodBox = document.getElementById('payment-method-box');

nameInput.focus();

// These functions will display or hide HTML elements by setting or removing a "hidden" attribute
function hideElementById(elementId) {
    document.getElementById(elementId).setAttribute('hidden', 'true');
}
function showElementById(elementId) {
    document.getElementById(elementId).removeAttribute('hidden');
}
function hideElementsByClass(elementClassName) {
    const list = document.getElementsByClassName(elementClassName)
    for (let i = 0; i < list.length; i ++) {
        list[i].setAttribute('hidden', 'true');
    }
}
function showElementsByClass(elementClassName) {
    const list = document.getElementsByClassName(elementClassName)
    for (let i = 0; i < list.length; i ++) {
        list[i].removeAttribute('hidden');
    }
}

hideElementById('other-job-role');
hideElementById('shirt-colors');
hideElementById('paypal');
hideElementById('bitcoin');

/*This event handler will display the "other-job-role" input element if "other" is selected in the "title" 
input dropdown, and hide it again if any other option is displayed */
title.addEventListener ('change', (e)=> {
    if (e.target.value === "other") {
        otherJobRole.removeAttribute('hidden');
    } else {
        hideElementById('other-job-role');
    }
});

/* This event handler will display the "shirt color" dropdown input element, which is populated only by the colors that
are available to the option selected in the "design" dropdown input element.*/ 
shirtDesigns.addEventListener ('change', (e)=> {
    if (e.target.value === "js puns") {
        hideElementsByClass('heart js');
        showElementsByClass('js puns')
        shirtColors.removeAttribute('hidden');
        shirtSelect.value = "placeholder";
    } else if (e.target.value === "heart js") {
        hideElementsByClass('js puns');
        showElementsByClass('heart js')
        shirtColors.removeAttribute('hidden');
        shirtSelect.value = "placeholder";
    }
});

/* This event handler will update the "activities-cost" element to dynamically display total cost as conference activities are added and removed.
It will also disable any activity that has an overlapping timeslot with one already selected*/
let runningTotal = 0;
activities.addEventListener ('change', (e)=> {
    const checkbox = e.target.checked;
    if (checkbox === true) {
        runningTotal += parseInt(e.target.dataset.cost);
    } else {
        runningTotal -= parseInt(e.target.dataset.cost);
    }
    for (let i= 0; i < checkboxes.length; i ++) {
        if (e.target.dataset.dayAndTime === checkboxes[i].dataset.dayAndTime && e.target !== checkboxes[i]) {
            checkboxes[i].setAttribute('disabled', 'true');
            checkboxes[i].classList.add('disabled');
            checkboxes[i].parentNode.classList.add('disabled');
     }
    }
    for (let i=0; i < checkboxes.length; i ++) {
        if (e.target.dataset.dayAndTime === checkboxes[i].dataset.dayAndTime && e.target !== checkboxes[i] && e.target.checked ===  false) {
            checkboxes[i].removeAttribute('disabled');
            checkboxes[i].classList.remove('disabled');
            checkboxes[i].parentNode.classList.remove('disabled');
         }
    }
totalCost.innerHTML = `Total: $${runningTotal}`;
});

// This event handler will display payment information only for the payment method that is selected in the "payment-methods" element.
let ccTrue = true;
paymentMethods.addEventListener ('change', (e)=> {
    if (e.target.value === 'paypal') {
        hideElementById('credit-card');
        hideElementById('bitcoin')
        showElementById('paypal')
        ccTrue = false;
    } else if (e.target.value === 'bitcoin') {
        hideElementById('credit-card');
        hideElementById('paypal')
        showElementById('bitcoin')
        ccTrue = false;
        // function that returns non cc to pass to an if in the validation section?
    } else {
        hideElementById('bitcoin');
        hideElementById('paypal')
        showElementById('credit-card');
        ccTrue = true;
    }
    return ccTrue;
});

// These functions will display or hide a tip that communicates the validation rule for each input.
function displayHint(input) {
    let parent = input.parentNode;
    parent.lastElementChild.classList.remove('hint');
}
function hideHint(input) {
    let parent = input.parentNode;
    parent.lastElementChild.classList.add('hint');
}

/* 
These validate functions and the following event handler will only submit the form information if every field passes validation checks.
The "Name" field cannot be blank or empty.
The "Email Address" field must contain a validly formatted email address (___@___.com for this project)
The "Register for Activities" section must have at least one activity selected.
If and only if credit card is the selected payment method:
    - The "Card number" field must contain a 13 - 16 digit credit card number with no dashes or spaces.
    - The "Zip code" field must contain a 5 digit number.
    - The "CVV" field must contain a 3 digit number.
The validation checks also display an error symbol from the .valid and .not-valid classes next to invalid inputs.
*/
function inputValidate(input, regex) {
    let inputTest = regex.test(input.value);
    if (inputTest === false) {
        input.parentNode.classList.add('not-valid');
        input.parentNode.classList.remove('valid');
        displayHint(input);
    } else {
        input.parentNode.classList.add('valid');
        input.parentNode.classList.remove('not-valid');
        hideHint(input);
    }
    return inputTest;
}

function activityValidate() {
    let activityTest = document.querySelectorAll('input[type="checkbox"]:checked');
    if (activityTest.length < 1) {
        activities.parentNode.classList.add('not-valid');
        activities.parentNode.classList.remove('valid');
        activities.lastElementChild.classList.remove('hint');
    } else {
        activities.parentNode.classList.add('valid');
        activities.parentNode.classList.remove('not-valid');
        activities.lastElementChild.classList.add('hint');
    }
    return activityTest;
};

form.addEventListener ('submit', (e)=> {
    nameTest = inputValidate(nameInput, /^[a-z]+$/i);
    emailTest = inputValidate(email, /^[^@]+@[^@]+\.com$/i);
    activityTest = activityValidate();
    creditTest = inputValidate(creditNum, /^\d{13,16}$/);
    zipTest = inputValidate(zipNum, /^\d{5}$/);
    cvvTest = inputValidate(cvvNum, /^\d{3}$/);
    if (ccTrue === true) {
        if (nameTest === false || 
            emailTest === false ||
            activityTest.length < 1 ||
            creditTest === false ||
            zipTest === false ||
            cvvTest === false) {
                e.preventDefault();
            }
    } else if (ccTrue === false) {
        if (nameTest === false || 
            emailTest === false ||
            activityTest.length < 1) {
                e.preventDefault();
            }
    }
});

// These follow two loops iterate over all checkboxes and apply or remove .focus class to style if they are focused.
for (let i = 0; i < checkboxes.length; i ++) {
    checkboxes[i].addEventListener ('focus', (e)=> { 
        e.target.parentNode.classList.add('focus');
    });
}

for (let i = 0; i < checkboxes.length; i ++) {
    checkboxes[i].addEventListener ('blur', (e)=> { 
        e.target.parentNode.classList.remove('focus');
    });
}