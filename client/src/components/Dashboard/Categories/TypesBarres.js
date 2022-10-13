
const variantes = [
  {
    id: 0,
    class: "select-title",
    name: "/ (défaut)",
    value: "title",
  },




//BARRES
  {
    id: 1,
    class: "select-title",
    name: "Barres",
    value: "title",
  },
  {
    id: 2,
    class: "select-item",
    name: "Olympique droite classique",
    value: "Olympique droite classique",
  },
  {
    id: 3,
    class: "select-item",
    name: "Olympique droite fine",
    value: "Olympique droite fine",
  },
  {
    id: 4,
    class: "select-item",
    name: "Barre droite 28mm",
    value: "Barre droite 28mm",
  },
  {
    id: 5,
    class: "select-item",
    name: "Barre EZ",
    value: "Barre EZ",
  },
  {
    id: 6,
    class: "select-item",
    name: "Barre Super EZ",
    value: "Barre Super EZ",
  },
  {
    id: 7,
    class: "select-item",
    name: "Barre Triceps (prise marteau)",
    value: "Barre Triceps (prise marteau)",
  },
  {
    id: 8,
    class: "select-item",
    name: "Barre MultiGrip",
    value: "Barre MultiGrip",
  },
  {
    id: 9,
    class: "select-item",
    name: "Trap Bar",
    value: "Trap Bar",
  },
  {
    id: 10,
    class: "select-item",
    name: "Safety squat bar",
    value: "Safety squat bar",
  },


//POIDS
  {
    id: 11,
    class: "select-title",
    name: "Poids",
    value: "title",
  },
  {
    id: 12,
    class: "select-item",
    name: "Disque(s)",
    value: "Disque(s)",
  },
  {
    id: 12,
    class: "select-item",
    name: "Haltère(s)",
    value: "Haltère(s)",
  },
  {
    id: 13,
    class: "select-item",
    name: "Kettlebell(s)",
    value: "Kettlebell(s)",
  },
  {
    id: 14,
    class: "select-item",
    name: "Medecine Ball",
    value: "Medecine Ball",
  },


//POULIES
  {
    id: 15,
    class: "select-title",
    name: "Poulie(s)",
    value: "title",
  },
 {
    id: 11,
    class: "select-item",
    name: "Poulie haute",
    value: "Poulie haute",
  },
  {
    id: 11,
    class: "select-item",
    name: "Poulie basse",
    value: "Poulie basse",
  },
  {
    id: 11,
    class: "select-item",
    name: "Poulies hautes",
    value: "Poulies hautes",
  },
  {
    id: 11,
    class: "select-item",
    name: "Poulies basses",
    value: "Poulies basses",
  },
  {
    id: 16,
    class: "select-item",
    name: "Corde",
    value: "Corde",
  },
  {
    id: 17,
    class: "select-item",
    name: "Barre droite de poulie",
    value: "Barre droite de poulie",
  },
  {
    id: 18,
    class: "select-item",
    name: "Barre EZ de poulie",
    value: "Barre EZ de poulie",
  },
  {
    id: 19,
    class: "select-item",
    name: "Barre de tirage longue",
    value: "Barre de tirage longue",
  },
  {
    id: 20,
    class: "select-item",
    name: "Barre de tirage longue avec poignets",
    value: "Barre de tirage longue avec poignets",
  },
  {
    id: 21,
    class: "select-item",
    name: "Triangle simple",
    value: "Triangle simple",
  },
  {
    id: 22,
    class: "select-item",
    name: "Triangle de tirage",
    value: "Triangle de tirage",
  },
  {
    id: 23,
    class: "select-item",
    name: "Poignet(s)",
    value: "Poignet(s)",
  },




//MACHINE
  {
    id: 24,
    class: "select-title",
    name: "Machine",
    value: "title",
  },
  {
    id: 11,
    class: "select-item",
    name: "A la Smith Machine",
    value: "A la Smith Machine",
  },
  {
    id: 11,
    class: "select-item",
    name: "A la machine",
    value: "A la machine",
  },
  {
    id: 11,
    class: "select-item",
    name: "A la chaise romaine",
    value: "A la chaise romaine",
  },



//STREETWORKOUT
  {
    id: 24,
    class: "select-title",
    name: "StreetWorkout",
    value: "title",
  },
  {
    id: 25,
    class: "select-item",
    name: "Poids de poignets",
    value: "Poids de poignets",
  },
  {
    id: 26,
    class: "select-item",
    name: "Poids de chevilles",
    value: "Poids de chevilles",
  },
  {
    id: 27,
    class: "select-item",
    name: "Gilet lesté",
    value: "Gilet lesté",
  },
  {
    id: 28,
    class: "select-item",
    name: "Loading pin",
    value: "Loading pin",
  },
  {
    id: 11,
    class: "select-item",
    name: "Aux anneaux",
    value: "Aux anneaux",
  },
  {
    id: 11,
    class: "select-item",
    name: "Sur parallettes",
    value: "Sur parallettes",
  },
  {
    id: 11,
    class: "select-item",
    name: "Aux barres parallèles",
    value: "Aux barres parallèles",
  },



//STRONGMAN
  {
    id: 29,
    class: "select-title",
    name: "Strongman",
    value: "title",
  },
  {
    id: 30,
    class: "select-item",
    name: "Atlas Stone",
    value: "Atlas Stone",
  },
  {
    id: 31,
    class: "select-item",
    name: "Barre Log",
    value: "Barre Log",
  },
  {
    id: 31,
    class: "select-item",
    name: "Cambered bar",
    value: "Cambered bar",
  },
  {
    id: 31,
    class: "select-item",
    name: "Cambered squat bar",
    value: "Cambered squat bar",
  },
  {
    id: 31,
    class: "select-item",
    name: "Cambered safety squat bar",
    value: "Cambered safety squat bar",
  },
  {
    id: 31,
    class: "select-item",
    name: "Cambered Multigrip bar",
    value: "Cambered Multigrip bar",
  },
  {
    id: 32,
    class: "select-item",
    name: "Sand Bag (sac de sable) / Keg",
    value: "Sand Bag (sac de sable)",
  },
  {
    id: 33,
    class: "select-item",
    name: "Free Yoke",
    value: "Free Yoke",
  },
  {
    id: 34,
    class: "select-item",
    name: "Solid Yoke",
    value: "Solid Yoke",
  },
  {
    id: 35,
    class: "select-item",
    name: "Farmer Walk Handles",
    value: "Farmer Walk Handles",
  },
  {
    id: 36,
    class: "select-item",
    name: "Sled (traîneau)",
    value: "Sled (traîneau)",
  },
  {
    id: 12,
    class: "select-item",
    name: "Grenade / Canon ball",
    value: "Grenade / Canon ball",
  },
  {
    id: 12,
    class: "select-item",
    name: "Pneu",
    value: "Pneu",
  },
  {
    id: 12,
    class: "select-item",
    name: "Corde",
    value: "Corde",
  },

];

export default variantes;