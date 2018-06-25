# from flask import Flask
# from requests import get

# app = Flask('__main__')
# SITE_NAME = 'https://artpigeon.nyc/'


# @app.route('/', defaults={'path': ''})
# @app.route('/<path:path>')
# def proxy(path):
#     return get(f'{SITE_NAME}{path}').content


# app.run(host='0.0.0.0', port=8080)
from flask import Flask
from datetime import datetime
app = Flask(__name__)

@app.route('/')
def homepage():
    the_time = datetime.now().strftime("%A, %d %b %Y %l:%M %p")

    return """
    <h1>Hello heroku</h1>
    <p>It is currently {time}.</p>

    <img src="http://loremflickr.com/600/400">
    """.format(time=the_time)

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True, host='0.0.0.0', port=5000)