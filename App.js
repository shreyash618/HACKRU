import logo from './logo.svg';
//import './App.css';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import './input.css';

function App() {
  //strings to hold the the food item and restaurant name
  const [item, setItem] = useState ('');
  const [restaurant, setRestaurant] = useState ('');

  //arrays to hold the ingredients
  const[ingredients, setIngredients] = useState ([{}]);
  //arrays to hold as the allergens
  const[allergens, setAllergens] = useState ([{}]);
  const[food, setFood] = useState ('');

  //URL to fetch data from
  const url = 'https://raw.githubusercontent.com/clux/food/master/ingredients.json';
  //URL to post data to (for queries)
  const post_url = 'https://jsonplaceholder.typicode.com/posts';
  //fetch ingredients data from URL
  function getIngredientsList (){
    console.log ("Running function!");
    axios.get(url).then(response => {
      console.log('Got the URL! Dumping all the ingredients in console.log', response.data);
      setIngredients(response.data.ingredients);
    })
    .catch(error => {
      console.error ('Error fetching data: ', error);
    })
  }
  //function call to get the ingredients list
  getIngredientsList();

  function updateAllergens(){
    const element = document.getElementById("allergenFilter");
    if (element){
      setAllergens(Array.from(element.selectedOptions).map(option => option.value));
      console.log ("updating Allergens!");
      console.log (allergens);
    }
  }

  function postAllergens (){
    axios.post (post_url, allergens)
    .then (response =>{
      console.log ("Response ", response.data);
    })
    .catch (error =>{
      console.log ('Error posting data: ', error);
    })
  }
  postAllergens();

  //returns the ingredients and allergens of a particular item from a specified restaurant
  function postItem_Rest (){
    const item_name = document.getElementById("item_input");
    const rest_name = document.getElementById("rest_input");
    
    if (item_name && rest_name){
      axios.post (post_url,
        {
          item: item_name,
          restaurant: rest_name
        }).then (response =>{
          console.log ("Response ", response.data);
        }).catch (error => {
          console.log ("Error ", error);
        })
    }

  }

  function displayFoodList (){
    console.log ("Running function!");
    /*
    axios.get(url).then(response => {
      console.log('Got the URL! Dumping all the edible foods in console.log', response.data);
      setFood(response.data.ingredients);
    })
    .catch(error => {
      console.error ('Error fetching data: ', error);
    })
    */
   setFood (JSON.stringify(['Coconut Pie', 'Apple Pie', 'Pineapple Pie'], null, 2));

   console.log("Here's all the food items you can eat at the specified restaurant:", food);
  }

  //returns all the items without the specified allergen(s)

  return (
  <div className="font-mono min-h-screen bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200">
    <nav class="bg-blue-500 p-4">
    <div class="container mx-auto flex justify-between items-center">
    <h1 class="text-3xl font-semibold text-white">Allergen Detector</h1>
    <ul class="flex space-x-4">
    <li><a href="#" class="text-white hover:text-blue-200">Home</a></li>
    <li><a href="#" class="text-white hover:text-blue-200">About</a></li>
    <li><a href="#" class="text-white hover:text-blue-200">Services</a></li>
    <li><a href="#" class="text-white hover:text-blue-200">Contact</a></li>
    </ul>
    </div>
</nav>
  <div>
      {/*-----------STEP 1: List Your Allergies--------*/}
      <br></br>
      <label className="text-l font-semibold mb-4" for = "allergenFilter">List Your Allergies:</label>
      <br></br>
      <label className="block mb-2" for = "allergens">Make sure to choose all ingredients you're allergic to or can't eat</label>

    <select className="w-1/3 text-center block mb-2" id="allergenFilter" multiple>
        <option value="Gluten">Gluten</option>
        <option value="Crustaceas">Crustaceas</option>
        <option value="Eggs">Eggs</option>
        <option value="Fish">Fish</option>
        <option value="Milk">Milk</option>
        <option value="Peanuts">Peanuts</option>
        <option value="Shellfish">Shellfish</option>
        <option value="Soybeans">Soybeans</option>
        <option value="Tree nuts">Tree nuts</option>
        <option value="Wheat">Wheat</option>
        <option value="Almonds">Almonds</option>
        <option value="Cashews">Cashews</option>
        <option value="Walnuts">Walnuts</option>
        <option value="Pecans">Pecans</option>
        <option value="Pistachios">Pistachios</option>
        <option value="Hazelnuts">Hazelnuts</option>
        <option value="Brazil nuts">Brazil nuts</option>
        <option value="Macadamia nuts">Macadamia nuts</option>
        <option value="Pine nuts">Pine nuts</option>
        <option value="Chestnuts">Chestnuts</option>
        <option value="Sesame seeds">Sesame seeds</option>
        <option value="Sulfites">Sulfites</option>
        <option value="Mustard">Mustard</option>
        <option value="Celery">Celery</option>
        <option value="Lupin">Lupin</option>
        <option value="Mollusks">Mollusks</option>
        <option value="Sesame">Sesame</option>
        <option value="Soy">Soy</option>
        <option value="Sulphites">Sulphites</option>
    </select>
    <button onClick={updateAllergens} className = "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Submit</button>
    </div>
    <div>
      {/*------------STEP 2: Find Food Items Without Allergen-----------*/}
      <h2 className="text-l font-semibold mb-4">Find Food Items Without Allergens:</h2>
      <div>
        <h6>List all the ingredients of a food item and identify which ingredients you're allergic to</h6>
        <input id = "item_input" type="text" placeholder="Search item..." />
        <input id = "rest_input" type="text" placeholder="Choose restaurant..." />
        <button id="item_rest" className = "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Submit</button>
      </div>
      <div>
        <h6>OR filter all the menu itmes that don't have the specific allergens</h6>
        <button className = "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" id="all-items" onClick={displayFoodList}>Submit</button>
        <h6>{food}</h6>
        <br></br>
      </div>
    </div>
    <div>
      <h3>Ingredients</h3>
      <ul>
        <li>Ingredient 1</li>
        <li>Ingredient 2</li>
        {/* Add more allergens as needed */}
      </ul>
      <div>{JSON.stringify(ingredients, null, 2)}</div>
    </div>
    <div>
        <h2>Allergens identified:</h2>
        <ul>
          <li>Allergen 1</li>
          <li>Allergen 2</li>
          {/* Add more allergens as needed */}
        </ul>
    </div>    
  </div>
  );
}

export default App;
