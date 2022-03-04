const fetchPokemon = async (pokemon) => {
    fetch('https://pokeapi.co/api/v2/pokemon/'+ pokemon, {
        method: 'GET',
    }).then(res => {
        res.json().then(r =>{
            document.getElementById('poke-div-id').innerHTML =
                "<img class='poke-img-class' id='poke-img' src="+r.sprites.front_default+ " alt='pokemon'/>" +
                "<p>DESCRIPTION</p>" +
                "<h3>" + r.forms[0].name.toUpperCase() + "</h3>" +
                "<p> Base Experience: " + r.base_experience + "</p>" +
                "<p> Weight: " + r.weight + "</p>" +
                "<p> Height: "+ r.height +"</p>"
        })
    }).catch(e => {
        console.log(e)
    })
}