import json

# reads the json file
with open('TCF_KWT_Allergen Data.csv3.json') as f:
    data = json.load(f)

# Nested for loop with if statement to search menu for item and return ingredients
def search_food(data, target):
    for category in data["menu"]:
        for item in category["items"]:
            if item["name"] == target:
                return item["ingredients"]
    return None


# Replace the user input with the desired food item
food_item = 'Avocado Eggrolls'

# Search for the target food item in the loaded JSON data
result = search_food(data, food_item)

# Print the result
if result is not None:
    print(f"Found '{food_item}' and has allergens: {result}")
else:
    print(f"'{food_item}' not found in the JSON data")
