from bs4 import BeautifulSoup
import requests
import json
# import os

#retreive url to search
# https://www.johnnyseeds.com/fruits/
# https://www.johnnyseeds.com/fruits/blackberry/
url = "https://www.johnnyseeds.com/organic/"

category = url.split('/')
category = category[-2]
# print(category)

#requests page through User Agent Mozilla
page_response = requests.get(url,  headers={'User-Agent': 'Mozilla/5.0'})
soup = BeautifulSoup(page_response.content, "html.parser")
x = 1
#parses name (ex. blueberry)
for type in soup.find_all("div", attrs={"class": "o-layout__col-50 o-layout__col-33@xs-up js-grid-tile grid-tile"}):
	# print("item:" , x)
	# print(type.prettify())
	category_url = type.find("a", href=True).get('href')
	name = category_url.split('/')
	name = name[-2]
	# print(category_url)
	category_url_response = requests.get(category_url,  headers={'User-Agent': 'Mozilla/5.0'})
	soup = BeautifulSoup(category_url_response.content, "html.parser")
	x+=1
	i = 1
	#parses variety (ex. Fruit)
	for seed in soup.find_all("div", attrs={"class":"c-tile js-product-tile is-grid product-tile"}):
		# print(soup.find_all
		variety_url = seed.find("a", attrs={"class": "thumb-link"}, href=True).get('href')
		variety_url = "https://www.johnnyseeds.com" + variety_url;
		# print(variety_url)
		variety = seed.find("div", attrs={"class":"c-tile__name product-name"}).string
		variety = variety.split('\n')[-2]
		# name = seed.find("div", attrs={"class":"c-tile__secondary-name"}).string
		# print(category + " " + name + " " + variety)
		variety_url_response = requests.get(variety_url,  headers={'User-Agent': 'Mozilla/5.0'})
		soup = BeautifulSoup(variety_url_response.content, "html.parser")
		# print(soup.prettify())
		try:
			quick_facts = soup.find("h3", attrs={"class": "c-facts__heading"}).string
			print(quick_facts)
			j = 0
			for facts in soup.find_all("dd", attrs={"class": "c-facts__definition"}):
				if j == 1:
					maturity = facts.string
					maturity = maturity.split('\n')[-2]
				if j == 2:
					life_cycle = facts.string
					life_cycle = life_cycle.split('\n')[-5]
				j+=1;
		except:
			print("no facts")
			maturity = ""
			life_cycle = ""
		try:
			price = soup.find("span", attrs={"class": "c-attribute-table__val c-attribute-table__val--m-bold"}).string
			price = price.split('$')[-1]
			unit = soup.find("h3", attrs={"class": "c-attribute-table__val c-attribute-table__val--m-heading"}).string
			price_per_unit = "$" + price + "/" + unit
		except:
			price = ""
			price_per_unit = ""
		name = name.replace("-", " ")
		print(category + " " + name + " " + variety + " " + maturity + " " + life_cycle + " " + price)
		print(price_per_unit)
		# print(name)
		# print(variety)
		i+=1
		data = {			
				'variety': variety,
				'name' : name,
				'category': category,
				'manufacturer': "Johny's",
				'maturity': maturity,
				'life_cycle' : life_cycle,
				'price': price,
				'price_per_unit': price_per_unit,
				'organic': False,
				'url': variety_url 
				}
		json_data = json.dumps(data, indent=4)
		print(json.dumps(data, indent=4))
		f = open("data.txt", "a")
		f.write(json_data + '\n')
