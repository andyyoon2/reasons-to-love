from rest_framework import serializers
from .models import Partnership, Reason, User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

class PartnershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partnership
        fields = "__all__"

class ReasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reason
        fields = "__all__"
