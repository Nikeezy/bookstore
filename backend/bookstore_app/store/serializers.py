from rest_framework import serializers

from .models import Book, Genre, Author, BookFormat, Publisher, Cart, CartItem


class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = '__all__'


class BookFormatSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookFormat
        fields = '__all__'


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'


class BookSerializer(serializers.ModelSerializer):
    publisher = PublisherSerializer()
    format = BookFormatSerializer()
    genres = GenreSerializer(many=True)
    authors = AuthorSerializer(many=True)

    class Meta:
        model = Book
        fields = '__all__'


class CartItemSerializer(serializers.ModelSerializer):
    book = BookSerializer()

    class Meta:
        model = CartItem
        fields = '__all__'


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = '__all__'
