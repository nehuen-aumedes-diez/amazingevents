const tab1 = document.getElementById('tab1')
const tab2 = document.getElementById('tab2')
const tab3 = document.getElementById('tab3')

async function apiEvents(){

  await fetch("https://mh-amazing.herokuapp.com/amazing")
  .then((response) => response.json())
  .then((data) => (dataEvents = data));
  console.log(dataEvents);

    let events = dataEvents.events
    console.log (events)
    let past = dataEvents.events.filter(event => event.assistance)
    let upcoming = dataEvents.events.filter(event => event.estimate)

    console.log(upcoming);

    events.map(event => {
        event.percentageAssistance = 100 * event.assistance / event.capacity
        event.revenue = event.price * event.assistance
    })
    past.map(event => {
        event.percentageAssistance = 100 * event.assistance / event.capacity
        event.revenue = parseInt(event.price) * parseInt (event.assistance)
    })

    upcoming.map(event => {
        event.percentageAssistance = 100 * event.estimate / event.capacity
        event.revenue = parseInt(event.price) * parseInt (event.estimate)
    })


    let capacityEvents = [...events].sort((a,b) => a.capacity - b.capacity)
    let maxcapacityEvents = capacityEvents[capacityEvents.length-1]


    let percentageOfasistance = [...past].sort((a,b) => a.percentageAssistance - b.percentageAssistance)
    let minpercentageOfasistance = percentageOfasistance[0]
    let maxpercentageOfasistance = percentageOfasistance[percentageOfasistance.length-1]


    let eventCategoryPast = new Set(past.map(event => event.category))
    eventCategoryPast = [...eventCategoryPast]
    console.log(eventCategoryPast);

    
    let newArrayCategories = [...new Set (events.map(event => event.category))]
    let eventCategoryUpcoming = [...new Set (upcoming.map(event => event.category))]

    newArrayCategories.forEach(element => {
        let capacity = 0
        let assistance = 0
        let revenues = 0
        past.forEach(event => {
            if(event.category === element){
                capacity += event.capacity
                assistance += event.assistance
                revenues += event.revenue
            }
        })
        tab3.innerHTML += `<tr>
                                <td class="data_table fst-italic ps-1">${element}</td>
                                <td class="data_table fst-italic ps-1">${revenues.toLocaleString('de-DE')}</td>
                                <td class="data_table fst-italic ps-1">${Math.round(assistance * 100 / capacity)}%</td>
                            </tr>`
    });

    eventCategoryUpcoming.forEach(element => {
        let capacity = 0
        let estimate = 0
        let revenues = 0
        upcoming.forEach(event => {
            if(event.category === element){
                capacity += event.capacity
                estimate += event.estimate
                revenues += event.revenue
            }
        })
        tab2.innerHTML += `<tr>
                                <td class="data_table fst-italic ps-1">${element}</td>
                                <td class="data_table fst-italic ps-1">${revenues.toLocaleString('de-DE')}</td>
                                <td class="data_table fst-italic ps-1">${Math.round(estimate * 100 / capacity)}%</td>
                            </tr>`
                        });
                        
        tab1.innerHTML += `<tr>
                                <td class="data_table fst-italic ps-1">${maxpercentageOfasistance.name}: ${Math.round(maxpercentageOfasistance.percentageAssistance)}%</td>
                                <td class="data_table fst-italic ps-1">${minpercentageOfasistance.name}: ${minpercentageOfasistance.percentageAssistance}%</td>
                                <td class="data_table fst-italic ps-1">${maxcapacityEvents.name}: ${parseInt(maxcapacityEvents.capacity).toLocaleString('de-DE')}</td>
                            </tr>`
}
apiEvents()