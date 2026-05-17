import requests

books = requests.get(
    "https://raw.githubusercontent.com/Sefaria/Sefaria-Export/master/books.json"
).json()

# Find all Talmud texts
for book in books["books"]:
    if "Talmud" in book["categories"]:
        print(book["title"], book.get("json_url"))


please download to the local folder C:\Users\binya\Downloads\Shulchan Aruch\Sefaria Pulls
create one folder for shulchan aruch, in that should be folders for Orach Chaim, Yoreh Deah...
A separate folder tree should be for Shulchan Aruch HaRav
everything should be Hebrew
commentaries should be within their local structure, all commentaries per sefer