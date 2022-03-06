let selectedPokemon = {
    name: '',
    baseExperience: null,
    weight: null,
    height:  null,
    type: '',
    order: null,
    front_img: '',
    back_img: '',
}


const fetchPokemon = async (pokemon) => {
    fetch('https://pokeapi.co/api/v2/pokemon/'+ pokemon, {
        method: 'GET',
    }).then(res => {
        res.json().then(r =>{
                selectedPokemon.name  = r.name || '',
                selectedPokemon.baseExperience  = r.base_experience || null,
                selectedPokemon.weight = r.weight || null
                selectedPokemon.height = r.height || null
                selectedPokemon.type = r.types[0].type.name
                selectedPokemon.order = r.order || null
                selectedPokemon.front_img = r.sprites.front_default || ''
                selectedPokemon.back_img = r.sprites.back_default || ''
        })
    }).catch(e => {
        console.log(e)
    })
}

console.log('selectedPokemon ->',selectedPokemon)