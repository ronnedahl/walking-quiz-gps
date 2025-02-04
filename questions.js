// questions.js
const questions = [
  {
    "question": "1. Vilken planet ligger närmast solen?",
    "answers": {
      "1": "Venus",
      "X": "Merkurius",
      "2": "Mars"
    },
    "correctAnswer": "X"
  },
  {
    "question": "2. Hur lång tid tar det för Jorden att snurra ett varv runt sin egen axel?",
    "answers": {
      "1": "24 timmar",
      "X": "12 timmar",
      "2": "365 dagar"
    },
    "correctAnswer": "1"
  },
  {
    "question": "3. Vilken himlakropp är störst i vårt solsystem?",
    "answers": {
      "1": "Saturnus",
      "X": "Jupiter",
      "2": "Solen"
    },
    "correctAnswer": "2"
  },
  {
    "question": "4. Vilket år landade människan för första gången på månen?",
    "answers": {
      "1": "1969",
      "X": "1972",
      "2": "1959"
    },
    "correctAnswer": "1"
  },
  {
    "question": "5. Vilken planet kallas ofta för 'den röda planeten'?",
    "answers": {
      "1": "Mars",
      "X": "Jupiter",
      "2": "Neptunus"
    },
    "correctAnswer": "1"
  },
  {
    "question": "6. Vad heter den första satelliten som skickades upp i rymden?",
    "answers": {
      "1": "Apollo 11",
      "X": "Sputnik 1",
      "2": "Voyager 1"
    },
    "correctAnswer": "X"
  },
  {
    "question": "7. Vilken planet har ringar som är synliga från Jorden med teleskop?",
    "answers": {
      "1": "Jupiter",
      "X": "Uranus",
      "2": "Saturnus"
    },
    "correctAnswer": "2"
  },
  {
    "question": "8. Vilket är det mest dominerande grundämnet i Solen?",
    "answers": {
      "1": "Syre",
      "X": "Helium",
      "2": "Väte"
    },
    "correctAnswer": "2"
  },
  {
    "question": "9. Vilken är den största planeten i vårt solsystem?",
    "answers": {
      "1": "Jupiter",
      "X": "Uranus",
      "2": "Saturnus"
    },
    "correctAnswer": "1"
  },
  {
    "question": "10. Vilket år skickades den internationella rymdstationen (ISS) första modulen upp i omloppsbana?",
    "answers": {
      "1": "2000",
      "X": "1998",
      "2": "1990"
    },
    "correctAnswer": "X"
  },
  {
    "question": "11. Vilken planet är känd för sina kraftiga stormar och den stora röda fläcken?",
    "answers": {
      "1": "Jupiter",
      "X": "Neptunus",
      "2": "Venus"
    },
    "correctAnswer": "1"
  },
  {
    "question": "12. Vad heter vår galax?",
    "answers": {
      "1": "Vintergatan",
      "X": "Andromeda",
      "2": "Orion"
    },
    "correctAnswer": "1"
  },
  {
    "question": "13. Vilken av följande är en dvärgplanet?",
    "answers": {
      "1": "Merkurius",
      "X": "Pluto",
      "2": "Mars"
    },
    "correctAnswer": "X"
  },
  {
    "question": "1. Vilket år föll det västromerska riket?",
    "answers": {
      "1": "476 e.Kr.",
      "X": "410 e.Kr.",
      "2": "1066 e.Kr."
    },
    "correctAnswer": "1"
  },
  {
    "question": "2. Vem var den första kejsaren av Kina?",
    "answers": {
      "1": "Qin Shi Huang",
      "X": "Kublai Khan",
      "2": "Sun Tzu"
    },
    "correctAnswer": "1"
  },
  {
    "question": "3. Vilket år startade första världskriget?",
    "answers": {
      "1": "1912",
      "X": "1914",
      "2": "1918"
    },
    "correctAnswer": "X"
  },
  {
    "question": "4. Vilken drottning regerade England under den spanska armadans tid?",
    "answers": {
      "1": "Mary I",
      "X": "Elizabeth I",
      "2": "Victoria"
    },
    "correctAnswer": "X"
  },
  {
    "question": "5. Vilket år föll Berlinmuren?",
    "answers": {
      "1": "1989",
      "X": "1991",
      "2": "1985"
    },
    "correctAnswer": "1"
  },
  {
    "question": "6. Vem skrev de 95 teserna som startade reformationen?",
    "answers": {
      "1": "John Calvin",
      "X": "Martin Luther",
      "2": "Henry VIII"
    },
    "correctAnswer": "X"
  },
  {
    "question": "7. Vilket år ägde slaget vid Waterloo rum?",
    "answers": {
      "1": "1812",
      "X": "1805",
      "2": "1815"
    },
    "correctAnswer": "2"
  },
  {
    "question": "8. Vad hette den amerikanska presidenten under inbördeskriget?",
    "answers": {
      "1": "George Washington",
      "X": "Abraham Lincoln",
      "2": "Thomas Jefferson"
    },
    "correctAnswer": "X"
  },
  {
    "question": "9. Vilken stormakt byggde pyramiderna i Giza?",
    "answers": {
      "1": "Persiska riket",
      "X": "Romerska riket",
      "2": "Egypten"
    },
    "correctAnswer": "2"
  },
  {
    "question": "10. Vilket århundrade började medeltiden?",
    "answers": {
      "1": "400-talet",
      "X": "500-talet",
      "2": "600-talet"
    },
    "correctAnswer": "X"
  },
  {
    "question": "11. Vilket land ledde Vasco da Gama sina expeditioner för?",
    "answers": {
      "1": "Spanien",
      "X": "Portugal",
      "2": "Italien"
    },
    "correctAnswer": "X"
  },
  {
    "question": "12. Vilken revolution är associerad med Bastiljens stormning?",
    "answers": {
      "1": "Den franska revolutionen",
      "X": "Den amerikanska revolutionen",
      "2": "Den ryska revolutionen"
    },
    "correctAnswer": "1"
  },
  {
    "question": "13. Vilket år landade människan för första gången på månen?",
    "answers": {
      "1": "1961",
      "X": "1969",
      "2": "1972"
    },
    "correctAnswer": "X"
  }

];

export default questions;