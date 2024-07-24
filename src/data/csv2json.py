import csv
import json

# Specify the path to your CSV file
csv_file_path = '/Users/menditoledano/triowave/src/data/Final_usa.csv'

# Read CSV and convert to JSON
cities = []
with open(csv_file_path, mode='r') as csvfile:
    csv_reader = csv.DictReader(csvfile)
    for row in csv_reader:
        city_data = {
            "name": row["Country"]+', '+row["City"],
            "coordinates": {
                "longitude": float(row["Longitude"]),
                "latitude": float(row["Latitude"])
            },
            
            "communities": [
                {
                    "name": row["Community"],
                    "size": int(row["Size"]),
                    "SM_followers": int(row["SM_followers"]),
                    "SM_coverage_rate": float(row["SM_coverage_rate"]),
                    "coordinates":{
                        "longitude": float(row["Longitude"]) + 0.01,
                        "latitude": float(row["Latitude"]) - 0.01
                    },
                    "attributes": {
                        "Pct_evangelical_christians": float(row["Pct_evangelical_christians"]),
                        "Pct_of_jews": float(row["Pct_of_jews"]),
                        
                    }
                }
            ]
        }
        cities.append(city_data)

# Convert to JSON string
json_output = json.dumps(cities, indent=4)
with open('output_json.json', mode='w') as jsonfile:
    jsonfile.write(json_output)
print(json_output)
