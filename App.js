import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

function App() {
  //strings to hold the the food item and restaurant name
  const [item, setItem] = useState ('');
  const [restaurant, setRestaurant] = useState ('');

  //arrays to hold the ingredients as well as the allergens
  const[ingredients, setIngredients] = useState ([{}]);
  const[allergens, setAllergens] = useState ([{}]);

  //URL to fetch data from
  const url = 'https://raw.githubusercontent.com/clux/food/master/ingredients.json';
  //URL to post data to (for queries)
  const post_url = 'https://jsonplaceholder.typicode.com/posts';
  //fetch ingredients data from URL
  function getIngredientsList (){
    console.log ("Running function!");
    axios.get(url).then(response => {
      console.log('Got the URL!', response.data);
      setIngredients(response.data.ingredients);
    })
    .catch(error => {
      console.error ('Error fetching data: ', error);
    })
  }
  //function call to get the ingredients list
  getIngredientsList();

  const postData = {
    key1: "Shreya",
    key2: "Shukla"
  }

  function postAllergens (){
    axios.post (post_url, postData)
    .then (response =>{
      console.log ("Response ", response.data);
    })
    .catch (error =>{
      console.log ('Error posting data: ', error);
    })
  }
  postAllergens()
  return (
  <div>
      <h1>Allergen Detector</h1>
      <h2>STEP 1: List Your Allergies</h2>
      <label for = "allergens">Choose all ingredients you're allergic to or can't eat</label>
      <select name = "allergens" id = "allergens">
        <option value = "milk">Milk</option>
        <option value ="eggs">Eggs</option>
        <option value ="pinenuts">Pinenuts</option>
      </select>
      <h2>STEP 2: Find Food Items Without Allergen</h2>
      <div>
        <h8>List all the ingredients of a food item and identify which ingredients you're allergic to</h8>
        <input type="text" placeholder="Search item..." />
        <input type="text" placeholder="Choose restaurant..." />
        <button>Submit</button>
      </div>
      <div>
        <h8>OR filter all the menu itmes that don't have a specific ingredient</h8>
        <input type="text" placeholder="Food Items without a specific ingredient" />
        <button>Submit</button>
      </div>
      <div className="ingredient-box">
        <h3>Ingredients</h3>
        <ul className="ingredients-list">
          <li>Ingredient 1</li>
          <li>Ingredient 2</li>
          {/* Add more allergens as needed */}
        </ul>
        <pre>{JSON.stringify(ingredients, null, 2)}</pre>
      </div>
      <div className="ingredients-box">
        <h2>Allergens identified:</h2>
        <ul className="allergen-list">
          <li>Allergen 1</li>
          <li>Allergen 2</li>
          {/* Add more allergens as needed */}
        </ul>
      </div>
    </div>    
  );
}

export default App;
