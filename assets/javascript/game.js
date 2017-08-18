// Create an array of words
var wordList = [
    "abandon", "adventure", "ahoy", "anchor", "armada", "arms", "asea", "ashore", "assault", "attack",
    "bad", "bandanna", "bandit", "bandolier", "barbaric", "barrel", "battle", "beach", "behead", "boatswain", "bounty", "brawl", "brutal", "buccaneer",
    "cannon", "capsize", "captain", "capture", "cargo", "cave", "challenge", "chest", "coast", "coastline", "coins", "compass", "confiscate", "conquest",
    "contraband", "corpse", "corsair", "course", "crew", "criminal", "crook", "cruel", "curse", "cutlass", "cutthroat", "dagger", "danger", "daring", "dead",
    "deck", "dishonest", "doubloon", "earring", "escape", "evil", "explore", "fear", "ferocious", "fight", "flag", "fleet", "floatsam", "fortune",
    "galleon", "gangplank", "gear", "gibbet", "gold", "greed", "gun", "gunner", "gunpowder", "haul", "heist", "hijack", "hook", "hold", "horizon", "hostile",
    "hull", "hurricane", "illegal", "infamous", "island", "jetsam", "jewels", "keel", "keelhaul", "kidnap", "kill", "knife", "land", "landlubber", "lash",
    "lawless", "legend", "limey", "lookout", "loot", "lore", "lucre", "maggot", "malaria", "map", "marauder", "matiner", "maroon", "mast", "mates", "mayhem",
    "menace", "merchant", "musket", "mutiny", "nautical", "navigate", "notorious", "ocean", "outcasts", "overboard", "parley", "parrot", "pegleg", "pillage",
    "pirate", "pistol", "plank", "plunder", "predatory", "privateer", "prowl", "quartermaster", "quarters", "quest", "raid", "ransack", "rat", "rations", "realm",
    "reckoning", "revenge", "revolt", "riches", "rigging", "roam", "rob", "robber", "rope", "rudder", "ruffian", "rum", "ruthless", "sabotage", "sail", "sailing",
    "sailor", "scalawag", "scar", "scurvy", "seas", "seaweed", "sextant", "ship", "shipmate", "shore", "silver", "skiff", "spoils", "steal", "swagger", "swashbuckling",
    "sword", "thief", "thievery", "thug", "tides", "torture", "trade", "treachery", "treasure", "truce", "unlawful", "unscrupulous", "vandalize", "vanquish",
    "vessel", "vicious", " vile", "villain", "violence", "violent", "weapons"
];

var wordNumber = Math.floor(Math.random() * wordList.length);
var answer = wordList[wordNumber];
var hiddenAnswer = [];
var currentWord = document.getElementById("current-word");
var guesses = 8;
var wins = 0;
var winCount = document.getElementById("win-count");
var losses = 0;
var lossCount = document.getElementById("loss-count");
var guessed = [];
var lettersGuessed = document.getElementById("letters-guessed");
var guessCount = document.getElementById("guess-count");

//Starting values for the board
for (var i = 0; i < answer.length; i++) {
    hiddenAnswer.push("_");
}

currentWord.textContent = hiddenAnswer.join(" ");
guessCount.textContent = guesses;

//Replaces the current word with "_"
function startWord(x) {
    hiddenAnswer = [];
    for (var i = 0; i < x.length; i++) {
        hiddenAnswer.push("_");
    }
}

//Plays when they press a letter and a letter only
document.onkeyup = function(event) {
    var letter = event.key;
    var charCode = letter.charCodeAt(0);

    //if the press a letter
    if (charCode >= 97 && charCode <= 122) {
        //if out of guesses end the game and reset
        if (guesses === 1) {
            losses++;
            guesses--;
            update();
            currentWord.textContent = answer;
        } 

        else if (guesses === 0) {
            reset();
        }

        //word does not contain the letter guessed
        else if (answer.indexOf(letter) < 0 && guessed.indexOf(letter) < 0) {
            guessed.push(letter);
            guesses--;
            update();
        }

        //word contains the letter guessed
        else if (guessed.indexOf(letter) < 0) {
            guessed.push(letter);
            for (var i = 0; i < answer.length; i++) {
                if (answer[i] === letter) {
                    hiddenAnswer[i] = answer[i];
                }
            }
            update();
        }

        //If player wins
        if (hiddenAnswer.indexOf("_") < 0) {
            wins++;
            reset();
        }
    }
}

//update page
function update() {
    guessCount.textContent = guesses;
    lettersGuessed.textContent = guessed.join(" ");
    currentWord.textContent = hiddenAnswer.join(" ");
}

//Reset the gameboard when a player wins or loses
function reset() {
    guesses = 8;
    guessed = [];
    wordNumber = Math.floor(Math.random() * wordList.length);
    answer = wordList[wordNumber];
    startWord(answer);
    winCount.textContent = wins;
    lossCount.textContent = losses;
    update();
}