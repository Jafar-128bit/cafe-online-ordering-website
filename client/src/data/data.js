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
    },
    {
        id: 2,
        menuIcon: coldDrinkSymbol,
        menuHeading: "Cold Drinks",
    },
    {
        id: 3,
        menuIcon: iceCreamSymbol,
        menuHeading: "Ice Creams",
    },
    {
        id: 4,
        menuIcon: noodlesSymbol,
        menuHeading: "Noodles",
    },
    {
        id: 5,
        menuIcon: taeSymbol,
        menuHeading: "Chai & Coffee",
    },
    {
        id: 6,
        menuIcon: snacksSymbol,
        menuHeading: "Snacks",
    },
    {
        id: 7,
        menuIcon: sandwichSymbol,
        menuHeading: "Sandwich & Burger",
    },
    {
        id: 8,
        menuIcon: smoothiesSymbol,
        menuHeading: "Smoothies",
    },
];

export const cake = [
    {
        id: 0,
        productImage: chocolateCake,
        productName: "Chocolate Cake",
        price: 400,
        categories: menuList[0].menuHeading,
    },
    {
        id: 1,
        productImage: butterCake,
        productName: "Butterscotch Cake",
        price: 350,
        categories: menuList[0].menuHeading,
    },
    {
        id: 2,
        productImage: mangoCake,
        productName: "Mango Cake",
        price: 350,
        categories: menuList[0].menuHeading,
    },
    {
        id: 3,
        productImage: pineCake,
        productName: "Pineapple Cake",
        price: 350,
        categories: menuList[0].menuHeading,
    },
    {
        id: 4,
        productImage: vanillaCake,
        productName: "Vanilla Cake",
        price: 300,
        categories: menuList[0].menuHeading,
    },
];
export const cold = [
    {
        id: 9,
        productImage: cokeBottle,
        productName: "Coke Bottle",
        price: 20,
        categories: menuList[1].menuHeading,
    },
    {
        id: 10,
        productImage: cokeCan,
        productName: "Coke Can",
        price: 30,
        categories: menuList[1].menuHeading,
    },
    {
        id: 11,
        productImage: lemonCoke,
        productName: "Lemon Coke",
        price: 25,
        categories: menuList[1].menuHeading,
    },
    {
        id: 12,
        productImage: lemonJuice,
        productName: "Lemon Juice",
        price: 20,
        categories: menuList[1].menuHeading,
    },
    {
        id: 13,
        productImage: lemonWater,
        productName: "Lemon Water",
        price: 20,
        categories: menuList[1].menuHeading,
    },
    {
        id: 14,
        productImage: orangeJuice,
        productName: "Orange Juice",
        price: 30,
        categories: "",
    },
];
export const iceCream = [
    {
        id: 15,
        productImage: butterScotchIceCream,
        productName: "Butterscotch",
        price: 40,
        categories: menuList[2].menuHeading,
    },
    {
        id: 16,
        productImage: chocoChipsIceCream,
        productName: "Choco-Chips",
        price: 40,
        categories: menuList[2].menuHeading,
    },
    {
        id: 17,
        productImage: chocolateIceCream,
        productName: "Chocolate",
        price: 40,
        categories: menuList[2].menuHeading,
    },
    {
        id: 18,
        productImage: strawberryIceCream,
        productName: "Strawberry",
        price: 30,
        categories: menuList[2].menuHeading,
    },
    {
        id: 19,
        productImage: vanillaIceCream,
        productName: "Vanilla",
        price: 30,
        categories: menuList[2].menuHeading,
    },
    {
        id: 20,
        productImage: whiteMilkIceCream,
        productName: "White-Milk",
        price: 30,
        categories: menuList[2].menuHeading,
    },
];
export const noodles = [
    {
        id: 21,
        productImage: hakkaNoodles,
        productName: "Plain Hakka Noodles",
        price: 50,
        categories: menuList[3].menuHeading,
    },
    {
        id: 22,
        productImage: pastaNoodles,
        productName: "Red Sauce Spicy Pasta",
        price: 50,
        categories: menuList[3].menuHeading,
    },
    {
        id: 23,
        productImage: redNoodles,
        productName: "Red Hakka Noodles",
        price: 40,
        categories: menuList[3].menuHeading,
    },
    {
        id: 24,
        productImage: VegMaggiNoodles,
        productName: "Maggi",
        price: 30,
        categories: menuList[3].menuHeading,
    },
    {
        id: 25,
        productImage: VegSpicyNoodles,
        productName: "Veg Hakka Spicy",
        price: 50,
        categories: menuList[3].menuHeading,
    },
    {
        id: 26,
        productImage: warpNoodles,
        productName: "Omelette Maggi Wrap",
        price: 50,
        categories: menuList[3].menuHeading,
    },
];
export const chai = [
    {
        id: 5,
        productImage: greenTea,
        productName: "Green Tea",
        price: 20,
        categories: menuList[4].menuHeading,
    },
    {
        id: 6,
        productImage: lalTea,
        productName: "Lal Chai",
        price: 10,
        categories: menuList[4].menuHeading,
    },
    {
        id: 7,
        productImage: lemonTea,
        productName: "Lemon Tea",
        price: 20,
        categories: menuList[4].menuHeading,
    },
    {
        id: 8,
        productImage: masalaTea,
        productName: "Masala Chai",
        price: 30,
        categories: menuList[4].menuHeading,
    },
];
export const snacks = [
    {
        id: 27,
        productImage: chipsSnacks,
        productName: "Chips",
        price: 20,
        categories: menuList[5].menuHeading,
    },
    {
        id: 28,
        productImage: frenchFriesSnacks,
        productName: "French Fries",
        price: 40,
        categories: menuList[5].menuHeading,
    },
    {
        id: 29,
        productImage: cookiesSnacks,
        productName: "Cookies",
        price: 20,
        categories: menuList[5].menuHeading,
    },
    {
        id: 30,
        productImage: eggToastSnacks,
        productName: "Egg Toast",
        price: 30,
        categories: menuList[5].menuHeading,
    },
    {
        id: 31,
        productImage: hotChocolateSnacks,
        productName: "Hot Chocolate",
        price: 30,
        categories: menuList[5].menuHeading,
    },
    {
        id: 32,
        productImage: toastAndOmeletteSnacks,
        productName: "Toast and Omelette",
        price: 30,
        categories: menuList[5].menuHeading,
    },
];
export const sandwich = [
    {
        id: 33,
        productImage: chickenBugger,
        productName: "Chicken Bugger",
        price: 40,
        categories: menuList[6].menuHeading,
    },
    {
        id: 34,
        productImage: eggSandwich,
        productName: "Egg Sandwich",
        price: 30,
        categories: menuList[6].menuHeading,
    },
    {
        id: 35,
        productImage: redChillSandwich,
        productName: "Red Chilli Sandwich",
        price: 35,
        categories: menuList[6].menuHeading,
    },
    {
        id: 36,
        productImage: rotiRoll,
        productName: "Roti Roll",
        price: 25,
        categories: menuList[6].menuHeading,
    },
    {
        id: 37,
        productImage: vegBugger,
        productName: "Veg Burger",
        price: 35,
        categories: menuList[6].menuHeading,
    },
];
export const smoothies = [
    {
        id: 38,
        productImage: blueBerrySmoothies,
        productName: "Blubbery Smoothies",
        price: 40,
        categories: menuList[7].menuHeading,
    },
    {
        id: 39,
        productImage: butterScotchSmoothies,
        productName: "Butterscotch Smoothies",
        price: 30,
        categories: menuList[7].menuHeading,
    },
    {
        id: 40,
        productImage: dragonFruitSmoothies,
        productName: "Dragon Fruit Smoothies",
        price: 70,
        categories: menuList[7].menuHeading,
    },
    {
        id: 41,
        productImage: mangoSmoothies,
        productName: "Mango Smoothies",
        price: 50,
        categories: menuList[7].menuHeading,
    },
    {
        id: 42,
        productImage: strawberrySmoothies,
        productName: "Strawberry Smoothies",
        price: 60,
        categories: menuList[7].menuHeading,
    },
    {
        id: 43,
        productImage: watermelonSmoothies,
        productName: "Watermelon Smoothies",
        price: 40,
        categories: menuList[7].menuHeading,
    },
];

export const topOrders = [chai[2], iceCream[0], snacks[3], sandwich[1], noodles[3], smoothies[0]];

export const bannerData = [
    {
        id: 0,
        bannerImage: bannerMediumImage,
        bannerTitle: "New-Year's Special",
        discount: 20,
        bannerEndTime: "2024-01-06-12-00-00",
        bannerType: "medium",
        bannerLink: "/menu"
    },
    {
        id: 2,
        bannerImage: bannerLargeImage,
        bannerTitle: "Winter-Cafe",
        discount: 20,
        bannerEndTime: "2024-01-15-12-00-00",
        bannerType: "large",
        bannerLink: "/menu"
    },
];

//2023-12-28-16-11-00
export const couponList = [
    {
        id: 1,
        discount: 15,
        couponCode: "MRUJB9",
        type: "on-Product",
        endDate: "2024-01-04-01-00-00",
        validProduct: [17, 18, 15, 28, 30, 27],
        isHide: false,
    },
    {
        id: 2,
        discount: 25,
        couponCode: "NGHMQG",
        type: "on-Product",
        endDate: "2024-01-04-01-00-00",
        validProduct: [9, 10, 12, 14],
        isHide: false,
    },
    {
        id: 3,
        discount: 35,
        couponCode: "H4V7TR",
        type: "on-Product",
        endDate: "2024-01-04-01-00-00",
        validProduct: [0, 2, 4],
        isHide: false,
    },
    {
        id: 4,
        discount: 20,
        couponCode: "CVGG8Q",
        type: "on-Product",
        endDate: "2024-01-04-01-00-00",
        validProduct: [38, 40, 42, 34, 33, 36],
        isHide: false,
    },
    {
        id: 5,
        discount: 8,
        couponCode: "Q4R51G",
        type: "on-Product",
        endDate: "2024-01-04-01-00-00",
        validProduct: [6, 7],
        isHide: false,
    },
    {
        id: 6,
        discount: 30,
        couponCode: "3000DC",
        type: "on-Purchase",
        endDate: "2024-01-04-01-00-00",
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

