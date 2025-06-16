
export interface categorySchema {
    name: string,
    url: string,
    id: number,
}


export const categories: categorySchema[] = [
    {
        name: "Burgers",
        url: "https://img.freepik.com/free-photo/top-view-hamburger-plate_23-2148263001.jpg",
        id: 1
    },
    {
        name: "Pizzas",
        url: "/pizza.png",
        id: 2
    },
    {
        name: "Fries",
        url: "https://www.simplyrecipes.com/thmb/MDEiuGvXNqCBBwNFHvz5vqlc0rI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Crispy-French-Fries-LEAD-01-fa6a74d4412a41348e68d17ac200dc7f.jpg",
        id: 3
    },
    {
        name: "Drinks",
        url: "https://ph-test-11.slatic.net/p/5d8f4c7cdfc50018c8979dfd310a1ae6.jpg",
        id: 4
    },
    {
        name: "Desserts",
        url: "https://sugargeekshow.com/wp-content/uploads/2023/10/easy_chocolate_cake_slice-500x500.jpg",
        id: 5
    },
    {
        name: "Salads",
        url: "https://cdn.jwplayer.com/v2/media/wGEqBtuf/thumbnails/qSXwlEH3.jpg?width=1280",
        id: 6
    },
    {
        name: "Wings",
        url: "https://images.getrecipekit.com/20240103192542-buffalo-chicken-wings.jpg?width=650&quality=90&",
        id: 7
    },
    {
        name: "Tacos",
        url: "https://www.thefoodinmybeard.com/content/taco/whitepeople/wpt10.jpg",
        id: 8
    },
    {
        name: "Pastas",
        url: "https://assets.epicurious.com/photos/5988e3458e3ab375fe3c0caf/1:1/w_3607,h_3607,c_limit/How-to-Make-Chicken-Alfredo-Pasta-hero-02082017.jpg",
        id: 9
    }
]