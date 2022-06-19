// let addToy = false;

// document.addEventListener("DOMContentLoaded", () => {
//   const addBtn = document.querySelector("#new-toy-btn");
//   const toyFormContainer = document.querySelector(".container");
//   addBtn.addEventListener("click", () => {
//     // hide & seek with the form
//     addToy = !addToy;
//     if (addToy) {
//       toyFormContainer.style.display = "block";
//     } else {
//       toyFormContainer.style.display = "none";
//     }
//   });
// });

let addToy = false
const url = "http://localhost:3000/toys"
const toyContainer = document.getElementById("toy-collection")
let formAddToy = document.getElementsByClassName("add-toy-form")
formAddToy = formAddToy[0]
const toyFormContainer = document.querySelector(".container")
const addBtn = document.querySelector("#new-toy-btn")

//fetches
const fetchToys = async () => {
  let res = await fetch(url)
  let toys = await res.json()
  return toys
}

const postNewToy = async (newToy) => {
  let res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(newToy),
  })
  let json = await res.json()
  console.log(json)

  renderToy(newToy)
}

const patchToyLike = async (id, updatedLike) => {
  let res = await fetch(`${url}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(updatedLike),
  })

  let json = await res.json()
  console.log(json)
}

//init
fetchToys().then((toys) => {
  renderToys(toys)
})

//renderers
const renderToys = (toys) => {
  toys.forEach((toy) => renderToy(toy))
}

const renderToy = (toy) => {
  let div = document.createElement("div")
  div.className = "card"
  div.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p><span>${toy.likes}</span> likes</p>
    <button class="like-btn" id="${toy.id}">Like ❤️</button>
  `
  const likesP = div.querySelector("p span")
  const likeBtn = div.querySelector(".like-btn")
  likeBtn.addEventListener("click", (e) => handleLike(e, likesP))

  toyContainer.appendChild(div)
}

//event listeners
formAddToy.addEventListener("submit", (e) => {
  e.preventDefault()

  let name = e.target.name.value
  let image = e.target.image.value

  console.log(name, image)

  let newToy = { name, image, likes: 0 }

  postNewToy(newToy)
})

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyFormContainer.style.display = "block"
  } else {
    toyFormContainer.style.display = "none"
  }
})

//event handlers
const handleLike = (e, likesP) => {
  let id = e.target.id
  ++likesP.textContent

  let updatedLike = { likes: likesP.textContent }

  patchToyLike(id, updatedLike)
}


