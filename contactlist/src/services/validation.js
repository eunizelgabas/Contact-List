export const validateData = (name, email, contactNo) => {
    let nameError = "";
    let emailError = "";
    let contactNoError = "";

    // Validation for name 
    if (!name) {
        nameError = "Please enter a name."; // Check if the name is empty or undefined
    } else if (name.length <= 1) {
        nameError = "Name must not be less than 1 characters.";
    } else if (!/^[A-Z]/.test(name)) {
        nameError = "Name must start with an uppercase letter.";
    }

    // Validation for email
    if (!email) {
        emailError = "Please enter an email";  // Check if the email is empty or undefined
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        emailError = "Invalid email. Please input a valid email";  // Regular expression checks for valid email format
    }
    
    // Validation for contact number 
    if(!contactNo){
        contactNoError = "Please enter a contact number";  // Check if the contact no is empty or undefined
    }
   else if (contactNo.length < 11 || contactNo.length > 11) {
        contactNoError = "Contact number must be 11 digits.";
    }

    return {
        isValid: !nameError && !emailError && !contactNoError,
        errors: {
            name: nameError,
            email: emailError,
            contactNo: contactNoError,
        },
    };
};