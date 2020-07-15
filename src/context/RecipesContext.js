import React, { createContext, useState, useEffect } from 'react';
import Axios from 'axios';

export const RecipesContext = createContext();

const RecipesProvider = (props) => {

    const [recipes, setRecipes] = useState([])
    const [searchRecipes, setSearchRecipes] = useState({
        name: '',
        category: ''
    });
    const [ query, setQuery ] = useState(false);

    const { name, category } = searchRecipes;

    useEffect( () => {
        if(query){
            const fetchData = async () => {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}&c=${category}`
                const res = await Axios(url);
                setRecipes(res.data.drinks);
            }
            fetchData();
        }
    }, [searchRecipes, category, name, query])

    return ( 
        <RecipesContext.Provider
            value={{
                recipes,
                setSearchRecipes,
                setQuery
            }}
        >
            {props.children}
        </RecipesContext.Provider>

     );
}
 
export default RecipesProvider;