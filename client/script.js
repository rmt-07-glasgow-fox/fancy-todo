$(document).ready(() => {
  loginPage();
});

const loginPage = () => {
  $('#navbar').hide();
  $('#register').hide();
  $('#login').show();
  $('#dashboard').hide();
};

const registerPage = () => {
  $('#navbar').hide();
  $('#register').show();
  $('#login').hide();
  $('#dashboard').hide();
};

const dahsboardPage = () => {
  $('#navbar').show();
  $('#register').hide();
  $('#login').hide();
  $('#dashboard').show();
};

const login = () => {
  dahsboardPage();
};

const logout = () => {};
