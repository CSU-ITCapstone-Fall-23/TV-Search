import urllib.request, json

from flask import Flask, render_template, request   # import flask framework
app = Flask(__name__)                               # create an app instance

@app.route("/")                                     # use the home url
def home():
    return render_template("index.html")

@app.route("/results")                              # results url
def results():
    url = "https://api.tvmaze.com/search/shows?q=Breaking"
    response = urllib.request.urlopen(url)
    data = response.read()
    dict = json.loads(data)
    return render_template("results.html", datum=dict) 

@app.route("/sample")                               # sample url
def sample():
    url = "https://api.tvmaze.com/singlesearch/shows?q=Breaking"
    response = urllib.request.urlopen(url)
    data = response.read()
    dict = json.loads(data)
    return render_template("sample.html", datum=dict) 

if __name__ == "__main__":                          # when running python app.py
    app.run(debug=True)                             # run the flask app