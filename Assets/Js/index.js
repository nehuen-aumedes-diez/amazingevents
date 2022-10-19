let dataEventosOriginal = data.events;
let cardContainer = document.getElementById ("cardContainer")
let checkContainer = document.getElementById ("checkContainer")

  //Impresion De cards
  function impCard(array) {
    let locationforCards = "";
    if (array.length !== 0) {
      array.forEach((data) => {
        locationforCards +=`
        <div class="card col-10 col-md-4 col-lg-3 col-xl-2 m-2" style="">
              <img src="${data.image}" class="card-img-top" style="height: 10rem;" alt="...">
                <div class="card-body h-100 shadow ">
                  <h5 class="card-title">${data.name}</h5>
                  <ul class="">
                    <li class="badge text-bg-primary mb-3 p-2">
                    ${data.category}
                    </li>
                    <li>
                     ${data.description}
                    </li>
                  </ul>
                </div>
                <div class="d-flex p-2 justify-content-between h- ">
                  <p class="card-text">Price$ ${data.price}</p>
                  <a href="./Assets/Pages/details.html?id=${data._id} " class="btn btn-primary ms-4">See more</a>
                </div>
        </div>`
           cardContainer.innerHTML = locationforCards;
      });
    } else {
        cardContainer.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png" class="card-img-top" alt="...">
          <div class="card-body">
            <p class="card-text">Not result to be shown. Try again.</p>
          </div>
        </div>  
        `;
    }
  }
  impCard(dataEventosOriginal);

  //Creacion de Checks
  let checkboxsOrigin = dataEventosOriginal.map((evento) => evento.category);
  let filterrepeat = new Set(checkboxsOrigin); 
  let categoriesCheck = [...filterrepeat];

  //Impresion Checks
  function impCheck() {
    let impCheckboxslocation = "";
    categoriesCheck.forEach((categoria) => {
      impCheckboxslocation += `<label class="checks me-3">            
      <input class="form-check-input text-start" type="checkbox" 
      value=${categoria} id="flexCheckChecked">
      ${categoria}
      </label>`;
    });
    checkContainer.innerHTML = impCheckboxslocation;
  }
  impCheck();

  //Listening de eventos y captura
  let checkboxSelected = [];
  let textSearch = "";
  let checkbox = document.querySelectorAll("input[type=checkbox]");
    checkbox.forEach((check) =>
      check.addEventListener("click", (event) => {
        let checked = event.target.checked;

        if (checked) {

          checkboxSelected.push(event.target.value);
          crossfilterDoble();

        } else {
          checkboxSelected = checkboxSelected.filter(
            (uncheck) => uncheck !== event.target.value
          );
          crossfilterDoble();
        }
      })
    );

//Search, captura y evento
  let search = document.getElementById("searchLocation");
  search.addEventListener("keyup", (event) => {
    textSearch = event.target.value;
    crossfilterDoble();
  });

  //Filtro cruzado
  function crossfilterDoble() {
    let datos = [];
    if (checkboxSelected.length > 0 && textSearch !== "") {
      checkboxSelected.map((selected) => {
        datos.push(...dataEventosOriginal.filter((evento) =>
              evento.name.toLocaleLowerCase().includes(
                textSearch.trim().toLocaleLowerCase()
              ) && evento.category.includes(selected)
          )
        );

      });
    } else if (checkboxSelected.length > 0 && textSearch === "") {
      checkboxSelected.map((selected) => {
        datos.push(
          ...dataEventosOriginal.filter((evento) => evento.category.includes(selected))
        );
      });
    } else if (checkboxSelected.length == 0 && textSearch !== "") {
      datos.push(
        ...dataEventosOriginal.filter((evento) =>
          evento.name
            .toLocaleLowerCase()
            .includes(textSearch.trim().toLocaleLowerCase())
        )
      );
    } else {
      datos.push(...dataEventosOriginal);
    }
    impCard(datos);
  }
  crossfilterDoble();