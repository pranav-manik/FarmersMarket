from bs4 import BeautifulSoup
import requests
import time
import json

#retreive url to search
#page_url = input("Enter URL: ")
mainSite = "https://www.fedcoseeds.com/seeds/"
sitelistname = "https://www.fedcoseeds.com/seeds?listname="
sitenames = "https://www.fedcoseeds.com/seeds?cat="

names = ['Peas', 'Peppers', 'Pumpkins', 'Radishes', 'Spinach', 'Squash - Summer', 'Squash - Winter', 'Tomatoes', 'Watermelons', 'Zucchini']
#'Asian Greens', 'Beans', 'Beets', 'Broccoli', 'Cabbages', 'Carrots', 'Cauliflowers', 'Celery', 'Corn', 'Cucumbers', 'Eggplants', 'Gourds',
#'Grains',
#'Greens',
#'Herbs', 'Hot Peppers', 'Kale and Collards', 'Lettuce', 'Melons', 'Onions and Leeks', 'Other Roots',


vegetables_cat = ['Asian Greens', 'Beans', 'Beets', 'Broccoli', 'Cabbages', 'Carrots', 'Cauliflowers', 'Celery', 'Cucumbers', 'Eggplants', 'Gourds', 'Greens', 'Herbs', 'Hot Peppers', 'Kale and Collards', 'Lettuce', 'Onions and Leeks', 'Other Roots', 'Peas', 'Peppers', 'Pumpkins', 'Radishes', 'Spinach', 'Squash - Summer', 'Squash - Winter', 'Zucchini']
fruits_cat = ['Melons', 'Tomatoes', 'Watermelons']
other_cat = ['Corn', 'Grains', 'Herbs']

HARD_LIMIT = 20

for i in names:
    page_response = requests.get(''.join((sitenames, i)),
                        headers={'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'})
    soup = BeautifulSoup(page_response.content, "html.parser")
    time.sleep(5)

    #print("\n\n~~~ NAME:", i, "~~~")
    n = 1
    for type in soup.find_all("div", attrs = {"class": "search-result-item span6 w3-card-2"}):

        variety_url = type.find("a", href=True).get('href')

        variety = type.find("a", attrs= {"class": "name"}).contents[0]

        if i in vegetables_cat:
            category = "vegetables"
        elif i in fruits_cat:
            category = "fruits"
        else:
            category = "other"

        maturity = ""

        try:
            if type.find("span", attrs = {"class": "og-eco"}).string == "OG":
                organic = True
                variety = variety[:len(variety)-1]
        except:
            organic = False


        if i != "Herbs":

            try:
                maturity = type.find("span", attrs= {"class": "description"}).contents[1]
                pos = maturity.find("days") - 1
                maturity = maturity[pos-3:pos]
                for j in range(2):
                    if maturity[j] == "(" or maturity[j] == "-":
                        maturity = maturity[1:]

            except:
                try:
                    maturity = type.find("span", attrs= {"class": "description"}).contents[0]
                    pos = maturity.find("days") - 1
                    maturity = maturity[pos-3:pos]
                    for j in range(2):
                        if maturity[j] == "(" or maturity[j] == "-":
                            maturity = maturity[1:]
                except:
                    maturity = ""


        page_response2 = requests.get(variety_url,
                            headers={'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'})
        soup2 = BeautifulSoup(page_response2.content, "html.parser")
        time.sleep(5)

        price_per_unit = "0000"

        #for type2 in soup2.find_all("tr", attrs = {"align": "left"}):
        price_per_unit = soup2.find("td", attrs= {"class": "pricecell"}).contents[0]

        pos = price_per_unit.find(":") + 2
        price_per_unit = price_per_unit[pos:]

        pos = price_per_unit.find("$") + 1
        price = price_per_unit[pos:pos+4]
        pos = price_per_unit.find(" for")
        unit = price_per_unit[:pos]
        price_per_unit = "$" + price + " per " + unit

        life_cycle = ""

        name = i

        #print("{\n\t\"variety\":\"" + variety + "\"" +
        #      "\n\t\"name\":\"" + i + "\"" +
        #      "\n\t\"category\":\"" + category + "\"" +
        #      "\n\t\"maturity\":\"" + maturity + "\"" +
        #      "\n\t\"life_cycle\":\"" + life_cycle + "\"" +
        #      "\n\t\"price\":\"" + price + "\"" +
        #      "\n\t\"price_per_unit\":\"" + price_per_unit + "\"" +
        #      "\n\t\"organic\":\"" + str(organic) + "\"" +
        #      "\n\t\"url\":\"" + variety_url + "\"" +
        #      "\n}")

        data = {
            "variety": variety,
            "name": name,
            "category": category,
            "manufacturer": "FedCo",
            "maturity": maturity,
            "life_cycle": life_cycle,
            "price": price,
            "price_per_unit": price_per_unit,
            "organic": organic,
            "url": variety_url
            }
        json_data = json.dumps(data, indent=4)
        print(json.dumps(data, indent=4))
        f = open("FCdata3.txt", "a")
        f.write(json_data + '\n')

        n += 1

        if n > HARD_LIMIT:
            break
