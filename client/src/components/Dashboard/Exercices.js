const exercices = [
  {
    id: 0,
    class: "select-title",
    name: "Tous (défaut)",
    value: "title",
  },
  {
    id: 1,
    class: "select-title",
    name: "Musculation - Haut du corps",
    value: "title",
  },
  {
    id: 2,
    class: "select-item",
    name: "Developpé couché",
    value: "Developpé couché",
  },
  {
    id: 2,
    class: "select-item",
    name: "Larsen press",
    value: "Larsen press",
  },
  {
    id: 2,
    class: "select-item",
    name: "Ecartés / chest fly",
    value: "Ecartés",
  },
  {
    id: 2,
    class: "select-item",
    name: "Developpé militaire",
    value: "Developpé militaire",
  },
  {
    id: 2,
    class: "select-item",
    name: "Elevations latérales",
    value: "Elevations latérales",
  },
  {
    id: 2,
    class: "select-item",
    name: "L fly interieur",
    value: "L fly interieur",
  },
  {
    id: 2,
    class: "select-item",
    name: "L fly exterieur",
    value: "L fly exterieur",
  },
  {
    id: 2,
    class: "select-item",
    name: "Shrug",
    value: "Shrug",
  },
  {
    id: 4,
    class: "select-item",
    name: "Rowing",
    value: "Rowing ",
  },
  {
    id: 4,
    class: "select-item",
    name: "Surfer lat pull",
    value: "Surfer lat pull ",
  },
  {
    id: 4,
    class: "select-item",
    name: "Rowing menton / Upright row",
    value: "Rowing menton",
  },
  {
    id: 5,
    class: "select-item",
    name: "Tirage Horizontal",
    value: "Tirage Horizontal",
  },
  {
    id: 6,
    class: "select-item",
    name: "Tirage Vertical",
    value: "Tirage Vertical",
  },
  {
    id: 9,
    class: "select-item",
    name: "Curl",
    value: "Curl",
  },
  {
    id: 9,
    class: "select-item",
    name: "Concentration Curl",
    value: "Concentration Curl",
  },
  {
    id: 10,
    class: "select-item",
    name: "Barre au front / Skullcrusher",
    value: "Barre au front",
  },
  {
    id: 10,
    class: "select-item",
    name: "Extension triceps / Triceps press",
    value: "Extension triceps",
  },
  {
    id: 10,
    class: "select-item",
    name: "Pullover",
    value: "Pullover",
  },
  {
    id: 10,
    class: "select-item",
    name: "Oiseau / Reverse fly",
    value: "Oiseau / Reverse fly",
  },
  {
    id: 11,
    class: "select-title",
    name: "Musculation - Bas du corps",
    value: "title",
  },
  {
    id: 3,
    class: "select-item",
    name: "Squat",
    value: "Squat",
  },
  {
    id: 7,
    class: "select-item",
    name: "Soulevé de terre",
    value: "Soulevé de terre",
  },
  {
    id: 7,
    class: "select-item",
    name: "Fentes avant / Split Squat",
    value: "Fentes avant / Split Squat",
  },
  {
    id: 7,
    class: "select-item",
    name: "Fentes arrière / Reverse Split Squat",
    value: "Fentes arrière",
  },
  {
    id: 7,
    class: "select-item",
    name: "Fentes bulgares / Bulgarian Split Squat",
    value: "Fentes bulgares",
  },
  {
    id: 7,
    class: "select-item",
    name: "Hip Thrust / Relevé de bassin",
    value: "Hip Thrust",
  },
  {
    id: 7,
    class: "select-item",
    name: "Pont / Bridge",
    value: "Pont / Bridge",
  },
  {
    id: 7,
    class: "select-item",
    name: "Extensions de mollets / Calf raises",
    value: "Extensions de mollets",
  },
  {
    id: 7,
    class: "select-item",
    name: "Leg extension",
    value: "Leg extension",
  },
  {
    id: 12,
    class: "select-title",
    name: "Streetlifting - Haut du corps",
    value: "title",
  },
  {
    id: 8,
    class: "select-item",
    name: "Traction / Pull up",
    value: "Traction / Pull up",
  },
  {
    id: 8,
    class: "select-item",
    name: "Traction Commando",
    value: "Traction Commando",
  },
  {
    id: 8,
    class: "select-item",
    name: "Traction Australienne / Rowing inversé / Traction inversée (Austarlian pull up / Inverted pull up / Inverted rowing)",
    value: "Traction Australienne",
  },
  {
    id: 8,
    class: "select-item",
    name: "L Pull up / Traction en L",
    value: "L Pull up",
  },
  {
    id: 8,
    class: "select-item",
    name: "Pompe / Push up",
    value: "Pompe / Push up",
  },
  {
    id: 8,
    class: "select-item",
    name: "Pompe hindou / Hindu Push up",
    value: "Pompe hindou",
  },
  {
    id: 8,
    class: "select-item",
    name: "Pike Push up",
    value: "Pike Push up",
  },
  {
    id: 8,
    class: "select-item",
    name: "Spiderman Push up",
    value: "Spiderman Push up",
  },
  {
    id: 8,
    class: "select-item",
    name: "Pseudo planche push up",
    value: "Pseudo planche push up",
  },
  {
    id: 13,
    class: "select-item",
    name: "Dips",
    value: "Dips",
  },
  {
    id: 13,
    class: "select-item",
    name: "Impossible Dips",
    value: "Impossible Dips",
  },
  {
    id: 13,
    class: "select-item",
    name: "Korean Dips",
    value: "Korean Dips",
  },
  {
    id: 14,
    class: "select-item",
    name: "Muscle Up",
    value: "Muscle Up",
  },
  {
    id: 14,
    class: "select-item",
    name: "Hefesto",
    value: "Hefesto",
  },
  {
    id: 14,
    class: "select-item",
    name: "Dragon Flag",
    value: "Dragon Flag",
  },
  {
    id: 14,
    class: "select-item",
    name: "Dragon Press",
    value: "Dragon Press",
  },
  {
    id: 14,
    class: "select-item",
    name: "Pelican Curl",
    value: "Pelican Curl",
  },
  {
    id: 14,
    class: "select-item",
    name: "Suspension / hang",
    value: "Suspension / hang",
  },
  {
    id: 9,
    class: "select-item",
    name: "Curl Zanetti",
    value: "Curl Zanetti",
  },
  {
    id: 19,
    class: "select-title",
    name: "Streetlifting - Bas du corps",
    value: "title",
  },
  {
    id: 20,
    class: "select-item",
    name: "Pistol Squat",
    value: "Pistol Squat",
  },
  {
    id: 21,
    class: "select-item",
    name: "Matrix Squat / Matrix Leg extension",
    value: "Matrix Squat",
  },
  {
    id: 21,
    class: "select-item",
    name: "Sissy Squat",
    value: "Sissy Squat",
  },
  {
    id: 21,
    class: "select-item",
    name: "Skater Squat",
    value: "Skater Squat",
  },
  {
    id: 22,
    class: "select-item",
    name: "Nordic Curl / Glute Ham Raise",
    value: "Nordic Curl",
  },
  {
    id: 23,
    class: "select-item",
    name: "Natural Leg Extension",
    value: "Natural Leg Extension",
  },
  {
    id: 15,
    class: "select-title",
    name: "Statique / Figures",
    value: "title",
  },
  {
    id: 16,
    class: "select-item",
    name: "Front Lever",
    value: "Front Lever",
  },
  {
    id: 17,
    class: "select-item",
    name: "Back Lever",
    value: "Back Lever",
  },
  {
    id: 18,
    class: "select-item",
    name: "Planche",
    value: "Planche",
  },
  {
    id: 24,
    class: "select-item",
    name: "Handstand / Poirier",
    value: "Handstand",
  },
  {
    id: 25,
    class: "select-item",
    name: "Maltsese",
    value: "Maltese",
  },
  {
    id: 26,
    class: "select-item",
    name: "Drapeau / Human Flag",
    value: "Drapeau",
  },
  {
    id: 27,
    class: "select-item",
    name: "Iron Cross / Croix de fer",
    value: "Iron Cross",
  },
  {
    id: 27,
    class: "select-item",
    name: "L Sit / L'équerre",
    value: "L Sit",
  },
  {
    id: 27,
    class: "select-item",
    name: "V Sit",
    value: "V Sit",
  },
  {
    id: 27,
    class: "select-item",
    name: "Manna",
    value: "Manna",
  },
  {
    id: 27,
    class: "select-item",
    name: "Elbow Lever",
    value: "Elbow Lever",
  },
  {
    id: 27,
    class: "select-item",
    name: "Frog Stand",
    value: "Frog Stand",
  },
  {
    id: 27,
    class: "select-item",
    name: "Escanor hold",
    value: "Escanor hold",
  },
  {
    id: 27,
    class: "select-item",
    name: "Victorian",
    value: "Victorian",
  },
 {
    id: 1,
    class: "select-title",
    name: "Musculation - Abdominaux / Lombaires",
    value: "title",
  },
  {
    id: 2,
    class: "select-item",
    name: "Abdominal bicycles / Bicyclette",
    value: "Abdominal bicycles / Bicyclette",
  },
  {
    id: 2,
    class: "select-item",
    name: "Boat Hold",
    value: "Boat Hold",
  },
  {
    id: 2,
    class: "select-item",
    name: "Crunch",
    value: "Crunch",
  },
  {
    id: 2,
    class: "select-item",
    name: "Sit Up",
    value: "Sit Up",
  },
  {
    id: 2,
    class: "select-item",
    name: "Hollow Body",
    value: "Hollow Body",
  },
  {
    id: 2,
    class: "select-item",
    name: "Relevé de genou suspendu / Hanging knee raise",
    value: "Relevé de genou suspendu",
  },
  {
    id: 2,
    class: "select-item",
    name: "Relevé de jambes suspendu / Hanging leg raise",
    value: "Relevé de jambes suspendu",
  },
  {
    id: 2,
    class: "select-item",
    name: "Toes to bar",
    value: "Toes to bar",
  },
  {
    id: 2,
    class: "select-item",
    name: "Planche / Plank",
    value: "Planche / Plank",
  },
  {
    id: 2,
    class: "select-item",
    name: "Planche sur le côté / Side Plank",
    value: "Planche sur le côté",
  },
  {
    id: 2,
    class: "select-item",
    name: "Spiderman plank",
    value: "Spiderman plank",
  },
  {
    id: 2,
    class: "select-item",
    name: "Reverse hypers",
    value: "Reverse hypers",
  },
  {
    id: 2,
    class: "select-item",
    name: "Russian Twist",
    value: "Russian Twist",
  },
  {
    id: 2,
    class: "select-item",
    name: "Scissors / Ciseaux",
    value: "Scissors",
  },
  {
    id: 2,
    class: "select-item",
    name: "Essuie glasse / Windhield Wiper",
    value: "Essuie glasse",
  },
  {
    id: 2,
    class: "select-item",
    name: "Jacknife / Crunch portefeuille",
    value: "Jacknife",
  },
  {
    id: 2,
    class: "select-item",
    name: "Swimmer / Nageur",
    value: "Swimmer / Nageur",
  },
  {
    id: 28,
    class: "select-title",
    name: "Exercices Spécifiques",
    value: "title",
  },
  {
    id: 28,
    class: "select-item",
    name: "Pont du lutteur / Neck Bridge",
    value: "Pont du lutteur",
  },
  {
    id: 28,
    class: "select-item",
    name: "Pont avant / Front Bridge",
    value: "Pont avant",
  },
  {
    id: 999,
    class: "select-item-own",
    name: "Entre ton propre exercice ici...",
    value: "own-exercice",
  },
];

export default exercices;
