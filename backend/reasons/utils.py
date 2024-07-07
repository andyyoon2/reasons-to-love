# https://auth0.com/docs/quickstart/backend/django/01-authorization

import json
import os

import jwt
import requests

from django.contrib.auth import authenticate

def jwt_get_username_from_payload_handler(payload):
    username = payload.get('sub').replace('|', '.')
    authenticate(remote_user=username)
    return username

def jwt_decode_token(token):
    header = jwt.get_unverified_header(token)
    issuer = os.environ.get("AUTH0_ISSUER_BASE_URL", '')
    audience = os.environ.get("AUTH0_AUDIENCE", '')
    jwks = requests.get('{}.well-known/jwks.json'.format(issuer)).json()
    public_key = None
    for jwk in jwks['keys']:
        if jwk['kid'] == header['kid']:
            public_key = jwt.algorithms.RSAAlgorithm.from_jwk(json.dumps(jwk))

    if public_key is None:
        raise Exception('Public key not found.')

    return jwt.decode(token, public_key, audience=audience, issuer=issuer, algorithms=['RS256'])
