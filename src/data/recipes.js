const featuredRecipes = [
  {
    id: 1,
    title: "Creamy Garlic Pasta",
    category: "Dinner",
    type: "Veg",
    difficulty: "Easy",
    time: 25,
    rating: 4.9,
    ratingsCount: 128,
    preparationTime: 10,
    cookingTime: 15,
    cuisine: "Italian",
    servings: 4,
    youtubeUrl: "https://www.youtube.com/watch?v=Y7bKXjC1p5k",
    author: "Ananya",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80",
    description: "Creamy, comforting pasta packed with garlic and herbs.",
    ingredients: ["200g pasta", "4 garlic cloves", "1 cup cream", "2 tbsp butter", "Parmesan", "Italian herbs"],
    steps: ["Boil pasta until al dente.", "Sauté garlic in butter.", "Add cream and herbs.", "Mix pasta into the sauce.", "Top with Parmesan and serve."]
  },
  {
    id: 2,
    title: "Classic Margherita Pizza",
    category: "Italian",
    type: "Veg",
    difficulty: "Medium",
    time: 40,
    rating: 4.8,
    ratingsCount: 96,
    preparationTime: 20,
    cookingTime: 20,
    cuisine: "Italian",
    servings: 4,
    youtubeUrl: "https://www.youtube.com/watch?v=sv3TXMSv6Lw",
    author: "Rahul",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80",
    description: "A simple pizza with tomato, mozzarella and fresh basil.",
    ingredients: ["Pizza dough", "Tomato sauce", "Mozzarella", "Fresh basil", "Olive oil"],
    steps: ["Stretch the dough.", "Spread tomato sauce.", "Add mozzarella.", "Bake until golden.", "Finish with basil and olive oil."]
  },
  {
    id: 3,
    title: "Fresh Garden Salad",
    category: "Healthy",
    type: "Veg",
    difficulty: "Easy",
    time: 15,
    rating: 4.7,
    ratingsCount: 74,
    preparationTime: 15,
    cookingTime: 0,
    cuisine: "International",
    servings: 2,
    youtubeUrl: "https://www.youtube.com/watch?v=JgM2kE9wN2E",
    author: "Meera",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    description: "A colorful and refreshing salad for a healthy meal.",
    ingredients: ["Lettuce", "Cucumber", "Tomato", "Onion", "Corn", "Lemon dressing"],
    steps: ["Wash all vegetables.", "Chop into bite-sized pieces.", "Add corn.", "Mix with lemon dressing.", "Serve fresh."]
  },
  {
    id: 4,
    title: "Chocolate Lava Cake",
    category: "Dessert",
    type: "Veg",
    difficulty: "Medium",
    time: 30,
    rating: 4.9,
    ratingsCount: 211,
    preparationTime: 15,
    cookingTime: 15,
    cuisine: "French",
    servings: 2,
    youtubeUrl: "https://www.youtube.com/watch?v=Sc0F5xM7YJo",
    author: "Priya",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80",
    description: "Warm chocolate cake with a rich molten center.",
    ingredients: ["Dark chocolate", "Butter", "Eggs", "Sugar", "Flour", "Cocoa powder"],
    steps: ["Melt chocolate and butter.", "Whisk eggs and sugar.", "Combine mixtures.", "Add flour and cocoa.", "Bake briefly and serve warm."]
  },
  {
    id: 5,
    title: "South Indian Veg Biryani",
    category: "Indian",
    type: "Veg",
    difficulty: "Medium",
    time: 50,
    rating: 4.8,
    ratingsCount: 153,
    preparationTime: 20,
    cookingTime: 30,
    cuisine: "Indian",
    servings: 4,
    youtubeUrl: "https://www.youtube.com/watch?v=6Xl4Z8g7Ffc",
    author: "Karthik",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=900&q=80",
    description: "Fragrant rice cooked with vegetables and aromatic spices.",
    ingredients: ["Basmati rice", "Mixed vegetables", "Onion", "Tomato", "Biryani spices", "Mint"],
    steps: ["Wash and soak rice.", "Sauté onion and spices.", "Add vegetables.", "Add rice and water.", "Cook covered until fluffy."]
  },
  {
    id: 6,
    title: "Chicken Burger",
    category: "Fast Food",
    type: "Non-Veg",
    difficulty: "Easy",
    time: 30,
    rating: 4.6,
    ratingsCount: 58,
    preparationTime: 15,
    cookingTime: 15,
    cuisine: "American",
    servings: 2,
    youtubeUrl: "https://www.youtube.com/watch?v=2w7yT4S5m8A",
    author: "Vijay",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
    description: "Crispy chicken burger with fresh vegetables and sauce.",
    ingredients: ["Chicken patty", "Burger bun", "Lettuce", "Tomato", "Cheese", "Burger sauce"],
    steps: ["Cook the chicken patty.", "Toast the bun.", "Layer lettuce and tomato.", "Add chicken and cheese.", "Finish with sauce and serve."]
  },
  {
    id: 7,
    title: "Masala Dosa",
    category: "Breakfast",
    type: "Veg",
    difficulty: "Medium",
    time: 35,
    rating: 4.8,
    ratingsCount: 89,
    preparationTime: 15,
    cookingTime: 20,
    cuisine: "South Indian",
    servings: 4,
    youtubeUrl: "",
    author: "Meera",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=900&q=80",
    description: "Crisp golden dosa filled with warmly spiced potato masala.",
    ingredients: ["Dosa batter", "Potatoes", "Onion", "Mustard seeds", "Curry leaves", "Turmeric"],
    steps: ["Boil and lightly mash the potatoes.", "Temper mustard seeds and curry leaves.", "Cook onion with turmeric and mix in the potatoes.", "Spread batter thinly on a hot pan.", "Add the filling, fold, and serve hot."]
  },
  {
    id: 8,
    title: "Paneer Butter Masala",
    category: "Indian",
    type: "Veg",
    difficulty: "Medium",
    time: 40,
    rating: 4.9,
    ratingsCount: 112,
    preparationTime: 15,
    cookingTime: 25,
    cuisine: "North Indian",
    servings: 4,
    youtubeUrl: "",
    author: "Arjun",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=80",
    description: "Paneer simmered in a velvety tomato and cashew sauce.",
    ingredients: ["Paneer", "Tomatoes", "Cashews", "Butter", "Cream", "Garam masala"],
    steps: ["Soak cashews and blend with cooked tomatoes.", "Warm butter and toast the spices.", "Stir in the tomato-cashew sauce and simmer.", "Add paneer and a splash of cream.", "Simmer gently and serve with naan or rice."]
  },
  {
    id: 9,
    title: "Lemon Rice",
    category: "Lunch",
    type: "Veg",
    difficulty: "Easy",
    time: 20,
    rating: 4.7,
    ratingsCount: 63,
    preparationTime: 5,
    cookingTime: 15,
    cuisine: "South Indian",
    servings: 3,
    youtubeUrl: "",
    author: "Karthik",
    image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=900&q=80",
    description: "Bright, tangy rice finished with curry leaves and roasted peanuts.",
    ingredients: ["Cooked rice", "Lemon", "Peanuts", "Mustard seeds", "Curry leaves", "Turmeric"],
    steps: ["Fluff the cooked rice and let it cool slightly.", "Toast mustard seeds and peanuts in oil.", "Add curry leaves and turmeric.", "Fold in the rice and lemon juice.", "Taste, adjust the seasoning, and serve."]
  },
  {
    id: 10,
    title: "Mango Lassi",
    category: "Drinks",
    type: "Veg",
    difficulty: "Easy",
    time: 5,
    rating: 4.8,
    ratingsCount: 51,
    preparationTime: 5,
    cookingTime: 0,
    cuisine: "Indian",
    servings: 2,
    youtubeUrl: "",
    author: "Priya",
    image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=900&q=80",
    description: "A chilled yogurt drink blended with ripe mango and cardamom.",
    ingredients: ["Ripe mango", "Plain yogurt", "Milk", "Honey", "Cardamom"],
    steps: ["Peel and dice the ripe mango.", "Blend mango with yogurt and a little milk.", "Sweeten with honey and add cardamom.", "Blend until smooth and chill briefly.", "Pour into glasses and serve cold."]
  }
];

const additionalRecipes = [
  {
    title: "Fluffy Buttermilk Pancakes", category: "Breakfast", type: "Veg", difficulty: "Easy", preparationTime: 10, cookingTime: 15, cuisine: "American", servings: 4, author: "Nila",
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=900&q=80", description: "Soft, golden pancakes with crisp edges and a tender center.",
    ingredients: ["Flour", "Buttermilk", "Egg", "Baking powder", "Butter", "Maple syrup"], steps: ["Whisk flour and baking powder.", "Stir in buttermilk, egg, and melted butter.", "Cook small rounds on a warm pan until bubbles form.", "Flip and cook until golden.", "Serve with maple syrup."]
  },
  {
    title: "Avocado Egg Toast", category: "Breakfast", type: "Veg", difficulty: "Easy", preparationTime: 5, cookingTime: 8, cuisine: "Modern American", servings: 2, author: "Leah",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80", description: "Creamy avocado and a just-cooked egg on crunchy toast.",
    ingredients: ["Sourdough bread", "Ripe avocado", "Eggs", "Lemon juice", "Chili flakes", "Salt"], steps: ["Toast the bread until crisp.", "Mash avocado with lemon and salt.", "Fry or poach the eggs.", "Spread avocado over toast.", "Top with egg and chili flakes."]
  },
  {
    title: "Classic Shakshuka", category: "Breakfast", type: "Veg", difficulty: "Medium", preparationTime: 10, cookingTime: 25, cuisine: "North African", servings: 3, author: "Omar",
    image: "https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=900&q=80", description: "Eggs gently cooked in a smoky tomato and pepper sauce.",
    ingredients: ["Eggs", "Crushed tomatoes", "Red pepper", "Onion", "Cumin", "Paprika"], steps: ["Soften onion and pepper in a skillet.", "Add cumin, paprika, and tomatoes.", "Simmer until the sauce thickens.", "Make wells and add the eggs.", "Cover until the whites are set."]
  },
  {
    title: "Blueberry Overnight Oats", category: "Breakfast", type: "Veg", difficulty: "Easy", preparationTime: 10, cookingTime: 0, cuisine: "International", servings: 2, author: "Leah",
    image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=900&q=80", description: "A cool, make-ahead oat breakfast with berries and yogurt.",
    ingredients: ["Rolled oats", "Milk", "Greek yogurt", "Blueberries", "Chia seeds", "Honey"], steps: ["Combine oats, milk, yogurt, and chia seeds.", "Divide into jars and cover.", "Refrigerate overnight.", "Top with blueberries and honey.", "Serve chilled."]
  },
  {
    title: "Garden Greek Salad", category: "Lunch", type: "Veg", difficulty: "Easy", preparationTime: 15, cookingTime: 0, cuisine: "Greek", servings: 4, author: "Sofia",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80", description: "Cucumber, tomato, olives, and feta tossed in lemony dressing.",
    ingredients: ["Cucumber", "Tomatoes", "Red onion", "Kalamata olives", "Feta", "Olive oil"], steps: ["Chop the cucumber and tomatoes.", "Thinly slice the onion.", "Combine vegetables and olives.", "Whisk olive oil with lemon and oregano.", "Add feta and toss gently."]
  },
  {
    title: "Crispy Falafel Pitas", category: "Lunch", type: "Veg", difficulty: "Medium", preparationTime: 20, cookingTime: 15, cuisine: "Middle Eastern", servings: 4, author: "Omar",
    image: "https://images.unsplash.com/photo-1593001874117-c99c800e3eb3?auto=format&fit=crop&w=900&q=80", description: "Herby chickpea falafel tucked into pita with fresh vegetables.",
    ingredients: ["Chickpeas", "Parsley", "Garlic", "Cumin", "Pita bread", "Tahini"], steps: ["Pulse chickpeas with herbs, garlic, and cumin.", "Shape the mixture into small patties.", "Pan-fry until crisp and cooked through.", "Warm the pita bread.", "Fill with falafel, vegetables, and tahini."]
  },
  {
    title: "Vegetable Fried Rice", category: "Lunch", type: "Veg", difficulty: "Easy", preparationTime: 10, cookingTime: 12, cuisine: "Chinese", servings: 3, author: "Wei",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=80", description: "Quick wok-fried rice with crisp vegetables and savory soy.",
    ingredients: ["Cooked rice", "Carrots", "Peas", "Spring onions", "Soy sauce", "Sesame oil"], steps: ["Use cold cooked rice and break up any clumps.", "Stir-fry carrots and peas in a hot wok.", "Add rice and toss until hot.", "Season with soy sauce and sesame oil.", "Finish with spring onions."]
  },
  {
    title: "Creamy Tomato Soup", category: "Lunch", type: "Veg", difficulty: "Easy", preparationTime: 10, cookingTime: 25, cuisine: "American", servings: 4, author: "Nila",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80", description: "A smooth tomato soup with basil and a touch of cream.",
    ingredients: ["Ripe tomatoes", "Onion", "Vegetable stock", "Basil", "Cream", "Black pepper"], steps: ["Cook onion until soft.", "Add chopped tomatoes and stock.", "Simmer until the tomatoes collapse.", "Blend until smooth.", "Stir in cream and basil before serving."]
  },
  {
    title: "Chana Masala", category: "Indian", type: "Veg", difficulty: "Medium", preparationTime: 10, cookingTime: 30, cuisine: "North Indian", servings: 4, author: "Arjun",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=80", description: "Chickpeas simmered in a tangy tomato and warming spice gravy.",
    ingredients: ["Chickpeas", "Tomatoes", "Onion", "Ginger", "Chana masala", "Cilantro"], steps: ["Cook onion, ginger, and spices until fragrant.", "Add chopped tomatoes and cook into a thick sauce.", "Stir in chickpeas and a little water.", "Simmer for 20 minutes.", "Finish with cilantro and lemon."]
  },
  {
    title: "Chicken Tikka", category: "Dinner", type: "Non-Veg", difficulty: "Medium", preparationTime: 20, cookingTime: 20, cuisine: "Indian", servings: 4, author: "Vijay",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=900&q=80", description: "Yogurt-marinated chicken pieces grilled with fragrant spices.",
    ingredients: ["Chicken", "Plain yogurt", "Ginger-garlic paste", "Lemon", "Garam masala", "Paprika"], steps: ["Mix yogurt, lemon, and spices.", "Coat chicken and marinate for at least 30 minutes.", "Thread pieces onto skewers.", "Grill or broil, turning once, until cooked through.", "Rest briefly and serve with mint chutney."]
  },
  {
    title: "Weeknight Chicken Curry", category: "Dinner", type: "Non-Veg", difficulty: "Medium", preparationTime: 15, cookingTime: 35, cuisine: "Indian", servings: 4, author: "Karthik",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=80", description: "Tender chicken cooked in a homestyle onion and tomato curry.",
    ingredients: ["Chicken thighs", "Onion", "Tomatoes", "Ginger", "Coriander powder", "Coconut milk"], steps: ["Brown the chicken and set it aside.", "Cook onion, ginger, and spices until golden.", "Add tomatoes and simmer into a sauce.", "Return chicken and add coconut milk.", "Cover and cook until tender."]
  },
  {
    title: "Beef and Vegetable Stew", category: "Dinner", type: "Non-Veg", difficulty: "Medium", preparationTime: 20, cookingTime: 100, cuisine: "Irish", servings: 5, author: "Maya",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=900&q=80", description: "Slow-simmered beef with potatoes, carrots, and rich broth.",
    ingredients: ["Beef chuck", "Potatoes", "Carrots", "Onion", "Beef stock", "Thyme"], steps: ["Brown beef in a heavy pot.", "Soften onion and add the stock.", "Cover and simmer until beef begins to soften.", "Add potatoes, carrots, and thyme.", "Cook until tender and season to taste."]
  },
  {
    title: "Black Bean Tacos", category: "Dinner", type: "Veg", difficulty: "Easy", preparationTime: 10, cookingTime: 15, cuisine: "Mexican", servings: 4, author: "Sofia",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=900&q=80", description: "Warm tortillas loaded with spiced beans and crunchy toppings.",
    ingredients: ["Black beans", "Corn tortillas", "Avocado", "Red cabbage", "Lime", "Cumin"], steps: ["Warm the beans with cumin and a splash of water.", "Toast tortillas in a dry pan.", "Slice avocado and shred cabbage.", "Fill tortillas with beans and vegetables.", "Finish with lime juice."]
  },
  {
    title: "Mushroom Risotto", category: "Dinner", type: "Veg", difficulty: "Medium", preparationTime: 10, cookingTime: 35, cuisine: "Italian", servings: 4, author: "Luca",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=900&q=80", description: "Creamy arborio rice with browned mushrooms and Parmesan.",
    ingredients: ["Arborio rice", "Mushrooms", "Vegetable stock", "Shallot", "White wine", "Parmesan"], steps: ["Brown mushrooms and set aside.", "Cook shallot, then stir in the rice.", "Add wine and let it absorb.", "Add warm stock a ladle at a time, stirring.", "Fold in mushrooms and Parmesan."]
  },
  {
    title: "Miso Vegetable Ramen", category: "Dinner", type: "Veg", difficulty: "Medium", preparationTime: 15, cookingTime: 20, cuisine: "Japanese", servings: 2, author: "Wei",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=80", description: "A savory miso broth with noodles, greens, and mushrooms.",
    ingredients: ["Ramen noodles", "White miso", "Vegetable stock", "Mushrooms", "Spinach", "Spring onion"], steps: ["Simmer stock and mushrooms until tender.", "Whisk miso with a little warm broth.", "Stir the miso mixture into the pot without boiling.", "Cook noodles separately and drain.", "Serve noodles in broth with spinach and spring onion."]
  },
  {
    title: "Teriyaki Salmon Bowl", category: "Dinner", type: "Non-Veg", difficulty: "Easy", preparationTime: 10, cookingTime: 18, cuisine: "Japanese", servings: 2, author: "Maya",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80", description: "Glazed salmon over rice with crisp vegetables and sesame.",
    ingredients: ["Salmon fillets", "Cooked rice", "Soy sauce", "Honey", "Cucumber", "Sesame seeds"], steps: ["Stir soy sauce and honey together.", "Brush the salmon with the glaze.", "Bake until flaky and cooked through.", "Serve over warm rice with cucumber.", "Sprinkle with sesame seeds."]
  },
  {
    title: "Spinach and Ricotta Lasagna", category: "Dinner", type: "Veg", difficulty: "Medium", preparationTime: 25, cookingTime: 45, cuisine: "Italian", servings: 6, author: "Luca",
    image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=900&q=80", description: "Baked pasta layered with spinach ricotta and tomato sauce.",
    ingredients: ["Lasagna sheets", "Ricotta", "Spinach", "Tomato sauce", "Mozzarella", "Parmesan"], steps: ["Wilt spinach and mix with ricotta.", "Spread tomato sauce in a baking dish.", "Layer pasta, ricotta mixture, and sauce.", "Top with mozzarella and Parmesan.", "Bake covered, then uncover until golden."]
  },
  {
    title: "Pesto Gnocchi", category: "Dinner", type: "Veg", difficulty: "Easy", preparationTime: 5, cookingTime: 15, cuisine: "Italian", servings: 3, author: "Luca",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80", description: "Pillowy potato gnocchi coated in basil pesto and Parmesan.",
    ingredients: ["Potato gnocchi", "Basil pesto", "Cherry tomatoes", "Parmesan", "Olive oil", "Black pepper"], steps: ["Boil gnocchi until they float.", "Reserve a little cooking water and drain.", "Warm pesto with a spoonful of cooking water.", "Toss gnocchi and tomatoes through the sauce.", "Finish with Parmesan and pepper."]
  },
  {
    title: "Shrimp Pad Thai", category: "Dinner", type: "Non-Veg", difficulty: "Medium", preparationTime: 15, cookingTime: 12, cuisine: "Thai", servings: 3, author: "Wei",
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=900&q=80", description: "Rice noodles stir-fried with shrimp, egg, lime, and peanuts.",
    ingredients: ["Rice noodles", "Shrimp", "Eggs", "Tamarind sauce", "Bean sprouts", "Peanuts"], steps: ["Soak noodles until just pliable.", "Stir-fry shrimp until pink and set aside.", "Scramble the eggs, then add noodles and sauce.", "Return shrimp and toss with bean sprouts.", "Serve with lime and crushed peanuts."]
  },
  {
    title: "Bibimbap Rice Bowl", category: "Dinner", type: "Veg", difficulty: "Medium", preparationTime: 20, cookingTime: 15, cuisine: "Korean", servings: 2, author: "Min",
    image: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?auto=format&fit=crop&w=900&q=80", description: "A colorful rice bowl with seasoned vegetables and gochujang.",
    ingredients: ["Steamed rice", "Spinach", "Carrots", "Mushrooms", "Eggs", "Gochujang"], steps: ["Cook each vegetable separately until just tender.", "Season vegetables lightly with sesame oil.", "Divide warm rice between bowls.", "Arrange vegetables over the rice.", "Top with a fried egg and gochujang."]
  },
  {
    title: "Coconut Lentil Soup", category: "Dinner", type: "Veg", difficulty: "Easy", preparationTime: 10, cookingTime: 30, cuisine: "Indian", servings: 4, author: "Arjun",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80", description: "Red lentils simmered with coconut milk, ginger, and spices.",
    ingredients: ["Red lentils", "Coconut milk", "Onion", "Ginger", "Vegetable stock", "Curry powder"], steps: ["Cook onion and ginger until soft.", "Stir in curry powder and rinsed lentils.", "Add stock and simmer until lentils soften.", "Pour in coconut milk and warm through.", "Season and serve with rice or bread."]
  },
  {
    title: "Crispy Chicken Caesar Wrap", category: "Lunch", type: "Non-Veg", difficulty: "Easy", preparationTime: 10, cookingTime: 15, cuisine: "American", servings: 2, author: "Vijay",
    image: "https://images.unsplash.com/photo-1553909489-cd47e0ef937f?auto=format&fit=crop&w=900&q=80", description: "A portable wrap with chicken, crunchy lettuce, and Caesar dressing.",
    ingredients: ["Chicken breast", "Flour tortillas", "Romaine lettuce", "Caesar dressing", "Parmesan", "Croutons"], steps: ["Season and pan-cook the chicken until done.", "Rest and slice the chicken.", "Toss lettuce with dressing and Parmesan.", "Fill tortillas with salad and chicken.", "Add crushed croutons, roll, and serve."]
  },
  {
    title: "Roasted Vegetable Couscous", category: "Lunch", type: "Veg", difficulty: "Easy", preparationTime: 12, cookingTime: 25, cuisine: "Mediterranean", servings: 4, author: "Sofia",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80", description: "Fluffy couscous tossed with caramelized seasonal vegetables.",
    ingredients: ["Couscous", "Zucchini", "Bell pepper", "Red onion", "Chickpeas", "Lemon"], steps: ["Roast chopped vegetables and chickpeas until browned.", "Cover couscous with boiling stock.", "Fluff couscous with a fork.", "Fold in vegetables and lemon zest.", "Season and serve warm."]
  },
  {
    title: "Baked Mac and Cheese", category: "Dinner", type: "Veg", difficulty: "Easy", preparationTime: 15, cookingTime: 30, cuisine: "American", servings: 6, author: "Nila",
    image: "https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?auto=format&fit=crop&w=900&q=80", description: "Tender pasta in a creamy cheddar sauce under a crisp topping.",
    ingredients: ["Elbow pasta", "Cheddar", "Milk", "Butter", "Flour", "Breadcrumbs"], steps: ["Boil pasta until just shy of tender.", "Make a roux with butter and flour.", "Whisk in milk and melt in cheddar.", "Fold sauce through pasta and transfer to a dish.", "Top with breadcrumbs and bake until golden."]
  },
  {
    title: "Garlic Butter Shrimp", category: "Dinner", type: "Non-Veg", difficulty: "Easy", preparationTime: 8, cookingTime: 10, cuisine: "Mediterranean", servings: 3, author: "Maya",
    image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=900&q=80", description: "Juicy shrimp quickly sauteed with garlic, butter, and lemon.",
    ingredients: ["Shrimp", "Butter", "Garlic", "Lemon", "Parsley", "Chili flakes"], steps: ["Pat shrimp dry and season lightly.", "Melt butter and cook garlic briefly.", "Add shrimp in a single layer.", "Turn when pink and cook just until opaque.", "Finish with lemon and parsley."]
  },
  {
    title: "Homemade Margherita Flatbread", category: "Lunch", type: "Veg", difficulty: "Easy", preparationTime: 10, cookingTime: 12, cuisine: "Italian", servings: 2, author: "Luca",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80", description: "A quick crisp flatbread topped with tomato, mozzarella, and basil.",
    ingredients: ["Flatbread", "Tomato sauce", "Mozzarella", "Cherry tomatoes", "Fresh basil", "Olive oil"], steps: ["Heat the oven until very hot.", "Spread tomato sauce over the flatbread.", "Add mozzarella and sliced tomatoes.", "Bake until the edges are crisp and cheese bubbles.", "Top with basil and olive oil."]
  },
  {
    title: "Butternut Squash Soup", category: "Lunch", type: "Veg", difficulty: "Easy", preparationTime: 15, cookingTime: 35, cuisine: "French", servings: 4, author: "Sofia",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80", description: "Silky roasted squash soup with warming ginger and a little cream.",
    ingredients: ["Butternut squash", "Onion", "Vegetable stock", "Ginger", "Cream", "Nutmeg"], steps: ["Roast cubed squash until tender.", "Cook onion and ginger in a saucepan.", "Add squash and stock, then simmer briefly.", "Blend until smooth.", "Stir in cream and nutmeg before serving."]
  },
  {
    title: "Lemon Herb Roast Chicken", category: "Dinner", type: "Non-Veg", difficulty: "Medium", preparationTime: 15, cookingTime: 75, cuisine: "French", servings: 5, author: "Maya",
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=80", description: "A simple roast chicken with lemon, garlic, and fresh herbs.",
    ingredients: ["Whole chicken", "Lemon", "Garlic", "Rosemary", "Olive oil", "Black pepper"], steps: ["Pat the chicken dry and heat the oven.", "Rub with olive oil, salt, and pepper.", "Fill the cavity with lemon, garlic, and rosemary.", "Roast until the thickest part is cooked through.", "Rest before carving."]
  },
  {
    title: "Stuffed Bell Peppers", category: "Dinner", type: "Veg", difficulty: "Medium", preparationTime: 15, cookingTime: 40, cuisine: "Mediterranean", servings: 4, author: "Nila",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80", description: "Sweet peppers filled with rice, beans, herbs, and tomato.",
    ingredients: ["Bell peppers", "Cooked rice", "Black beans", "Tomato", "Corn", "Cheddar"], steps: ["Halve peppers and remove seeds.", "Mix rice, beans, tomato, and corn.", "Fill pepper halves with the mixture.", "Cover and bake until peppers soften.", "Uncover, add cheddar, and bake until melted."]
  },
  {
    title: "Pav Bhaji", category: "Indian", type: "Veg", difficulty: "Medium", preparationTime: 15, cookingTime: 30, cuisine: "Mumbai", servings: 4, author: "Karthik",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=900&q=80", description: "Spiced mashed vegetables served with buttery toasted rolls.",
    ingredients: ["Potatoes", "Cauliflower", "Peas", "Tomatoes", "Pav bhaji masala", "Bread rolls"], steps: ["Boil potatoes, cauliflower, and peas until soft.", "Cook tomatoes with pav bhaji masala.", "Mash vegetables into the spiced tomato base.", "Simmer with butter until thick.", "Toast rolls in butter and serve with the bhaji."]
  },
  {
    title: "Aloo Paratha", category: "Breakfast", type: "Veg", difficulty: "Medium", preparationTime: 25, cookingTime: 20, cuisine: "North Indian", servings: 4, author: "Arjun",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80", description: "Whole-wheat flatbread stuffed with spiced mashed potato.",
    ingredients: ["Whole-wheat flour", "Potatoes", "Cilantro", "Cumin", "Green chili", "Ghee"], steps: ["Knead flour with water into a soft dough.", "Mash potatoes with cilantro and spices.", "Stuff dough portions with the potato mixture.", "Roll gently into flat rounds.", "Cook on a hot griddle with ghee until spotted golden."]
  },
  {
    title: "Banana Bread", category: "Desserts", type: "Veg", difficulty: "Easy", preparationTime: 12, cookingTime: 55, cuisine: "American", servings: 8, author: "Leah",
    image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=900&q=80", description: "A tender loaf that makes excellent use of ripe bananas.",
    ingredients: ["Ripe bananas", "Flour", "Butter", "Brown sugar", "Egg", "Baking soda"], steps: ["Mash bananas in a large bowl.", "Stir in melted butter, sugar, and egg.", "Fold in flour and baking soda.", "Pour into a lined loaf pan.", "Bake until a tester comes out clean and cool before slicing."]
  },
  {
    title: "Blueberry Muffins", category: "Desserts", type: "Veg", difficulty: "Easy", preparationTime: 15, cookingTime: 22, cuisine: "American", servings: 12, author: "Leah",
    image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=900&q=80", description: "Soft bakery-style muffins dotted with juicy blueberries.",
    ingredients: ["Flour", "Blueberries", "Milk", "Sugar", "Egg", "Baking powder"], steps: ["Whisk flour, sugar, and baking powder.", "Mix milk and egg, then combine with dry ingredients.", "Fold in blueberries without overmixing.", "Divide batter into a muffin tin.", "Bake until risen and lightly golden."]
  },
  {
    title: "Apple Cinnamon Crumble", category: "Desserts", type: "Veg", difficulty: "Easy", preparationTime: 15, cookingTime: 35, cuisine: "British", servings: 6, author: "Sofia",
    image: "https://images.unsplash.com/photo-1568571780765-9276ac8b75a1?auto=format&fit=crop&w=900&q=80", description: "Warm cinnamon apples under a crisp oat and butter topping.",
    ingredients: ["Apples", "Rolled oats", "Flour", "Butter", "Brown sugar", "Cinnamon"], steps: ["Slice apples and toss with cinnamon.", "Place apples in a baking dish.", "Rub butter into oats, flour, and sugar.", "Scatter crumble over the apples.", "Bake until bubbling and golden."]
  },
  {
    title: "Chocolate Brownies", category: "Desserts", type: "Veg", difficulty: "Easy", preparationTime: 15, cookingTime: 25, cuisine: "American", servings: 9, author: "Priya",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80", description: "Fudgy chocolate brownies with a delicate crackled top.",
    ingredients: ["Dark chocolate", "Butter", "Sugar", "Eggs", "Flour", "Cocoa powder"], steps: ["Melt chocolate and butter together.", "Whisk in sugar and eggs.", "Fold in flour and cocoa until just combined.", "Spread into a lined pan.", "Bake until the center is just set, then cool before cutting."]
  },
  {
    title: "Classic Tiramisu", category: "Desserts", type: "Veg", difficulty: "Medium", preparationTime: 25, cookingTime: 0, cuisine: "Italian", servings: 8, author: "Luca",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=80", description: "Coffee-soaked sponge layered with mascarpone cream and cocoa.",
    ingredients: ["Ladyfingers", "Espresso", "Mascarpone", "Cream", "Sugar", "Cocoa powder"], steps: ["Whip cream with sugar until soft peaks form.", "Fold mascarpone into the cream.", "Dip ladyfingers briefly in cooled espresso.", "Layer biscuits and mascarpone cream.", "Chill several hours and dust with cocoa."]
  },
  {
    title: "Mango Coconut Smoothie", category: "Drinks", type: "Veg", difficulty: "Easy", preparationTime: 5, cookingTime: 0, cuisine: "Tropical", servings: 2, author: "Priya",
    image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=900&q=80", description: "A sunny mango smoothie blended with coconut milk and lime.",
    ingredients: ["Ripe mango", "Coconut milk", "Plain yogurt", "Lime", "Honey", "Ice"], steps: ["Peel and dice the mango.", "Add mango, coconut milk, and yogurt to a blender.", "Squeeze in lime and add honey.", "Blend with ice until smooth.", "Pour into chilled glasses."]
  },
  {
    title: "Fresh Strawberry Lemonade", category: "Drinks", type: "Veg", difficulty: "Easy", preparationTime: 10, cookingTime: 0, cuisine: "American", servings: 6, author: "Meera",
    image: "https://images.unsplash.com/photo-1513558161293-ccaf765edfd4?auto=format&fit=crop&w=900&q=80", description: "Homemade lemonade brightened with ripe strawberries.",
    ingredients: ["Strawberries", "Lemons", "Cold water", "Sugar", "Mint", "Ice"], steps: ["Blend strawberries with a little water.", "Strain if you prefer a smooth drink.", "Stir lemon juice and sugar until dissolved.", "Add cold water and strawberry puree.", "Serve over ice with mint."]
  },
  {
    title: "Crispy Onion Bhajis", category: "Snacks", type: "Veg", difficulty: "Medium", preparationTime: 15, cookingTime: 15, cuisine: "Indian", servings: 4, author: "Karthik",
    image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=80", description: "Thin onion slices coated in spiced chickpea batter and fried crisp.",
    ingredients: ["Onions", "Chickpea flour", "Cumin", "Turmeric", "Cilantro", "Water"], steps: ["Slice onions thinly and separate the strands.", "Mix chickpea flour with spices and cilantro.", "Add enough water to lightly coat the onions.", "Fry small portions until crisp and golden.", "Drain and serve hot with chutney."]
  },
  {
    title: "Hummus and Crunchy Vegetables", category: "Snacks", type: "Veg", difficulty: "Easy", preparationTime: 10, cookingTime: 0, cuisine: "Middle Eastern", servings: 4, author: "Omar",
    image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=900&q=80", description: "Creamy chickpea hummus served with fresh vegetables for dipping.",
    ingredients: ["Chickpeas", "Tahini", "Lemon", "Garlic", "Olive oil", "Carrots and cucumber"], steps: ["Blend chickpeas, tahini, lemon, and garlic.", "Add cold water gradually until creamy.", "Taste and adjust lemon and salt.", "Drizzle with olive oil.", "Serve with sliced vegetables."]
  }
];

export const recipes = [
  ...featuredRecipes,
  ...additionalRecipes.slice(0, 30).map((recipe, index) => ({
    ...recipe,
    id: index + featuredRecipes.length + 1,
    time: recipe.preparationTime + recipe.cookingTime,
    rating: 4.6 + (index % 4) * 0.1,
    ratingsCount: 35 + index * 3,
    youtubeUrl: ""
  }))
];
