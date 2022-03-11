let divFront = document.createElement("div")
let divBack = document.createElement("div") 
let imgFront = document.createElement("img")
let imgBack =  document.createElement("img")
let titleHeader =  document.createElement("h3")
let titleHeader1 = document.createElement("h3")
let pType = document.createElement("p")
let pWeight = document.createElement("p")
let pHeight = document.createElement("p")
let pOrder = document.createElement("p")
let pBaseE = document.createElement("p")

let selectedPokemon = {
    name: "",
    baseExperience: null,
    weight: null,
    height:  null,
    type: "",
    order: null,
    front_img: "",
    back_img: "",
}

let savedPokemonList = []

const renderSavedList = (pokeObj) => {
    const divNode = document.createElement("div")
    divNode.onclick = setPokemon(savedPokemonList.length-1)
    divNode.className = "item flex-item"
    const imgNode = document.createElement("img")
    imgNode.src = pokeObj.front_img
    const pNode = document.createElement("p")
    const pTextNode = document.createTextNode(pokeObj.name.toUpperCase())
    pNode.appendChild(pTextNode)
    divNode.appendChild(imgNode)
    divNode.appendChild(pNode)
    document.getElementById("list-id").appendChild(divNode)
}

const onDexLoad = () => {
    const length = window.localStorage.getItem("items")
    if(length > 0)
    {
        for(let i = 0; i < length; i++)
        {
            savedPokemonList.push(JSON.parse(window.localStorage.getItem(i)))
            renderSavedList(JSON.parse(window.localStorage.getItem(i)))
        }
    }
}

const divOnLoad = () => {
    let card = document.querySelector(".card");
    let cardE = document.getElementById("card-id")
    if(cardE) {
        cardE.onclick = function () {
            card.classList.toggle("is-flipped");
        }
    }
}

const fetchPokemon = async (pokemon) => {
    document.getElementById("search-bar").value = ""
    fetch("https://pokeapi.co/api/v2/pokemon/"+ pokemon, {
        method: "GET",
    }).then(res => {
        if(res.status===200) {
            res.json().then(data => {
                    selectedPokemon.name = data.name || "",
                        selectedPokemon.baseExperience = data.base_experience || null,
                        selectedPokemon.weight = data.weight || null
                    selectedPokemon.height = data.height || null
                    selectedPokemon.type = data.types[0].type.name
                    selectedPokemon.order = data.order || null
                    selectedPokemon.front_img = data.sprites.front_default || ""
                    selectedPokemon.back_img = data.sprites.back_default || ""
                renderCard()
            })
        } else {
            throw "error: "+ res.status
        }
    }).catch((e) => {
        document.getElementById("poke-div-id").innerHTML = "<p class=error-text-class>Something went wrong "+e+"</p>"
    })
}

const renderCard = () => {
        if (selectedPokemon.name) {
            divFront.className = "card-face front-card"
            divBack.className = "card-face back-card"
    
            imgFront.className = "poke-img-class"
            imgFront.id = "poke-img"
            imgFront.src = selectedPokemon.front_img
            imgFront.alt = "pokemon"
            imgFront.onload = divOnLoad

            imgBack.className = "poke-img-class"
            imgBack.id = "poke-img"
            imgBack.src = selectedPokemon.back_img
            imgBack.alt = "pokemon"

            titleHeader.innerHTML = selectedPokemon.name.toUpperCase()
            titleHeader1.innerHTML = selectedPokemon.name.toUpperCase()

            pType.innerHTML = "Type: " + selectedPokemon.type
            pWeight.innerHTML = "Weight: " + selectedPokemon.weight
            pHeight.innerHTML = "Height: " + selectedPokemon.height
            pOrder.innerHTML = "Order: " + selectedPokemon.order
            pBaseE.innerHTML = "Base Experience: " + selectedPokemon.baseExperience

            divFront.appendChild(imgFront)
            divFront.appendChild(titleHeader1)
            divFront.appendChild(pType)
            divFront.appendChild(pWeight)
            divFront.appendChild(pHeight)
            
            divBack.appendChild(imgBack)
            divBack.appendChild(titleHeader)
            divBack.appendChild(pOrder)
            divBack.appendChild(pBaseE)
    
            document.getElementById("card-id").append(divFront)
            document.getElementById("card-id").append(divBack)

            document.getElementById("save-button-div-id").innerHTML = "<button onclick=\"savePokemon()\">Save</button>"
        } else {
            console.log("Absent ->")
        }
}

const getPokeObject = () => {
    let selPokeRef = {}
    selPokeRef.name = selectedPokemon.name
    selPokeRef.baseExperience = selectedPokemon.baseExperience
    selPokeRef.weight = selectedPokemon.weight
    selPokeRef.height = selectedPokemon.height
    selPokeRef.order = selectedPokemon.order
    selPokeRef.type = selectedPokemon.type
    selPokeRef.front_img = selectedPokemon.front_img
    selPokeRef.back_img = selectedPokemon.back_img
    return selPokeRef
}

const setPokemon = (idx) => {
    return function () {
        selectedPokemon.name = savedPokemonList[idx].name
        selectedPokemon.baseExperience = savedPokemonList[idx].baseExperience
        selectedPokemon.weight = savedPokemonList[idx].weight
        selectedPokemon.height = savedPokemonList[idx].height
        selectedPokemon.order = savedPokemonList[idx].order
        selectedPokemon.type = savedPokemonList[idx].type
        selectedPokemon.front_img = savedPokemonList[idx].front_img
        selectedPokemon.back_img = savedPokemonList[idx].back_img
        renderCard()
    }
}

const savePokemon = () => {
    if (getPokeObject()) {
        if (savedPokemonList.filter(x => x.name === getPokeObject().name).length === 0) {
            savedPokemonList.push(getPokeObject())
            window.localStorage.setItem("items", savedPokemonList.length)
            window.localStorage.setItem(savedPokemonList.length-1, JSON.stringify(getPokeObject()))
            renderSavedList(getPokeObject())
        }
    }
}
