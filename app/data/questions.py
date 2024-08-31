import json
with open('app/data/questions.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

element = json.loads(list(data[0].values())[0])
print(element["questionText"])
