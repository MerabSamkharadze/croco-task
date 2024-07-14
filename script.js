"use strict";

const getData = async (resource) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com${resource}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

//users

const users_ul = document.querySelector(".users_ul");
const users = getData("/users");
users.then((response) => {
  console.log(response);
  response.forEach((element) => {
    const root = `
            <li>
          <div class="name">${element.name} ${element.username}</div>
          <div class="mobile_number"><span>Tel: </span>${element.phone}</div>
          <div class="email">
            <span>Email: </span>${element.email}
          </div>
          <div class="company"><span>Company: </span>${element.company.name}</div>
          <button>პოსტები</button>
        </li>
    `;
    users_ul.innerHTML += root;
  });
});
