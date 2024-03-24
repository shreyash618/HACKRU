import json
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the JSON data
with open('TCF_KWT_Allergen Data.csv3.json') as f:
    data = json.load(f)

#configures CORS settings
@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
  response.headers.add('Access-Control-Allow-Headers',  '*')
  response.headers.add('Access-Control-Allow-Methods', '*')
  return response

#returns the allergens of a food item
def search_food(data, target):
    for category in data["menu"]:
        for item in category["items"]:
            if item["name"] == target:
                return item["allergens"]
    return None

#returns all the food items without a specific allergen
def search_allergen(data, target):
    results = []
    for category in data["menu"]:
        for item in category["items"]:
            if not(target in item["allergens"]):
                results.append(item["name"])
    return results


# Initialize an empty list to store allergens
allergens_list = []

# This is a POST method to get all the selected allergens from our REACT page
@app.route('/allergens', methods=['POST'])
def get_allergens():
    # Get the request data
    data = request.json

    # Check if the request data contains the allergens array
    if 'allergens' in data:
        # Get the allergens array from the request data
        new_allergens = data['allergens']
        
        # Update the global allergens list with the new allergens
        global allergens_list
        allergens_list = new_allergens

        return jsonify({'message': 'Allergens updated successfully', 'allergens': allergens_list})
    else:
        return jsonify({'error': 'Please provide the allergens array in the request'}), 400

# This is a GET method which returns the selected allergens
# We use this for debugging only, to see what is being stored in our allergens_list[] by accessing localhost:5000/allergens
@app.route('/allergens', methods=['GET'])
def get_allergens_get():
    global allergens_list
    return jsonify({'message': 'Check if allergens updated ->', 'allergens': allergens_list})

#Initialize an empty string to store the item name
food = ''
@app.route('/food', methods=['POST'])
def search_food_post():
    # Get food and allergens from the request query parameters
    global food
    food = request.args.get('food')
    #if the food is not NULL
    if food:
        #find the allergens of the specified food
        food_result = search_food(data, food)
        if food_result is not None:
            #return the allergens of the specified food in a JSON string format
            return jsonify({'food_allergens': food_result})
        else:
            return jsonify({'message': f"'{food}' not found"}), 404


@app.route('/food', methods=['GET'])
def search_food_get():
    # Get food and allergens from the request query parameters
    global food
    ##food = 'BEET AND AVOCADO SALAD' ##remove
    #if the food is not NULL
    if food:
        #find the allergens of the specified food
        food_result = search_food(data, food)
        if food_result is not None:
            #return the allergens of the specified food in a JSON string format
            return jsonify({'food_allergens': food_result})
        else:
            return jsonify({'message': f"'{food}' not found"}), 404

@app.route('/allwithout', methods=['GET'])
def search_foods_without_allergens ():
    global allergens_list
    ##allergens_list = ['Nuts', 'Sulphites'] ##remove
    if allergens_list:
        allergen_results = []
        for allergen in allergens_list:
            allergen_result = search_allergen(data, allergen)
            if allergen_result:
                allergen_results.append(allergen_result)
        return jsonify({'allergen_free_foods': allergen_results})

    return jsonify({'message': 'No search parameters provided'}), 400

@app.route('/allwithout', methods=['POST'])
def search_foods_without_allergens_post ():
    # Get the allergens_list from the POST request data
    data = request.json
    global allergens_list
    allergens_list = data.get('allergens_list', [])

    if allergens_list:
        allergen_results = []
        for allergen in allergens_list:
            allergen_result = search_allergen(data, allergen)
            if allergen_result:
                allergen_results.append(allergen_result)
        return jsonify({'allergen_foods': allergen_results})

    return jsonify({'message': 'No search parameters provided'}), 400

if __name__ == '__main__':
    app.run(debug=True)
