// 1
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password1");
const password2 = document.getElementById("password2");
const univ = document.getElementById("univ");

const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
};

const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = "form-control error";

  const small = formControl.querySelector("small");
  small.innerHTML = message;
};

const checkUniv = (input) => {
  const substring = /대학교/;
  if (substring.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, `${getFieldName(input)} should contains 대학교`);
  }
};

const checkEmail = (input) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
};

const checkPasswordMatch = (input, input2) => {
  // ternary
  if (input.value) {
    if (input.value !== input2.value) {
      showError(input2, "Password is not match");
    } else {
      showSuccess(input);
    }
  }
};

const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
};

const getFieldName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

// 3
const checkRequired = (inputArr) => {
  inputArr.forEach((input) => {
    if (input.value === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
};

// 2
form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkRequired([username, email, password2, univ]);

  checkLength(username, 3, 15);
  checkLength(password, 6, 20);
  checkEmail(email);
  checkPasswordMatch(password, password2);
  checkUniv(univ);
});

