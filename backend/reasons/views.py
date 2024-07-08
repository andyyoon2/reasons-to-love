from django.contrib.auth import get_user_model

from rest_framework import generics, viewsets, permissions
from rest_framework.exceptions import ValidationError

from .serializers import UserSerializer, ReasonSerializer, PartnershipSerializer
from .models import Reason, Partnership

AuthUser = get_user_model()

# Create your views here.
class UserView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = AuthUser.objects.all()
    serializer_class = UserSerializer

class PartnershipView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PartnershipSerializer

    def get_object(self):
        """Returns partnership for the current user"""
        user = self.request.user
        partnership = Partnership.objects.filter(partnershipuser__user=user).first()
        return partnership

class ReasonView(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Reason.objects.all()
    serializer_class = ReasonSerializer

    def get_queryset(self):
        """Returns reasons in the current user's partnership"""
        user = self.request.user
        return Reason.objects.filter(partnership__partnershipuser__user=user)

    def perform_create(self, serializer):
        body = self.request.data
        message = body.get("message", None)
        username = body.get("username", None)
        partnership = body.get("partnership", None)

        if message is None or username is None or partnership is None:
            raise ValidationError("All fields are required.")

        username = username.replace("|", ".")
        author = AuthUser.objects.filter(username=username).first()
        partnership = Partnership.objects.get(id=partnership)

        serializer.save(message=message, author=author, partnership=partnership)
