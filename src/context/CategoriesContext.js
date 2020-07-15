import React, { createContext, useState, useEffect } from 'react';
import Axios from 'axios';

export const CategoriesContext = createContext();

const CategoriesProvider = (props) => {

    const [ categories, setCategories ] = useState([]);

    useEffect( () => {
        const fetchData = async () => {
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
            const categories = await Axios(url);
            setCategories(categories.data.drinks);
        }
        fetchData();
    }, [])

    return (
        <CategoriesContext.Provider
            value={{
                categories
            }}
        >
            {props.children}
        </CategoriesContext.Provider>
    );
}

export default CategoriesProvider;