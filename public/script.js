const loginform = document.getElementById("loginForm");
const regform = document.getElementById("registrationForm");

const registerUser = async (e) => {
  e.preventDefault();
  console.log(e);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const fname = document.getElementById("firstname").value;
  const lname = document.getElementById("lastname").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  const raw = JSON.stringify({
    first_name: fname,
    last_name: lname,
    email: email,
    password: password,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch("/auth/register", requestOptions);
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      alert(result.message);
      window.location.reload();
      // Handle success (e.g., show success message, redirect)
    } else {
      const errorResult = await response.json();
      alert(errorResult.message);
      console.error(errorResult);

      // Handle validation errors or other errors
    }
  } catch (error) {
    console.error(error);
  }
};

// Placeholder for loginUser function
const loginUser = async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    email: username,
    password: password,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch("/auth/login", requestOptions);
    const result = await response.json();

    if (result.status == "success") {
      alert(result.message);

      window.location.href = "/user";
    }
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};
regform.onsubmit = registerUser;
loginform.onsubmit = loginUser;

// Function to toggle between registration and login forms
function toggleForms() {
  const registrationContainer = document.querySelector(
    ".registration-container"
  );
  const loginContainer = document.querySelector(".login-container");

  if (registrationContainer) {
    registrationContainer.style.display =
      registrationContainer.style.display === "none" ? "block" : "none";
  }

  if (loginContainer) {
    loginContainer.style.display =
      loginContainer.style.display === "none" ? "block" : "none";
  }
}
