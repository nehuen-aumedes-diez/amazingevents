let cardContainer = document.getElementById('cardContainer')
let currentDateData = parseInt(data.currentDate)

/* let numerofecha = "2021-10-15"
let eventdatedos =  parseInt(numerofecha)
console.log = eventdatedos
console.log = currentDateData */

for(let i = 0; i < data.events.length;i++){

    /* let eventDateData = parseInt(data.events[i].date) */
    if( data.events[i].date < data.currentDate){
      

      let card = document.createElement('div')
      card.className = 'card m-3'
      card.style.width = '18rem'
      card.style.height = '22rem'
      card.innerHTML += `<img src="${data.events[i].image}" class="card-img-top h-25" alt="...">
      <div class="card-body h-75 shadow ">
          <div class="card-body h-75">
          <h5 class="card-title">${data.events[i].name}</h5>
          <ul class="">
              <li>
              ${data.events[i].description}
              </li>
          </ul>
          </div>
          <div class="d-flex p-2 justify-content-between h-10 ">
              <p class="card-text">Price$${data.events[i].price}</p>
              <a href="../Pages/details.html" class="btn btn-primary ms-4">See more</a>
          </div>
      </div>`
  cardContainer.appendChild(card)
}
}