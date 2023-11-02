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
    
    for (index in invalidElements) {
        console.log(invalidElements[index])
        let errorContainer = invalidElements[index].parentElement.querySelector('.error');
        console.log(errorContainer)
        let errorText = errorContainer.querySelector(".error__text")
        console.log(errorText)
        errorContainer.style.display = "flex";
        errorText.textContent = invalidElements[index].validationMessage;
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
window.validateFormSubmit = validateFormSubmit;