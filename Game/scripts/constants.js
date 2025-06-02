const funnySavePhrases = [
  "Та він з магнітом у рукавицях!",
  "Воротар каже: не сьогодні!",
  "Це не сейв — це кіно!",
  "Знову він... дай вже гол забити!",
  "Цей сейв заслуговує Оскара!",
  "Хоч щось у цій грі стабільне — сейви.",
  "М'яч зник. А, він у руках воротаря.",
  "Як він це зробив?!",
];

const funnyPraises = [
  "Та ти, певно, родич Мессі!",
  "Воротар ще досі шукає м'яч у траві!",
  "Ворота трималися, але ти — не пожалів!",
  "Сусіди аплодують стоячи!",
  "Воротар плаче в кутку…",
];

const keeperPositions = [
  {
    src: "/goalkeeper/top-left.png",
    width: 220,
    height: 290,
    offsetX: 200,
    offsetY: 290,
  },
  {
    src: "/goalkeeper/top-center.png",
    width: 220,
    height: 360,
    offsetX: 300,
    offsetY: 220,
  },
  {
    src: "/goalkeeper/top-right.png",
    width: 220,
    height: 200,
    offsetX: 370,
    offsetY: 330,
  },
  {
    src: "/goalkeeper/middle-left.png",
    width: 220,
    height: 350,
    offsetX: 190,
    offsetY: 220,
  },
  {
    src: "/goalkeeper/middle-center.png",
    width: 220,
    height: 340,
    offsetX: 360,
    offsetY: 220,
  },
  {
    src: "/goalkeeper/middle-right.png",
    width: 220,
    height: 400,
    offsetX: 370,
    offsetY: 180,
  },
  {
    src: "/goalkeeper/bottom-left.png",
    width: 220,
    height: 330,
    offsetX: 170,
    offsetY: 220,
  },
  {
    src: "/goalkeeper/bottom-center.png",
    width: 220,
    height: 330,
    offsetX: 300,
    offsetY: 210,
  },
  {
    src: "/goalkeeper/bottom-right.png",
    width: 220,
    height: 330,
    offsetX: 400,
    offsetY: 220,
  },
];
const ballPositions = {
  1: { left: "215px", bottom: "475px" },
  2: { left: "375px", bottom: "475px" },
  3: { left: "535px", bottom: "475px" },
  4: { left: "215px", bottom: "400px" },
  5: { left: "375px", bottom: "400px" },
  6: { left: "535px", bottom: "400px" },
  7: { left: "215px", bottom: "320px" },
  8: { left: "375px", bottom: "320px" },
  9: { left: "535px", bottom: "320px" },
};

const difficultySettings = {
  easy: { keeperAccuracy: 0.15 },
  normal: { keeperAccuracy: 0.25 },
  hard: { keeperAccuracy: 0.35 }
};

const TIMER_SETTINGS = {
  shotTime: 5,
  criticalTime: 3,
  animationDelay: 1000,
  gameOverDelay: 3000
};