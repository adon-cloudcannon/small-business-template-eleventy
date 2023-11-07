let typingTimer;
const doneTypingInterval = 1000;

function validateInput(input) {
    const errorContainer = input.parentElement.querySelector('.error');
    const errorText = errorContainer.querySelector(".error__text")

    if (input.checkValidity()) {
        errorContainer.style.display = "none";
    } else {
        errorContainer.style.display = "flex";
        errorText.textContent = input.validationMessage;
    }
}

function validateInputGroup(input) {
    const errorContainer = input.parentElement.querySelector('.error');

    let invalidElements = input.querySelectorAll(":invalid");
    invalidElements = [
        ...invalidElements
    ];

    if (invalidElements.length == 0) {
        errorContainer.style.display = "none";
    }
}

function validateInputTyping(input){
    // Wait for a user to stop typing and display an error message if their input is invalid
    clearTimeout(typingTimer);
    
    typingTimer = setTimeout(function() {
        validateInput(input)
    }, doneTypingInterval);
}

function validateFormSubmit(event, element) {
    event.preventDefault();
    console.log('validate form submit')
    let invalidElements = element.querySelectorAll(":invalid");

    console.log(invalidElements)

    invalidElements = [
        ...invalidElements
    ];
    invalidElements = invalidElements.filter(input => input.type != "radio" && input.type != "checkbox");
    
    for (index in invalidElements) {
        let item = invalidElements[index];
        console.log(item)
        let errorContainer = item.parentElement.querySelector('.error');
        console.log(errorContainer)
        let errorText = errorContainer.querySelector(".error__text")
        console.log(errorText)
        errorContainer.style.display = "flex";
        if (item.validationMessage) {
            console.log(item.validationMessage)
            errorText.textContent = item.validationMessage;
        } else if (item.querySelector(':invalid')) {
            console.log(item.querySelector(':invalid').validationMessage)
            errorText.textContent = item.querySelector(':invalid').validationMessage;
        }
    }

    if (invalidElements.length > 0) {
        console.log('contains invalid')
        scrollTo(invalidElements[0])
        invalidElements[0].scrollIntoView({ behavior: 'smooth' });
        return false
    } else {
        console.log('contains no invalid')
        return true;
    }

}

window.validateInput = validateInput;
window.validateInputTyping = validateInputTyping;
window.validateInputGroup = validateInputGroup;
window.validateFormSubmit = validateFormSubmit;

function setMinMaxDateToday(input) {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
        }

        if (mm < 10) {
        mm = '0' + mm;
        } 
                    
    today = yyyy + '-' + mm + '-' + dd;
    
    if (input.classList.contains("c-date-input__input--min-today")) {
        input.setAttribute("min", today);
    } else if (input.classList.contains("c-date-input__input--max-today")) {
        input.setAttribute("max", today);
    }
}

window.setMinMaxDateToday = setMinMaxDateToday;