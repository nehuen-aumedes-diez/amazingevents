getData();
async function getData() {
  await fetch("https://mh-amazing.herokuapp.com/amazing")
  .then((response) => response.json())
  .then((data) => (dataEvents = data));
  console.log(dataEvents);
  
  let dataFromServer = dataEvents.events;
  console.log(dataFromServer); 
  
  const id = location.search
  console.log (id)
  const parameter = new URLSearchParams(id)
  console.log (parameter)
  const idNumber = parameter.get("id")
  console.log (idNumber)
  
  const evento = dataFromServer.find(spot => spot.id === idNumber)
  console.log(evento)
  
let eventContainer = document.getElementById("eventContainer")
eventContainer.innerHTML = `
        <div class="row g-0">
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
                                          ${evento.assistance || evento.estimate}
                                          </li>
                                        </ul>
                          </div>
                  </div>
        </div>
  `
}


