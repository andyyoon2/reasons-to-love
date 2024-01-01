urlpatterns = [
    path('users/', UserListView.as_view(), name='users'),
]
