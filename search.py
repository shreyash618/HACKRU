import json

# reads the json file
# (open(*THIS*)) has to be replaced with the restaurant that the user is looking for 
with open('CheesecakeFactory.json') as f:
    data = json.load(f)

#replace the user input into "desired value"
food_item = 'Avocado Eggrolls'

# Function to recursively search for a value in a nested dictionary
def search_value(data, target):
    for key, value in data.items():
        if isinstance(value, dict):
            result = search_value(value, target)
            if result is not None:
                return result
        elif value == target:
            return key  # or return any other information you need

# Search for the target value in the loaded JSON data
result = search_value(data, food_item)

# Print the result
if result is not None:
    print(f"Found '{food_item}' in key: {result}")
else:
    print(f"'{food_item}' not found in the JSON data")
