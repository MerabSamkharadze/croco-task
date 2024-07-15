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
          <a class='button'  href='/posts.html?userId=${element.id}'>პოსტები</a>
        </li>
    `;
      users_ul.innerHTML += root;
    });
  });
}

//posts

const url = window.location.href;
const urlObject = new URL(url);
const userId = urlObject.searchParams.get("userId");

const posts_ul = document.querySelector(".posts_ul");
if (posts_ul) {
  const getUsersPost = async () => {
    const users = await getData("/users");
    console.log(users);
    const posts = await getData(userId ? `/posts?userId=${userId}` : "/posts");
    posts.forEach((element) => {
      const userIdEli = document.createElement("li");
      const button = document.createElement("button");
      button.innerText = "დეტალურად";
      button.classList.add("button");
      const post = `
             
                          <div class="name">${
                            users.find((ell) => ell.id === element.userId).name
                          }</div>
      
                          <div ><span>Post Title: </span>${element.title}</div>
                          
                        
               
             `;

      const postWithUserId = `
            
                       <div class="title">${element.title}</div>
   
                       <div class="body">${element.body}</div>
                     
           
          `;
      userIdEli.innerHTML = userId ? postWithUserId : post;
      userIdEli.appendChild(button);
      button.addEventListener("click", () => {
        console.log(element);
        const container = document.querySelector(".container");
        container.classList.add("active");
        container.innerHTML = "";
        const x = document.createElement("div");
        x.classList.add("x");
        x.innerText = "X";
        x.addEventListener("click", () => {
          container.classList.remove("active");
        });
        const modal = `
  
      <h1>${element.title}</h1>
          <p>
                 ${element.body}
         </p>
 
        `;

        container.innerHTML = modal;
        container.prepend(x);
      });

      posts_ul.appendChild(userIdEli);
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
