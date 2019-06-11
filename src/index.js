const URL = "http://localhost:3000/pups"
var pupArr = []

window.addEventListener("DOMContentLoaded", (e)=>{
    //elements
    const pupContainer = document.querySelector("#dog-bar")
    const pupInfoDiv = document.querySelector("#dog-info")
    const filterBtn = document.querySelector("#good-dog-filter")
 
    //event listeners

    pupContainer.addEventListener('click', (e)=>{
        if(e.target.tagName === "SPAN"){
          
            displayPupInfo(e.target.dataset.id)
        }
    })

    pupInfoDiv.addEventListener('click', (e)=>{
        
        if(e.target.dataset.type == "good-boy-btn"){
            
            if(e.target.innerText === "Bad Dog!"){
                newStatus = true
                console.log("new", newStatus)
            }else {
                newStatus = false
            }
            updateGoodStatus(e.target.dataset.id, newStatus)
        }
    })
    filterBtn.addEventListener('click', (e)=>{
        if(e.target.innerText == "Filter good dogs: OFF"){
            filterPups()
        } else{
            displayPupBar(pupArr)
        }
    })
    //fetches
    const pupFetch = fetch(URL)
    .then(r => r.json())
    .then(data => {
        pupArr = data
        displayPupBar(pupArr)
    })

    //functions
    function displayPupBar(pups){
        pupContainer.innerHTML = pups.map(pup => {
            return `<span data-id="${pup.id}">${pup.name}</span>`
        })
    }

    function displayPupInfo(id){
        pup = pupArr.find(pup => pup.id == id)
        pupInfoDiv.innerHTML = `
        <img src=${pup.image}> 
        <h2>${pup.name}</h2> 
        <button data-id=${pup.id} data-type="good-boy-btn" >${pup.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>
        `
    }
    function updateGoodStatus(id, newStatus){
        fetch(`${URL}/${id}`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "PATCH",
            body: JSON.stringify({isGoodDog: newStatus})
        })

        updatePupIndex = pupArr.findIndex(pup => pup.id == id)
        pupArr[updatePupIndex].isGoodDog = newStatus
        displayPupInfo(id)
    }
    function filterPups(){
       filteredPups =  pupArr.filter(pup => pup.isGoodDog === true)
       filterBtn.innerText = "Filter good dogs: ON"
       displayPupBar(filteredPups)
    }


})