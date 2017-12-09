$(".leftside").hide();
$(".divider").hide();
$(".bio").hide();
$(".starships").hide();
$(".movies").hide();
$(".placeholder").show();

function getPeople(input) {
	$.getJSON('https://swapi.co/api/people/?search=' + input).then(function(data) {
		$(".placeholder").hide();
		$(".leftside").show();
		$(".divider").show();
		$(".bio").show();
		$(".starships").show();
		$(".movies").show();
		document.getElementById("movie1").innerHTML = "";
		document.getElementById("movie2").innerHTML = "";
		document.getElementById("movie3").innerHTML = "";
		document.getElementById("movie4").innerHTML = "";
		document.getElementById("movie5").innerHTML = "";
		document.getElementById("movie6").innerHTML = "";
		document.getElementById("movie7").innerHTML = "";
		if (data.count != 0){
			document.getElementById("characterimg").src = "styles/images/characters/" + data.results[0].name + ".png";
			document.getElementById("movies_title").innerHTML = "Movies:";
			document.getElementById("character_name").innerHTML = data.results[0].name;
			document.getElementById("character_name_img").innerHTML = data.results[0].name;
			document.getElementById("gender").innerHTML = data.results[0].gender;
			document.getElementById("height").innerHTML = data.results[0].height / 100.0 + " meters";
			document.getElementById("weight").innerHTML = data.results[0].mass + " kg";
			document.getElementById("birthyear").innerHTML = data.results[0].birth_year;
			var specie = getSpecie(data.results[0].species[0]);
			var planet = getPlanet(data.results[0].homeworld);
			if (data.results[0].name == "Anakin Skywalker"){
				var starships = getStarships(data.results[0].starships[1], data.results[0].name);
			} else {
				var starships = getStarships(data.results[0].starships[0], data.results[0].name);
			}
			for (i = 0; i <= data.results[0].films.length; i++) { 
    			getMovie(data.results[0].films[i]);
			}
		} else {
			document.getElementById("characterimg").src = "styles/images/characters/Not-Found.png";
			document.getElementById("character_name").innerHTML = input;
			document.getElementById("character_name_img").innerHTML = input;
			document.getElementById("gender").innerHTML = "Not found";
			document.getElementById("height").innerHTML = "Not found";
			document.getElementById("weight").innerHTML = "Not found";
			document.getElementById("birthyear").innerHTML = "Not found";
			var specie = getSpecie("not found");
			var planet = getPlanet("not found");
			document.getElementById("starship_name").innerHTML = "Starship not found";
			document.getElementById("starshipimg").src = "styles/images/starships/Not-Found.png";
			document.getElementById("starshipimg").title = input + " was not found, replaced by Not-Found.png";
			document.getElementById("movies_title").innerHTML = "Movies not found";
			document.getElementById("movie1").innerHTML = "";
			document.getElementById("movie2").innerHTML = "";
			document.getElementById("movie3").innerHTML = "";
			document.getElementById("movie4").innerHTML = "";
			document.getElementById("movie5").innerHTML = "";
			document.getElementById("movie6").innerHTML = "";
			document.getElementById("movie7").innerHTML = "";
		}
	});
}

function getStarships(input, charactername) {
	console.log(input);
	if (input != null){
		$.getJSON(input, function(data) {
		document.getElementById("starship_name").innerHTML = data.name;
		document.getElementById("starshipimg").src = "styles/images/starships/" + data.name + ".png";
		document.getElementById("starshipimg").title = "styles/images/starships/" + data.name + ".png";
		});
	} else {
		document.getElementById("starship_name").innerHTML = "Starship not found";
		document.getElementById("starshipimg").src = "styles/images/starships/Not-Found.png";
		document.getElementById("starshipimg").title = charactername + " does not own a starship, replaced by Not-Found.png";
	}
} 

function getPlanet(input) {
	if (input != "not found"){
		$.getJSON(input, function(data) {
			document.getElementById("planet").innerHTML = data.name;
		});
	} else {
		document.getElementById("planet").innerHTML = "Not found";
	}
}

function getSpecie(input) {
	if (input != "not found"){
		$.getJSON(input, function(data) {
			document.getElementById("specie").innerHTML = data.name;
		});
	} else {
		document.getElementById("specie").innerHTML = "Not found";
	}
}


function getMovie(input, count) {
	$.getJSON(input, function(data) {
		document.getElementById("movie" + data.episode_id).innerHTML = "Episode " + data.episode_id + ": " + data.title;
	});
}      

function BioChanged()
{
    if($('.biocheckbox').is(":checked"))   
        $(".bio").show();
    else
        $(".bio").hide();
}

function StarshipsChanged()
{
    if($('.starshipscheckbox').is(":checked"))   
        $(".starships").show();
    else
        $(".starships").hide();
}

function MoviesChanged()
{
    if($('.moviescheckbox').is(":checked"))   
        $(".movies").show();
    else
        $(".movies").hide();
}

var input = document.querySelector('.input__text');

document.addEventListener('keypress', function(e){
	if ( e.keyCode == 13 ) {
		getPeople(input.value);
		input.value = '';
	}
});

/*function getData(loader) {
	// Wait 5000ms, kind of .ready...
	/*
	ALTIJD IN EEN FUNCTIE DIE KLAAR IS
	.ready()
	if ( this.statusText == 4 && this.statusCode == 200 ) {
	
	}

	setTimeout(function() {
		console.log( loader );
		loader.classList.toggle( 'hidden', 'visible' );
		console.log('Ready');
		// add data to the DOM
	}, 5000);
}
*/

/*document.addEventListener('DOMContentLoaded', function() {
	var r = document.querySelector('.result'),
		b = document.querySelector('.btn'),
		l = r.querySelector('.loader');
		console.log( r + ' ' + btn );

		.btn.addEventListener('click', function() {
			l.classList.toggle( 'hidden' )
			getData(l, r);
		});
});*/