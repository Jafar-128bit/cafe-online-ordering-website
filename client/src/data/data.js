/* Cake Images */
import butterCake from "../assets/images/cakes/cake-butter.jpg";
import chocolateCake from "../assets/images/cakes/cake-chocolet.jpg";
import mangoCake from "../assets/images/cakes/cake-mango.jpg";
import pineCake from "../assets/images/cakes/cake-pine.jpg";
import vanillaCake from "../assets/images/cakes/cake-vanila.jpg";
/* Tea Images */
import greenTea from "../assets/images/chai/greentea.jpg";
import lalTea from "../assets/images/chai/lalchai.jpg";
import lemonTea from "../assets/images/chai/lemontea.jpg";
import masalaTea from "../assets/images/chai/masalachai.jpg";
/* Cold Drinks */
import cokeBottle from "../assets/images/colddrinks/coke-bottle.jpg";
import cokeCan from "../assets/images/colddrinks/coke-can.jpg";
import lemonCoke from "../assets/images/colddrinks/lemon-coke.jpg";
import lemonJuice from "../assets/images/colddrinks/lemon-jus.jpg";
import lemonWater from "../assets/images/colddrinks/lemon-water.jpg";
import orangeJuice from "../assets/images/colddrinks/orange-jus.jpg";
/* Ice Cream */
import butterScotchIceCream from "../assets/images/icecream/butterscotch.jpg";
import chocoChipsIceCream from "../assets/images/icecream/chocochips.jpg";
import chocolateIceCream from "../assets/images/icecream/chocolate.jpg";
import strawberryIceCream from "../assets/images/icecream/stawberry.jpg";
import vanillaIceCream from "../assets/images/icecream/vanilla.jpg";
import whiteMilkIceCream from "../assets/images/icecream/whitemilk.jpg";
/* Noddles */
import hakkaNoodles from "../assets/images/maggiNoddles/Hakka_Noodles.jpg";
import pastaNoodles from "../assets/images/maggiNoddles/pasta.jpg";
import redNoodles from "../assets/images/maggiNoddles/Red_Noddles.jpg";
import VegMaggiNoodles from "../assets/images/maggiNoddles/Veg_Maggi.jpg";
import VegSpicyNoodles from "../assets/images/maggiNoddles/Veg_Spisy.jpg";
import warpNoodles from "../assets/images/maggiNoddles/wrap.jpg";
/* Snacks */
import chipsSnacks from "../assets/images/snacks/chips.jpg";
import cookiesSnacks from "../assets/images/snacks/cookies.jpg";
import eggToastSnacks from "../assets/images/snacks/Egg_Toast.jpg";
import frenchFriesSnacks from "../assets/images/snacks/french_fries.jpg";
import hotChocolateSnacks from "../assets/images/snacks/hot_chocolate.jpg";
import toastAndOmeletteSnacks from "../assets/images/snacks/Toast_and_omlette.jpg";
/* Sandwich */
import chickenBugger from "../assets/images/sandwich/chicken_burgger.jpg";
import eggSandwich from "../assets/images/sandwich/egg_sandwich.jpg";
import redChillSandwich from "../assets/images/sandwich/Red_Chilli_sandwich.jpg";
import rotiRoll from "../assets/images/sandwich/roti_roll.jpg";
import vegBugger from "../assets/images/sandwich/veg_burgger.jpg";
/* Smoothies */
import blueBerrySmoothies from "../assets/images/smoothies/blueberry.jpg";
import butterScotchSmoothies from "../assets/images/smoothies/butterscotch.jpg";
import dragonFruitSmoothies from "../assets/images/smoothies/dragonfruit.jpg";
import mangoSmoothies from "../assets/images/smoothies/mango.jpg";
import strawberrySmoothies from "../assets/images/smoothies/strawberry.jpg";
import watermelonSmoothies from "../assets/images/smoothies/watermelon.jpg";
/* Menu List Symbols */
import cakeSymbol from "../assets/images/symbol/cake-Icon.jpg";
import coldDrinkSymbol from "../assets/images/symbol/cold-Icon.jpg";
import iceCreamSymbol from "../assets/images/symbol/icecream-Icon.jpg";
import noodlesSymbol from "../assets/images/symbol/noodle-Icon.jpg";
import sandwichSymbol from "../assets/images/symbol/snadwich-Icon.jpg";
import smoothiesSymbol from "../assets/images/symbol/smoothies-Icon.jpg";
import snacksSymbol from "../assets/images/symbol/snacks-Icon.jpg";
import taeSymbol from "../assets/images/symbol/chai-Icon.jpg";
/* Banner List */
import bannerLargeImage from "../assets/background/bannerLargeType.jpg";
import bannerMediumImage from "../assets/background/bannerMediumType.jpg";

export const menuList = [
    {
        id: 1,
        menuIcon: cakeSymbol,
        menuHeading: "Cakes",
        url: "cakes",
    },
    {
        id: 2,
        menuIcon: coldDrinkSymbol,
        menuHeading: "Cold Drinks",
        url: "coldDrinks",
    },
    {
        id: 3,
        menuIcon: iceCreamSymbol,
        menuHeading: "Ice Creams",
        url: "iceCreams",
    },
    {
        id: 4,
        menuIcon: noodlesSymbol,
        menuHeading: "Noodles",
        url: "noodles",
    },
    {
        id: 5,
        menuIcon: taeSymbol,
        menuHeading: "Chai & Coffee",
        url: "chaiAndCoffee",
    },
    {
        id: 6,
        menuIcon: snacksSymbol,
        menuHeading: "Snacks",
        url: "snacks",
    },
    {
        id: 7,
        menuIcon: sandwichSymbol,
        menuHeading: "Sandwich & Burger",
        url: "sandwichAndBurger",
    },
    {
        id: 8,
        menuIcon: smoothiesSymbol,
        menuHeading: "Smoothies",
        url: "smoothies",
    },
];

export const cake = [
    {
        id: 0,
        productImage: chocolateCake,
        productName: "Chocolate Cake",
        actualPrice: 400,
        totalPrice: 0,
        totalQuantity: 0,
        categories: menuList[0].url,
        isCustomizable: true,
        customizeOptions: [
            {
                title: "Add Message or Name",
                message: "",
            },
            {
                title: "Add Candles",
                candlesQuantity: 0,
                price: 0.5,
            },
        ]
    },
    {
        id: 1,
        productImage: butterCake,
        productName: "Butterscotch Cake",
        actualPrice: 350,
        totalPrice: 0,
        totalQuantity: 0,
        categories: menuList[0].url,
        isCustomizable: true,
        customizeOptions: [
            {
                title: "Add Message or Name",
                message: "",
            },
            {
                title: "Add Candles",
                candlesQuantity: 0,
                price: 0.5,
            },
        ]
    },
    {
        id: 2,
        productImage: mangoCake,
        productName: "Mango Cake",
        actualPrice: 350,
        totalPrice: 0,
        totalQuantity: 0,
        categories: menuList[0].url,
        isCustomizable: true,
        customizeOptions: [
            {
                title: "Add Message or Name",
                message: "",
            },
            {
                title: "Add Candles",
                candlesQuantity: 0,
                price: 0.5,
            },
        ]
    },
    {
        id: 3,
        productImage: pineCake,
        productName: "Pineapple Cake",
        actualPrice: 350,
        totalPrice: 0,
        totalQuantity: 0,
        categories: menuList[0].url,
        isCustomizable: true,
        customizeOptions: [
            {
                title: "Add Message or Name",
                message: "",
            },
            {
                title: "Add Candles",
                candlesQuantity: 0,
                price: 0.5,
            },
        ]
    },
    {
        id: 4,
        productImage: vanillaCake,
        productName: "Vanilla Cake",
        actualPrice: 300,
        totalPrice: 0,
        totalQuantity: 0,
        categories: menuList[0].url,
        isCustomizable: true,
        customizeOptions: [
            {
                title: "Add Message or Name",
                message: "",
            },
            {
                title: "Add Candles",
                candlesQuantity: 0,
                price: 0.5,
            },
        ]
    },
];
export const cold = [
    {
        id: 9,
        productImage: cokeBottle,
        productName: "Coke Bottle",
        totalPrice: 0,
        subCategories: [
            {title: "450ML", price: 20,}
        ],
        totalQuantity: 0,
        categories: menuList[1].url,
        isCustomizable: true,
        customizeOptions: [
            {title: "450ML", eatQuantity: 0, packQuantity: 0,},
        ]
    },
    {
        id: 10,
        productImage: cokeCan,
        productName: "Coke Can",
        totalPrice: 0,
        subCategories: [
            {title: "250ML", price: 30,}
        ],
        totalQuantity: 0,
        categories: menuList[1].url,
        isCustomizable: true,
        customizeOptions: [
            {title: "250ML", eatQuantity: 0, packQuantity: 0,},
        ]
    },
    {
        id: 11,
        productImage: lemonCoke,
        productName: "Lemon Coke",
        totalPrice: 0,
        subCategories: [
            {title: "Small 200ML", price: 25,},
            {title: "Large 450ML", price: 55,}
        ],
        totalQuantity: 0,
        categories: menuList[1].url,
        isCustomizable: true,
        customizeOptions: [
            {title: "200ML", eatQuantity: 0, packQuantity: 0,},
            {title: "450ML", eatQuantity: 0, packQuantity: 0,},
        ]
    },
    {
        id: 12,
        productImage: lemonJuice,
        productName: "Lemon Juice",
        totalPrice: 0,
        subCategories: [
            {title: "Small 200ML", price: 20,},
            {title: "Large 450ML", price: 45,}
        ],
        totalQuantity: 0,
        categories: menuList[1].url,
        isCustomizable: true,
        customizeOptions: [
            {title: "200ML", eatQuantity: 0, packQuantity: 0,},
            {title: "450ML", eatQuantity: 0, packQuantity: 0,},
        ]
    },
    {
        id: 13,
        productImage: lemonWater,
        productName: "Lemon Water",
        totalPrice: 0,
        subCategories: [
            {title: "Small 200ML", price: 20,},
            {title: "Large 450ML", price: 45,},
        ],
        totalQuantity: 0,
        categories: menuList[1].url,
        isCustomizable: true,
        customizeOptions: [
            {title: "200ML", eatQuantity: 0, packQuantity: 0,},
            {title: "450ML", eatQuantity: 0, packQuantity: 0,},
        ]
    },
    {
        id: 14,
        productImage: orangeJuice,
        productName: "Orange Juice",
        totalPrice: 0,
        subCategories: [
            {title: "Small 200ML", price: 30,},
            {title: "Large 450ML", price: 65,},
        ],
        totalQuantity: 0,
        categories: menuList[1].url,
        isCustomizable: true,
        customizeOptions: [
            {title: "200ML", eatQuantity: 0, packQuantity: 0,},
            {title: "450ML", eatQuantity: 0, packQuantity: 0,},
        ]
    },
];
export const iceCream = [
    {
        id: 15,
        productImage: butterScotchIceCream,
        productName: "Butterscotch Ice Cream",
        totalPrice: 0,
        subCategories: [
            {title: "Small 90GM", price: 40,},
            {title: "Large 150GM", price: 85,},
        ],
        totalQuantity: 0,
        categories: menuList[2].url,
        isCustomizable: true,
        customizeOptions: [
            {title: "90GM", eatQuantity: 0, packQuantity: 0,},
            {title: "150GM", eatQuantity: 0, packQuantity: 0,},
        ]
    },
    {
        id: 16,
        productImage: chocoChipsIceCream,
        productName: "Choco-Chips Ice Cream",
        totalPrice: 0,
        subCategories: [
            {title: "Small 90GM", price: 40,},
            {title: "Large 150GM", price: 85,},
        ],
        totalQuantity: 0,
        categories: menuList[2].url,
        isCustomizable: true,
        customizeOptions: [
            {title: "90GM", eatQuantity: 0, packQuantity: 0,},
            {title: "150GM", eatQuantity: 0, packQuantity: 0,},
        ]
    },
    {
        id: 17,
        productImage: chocolateIceCream,
        productName: "Chocolate Ice Cream",
        totalPrice: 0,
        subCategories: [
            {title: "Small 90GM", price: 40,},
            {title: "Large 150GM", price: 85,},
        ],
        totalQuantity: 0,
        categories: menuList[2].url,
        isCustomizable: true,
        customizeOptions: [
            {title: "90GM", eatQuantity: 0, packQuantity: 0,},
            {title: "150GM", eatQuantity: 0, packQuantity: 0,},
        ]
    },
    {
        id: 18,
        productImage: strawberryIceCream,
        productName: "Strawberry Ice Cream",
        totalPrice: 0,
        subCategories: [
            {title: "Small 90GM", price: 40,},
            {title: "Large 150GM", price: 85,},
        ],
        totalQuantity: 0,
        categories: menuList[2].url,
        isCustomizable: true,
        customizeOptions: [
            {title: "90GM", eatQuantity: 0, packQuantity: 0,},
            {title: "150GM", eatQuantity: 0, packQuantity: 0,},
        ]
    },
    {
        id: 19,
        productImage: vanillaIceCream,
        productName: "Vanilla Ice Cream",
        totalPrice: 0,
        subCategories: [
            {title: "Small 90GM", price: 40,},
            {title: "Large 150GM", price: 85,},
        ],
        totalQuantity: 0,
        categories: menuList[2].url,
        isCustomizable: true,
        customizeOptions: [
            {title: "90GM", eatQuantity: 0, packQuantity: 0,},
            {title: "150GM", eatQuantity: 0, packQuantity: 0,},
        ]
    },
    {
        id: 20,
        productImage: whiteMilkIceCream,
        productName: "White-Milk Ice Cream",
        totalPrice: 0,
        subCategories: [
            {title: "Small 90GM", price: 40,},
            {title: "Large 150GM", price: 85,},
        ],
        totalQuantity: 0,
        categories: menuList[2].url,
        isCustomizable: true,
        customizeOptions: [
            {title: "90GM", eatQuantity: 0, packQuantity: 0,},
            {title: "150GM", eatQuantity: 0, packQuantity: 0,},
        ]
    },
];
export const noodles = [
    {
        id: 21,
        productImage: hakkaNoodles,
        productName: "Plain Hakka Noodles",
        totalPrice: 0,
        subCategories: [
            {title: "Half", price: 50,},
            {title: "Full", price: 110,},
        ],
        totalQuantity: 0,
        categories: menuList[3].url,
        isCustomizable: true,
        customizeOptions: [
            {title: "Half", eatQuantity: 0, packQuantity: 0,},
            {title: "Full", eatQuantity: 0, packQuantity: 0,},
        ]
    },
    {
        id: 22,
        productImage: pastaNoodles,
        productName: "Red Sauce Spicy Pasta",
        totalPrice: 0,
        subCategories: [
            {title: "Half", price: 50,},
            {title: "Full", price: 110,},
        ],
        totalQuantity: 0,
        categories: menuList[3].url,
        isCustomizable: true,
        customizeOptions: [
            {title: "Half", eatQuantity: 0, packQuantity: 0,},
            {title: "Full", eatQuantity: 0, packQuantity: 0,},
        ]
    },
    {
        id: 23,
        productImage: redNoodles,
        productName: "Red Hakka Noodles",
        totalPrice: 0,
        subCategories: [
            {title: "Half", price: 40,},
            {title: "Full", price: 85,},
        ],
        totalQuantity: 0,
        categories: menuList[3].url,
        isCustomizable: true,
        customizeOptions: [
            {title: "Half", eatQuantity: 0, packQuantity: 0,},
            {title: "Full", eatQuantity: 0, packQuantity: 0,},
        ]
    },
    {
        id: 24,
        productImage: VegMaggiNoodles,
        productName: "Maggi",
        totalPrice: 0,
        subCategories: [
            {title: "Half", price: 30,},
            {title: "Full", price: 65,},
        ],
        totalQuantity: 0,
        categories: menuList[3].url,
        isCustomizable: true,
        customizeOptions: [
            {title: "Half", eatQuantity: 0, packQuantity: 0,},
            {title: "Full", eatQuantity: 0, packQuantity: 0,},
        ]
    },
    {
        id: 25,
        productImage: VegSpicyNoodles,
        productName: "Veg Hakka Spicy",
        totalPrice: 0,
        subCategories: [
            {title: "Half", price: 50,},
            {title: "Full", price: 110,},
        ],
        totalQuantity: 0,
        categories: menuList[3].url,
        isCustomizable: true,
        customizeOptions: [
            {title: "Half", eatQuantity: 0, packQuantity: 0,},
            {title: "Full", eatQuantity: 0, packQuantity: 0,},
        ]
    },
    {
        id: 26,
        productImage: warpNoodles,
        productName: "Omelette Maggi Wrap",
        totalPrice: 0,
        subCategories: [
            {title: "Half", price: 50,},
            {title: "Full", price: 110,},
        ],
        totalQuantity: 0,
        categories: menuList[3].url,
        isCustomizable: true,
        customizeOptions: [
            {title: "Half", eatQuantity: 0, packQuantity: 0,},
            {title: "Full", eatQuantity: 0, packQuantity: 0,},
        ],
    },
];
export const chai = [
    {
        id: 5,
        productImage: greenTea,
        productName: "Green Tea",
        totalPrice: 0,
        subCategories: [
            {title: "Small 100ML", price: 20,},
            {title: "Large 250ML", price: 45,},
        ],
        totalQuantity: 0,
        categories: menuList[4].url,
        isCustomizable: true,
        customizeOptions: [
            {title: "100ML", eatQuantity: 0, packQuantity: 0,},
            {title: "250ML", eatQuantity: 0, packQuantity: 0,},
        ]
    },
    {
        id: 6,
        productImage: lalTea,
        productName: "Lal Chai",
        totalPrice: 0,
        subCategories: [
            {title: "Small 100ML", price: 10,},
            {title: "Large 250ML", price: 20,},
        ],
        totalQuantity: 0,
        categories: menuList[4].url,
        isCustomizable: true,
        customizeOptions: [
            {title: "100ML", eatQuantity: 0, packQuantity: 0,},
            {title: "250ML", eatQuantity: 0, packQuantity: 0,},
        ]
    },
    {
        id: 7,
        productImage: lemonTea,
        productName: "Lemon Tea",
        totalPrice: 0,
        subCategories: [
            {title: "Small 100ML", price: 20,},
            {title: "Large 250ML", price: 40,},
        ],
        totalQuantity: 0,
        categories: menuList[4].url,
        isCustomizable: true,
        customizeOptions: [
            {title: "100ML", eatQuantity: 0, packQuantity: 0,},
            {title: "250ML", eatQuantity: 0, packQuantity: 0,},
        ]
    },
    {
        id: 8,
        productImage: masalaTea,
        productName: "Masala Chai",
        totalPrice: 0,
        subCategories: [
            {title: "Small 100ML", price: 30,},
            {title: "Large 250ML", price: 65,},
        ],
        totalQuantity: 0,
        categories: menuList[4].url,
        isCustomizable: true,
        customizeOptions: [
            {title: "100ML", eatQuantity: 0, packQuantity: 0,},
            {title: "250ML", eatQuantity: 0, packQuantity: 0,},
        ]
    },
];
export const snacks = [
    {
        id: 27,
        productImage: chipsSnacks,
        productName: "Chips",
        totalPrice: 0,
        subCategories: [
            {title: "1 PACK", price: 20,},
        ],
        totalQuantity: 0,
        categories: menuList[5].url,
        isCustomizable: true,
        customizeOptions: [
            {title: "1 PACK", eatQuantity: 0, packQuantity: 0,},
        ],
    },
    {
        id: 28,
        productImage: frenchFriesSnacks,
        productName: "French Fries",
        totalPrice: 0,
        subCategories: [
            {title: "Small", price: 40,},
            {title: "Double", price: 60,},
            {title: "Large", price: 80,},
        ],
        totalQuantity: 0,
        categories: menuList[5].url,
        isCustomizable: true,
        customizeOptions: [
            {title: "Small", eatQuantity: 0, packQuantity: 0,},
            {title: "Double", eatQuantity: 0, packQuantity: 0,},
            {title: "Large", eatQuantity: 0, packQuantity: 0,},
        ]
    },
    {
        id: 29,
        productImage: cookiesSnacks,
        productName: "Cookies",
        totalPrice: 0,
        subCategories: [
            {title: "1 PACK", price: 20,},
        ],
        totalQuantity: 0,
        categories: menuList[5].url,
        isCustomizable: true,
        customizeOptions: [
            {title: "1 PACK", eatQuantity: 0, packQuantity: 0,},
        ],
    },
    {
        id: 30,
        productImage: eggToastSnacks,
        productName: "Egg Toast",
        totalPrice: 0,
        subCategories: [
            {title: "Half", price: 30,},
            {title: "Double", price: 65,},
        ],
        totalQuantity: 0,
        categories: menuList[5].url,
        isCustomizable: true,
        customizeOptions: [
            {title: "Half", eatQuantity: 0, packQuantity: 0,},
            {title: "Double", eatQuantity: 0, packQuantity: 0,},
        ],
    },
    {
        id: 31,
        productImage: hotChocolateSnacks,
        productName: "Hot Chocolate",
        totalPrice: 0,
        subCategories: [
            {title: "1 CUP 250ML", price: 30,},
        ],
        totalQuantity: 0,
        categories: menuList[5].url,
        isCustomizable: true,
        customizeOptions: [
            {title: "1 CUP 250ML", eatQuantity: 0, packQuantity: 0,},
        ],
    },
    {
        id: 32,
        productImage: toastAndOmeletteSnacks,
        productName: "Toast and Omelette",
        totalPrice: 0,
        subCategories: [
            {title: "Half", price: 30,},
            {title: "Double", price: 65,},
        ],
        totalQuantity: 0,
        categories: menuList[5].url,
        isCustomizable: true,
        customizeOptions: [
            {title: "Half", eatQuantity: 0, packQuantity: 0,},
            {title: "Double", eatQuantity: 0, packQuantity: 0,},
        ]
    },
];
export const sandwich = [
    {
        id: 33,
        productImage: chickenBugger,
        productName: "Chicken Bugger",
        totalPrice: 0,
        subCategories: [
            {title: "1 BURGER", price: 40,},
        ],
        totalQuantity: 0,
        categories: menuList[6].url,
        isCustomizable: true,
        customizeOptions: [
            {title: "1 BURGER", eatQuantity: 0, packQuantity: 0,},
        ],
    },
    {
        id: 34,
        productImage: eggSandwich,
        productName: "Egg Sandwich",
        totalPrice: 0,
        subCategories: [
            {title: "1 SANDWICH", price: 30,},
        ],
        totalQuantity: 0,
        categories: menuList[6].url,
        isCustomizable: true,
        customizeOptions: [
            {title: "1 SANDWICH", eatQuantity: 0, packQuantity: 0,},
        ],
    },
    {
        id: 35,
        productImage: redChillSandwich,
        productName: "Red Chilli Sandwich",
        totalPrice: 0,
        subCategories: [
            {title: "1 SANDWICH", price: 35,},
        ],
        totalQuantity: 0,
        categories: menuList[6].url,
        isCustomizable: true,
        customizeOptions: [
            {title: "1 SANDWICH", eatQuantity: 0, packQuantity: 0,},
        ],
    },
    {
        id: 36,
        productImage: rotiRoll,
        productName: "Roti Roll",
        totalPrice: 0,
        subCategories: [
            {title: "1 ROLL", price: 25,},
        ],
        totalQuantity: 0,
        categories: menuList[6].url,
        isCustomizable: true,
        customizeOptions: [
            {title: "1 ROLL", eatQuantity: 0, packQuantity: 0,},
        ],
    },
    {
        id: 37,
        productImage: vegBugger,
        productName: "Veg Burger",
        totalPrice: 0,
        subCategories: [
            {title: "1 ROLL", price: 35,},
        ],
        totalQuantity: 0,
        categories: menuList[6].url,
        isCustomizable: true,
        customizeOptions: [
            {title: "1 ROLL", eatQuantity: 0, packQuantity: 0,},
        ],
    },
];
export const smoothies = [
    {
        id: 38,
        productImage: blueBerrySmoothies,
        productName: "Blueberry Smoothies",
        totalPrice: 0,
        subCategories: [
            {title: "Small 250ML", price: 40,},
            {title: "Medium 450ML", price: 55,},
            {title: "Large 750ML", price: 75,},
        ],
        totalQuantity: 0,
        categories: menuList[7].url,
        isCustomizable: true,
        customizeOptions: [
            {title: "250ML", eatQuantity: 0, packQuantity: 0,},
            {title: "450ML", eatQuantity: 0, packQuantity: 0,},
            {title: "750ML", eatQuantity: 0, packQuantity: 0,},
        ]
    },
    {
        id: 39,
        productImage: butterScotchSmoothies,
        productName: "Butterscotch Smoothies",
        totalPrice: 0,
        subCategories: [
            {title: "Small 250ML", price: 40,},
            {title: "Medium 450ML", price: 55,},
            {title: "Large 750ML", price: 75,},
        ],
        totalQuantity: 0,
        categories: menuList[7].url,
        isCustomizable: true,
        customizeOptions: [
            {title: "250ML", eatQuantity: 0, packQuantity: 0,},
            {title: "450ML", eatQuantity: 0, packQuantity: 0,},
            {title: "750ML", eatQuantity: 0, packQuantity: 0,},
        ]
    },
    {
        id: 40,
        productImage: dragonFruitSmoothies,
        productName: "Dragon Fruit Smoothies",
        totalPrice: 0,
        subCategories: [
            {title: "Small 250ML", price: 40,},
            {title: "Medium 450ML", price: 55,},
            {title: "Large 750ML", price: 75,},
        ],
        totalQuantity: 0,
        categories: menuList[7].url,
        isCustomizable: true,
        customizeOptions: [
            {title: "250ML", eatQuantity: 0, packQuantity: 0,},
            {title: "450ML", eatQuantity: 0, packQuantity: 0,},
            {title: "750ML", eatQuantity: 0, packQuantity: 0,},
        ]
    },
    {
        id: 41,
        productImage: mangoSmoothies,
        productName: "Mango Smoothies",
        totalPrice: 0,
        subCategories: [
            {title: "Small 250ML", price: 40,},
            {title: "Medium 450ML", price: 55,},
            {title: "Large 750ML", price: 75,},
        ],
        totalQuantity: 0,
        categories: menuList[7].url,
        isCustomizable: true,
        customizeOptions: [
            {title: "250ML", eatQuantity: 0, packQuantity: 0,},
            {title: "450ML", eatQuantity: 0, packQuantity: 0,},
            {title: "750ML", eatQuantity: 0, packQuantity: 0,},
        ]
    },
    {
        id: 42,
        productImage: strawberrySmoothies,
        productName: "Strawberry Smoothies",
        totalPrice: 0,
        subCategories: [
            {title: "Small 250ML", price: 40,},
            {title: "Medium 450ML", price: 55,},
            {title: "Large 750ML", price: 75,},
        ],
        totalQuantity: 0,
        categories: menuList[7].url,
        isCustomizable: true,
        customizeOptions: [
            {title: "250ML", eatQuantity: 0, packQuantity: 0,},
            {title: "450ML", eatQuantity: 0, packQuantity: 0,},
            {title: "750ML", eatQuantity: 0, packQuantity: 0,},
        ]
    },
    {
        id: 43,
        productImage: watermelonSmoothies,
        productName: "Watermelon Smoothies",
        totalPrice: 0,
        subCategories: [
            {title: "Small 250ML", price: 40,},
            {title: "Medium 450ML", price: 55,},
            {title: "Large 750ML", price: 75,},
        ],
        totalQuantity: 0,
        categories: menuList[7].url,
        isCustomizable: true,
        customizeOptions: [
            {title: "250ML", eatQuantity: 0, packQuantity: 0,},
            {title: "450ML", eatQuantity: 0, packQuantity: 0,},
            {title: "750ML", eatQuantity: 0, packQuantity: 0,},
        ]
    },
];

export const topOrders = [chai[2], iceCream[3], cake[2], sandwich[2], noodles[2], smoothies[2]];

//2023-12-28-16-11-00
export const couponList = [
    {
        id: 1,
        discount: 15,
        couponCode: "MRUJB9",
        type: "on-Product",
        endDate: "2024-01-10-01-00-00",
        validProduct: [17, 18, 15, 28, 30, 27],
        isHide: false,
    },
    {
        id: 2,
        discount: 25,
        couponCode: "NGHMQG",
        type: "on-Product",
        endDate: "2024-01-10-01-00-00",
        validProduct: [9, 10, 12, 14],
        isHide: false,
    },
    {
        id: 3,
        discount: 35,
        couponCode: "H4V7TR",
        type: "on-Product",
        endDate: "2024-01-10-01-00-00",
        validProduct: [0, 2, 4],
        isHide: false,
    },
    {
        id: 4,
        discount: 20,
        couponCode: "CVGG8Q",
        type: "on-Product",
        endDate: "2024-01-10-01-00-00",
        validProduct: [38, 40, 42, 34, 33, 36],
        isHide: false,
    },
    {
        id: 5,
        discount: 8,
        couponCode: "Q4R51G",
        type: "on-Product",
        endDate: "2024-01-10-01-00-00",
        validProduct: [6, 7],
        isHide: false,
    },
    {
        id: 6,
        discount: 30,
        couponCode: "3000DC",
        type: "on-Purchase",
        endDate: "2024-01-10-01-00-00",
        purchaseLimit: 3000,
        isHide: false,
    },
    {
        id: 7,
        discount: 20,
        couponCode: "2500XO",
        type: "on-Purchase",
        endDate: "2024-01-10-01-00-00",
        purchaseLimit: 2500,
        isHide: false,
    },
];

