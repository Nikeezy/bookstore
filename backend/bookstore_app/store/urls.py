from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import BookViewSet, GenreViewSet, CartViewSet, AuthorViewSet

router = DefaultRouter()
router.register(r'books', BookViewSet)
router.register(r'cart', CartViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('genres/', GenreViewSet.as_view({'get': 'list'}), name='genre-list'),
    path('authors/', AuthorViewSet.as_view({'get': 'list'}), name='authors-list'),
]
