from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Partnership, PartnershipUser, Reason

AuthUser = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthUser
        fields = ["id", "username"]

class PartnershipUserSerializer(serializers.ModelSerializer):
    # TODO: This isn't working
    # user = UserSerializer(many=True, read_only=True)
    class Meta:
        model = PartnershipUser
        fields = ["date_joined", "nickname"]

class PartnershipSerializer(serializers.ModelSerializer):
    users = PartnershipUserSerializer(many=True, read_only=True)
    class Meta:
        model = Partnership
        fields = ["id", "name", "users"]

class ReasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reason
        fields = ["id", "date", "message", "author", "partnership", "favorited_by"]
