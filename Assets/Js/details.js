let eventContainer = document.getElementById ("eventContainer")
let dataEvents = data.events

const id = location.search
const parametro = new URLSearchParams(id)
const idNumber = parseInt(parametro.get("id"))

const evento = dataEvents.find(spot => spot._id === idNumber)

eventContainer.innerHTML = `<div class="row g-0">
<div class="col-md-6 p-4">
  <img src="${evento.image}" class="img-fluid rounded-end mt-sm-4 mt-md-0 w-100 h-50" alt="">
</div>
<div class="col-md-6">
  <div class="card-body">
    <h5 class="card-title text-center">${evento.name}</h5>     
      <ul class="card-text mb-5">
          <li>
          ${evento.date}
          </li>
          <li>
          ${evento.description}
          </li>
          <li>
          ${evento.category}
          </li>
          <li>
          ${evento.place}
          </li>
          <li>
          ${evento.capacity}
          </li>
          <li>
          ${evento.assistance}
          </li>
      </ul>
  </div>
</div>
</div>
`
