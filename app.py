from flask import Flask
from requests import get

# app = Flask('__main__')
app = Flask('__main__', static_folder=None)
SITE_NAME = 'http://art-pigeon.com/'


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def proxy(path):
    # print(path)
    # print(get(f'{SITE_NAME}{path}', headers={'User-Agent': 'Custom'}))
    return get(f'{SITE_NAME}{path}', headers={'User-Agent': 'Custom'}).content
    # return path


@app.route('/static/<path:path>')
def static_proxy(path):
    print(path)
    root = 'https://s3.amazonaws.com/artpigeon-static/'
    print(get(f'{root}{path}', headers={'User-Agent': 'Custom'}).content)
    return get(f'{root}{path}', headers={'User-Agent': 'Custom'}).content
if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)
