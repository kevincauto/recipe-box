import React, {Component} from 'react';
import Collapsible from 'react-collapsible';



class App extends Component {
  constructor(props){
  super(props)
    this.state = {
      recipes: [
        {
          name: 'Pumpkin Pie',
          ingredients: 'pumpkin, cinnamon, cup of sugar',
          instructions: 'Stir it up, and bake!',
          showRecipe: false,
          editMode: false
        },
        {
          name: 'Apple Pie',
          ingredients: '6 cups thinly sliced, peeled apples (6 medium), 3/4 cup sugar, 2 tablespoons all-purpose flour, 3/4 teaspoon ground cinnamon, 1/4 teaspoon salt, 1/8 teaspoon ground nutmeg, 1 tablespoon lemon juice',
          instructions: 'Stir it up, love it, and bake away',
          showRecipe: false,
          editMode: false
        },
        {
          name: 'Blueberry Muffin',
          ingredients: 'sugar, flour, milk, eggs, blueberries',
          instructions: 'Stir it up, and bake!',
          showRecipe: false,
          editMode: false
        }
      ],
      }
    //This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleIngredientChange = this.handleIngredientChange.bind(this);

  }

  componentDidMount(){
    var str = localStorage.getItem("recipes");
    if(str){
      const recipes = JSON.parse(str);
      this.setState({recipes});
    }
  }

  handleClick(i) {
    const recipes = this.state.recipes;
    recipes[i].showRecipe = !recipes[i].showRecipe;
    this.setState({recipes});
    let str = JSON.stringify(recipes);
    localStorage.setItem("recipes", str);
  }
  handleDelete(i) {
    const recipes = this.state.recipes;
    recipes.splice(i,1);
    this.setState({recipes});
    let str = JSON.stringify(recipes);
    localStorage.setItem("recipes", str);

  }
  handleAdd(i) {
    console.log('Handle add fired.')
    const length = this.state.recipes.length;
    const recipes = this.state.recipes;
    recipes[length] = {};
    recipes[length].name = "";
    recipes[length].ingredients = "";
    recipes[length].instructions = "";
    recipes[length].showRecipe = true;
    recipes[length].editMode = true;
    this.setState({recipes});
  }
  handleEdit(i){
    const recipes = this.state.recipes;
    recipes[i].showRecipe = true;
    recipes[i].editMode = true;
    this.setState({recipes});
  }
  handleNameChange(e,i){
    const recipes = this.state.recipes;
    recipes[i].name = e.target.value;
    this.setState({recipes});
  }
  handleIngredientChange(e,i){
    const recipes = this.state.recipes;
    recipes[i].ingredients = e.target.value;
    this.setState({recipes});
  }
  handleInstructionsChange(e,i){
    const recipes = this.state.recipes;
    recipes[i].instructions = e.target.value;
    this.setState({recipes});
  }
  handleSubmitChanges(i){
    const recipes = this.state.recipes;
    recipes[i].editMode = false;
    this.setState({recipes});
    let str = JSON.stringify(recipes);
    localStorage.setItem("recipes", str);
  }

  render(){
    let triangleIcon;

    let recipeList = this.state.recipes.map((recipe,i)=>{
      if(recipe.editMode === false){
        triangleIcon = recipe.showRecipe ? '&#9660;' : '&#9658;';
        return (

          <div key={i} className="single-recipe">
            <h2 onClick={() => this.handleClick(i)}> <span className="smaller" dangerouslySetInnerHTML={{__html: triangleIcon}}></span> {recipe.name}</h2>
              <Collapsible open={recipe.showRecipe}>

                <h3>Ingredients</h3>
                {recipe.ingredients}<br />

                <h3>Instructions</h3>
                {recipe.instructions}<br />

                <button onClick={() => this.handleEdit(i)}>Edit</button>
                <button className="delete-button"onClick={() => this.handleDelete(i)}>Delete</button>
              </Collapsible>
          </div>

        )
      }
      if(recipe.editMode === true){
        return (

          <div  key={i} className="single-recipe">
              <input type="text" value={recipe.name} placeholder="Recipe Name" onChange={(e) => this.handleNameChange(e,i)} />

              <h3>Ingredients</h3>
              <textarea type="text" value={recipe.ingredients} placeholder="ingredients..." onChange={(e)=>this.handleIngredientChange(e,i)}/><br />

              <h3>Instructions</h3>
              <textarea type="text" value={recipe.instructions} placeholder="instructions..." onChange={(e)=>this.handleInstructionsChange(e,i)}/><br />

              <button onClick={() => this.handleSubmitChanges(i)}>Save</button>
              <button className="delete-button" onClick={() => this.handleDelete(i)}>Delete</button>

          </div>

        )
      }


    });

    return(
      <div className="container">
        {recipeList}
        <button onClick={()=> this.handleAdd()}>Add A New Recipe</button>
      </div>
    )
  }
}

export default App;
