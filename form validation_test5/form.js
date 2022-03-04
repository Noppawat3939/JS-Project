const form = document.querySelector('form');
const email = document.getElementById('email');
const password1 = document.getElementById('password-1');
const password2 = document.getElementById('password-2');
const Hide = document.getElementById('hide');
const toggle = document.getElementById('toggle');

form.addEventListener('submit', (element) => {
    element.preventDefault();
    validate();
})

// todo: validate form
function validate() {
    const emailValue = email.value.trim();
    const password1Value = password1.value.trim();
    const password2Value = password2.value.trim();

    let regUpper = /[A-Z]/;
    let regLowwer = /[a-z]/;
    let regNumber = /[0-9]/;

    //!  ---------- email validate -----------
    if(emailValue !== "" && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue)) {
        setSuccess(email);
    }
    else if (emailValue === "") {
        setError(email, "Email is required!");
    }
    else {
        setError(email ,'Email is not valid, Please check again');
    }

    //! ---------- password validaite ---------
    if(password1Value.match(regLowwer) && password1Value.match(regUpper) && password1Value.match(regNumber)) {
        setSuccess(password1);
    }
    else if(password1Value.length < 6) {
        setError(password1, "Password must be more than 6 characters");
    }
    else if(password1Value.length > 12) {
        setError(password1, "Password up to 12 characters");
    }
    else if (password1Value === "") {
        setError(password1, 'Password is required!');
    }
    else {
        setError(password1, "Password must be have lowwercase (a-z) , uppercase (A-Z) and number (0-9)");
    }   

    //! ------------- confirm password validate -----------
    if(password2Value !== "" && password2Value == password1Value && password2Value.match(regLowwer) && password2Value.match(regUpper) && password2Value.match(regNumber)) {
        setSuccess(password2);
    }
    else if (password2Value === "") {
        setError(password2, "Password is required!")
    }
    else if (password2Value !== password1Value) {
        setError(password2,"Password is not match!")
    }
    else {
        setError(password2, "Password must be have lowwercase (a-z) , uppercase (A-Z) and number (0-9)");
    }
};

// todo: function input success - error 
function setSuccess(input, message) {
    const inputParent = input.parentElement
    inputParent.classList.add("success");
    inputParent.classList.remove("error");
};

function setError(input, error) {
    const inputParent = input.parentElement
    inputParent.classList.add("error")
    inputParent.classList.remove("success");

    errorText = inputParent.querySelector('.message');
    errorText.innerText = error;
};

// todo: toggle password (show-hide) function
toggle.addEventListener('click', () => {
    showHide();
});

function showHide() {
    if(password1.type ==='password') {
        password1.setAttribute('type','text');
        toggle.classList.add('hide');
        Hide.className = 'fas fa-eye-slash';
    }
    else {
        password1.setAttribute('type', 'password');
        toggle.classList.remove('hide');
        Hide.className = 'fas fa-eye';
    }
};
