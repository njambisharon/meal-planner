import { useState } from "react";
import { mealTypes, yourRecipes } from "../data/yourRecipes";

export default function RecipeBrowser({selectIds,onToggleSelect}){
    const [filterCategory,setFilterCategory] = useState('all');
    const [searchQuery,setSearchQuery] = useState ('');

    const filtered = yourRecipes.filter(recipe => {
        const matchCategory = filterCategory === 'all' || recipe.category === filterCategory;
        const matchSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });
};
return (
    <div className="recipe-browser">
        <div className="browser-controls">
            <input 
            type="text"
            className="search-input"
            placeholder="search food (e.g Pilau)"
            value = {searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            />
            <div className="category-filter">
                <button 
                className={`filter-chip ${filterCategory==='all' ? 'active': ''}`}
                onClick={() => setFilterCategory('all')}
                >
                Yote
                </button>
                {mealTypes.map(type =>(
                  <button
                       key={type}
                       className={`filter-chip $}{filterCategory ===type ? 'active' : ''}`}
                       onClick= {()=>setFilterCategory(type)}>
                  </button>  
                ))}

            </div>
        </div>
        <div className="recipe-grid">
            {filtered.map(recipe => (
                <div 
                key ={recipe.id}
                className={`recipe-card ${isSelected (recipe.id) ? 'selected' : ''}`}
                onClick={() => onToggleSelect(recipe.id)}
                >
                    <div className="recipe-check">
                        {isSelected(recipe.id)? '':'+'}
                    </div>
                    <div className="recipe-card-body">
                        <h3 className="recipe-card-name">{recipe.name}</h3>

                    </div>

                </div>
            ))}
        </div>
    </div>
)