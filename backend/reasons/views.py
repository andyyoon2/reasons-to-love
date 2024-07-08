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

class PartnershipView(generics.ListAPIView):
    # permission_classes = [permissions.IsAuthenticated]
    serializer_class = PartnershipSerializer

    def get_queryset(self):
        print(self.request)
        """Returns partnerships for the current user"""
        user = self.request.user
        print(vars(user))
        return Partnership.objects.filter(user=user)

class ReasonView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Reason.objects.all()
    serializer_class = ReasonSerializer
