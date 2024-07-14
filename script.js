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
const usersBtn = document.querySelector(".users");
const postsBtn = document.querySelector(".posts");
const users_ul = document.querySelector(".users_ul");
const users_table = document.querySelector(".users_table");
const posts_table = document.querySelector(".posts_table");

if (users_ul) {
  const users = getData("/users");
  users.then((response) => {
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
}

//posts
const posts_ul = document.querySelector(".posts_ul");
if (posts_ul) {
  const getUsersPost = async () => {
    const users = await getData("/users");
    console.log(users);
    const posts = await getData("/posts");
    posts.forEach((element) => {
      const post = `
                <li>
                          <div class="name">${
                            users.find((ell) => ell.id === element.userId).name
                          }</div>
      
                          <div class="title"><span>Post Title: </span>${
                            element.title
                          }</div>
                 </li>
             `;
      posts_ul.innerHTML += post;
    });
  };
  getUsersPost();
}

//date

const dateDiv = document.querySelector(".date");

const date = new Date();

const formattedDate = date.toLocaleString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

dateDiv.innerText = formattedDate;
