import json

# reads the json file
with open('CheesecakeFactory.json') as f:
    data = json.load(f)

# Nested for loop with if statement to search menu for item and return allergens
#currently only does ingredients, need the proper file for allergens
def search_food(data, target):
    for category in data["menu"]:
        for item in category["items"]:
            if item["name"] == target:
                return item["allergens"]
    return None
# Nested for loop to search allergens across the whole menu and return the food items 
def search_allergen(data, target2):
    for caKtegory2 in data["menu"]:
        for foodItems in category2["items"]:
                if foodItems["allergens"]==target2:
                    return foodItems["name"]
    return None

food = input("Food item: " )
allergen = input("Allergen: " )

#Use the user input as the desired food item
# Search for the target food item in the loaded JSON data
foodResult = search_food(data, food)
allergenResult = search_allergen(data, allergen)

# Print the result
if foodResult is not None:
    print(f"{food} has allergens: {foodResult}")
else:
    print(f"'{food}' not found")

if allergenResult is not None:
    print(f"{allergen} is present in the following foodsAvoca: {allergenResult}")
else:
    print(f"'{allergen}' not found")