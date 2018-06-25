from flask import Flask
from requests import get

app = Flask('__main__', static_folder=None)
SITE_NAME = 'https://artpigeon.nyc/'


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def proxy(path):
    # print(path)
    # print(get(f'{SITE_NAME}{path}', headers={'User-Agent': 'Custom'}))
    return get(f'{SITE_NAME}{path}', headers={'User-Agent': 'Custom'}).content
    # return path



if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)
