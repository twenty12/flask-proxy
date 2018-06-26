# coding:utf-8
# Copyright 2011 litl, LLC. All Rights Reserved.

import re
import requests
from flask import Blueprint, request, Response
from flask import Flask

URL = 'https://portal.bitcasa.com/login'

proxy = Blueprint('proxy', __name__)


HTML_REGEX = re.compile(r'((?:src|action|href)=["\'])/')
JQUERY_REGEX = re.compile(r'(\$\.(?:get|post)\(["\'])/')
JS_LOCATION_REGEX = re.compile(r'((?:window|document)\.location.*=.*["\'])/')
CSS_REGEX = re.compile(r'(url\(["\']?)/')

REGEXES = [HTML_REGEX, JQUERY_REGEX, JS_LOCATION_REGEX, CSS_REGEX]


@proxy.route('/', defaults={'path': ''}, methods=["GET", "POST"])
@proxy.route('/<path:path>', methods=["GET", "POST"])
def proxy_request(path, file=""):
    # host = 'http://127.0.0.1:8000/' + path
    host = 'https://art-pigeon.com/' + path
    client = requests.session()
    client.get(host)  # sets cookie
    print(type(request.headers.get('cookie')))
    cookie = request.headers.get('cookie').split(';')[0].split('=')[1]
    print('new cookie %s' % cookie)
    # print(type(client.cookies))
    # csrftoken = client.cookies['csrftoken']
    if 'csrftoken' in client.cookies:
        print('cookie token = %s' % client.cookies['csrftoken'])
        csrftoken = client.cookies['csrftoken']
        csrftoken = cookie
    else:
        csrftoken = None
    if request.method == "GET":
        response = client.get(host, cookies=request.cookies)
    elif request.method == "POST":
        # response = requests.post(host, data=request.form)
        post_data = {}
        print('form token = %s' % request.form['csrfmiddlewaretoken'])
        for item in request.form:
            post_data[item] = request.form[item]
        post_data['csrfmiddlewaretoken'] = csrftoken
        response = client.post(
            host,
            data=post_data,
            headers=dict(Referer=URL),
            cookies=request.cookies)
    proxy_response = Response(
        response=response.content,
        status=response.status_code,
        content_type=response.headers['content-type'])

    for cookie in response.cookies:
        proxy_response.set_cookie(
            key=cookie.name,
            value=cookie.value,
            path=cookie.path,
            expires=cookie.expires,
            secure=cookie.secure)
    return proxy_response

app = Flask(__name__)
app.register_blueprint(proxy)

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True, port=3000)
