# from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin

from rest_framework import generics, viewsets, permissions

from .serializers import UserSerializer
from .models import User, Reason

# Create your views here.
class UserListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ReasonListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Reason.objects.all()
