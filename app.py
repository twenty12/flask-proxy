# coding:utf-8
# Copyright 2011 litl, LLC. All Rights Reserved.

import re
import requests
from flask import Blueprint, request, Response
from flask import Flask

HOST = 'https://art-pigeon.com/'

proxy = Blueprint('proxy', __name__)


def get_csrftoken_from_headers(headers):
    cookie = headers.get('cookie')
    reg = re.search('csrftoken=(.*);', cookie)
    return reg.group(1)


def set_cookies_in_proxy_response(response, proxy_response):
    for cookie in response.cookies:
        proxy_response.set_cookie(
            key=cookie.name,
            value=cookie.value,
            path=cookie.path,
            expires=cookie.expires,
            secure=cookie.secure)


def get_post_response(request, client, csrftoken, url):
    post_data = {}
    for item in request.form:
        post_data[item] = request.form[item]
    post_data['csrfmiddlewaretoken'] = csrftoken
    response = client.post(
        url,
        data=post_data,
        headers=dict(Referer=url),
        cookies=request.cookies)
    return response


@proxy.route('/', defaults={'path': ''}, methods=["GET", "POST"])
@proxy.route('/<path:path>', methods=["GET", "POST"])
def proxy_request(path, file=""):
    url = HOST + path
    client = requests.session()
    client.get(url)
    csrftoken = get_csrftoken_from_headers(request.headers)

    if request.method == "GET":
        host_response = client.get(url, cookies=request.cookies)
    elif request.method == "POST":
        host_response = get_post_response(request, client, csrftoken, url)
    proxy_response = Response(
        response=host_response.content,
        status=host_response.status_code,
        content_type=host_response.headers['content-type'])

    set_cookies_in_proxy_response(host_response, proxy_response)

    return proxy_response

app = Flask(__name__)
app.register_blueprint(proxy)

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True, port=3000)
