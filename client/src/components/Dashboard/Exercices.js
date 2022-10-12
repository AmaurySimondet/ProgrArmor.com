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
    name: "L fly",
    value: "L fly",
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
    name: "Fentes",
    value: "Fentes",
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
    id: 7,
    class: "select-item",
    name: "Leg curl",
    value: "Leg curl",
  },
  {
    id: 7,
    class: "select-item",
    name: "Leg abduction",
    value: "Leg abduction",
  },
  {
    id: 7,
    class: "select-item",
    name: "Leg adduction",
    value: "Leg adduction",
  },
  {
    id: 7,
    class: "select-item",
    name: "Leg press",
    value: "Leg press",
  },






  {
    id: 12,
    class: "select-title",
    name: "Street Workout- Haut du corps",
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
    name: "Pompe / Push up",
    value: "Pompe / Push up",
  },
  {
    id: 13,
    class: "select-item",
    name: "Dips",
    value: "Dips",
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
    id: 19,
    class: "select-title",
    name: "Street Workout - Bas du corps",
    value: "title",
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
    id: 23,
    class: "select-item",
    name: "Natural Leg Press",
    value: "Natural Leg Press",
  },


  {
    id: 15,
    class: "select-title",
    name: "Street Workout - Figures",
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
    id: 15,
    class: "select-title",
    name: "Street Workout - Freestyle",
    value: "title",
  },
  {
    id: 16,
    class: "select-item",
    name: "Skin the cat",
    value: "Skin the cat",
  },
  {
    id: 16,
    class: "select-item",
    name: "Bar spin",
    value: "Bar spin",
  },
  {
    id: 16,
    class: "select-item",
    name: "Alley Oop",
    value: "Alley Oop",
  },
  {
    id: 16,
    class: "select-item",
    name: "Shrimp flip",
    value: "Shrimp flip",
  },
  {
    id: 16,
    class: "select-item",
    name: "Reverse pullover",
    value: "Reverse pullover",
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
    name: "Toes touch crunches",
    value: "Toes touch crunches",
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
    name: "Exercices Spécifiques - Cou",
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
    id: 28,
    class: "select-item",
    name: "Neck extension",
    value: "Neck extension",
  },
  {
    id: 28,
    class: "select-item",
    name: "Neck curl",
    value: "Neck curl",
  },



  {
    id: 28,
    class: "select-title",
    name: "Exercices Spécifiques - Explosif",
    value: "title",
  },
  {
    id: 28,
    class: "select-title",
    name: "Sauts",
    value: "title",
  },



  {
    id: 28,
    class: "select-item",
    name: "Kneeling jump",
    value: "Kneeling jump",
  },
  {
    id: 28,
    class: "select-item",
    name: "Kneeling box jump",
    value: "Kneeling box jump",
  },
  {
    id: 28,
    class: "select-item",
    name: "Box jump",
    value: "Box jump",
  },
  {
    id: 28,
    class: "select-item",
    name: "Box jump avec élan",
    value: "Box jump avec élan",
  },
  {
    id: 28,
    class: "select-item",
    name: "Straight Up / Bond",
    value: "Straight Up",
  },
  {
    id: 28,
    class: "select-item",
    name: "Squat sauté",
    value: "Squat sauté",
  },
  {
    id: 28,
    class: "select-item",
    name: "Squat sauté main vers le ciel",
    value: "Squat sauté main vers le ciel",
  },
  {
    id: 28,
    class: "select-item",
    name: "Saut avec élan bloqué",
    value: "Saut avec élan bloqué",
  },
  {
    id: 28,
    class: "select-item",
    name: "Saut talon fesse",
    value: "Saut talon fesse",
  },
  {
    id: 28,
    class: "select-item",
    name: "Saut groupé en claquant les cuisses",
    value: "Saut groupé en claquant les cuisses",
  },
  {
    id: 28,
    class: "select-item",
    name: "Saut groupé complet",
    value: "Saut groupé complet",
  },
  {
    id: 28,
    class: "select-item",
    name: "Saut groupé enlacé",
    value: "Saut groupé enlacé",
  },
  {
    id: 28,
    class: "select-item",
    name: "Saut filé",
    value: "Saut filé",
  },
  {
    id: 28,
    class: "select-item",
    name: "Saut suicide",
    value: "Saut suicide",
  },
  {
    id: 28,
    class: "select-item",
    name: "Saut en ciseaux",
    value: "Saut en ciseaux",
  },
  {
    id: 28,
    class: "select-item",
    name: "Coup de pied sauté",
    value: "Coup de pied sauté",
  },



  {
    id: 28,
    class: "select-title",
    name: "Pompes Explosives",
    value: "title",
  },
  {
    id: 28,
    class: "select-item",
    name: "Répulsion inclinée debout",
    value: "Répulsion inclinée debout",
  },
  {
    id: 28,
    class: "select-item",
    name: "Répulsion à genoux",
    value: "Répulsion à genoux",
  },
  {
    id: 28,
    class: "select-item",
    name: "Pompe répulsion",
    value: "Pompe répulsion",
  },
  {
    id: 28,
    class: "select-item",
    name: "Pompe clapée",
    value: "Pompe clapée",
  },
  {
    id: 28,
    class: "select-item",
    name: "Pompe en touchant la poitrine",
    value: "Pompe en touchant la poitrine",
  },
  {
    id: 28,
    class: "select-item",
    name: "Pompe claquée dans le dos",
    value: "Pompe claquée dans le dos",
  },
  {
    id: 28,
    class: "select-item",
    name: "Half superman",
    value: "Half superman",
  },
  {
    id: 28,
    class: "select-item",
    name: "Répulsion de tout le coprs",
    value: "Répulsion de tout le coprs",
  },
  {
    id: 28,
    class: "select-item",
    name: "Pompe superman",
    value: "Pompe superman",
  },
  {
    id: 28,
    class: "select-item",
    name: "Get Up Push Up",
    value: "Get Up Push Up",
  },
  {
    id: 28,
    class: "select-item",
    name: "Aztec Push up",
    value: "Aztec Push up",
  },
  {
    id: 28,
    class: "select-item",
    name: "Crossed Aztec Push up",
    value: "Crossed Aztec Push up",
  },
  {
    id: 28,
    class: "select-item",
    name: "Kojaks",
    value: "Kojaks",
  },
  {
    id: 28,
    class: "select-item",
    name: "Burpees",
    value: "Burpees",
  },



  {
    id: 28,
    class: "select-title",
    name: "Kip Up",
    value: "title",
  },
  {
    id: 28,
    class: "select-item",
    name: "Relevé de buste en roulade",
    value: "Relevé de buste en roulade",
  },
  {
    id: 28,
    class: "select-item",
    name: "Squat roulade",
    value: "Squat roulade",
  },
  {
    id: 28,
    class: "select-item",
    name: "Répulsion d'épaules",
    value: "Répulsion d'épaules",
  },
  {
    id: 28,
    class: "select-item",
    name: "Répulsion pontées",
    value: "Répulsion pontées",
  },
  {
    id: 28,
    class: "select-item",
    name: "Bridge Kip",
    value: "Bridge Kip",
  },
  {
    id: 28,
    class: "select-item",
    name: "Butt Kip",
    value: "Butt Kip",
  },
  {
    id: 28,
    class: "select-item",
    name: "Half Kip",
    value: "Half Kip",
  },
  {
    id: 28,
    class: "select-item",
    name: "Kip Up",
    value: "Kip Up",
  },
  {
    id: 28,
    class: "select-item",
    name: "Roll Kip Up",
    value: "Roll Kip Up",
  },
  {
    id: 28,
    class: "select-item",
    name: "Head Kip Up",
    value: "Head Kip Up",
  },
  {
    id: 28,
    class: "select-item",
    name: "Straight leg Kip Up",
    value: "Straight leg Kip Up",
  },
  {
    id: 28,
    class: "select-item",
    name: "Wushu Kip Up",
    value: "Wushu Kip Up",
  },
  {
    id: 28,
    class: "select-item",
    name: "No hands Kip Up",
    value: "No hands Kip Up",
  },
  {
    id: 28,
    class: "select-item",
    name: "Ditang Breakfall",
    value: "Ditang Breakfall",
  },




  {
    id: 28,
    class: "select-title",
    name: "Flip",
    value: "title",
  },
  {
    id: 28,
    class: "select-item",
    name: "Ruade de l'âne",
    value: "Ruade de l'âne",
  },
  {
    id: 28,
    class: "select-item",
    name: "Roulade sur les épaules",
    value: "Roulade sur les épaules",
  },
  {
    id: 28,
    class: "select-item",
    name: "Roulade en répulsion",
    value: "Roulade en répulsion",
  },
  {
    id: 28,
    class: "select-item",
    name: "Pont avec kick par dessus",
    value: "Pont avec kick par dessus",
  },
  {
    id: 28,
    class: "select-item",
    name: "Macao",
    value: "Macao",
  },
  {
    id: 28,
    class: "select-item",
    name: "Roulade avec saut",
    value: "Roulade avec saut",
  },
  {
    id: 28,
    class: "select-item",
    name: "Roulade en appui tendu renversé",
    value: "Roulade en appui tendu renversé",
  },
  {
    id: 28,
    class: "select-item",
    name: "Saut de main en tombant sur le dos",
    value: "Saut de main en tombant sur le dos",
  },
  {
    id: 28,
    class: "select-item",
    name: "Saut de main",
    value: "Saut de main",
  },
  {
    id: 28,
    class: "select-item",
    name: "Saut de main volant",
    value: "Saut de main volant",
  },
  {
    id: 28,
    class: "select-item",
    name: "Flip en tombant sur le dos",
    value: "Flip en tombant sur le dos",
  },
  {
    id: 28,
    class: "select-item",
    name: "Flip en courant",
    value: "Flip en courant",
  },
  {
    id: 28,
    class: "select-item",
    name: "Flip",
    value: "Flip",
  },
  {
    id: 28,
    class: "select-item",
    name: "Flip du singe",
    value: "Flip du singe",
  },
  {
    id: 28,
    class: "select-item",
    name: "Flip à quatre points",
    value: "Flip à quatre points",
  },
  {
    id: 28,
    class: "select-item",
    name: "Flashkick",
    value: "Flashkick",
  },
  {
    id: 28,
    class: "select-item",
    name: "Rondade",
    value: "Rondade",
  },
  {
    id: 28,
    class: "select-item",
    name: "Roue",
    value: "Roue",
  },


  {
    id: 28,
    class: "select-title",
    name: "Cardio",
    value: "title",
  },
  {
    id: 28,
    class: "select-item",
    name: "Rameur / Rowing Machine",
    value: "Rameur",
  },
  {
    id: 28,
    class: "select-item",
    name: "Course / Footing",
    value: "Course",
  },



  {
    id: 28,
    class: "select-title",
    name: "Haltérophilie",
    value: "title",
  },
  {
    id: 28,
    class: "select-item",
    name: "Arraché / Snatch",
    value: "Snatch",
  },
  {
    id: 28,
    class: "select-item",
    name: "Epaulé / Clean",
    value: "Clean",
  },
  {
    id: 28,
    class: "select-item",
    name: "Snatch deadlift",
    value: "Snatch deadlift",
  },
  {
    id: 28,
    class: "select-item",
    name: "Jeté / Jerk",
    value: "Jerk",
  },


  {
    id: 999,
    class: "select-item-own",
    name: "Entre ton propre exercice ici...",
    value: "own-exercice",
  },
];

export default exercices;
