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
            document.getElementById("card-id").innerHTML =
                "<div class=\"card-face front-card\">" +
                "<img class= poke-img-class id=poke-img src=" + selectedPokemon.front_img + " alt=pokemon onload="+ divOnLoad()+ ">" +
                "<h3>" + selectedPokemon.name.toUpperCase() + "</h3>" +
                "<p> Type: " + selectedPokemon.type + "</p>" +
                "<p> Weight: " + selectedPokemon.weight + "</p>" +
                "<p> Height: " + selectedPokemon.height + "</p>" +
                "</div>" +
                "<div class=\"card-face back-card\">" +
                "<img class=poke-img-class id=poke-img src=" + selectedPokemon.back_img + " alt=pokemon/>" +
                "<h3>" + selectedPokemon.name.toUpperCase() + "</h3>" +
                "<p> Order: " + selectedPokemon.order + "</p>" +
                "<p> Base Experience: " + selectedPokemon.baseExperience + "</p>" +
                "</div>"

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
            const divNode = document.createElement("div")
            divNode.onclick = setPokemon(savedPokemonList.length-1)
            divNode.className = "item flex-item"
            const imgNode = document.createElement("img")
            imgNode.src = getPokeObject().front_img
            const pNode = document.createElement("p")
            const pTextNode = document.createTextNode(getPokeObject().name.toUpperCase())
            pNode.appendChild(pTextNode)
            divNode.appendChild(imgNode)
            divNode.appendChild(pNode)
            document.getElementById("list-id").appendChild(divNode)
        }
    }
}
