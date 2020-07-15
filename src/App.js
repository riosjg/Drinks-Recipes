import React from 'react';
import Header from './components/Header';
import Form from './components/Form';
import RecipesList from './components/RecipesList';

import CategoriesProvider from './context/CategoriesContext';
import RecipesContext from './context/RecipesContext';
import ModalProvider from './context/ModalContext';

function App() {
  return (
    <CategoriesProvider>
      <RecipesContext>
        <ModalProvider>
          <Header />
          <div className="container mt-5">
            <div className="row">
              <Form />
            </div>
            <RecipesList />
          </div>
        </ModalProvider>
      </RecipesContext>
    </CategoriesProvider>
  );
}

export default App;
