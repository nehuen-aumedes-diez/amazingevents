//Index Imp Card 

const cardContainer = document.getElementById('cardContainer')

for (let i = 0; i<data.events.length; i++){

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
            <a href="./Assets/Pages/details.html" class="btn btn-primary ms-4">See more</a>
        </div>
    </div>`
cardContainer.appendChild(card)
}
