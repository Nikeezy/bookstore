from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .filters import BookFilter, AuthorFilter
from .models import Book, Genre, CartItem, Cart, Author
from .serializers import BookSerializer, GenreSerializer, CartSerializer, AuthorSerializer
from .pagination import BookPageNumberPagination, GenrePageNumberPagination


# Create your views here.

class AuthorViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny, ]
    filter_backends = (DjangoFilterBackend,)

    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    filterset_class = AuthorFilter


class BookViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny, ]
    filter_backends = (DjangoFilterBackend,)

    queryset = Book.objects.all()
    serializer_class = BookSerializer
    filterset_class = BookFilter
    pagination_class = BookPageNumberPagination


class GenreViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny, ]
    filter_backends = (DjangoFilterBackend,)

    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    pagination_class = GenrePageNumberPagination


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        # Переопределяем метод get_queryset, чтобы возвращать только корзину текущего пользователя
        return self.queryset.filter(user=self.request.user)

    @action(detail=False, methods=['get'])
    def get_cart(self, request, *args, **kwargs):
        cart, created = Cart.objects.get_or_create(user=request.user)
        serializer = self.get_serializer(cart)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def update_quantity(self, request, *args, **kwargs):
        cart_item_id = request.data.get('cart_item_id')
        quantity = request.data.get('quantity')

        if not cart_item_id or not quantity:
            return Response({'status': 'error', 'message': 'Cart item ID and quantity are required.'},
                            status=status.HTTP_400_BAD_REQUEST)

        cart_item = get_object_or_404(CartItem, id=cart_item_id, cart__user=request.user)

        if quantity > 0:
            cart_item.quantity = quantity
            cart_item.save()
            return Response({'status': 'success', 'quantity': cart_item.quantity})
        else:
            return Response({'status': 'error', 'message': 'Invalid quantity'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def delete_item(self, request, *args, **kwargs):
        cart_item_id = request.data.get('cart_item_id')

        if not cart_item_id:
            return Response({'status': 'error', 'message': 'Cart item ID is required.'},
                            status=status.HTTP_400_BAD_REQUEST)

        cart_item = get_object_or_404(CartItem, id=cart_item_id, cart__user=request.user)
        cart_item.delete()
        return Response({'status': 'success'})

    @action(detail=False, methods=['post'])
    def add_item(self, request, *args, **kwargs):
        book_id = request.data.get('book_id')

        if not book_id:
            return Response({'status': 'error', 'message': 'Book ID is required.'},
                            status=status.HTTP_400_BAD_REQUEST)

        book = get_object_or_404(Book, id=book_id)
        cart, created = Cart.objects.get_or_create(user=request.user)

        cart_item, created = CartItem.objects.get_or_create(cart=cart, book=book)

        cart_item.quantity = 1

        cart_item.save()

        return Response({'status': 'success'})

    @action(detail=False, methods=['post'])
    def check_item(self, request, *args, **kwargs):
        book_id = request.data.get('book_id')

        if not book_id:
            return Response({'status': 'error', 'message': 'Book ID is required.'},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            book = get_object_or_404(Book, id=book_id)
        except ValueError:
            return Response({'status': 'error', 'message': 'Invalid book ID.'},
                            status=status.HTTP_400_BAD_REQUEST)

        cart_item_exists = CartItem.objects.filter(cart__user=request.user, book=book).exists()

        if cart_item_exists:
            return Response({'status': 'success', 'message': 'Book is in the cart.'}, status=status.HTTP_200_OK)
        else:
            return Response({'status': 'error', 'message': 'Book is not in the cart.'},
                            status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def clear_cart(self, request, *args, **kwargs):
        cart = get_object_or_404(Cart, user=request.user)
        cart.items.all().delete()
        return Response({'status': 'success', 'message': 'Cart has been cleared.'})

    @action(detail=False, methods=['post'])
    def checkout(self, request, *args, **kwargs):
        cart = get_object_or_404(Cart, user=request.user)
        cart_items = cart.items.all()

        for item in cart_items:
            if item.book.stock < item.quantity:
                return Response({'status': 'error', 'message': f'Not enough stock for {item.book.title}.'},
                                status=status.HTTP_400_BAD_REQUEST)

        for item in cart_items:
            item.book.stock -= item.quantity
            item.book.save()

        cart_items.delete()

        return Response({'status': 'success', 'message': 'Checkout completed successfully and cart has been cleared.'})
