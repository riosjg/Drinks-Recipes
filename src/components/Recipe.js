import React, { useContext, useState } from 'react';
import { ModalContext } from '../context/ModalContext';

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 450,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

const Recipe = ({recipe}) => {

    // Modal configuration of Material-ui
    const [ modalStyle ] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const classes = useStyles();
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const { information, setIdRecipe, setRecipe } = useContext(ModalContext);

    const showIngredients = information => {
        let ingredients = [];
        for(let i=1; i<16; i++){
            if(information[`strIngredient${i}`]){
                ingredients.push(
                <li>{information[`strIngredient${i}`] } ~ { information[`strMeasure${i}`] } </li>
                )
            }
        }
        return ingredients;
    }

    return ( 
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">{recipe.strDrink}</h2>

                <img className="card-img-top" src={recipe.strDrinkThumb} alt={`${recipe.strDrink}`} />

                <div className="card-body">
                    <button
                        onClick={ () => {
                            setIdRecipe(recipe.idDrink)
                            handleOpen();
                        } }
                        type="button"
                        className="btn btn-block btn-primary"
                    >See Recipe
                    </button>

                    <Modal
                        open={open}
                        onClose={ () => {
                            handleClose();
                            setIdRecipe(null);
                            setRecipe({});
                        }}
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <h2>{information.strDrink}</h2>
                            <h3 className="mt-2 text-center">Instructions:</h3>
                            <p className="m-0">
                                {information.strInstructions}
                            </p>
                            <img className="img-fluid my-1" src={information.strDrinkThumb} alt={information.strDrink}/>
                            <h3 className="text-center">Ingredients & Measures</h3>
                            <ul>
                                {showIngredients(information)}
                            </ul>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
     );
}
 
export default Recipe;