import React, { useContext, useState } from 'react';
import { CategoriesContext } from '../context/CategoriesContext';
import { RecipesContext } from '../context/RecipesContext';

const Form = () => {

    const [search, setSearch] = useState({
        name: '',
        category: ''
    });

    const { categories } = useContext(CategoriesContext);
    const {setSearchRecipes, setQuery} = useContext(RecipesContext);

    const getRecipesData = e => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        })
    }

    return ( 
        <form
            className="col-12"
            onSubmit={ e => {
                e.preventDefault();
                setSearchRecipes(search);
                setQuery(true);
            }}
        >
            <fieldset className="text-center">
                <legend>Search drinks by Category or Ingredient</legend>
            </fieldset>

            <div className="row">
                <div className="col-md-4">
                    <input
                        onChange={getRecipesData}
                        name="name"
                        className="form-control"
                        type="text"
                        placeholder="Search by ingredient"
                    ></input>
                </div>
                <div className="col-md-4">
                    <select
                        onChange={getRecipesData}
                        className="form-control"
                        name="category"
                    >
                        <option value="">Select Category</option>
                        {categories.map( (c,i) => (
                            <option key={i} value={c.strCategory}>{c.strCategory}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-4">
                    <input
                        type="submit"
                        className="btn btn-block btn-primary"
                        value="Search drinks"
                    />
                </div>
            </div>
        </form>
     );
}
 
export default Form;