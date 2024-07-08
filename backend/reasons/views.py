from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin

from rest_framework import generics, viewsets, permissions

from .serializers import UserSerializer, ReasonSerializer, PartnershipSerializer
from .models import Reason, Partnership

user_model = get_user_model()

# Create your views here.
class UserView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = user_model.objects.all()
    serializer_class = UserSerializer

class PartnershipView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PartnershipSerializer

    def get_object(self):
        """Returns partnership for the current user"""
        user = self.request.user
        return Partnership.objects.filter(partnershipuser__user=user).first()

class ReasonView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Reason.objects.all()
    serializer_class = ReasonSerializer

    def get_queryset(self):
        """Returns reasons in the current user's partnership"""
        user = self.request.user
        return Reason.objects.filter(partnership__partnershipuser__user=user)
