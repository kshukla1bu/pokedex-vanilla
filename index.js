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

let savedPokemon = []

const divOnLoad = () => {
    let card = document.querySelector(".card");
    let cardE = document.getElementById('card-id')
    cardE.onclick = function() {
        card.classList.toggle("is-flipped");
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
                "<div class='card-face front-card'>" +
                "<img class= poke-img-class id=poke-img src=" + selectedPokemon.front_img + " alt=pokemon onload="+ divOnLoad()+ ">" +
                "<p>DESCRIPTION</p>" +
                "<h3>" + selectedPokemon.name.toUpperCase() + "</h3>" +
                "<p> Type: " + selectedPokemon.type + "</p>" +
                "<p> Weight: " + selectedPokemon.weight + "</p>" +
                "<p> Height: " + selectedPokemon.height + "</p>" +
                "</div>" +
                "<div class='card-face back-card'>" +
                "<img class=poke-img-class id=poke-img src=" + selectedPokemon.back_img + " alt=pokemon/>" +
                "<p>DESCRIPTION</p>" +
                "<h3>" + selectedPokemon.name.toUpperCase() + "</h3>" +
                "<p> Order: " + selectedPokemon.order + "</p>" +
                "<p> Base Experience: " + selectedPokemon.baseExperience + "</p>" +
                "</div>"

            document.getElementById("save-button-div-id").innerHTML = "<button onclick='savePokemon()'>Save</button>"
        } else {
            console.log("Absent ->")
        }
}

function savePokemon() {
    console.log("Saved")
}
console.log("selectedPokemon ->",selectedPokemon)