getData();
async function getData() {
  await fetch("https://mh-amazing.herokuapp.com/amazing")
    .then((response) => response.json())
    .then((data) => (dataFromApi = data));

  console.log(dataFromApi);

  let dataEvents = dataFromApi.events;
  let curDate = dataFromApi.date;
  
  function impCardUp(array) {
    let arrayCards = "";
    if (array.length !== 0) {
      array.forEach((data) => {
        if (data.date < curDate) {
          arrayCards += 
          `
          <div class="card col-10 col-md-4 col-lg-3 col-xl-2 m-2" style="">
                <img src="${data.image}" class="card-img-top" style="height: 10rem;" alt="...">
                  <div class="card-body h-100 shadow ">
                    <h5 class="card-title">${data.name}</h5>
                    <ul class="">
                      <li class="badge text-bg-primary mb-3 p-2">
                      ${data.category}
                      </li>
                      <li>
                      ${(data.date).slice(0,10)}
                     </li>
                      <li>
                       ${data.description}
                      </li>
                    </ul>
                  </div>
                  <div class="d-flex p-2 justify-content-between h- ">
                    <p class="card-text">Price$ ${data.price}</p>
                    <a href="./details.html?id=${data.id} " class="btn btn-primary ms-4">See more</a>
                  </div>
          </div>`
          
        }
        document.querySelector("#cardContainer").innerHTML= arrayCards;
      });
    } else {
      document.querySelector("#cardContainer").innerHTML= `
      <div class="card" style="width: 18rem;">
          <img src="https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png" class="card-img-top" alt="...">
        <div class="card-body">
          <p class="card-text">Not result to be shown. Try again.</p>
        </div>
      </div>  
      `;
    }
  }
  impCardUp(dataEvents);

  var checkboxCat = dataEvents.map((evento) => evento.category);

  var setCheckRepeat = new Set(checkboxCat); 

  var categories = [...setCheckRepeat]

  function impCheck() {
    let impCheckboxslocation = "";
    categories.forEach((category) => {
      impCheckboxslocation += `<label class="checks me-3">            
      <input class="form-check-input text-start" type="checkbox" 
      value=${category} id="flexCheckChecked">
      ${category}
      </label>`;
    });
    document.getElementById("checkContainer").innerHTML = impCheckboxslocation
  }
  impCheck();
   
  let checkboxSelected = [];
  var textSearch = "";
 
  var checkboxImput = document.querySelectorAll("input[type=checkbox]");

  checkboxImput.forEach((check) =>
    check.addEventListener("click", (event) => {
      var checked = event.target.checked;
      if (checked) {
        checkboxSelected.push(event.target.value);
        doubleCrossFilter();
      } else {
        checkboxSelected = checkboxSelected.filter(
          (uncheck) => uncheck !== event.target.value
        );
        doubleCrossFilter();
      }
    })
  );
  var search = document.getElementById("searchLocation");
  search.addEventListener("keyup", (event) => {
    textSearch = event.target.value;

    doubleCrossFilter();
  });
  function doubleCrossFilter() {
    let arrayFilterer = [];
    if (checkboxSelected.length > 0 && textSearch !== "") {
      checkboxSelected.map((selected) => {
        arrayFilterer.push(
          ...dataEvents.filter(
            (event) =>
              event.name
                .toLocaleLowerCase()
                .includes(textSearch.trim().toLocaleLowerCase()) &&
              event.category.includes(selected)
          )
        );
      });
    } else if (checkboxSelected.length > 0 && textSearch === "") {
      checkboxSelected.map((selected) => {
        arrayFilterer.push(
          ...dataEvents.filter((event) => event.category.includes(selected))
        );
      });
    } else if (checkboxSelected.length == 0 && textSearch !== "") {
      arrayFilterer.push(
        ...dataEvents.filter((event) =>
          event.name
            .toLocaleLowerCase()
            .includes(textSearch.trim().toLocaleLowerCase())
        )
      );
    } else {
      arrayFilterer.push(...dataEvents);
    }
    impCardUp(arrayFilterer);
  }
  doubleCrossFilter();
}