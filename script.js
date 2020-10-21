function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    // swap elements array[i] and array[j]
    // we use "destructuring assignment" syntax to achieve that
    // you'll find more details about that syntax in later chapters
    // same can be written as:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const createArray = taille => Array.from(Array(taille), (x, index) => index + 1)
const arrayOfIds = createArray(492)

const getRandomNumber = (max) => Math.floor(Math.random() * max) + 1

// const revealCard = () => {}

let difficulte = 4
let essaie = []
let userFound = []

const isItOver = () => {
	if (userFound.length === 4) {
		console.log("Tu as terminé le jeu, félicitations!")
		if ($(".modal-container").css('visibility') === "hidden") {
			$(".modal-container").css('visibility', 'visible')
		} else {
			$(".modal-container").show()
		}
	}
}

// Cacher le modal lors du chargement de la page
// $(".modal-container").hide()
// $(".modal-container").css('visibility', 'visible');


// const createCard = id => `<aside class="card"><img src="assets/images/${id}.png" /></aside>`
const createCard = id => {
	// Création de notre card
	const card = document.createElement("aside")
	card.setAttribute("class", "card")
	card.setAttribute("data-id", id)

	// Création de la face cachée
	const divFaceCache = document.createElement("div")
	divFaceCache.setAttribute("class", "background")
	const imageBackground = document.createElement("img")
	imageBackground.setAttribute("src", "assets/images/pattern.jpg")
	imageBackground.setAttribute("data-id", id)
	divFaceCache.appendChild(imageBackground)
	card.appendChild(divFaceCache)

	// Création de la face découverte
	const imgPokemon = document.createElement("img")
	imgPokemon.setAttribute("src", `assets/images/${id}.png`)
	imgPokemon.setAttribute("class", "pokemon")
	imgPokemon.setAttribute("data-id", id)
	card.appendChild(imgPokemon)

	// Création de notre méthode qui s'éxécutera lors du click
	divFaceCache.addEventListener("click", (event) => {
		const selectedId = $(event.target).data("id")
		if (essaie.length < 2) {
			essaie.push(selectedId)
			card.setAttribute("class", "card reveal")
		}
		if (essaie.length === 2) {
			if (essaie[0] === essaie[1]) {
				console.log("Bravo!")
				userFound.push(essaie[0])
				essaie = []
				isItOver()
			} else {
				setTimeout(() => {
					$(`.card[data-id="${essaie[0]}"]`).removeClass("reveal")
					$(`.card[data-id="${essaie[1]}"]`).removeClass("reveal")
					essaie = []
				}, 1500)
				console.log("Dommage, essaie encore!")
			}
		}
	})
	return card
}

// for (const index of arrayOfIds) {
// 	$("section").append(createCard(index))
// }

const reset = () => {
	$("section").empty()
	essaie = []
	userFound = []
}

const startGame = () => {
	$("#play").text("Recommencer")
	reset()
	const selectedPokemons = []
	// const fullPokemonArray = [...arrayOfIds]
	while (selectedPokemons.length < difficulte) {
		const randomId = getRandomNumber(492)
		if (!selectedPokemons.includes(randomId)) {
			selectedPokemons.push(randomId)
		}
	}
	const doubleSelectedPokemons = [...selectedPokemons, ...selectedPokemons]
	shuffle(doubleSelectedPokemons)
	for (const index of doubleSelectedPokemons) {
		$("section").append(createCard(index))
	}
	console.log(selectedPokemons)
}

$("#play").on("click", startGame)
$("#restart-modal").on("click", () => {
	$(".modal-container").hide()
	startGame()
})
$("#close-modal").on("click", () => {
	$(".modal-container").hide()
})

