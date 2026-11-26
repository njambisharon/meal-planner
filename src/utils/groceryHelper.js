const ingredientDatabase = {
    // --- Mboga na Matunda ---
    "Sukuma wiki": { section: "Mboga na Matunda", swahili: "Sukuma Wiki", price: 20 },
    "tomatoes": { section: "Mboga na Matunda", swahili: "Nyanya", price: 15 },
    "onions": { section: "Mboga na Matunda", swahili: "Kitunguu", price: 10 },
    "potatoes": { section: "Mboga na Matunda", swahili: "Viazi", price: 20 },
    "coriander (dhania)": { section: "Mboga na Matunda", swahili: "Dhania", price: 10 },
    "lemon": { section: "Mboga na Matunda", swahili: "Ndimu", price: 10 },
    "chilli (pilipili)": { section: "Mboga na Matunda", swahili: "Pilipili", price: 5 },
    "garlic": { section: "Mboga na Matunda", swahili: "Kitunguu Saumu", price: 15 },
    "ginger": { section: "Mboga na Matunda", swahili: "Tangawizi", price: 20 },
    "cooking bananas (matoke)": { section: "Mboga na Matunda", swahili: "Matoke", price: 15 },
    "arrow roots (nduma)": { section: "Mboga na Matunda", swahili: "Nduma", price: 30 },

    // --- Nyama na Samaki ---
    "beef (nyama)": { section: "Nyama na Samaki", swahili: "Nyama ya Ng'ombe", price: 600 },
    "chicken (kuku)": { section: "Nyama na Samaki", swahili: "Kuku", price: 800 },
    "goat meat (nyama)": { section: "Nyama na Samaki", swahili: "Nyama ya Mbuzi", price: 700 },
    "goat intestines": { section: "Nyama na Samaki", swahili: "Matumbo ya Mbuzi", price: 200 },
    "minced meat (nyama)": { section: "Nyama na Samaki", swahili: "Nyama ya Kusindika", price: 500 },
    "omena (dagaa)": { section: "Nyama na Samaki", swahili: "Omena", price: 100 },
    

    // --- Nafaka na Mboga ---
    "maize flour(unga)": { section: "Nafaka na Mboga", swahili: "Unga wa Mahindi", price: 150 },
    "wheat flour (ngano)": { section: "Nafaka na Mboga", swahili: "Unga wa Ngano", price: 180 },
    "maize (mahindi)": { section: "Nafaka na Mboga", swahili: "Mahindi", price: 80 },
    "beans (maharagwe)": { section: "Nafaka na Mboga", swahili: "Maharagwe", price: 200 },
    "rice (mchele)": { section: "Nafaka na Mboga", swahili: "Mchele", price: 200 },
    "millet flour (wimbi)": { section: "Nafaka na Mboga", swahili: "Unga wa Wimbi", price: 120 },
    "sorghum flour (mtama)": { section: "Nafaka na Mboga", swahili: "Unga wa Mtama", price: 120 },
    "peas (njegu)": { section: "Nafaka na Mboga", swahili: "Njegu", price: 120 },
    "yeast": { section: "Nafaka na Mboga", swahili: "Yeast", price: 30 },

    // --- Viungo na Bidhaa ---
    "pilau masala": { section: "Viungo na Bidhaa", swahili: "Viungo vya Pilau", price: 50 },
    "garam masala": { section: "Viungo na Bidhaa", swahili: "Garam Masala", price: 60 },
    "cardamom (iliki)": { section: "Viungo na Bidhaa", swahili: "Iiliki", price: 40 },
    "salt": { section: "Viungo na Bidhaa", swahili: "Chumvi", price: 30 },
    "cooking oil": { section: "Viungo na Bidhaa", swahili: "Mafuta ya Kupika", price: 250 },
    "cooking oil for frying": { section: "Viungo na Bidhaa", swahili: "Mafuta ya Kukaanga", price: 300 },
    "milk (maziwa)": { section: "Viungo na Bidhaa", swahili: "Maziwa", price: 65 },
    "sugar (sukari)": { section: "Viungo na Bidhaa", swahili: "Sukari",price:150 },
    "tea leaves (chai)":{section:"viungo na Bidha",swahili:"chai" ,price:50},
    "tea": { section: "Viungo na Bidhaa", swahili: "Chai", price: 50 }
};



export function generateGroceryList(selectedRecipes){
    const merged = {};
    selectedRecipes.forEach(recipe => {
        if(!recipe || !recipe.ingriedients) return ;

        recipe.ingriedients.forEach(ing =>{
            const key = ing.item.toLowerCase();
            if(!mergerd[key]){
                const dbEntry =ingredientDatabase[key] || {
                    section:"nyigine (Other)",
                    swahili:null,
                    price:0,
                    
                };
            }
            if(!merged [key]) {
                itemMap[key] = {
                item:ing.item,
                amounts:[],
                checked :false,
                section :getMarketSection(key)
            };

            }
            mergerd[key].amounts.push(ing.amount);
        });
        
    });
   Object.values(merged).forEach(entry => {
    const unique = [...new Set(entry.amounts)];
    entry.combinedAmount = unique.length ===1
         ? unique [0]
         :unique.join(" + ");
   });

   return Object.values(merged).sort((a,b) =>{
    if (a.section !==b.section) return a.section.localeCompare(b.section);
    return a.item.localeCompare(b.item);
   });

}
export function calculateTotalCost(groceryItems){
    return groceryItems.reduce((total,item)=> {
        const firstAmount = item.amount[0] || "";
        const count = extractCount(firstAmount);
        return total + (item.price *count);
    
    },0);
}
export function getCostBySection(groceryItems){
    const sections = {};

    groceryItems.forEach(item => {
        if (!section[item.section]){
            sections[item.section] =0;

        }
        const firstAmount =item.amount[0] || "";
        const count = extractCount(firstAmount);
        sections [item.sectiom] += item.price*count;

    });
    return sections;
    
}
function extractCount(amount) {
    if (!amount) return 1;


    const measurements = [
        "tbsp","tbps","tsp", "cup","cups", "ml" ,"kg",
        "bunch","pod","pods" ,"inch", "optional", "taste",
        "whole","set"
    ];
    const lower =amount.toLowerCase();
    if (measurements.some(m => lower.includes(m))){
        return 1;
    }
    const plainNum = parseInt(amount.trim(),10);
    if(!isNaN(plainNum) && plainNum>0) {
        return plainNum;
    }
    if (amount.includes("/")){
        return 1;
    }
    return 1;
}
export function getCostBySections(groceryItems){
    const sections = new Set(groceryItems.map(item => item.section));
    return [...sections];
}