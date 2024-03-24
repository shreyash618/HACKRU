import json

# reads the json file
with open('TCF_KWT_Allergen Data.csv3.json') as f:
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
dangerousFoodList = []
def search_allergen(data, target2):
    for category2 in data["menu"]:
        for foodItems in category2["items"]:
                if target2 in foodItems["allergens"]:
                     dangerousFoodList.append(foodItems["name"])
    return dangerousFoodList

food = input("Food item: " )
allergy = input("Allergen: " )

#Use the user input as the desired food item
# Search for the target food item in the loaded JSON data
foodResult = search_food(data, food)
allergenResult = search_allergen(data, allergy)

# Print the result
if foodResult is not None:
    print(f"{food} has allergens: {foodResult}")
else:
    print(f"'{food}' not found")


print(f"{allergy} is present in the following foods: {allergenResult}")
