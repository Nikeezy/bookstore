import django_filters
from django.db.models import Q

from .models import Book, Author


class AuthorFilter(django_filters.FilterSet):
    id = django_filters.NumberFilter(field_name='id')
    full_name = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Author
        fields = ['id', 'full_name']

    ordering = django_filters.OrderingFilter(
        fields=(
            ('full_name', 'full_name'),
            ('-full_name', '-full_name'),
        ),
        field_name='full_name',
    )


class BookFilter(django_filters.FilterSet):
    id = django_filters.NumberFilter(field_name='id')
    title = django_filters.CharFilter(lookup_expr='icontains')
    description = django_filters.CharFilter(lookup_expr='icontains')
    genres = django_filters.CharFilter(method='filter_by_genres')
    authors = django_filters.CharFilter(method='filter_by_authors')
    publisher = django_filters.CharFilter(field_name='publisher__name', lookup_expr='icontains')
    language = django_filters.CharFilter(lookup_expr='icontains')
    price__gte = django_filters.NumberFilter(field_name='price', lookup_expr='gte')
    price__lte = django_filters.NumberFilter(field_name='price', lookup_expr='lte')
    stock__gte = django_filters.NumberFilter(field_name='stock', lookup_expr='gte')
    stock__lte = django_filters.NumberFilter(field_name='stock', lookup_expr='lte')
    format = django_filters.CharFilter(field_name='format__name', lookup_expr='icontains')
    rating__gte = django_filters.NumberFilter(field_name='rating', lookup_expr='gte')
    rating__lte = django_filters.NumberFilter(field_name='rating', lookup_expr='lte')
    age_rating = django_filters.CharFilter(method='filter_by_age_rating')

    ordering = django_filters.OrderingFilter(fields=(
        ('rating', 'rating'),
        ('-rating', '-rating'),
        ('price', 'price'),
        ('-price', '-price'),
    ))

    class Meta:
        model = Book
        fields = ['id', 'title', 'description', 'genres', 'authors', 'publisher',
                  'language', 'price__gte', 'price__lte', 'stock__gte', 'stock__lte',
                  'format', 'rating__gte', 'rating__lte', 'age_rating', 'ordering']

    def filter_by_age_rating(self, queryset, name, value):
        age_ratings = value.split(',')
        q_objects = Q()

        for age_rating in age_ratings:
            q_objects |= Q(age_rating=age_rating.strip())

        return queryset.filter(q_objects)

    def filter_by_genres(self, queryset, name, value):
        genre_ids = value.split(',')
        q_objects = Q()

        for genre_id in genre_ids:
            q_objects |= Q(genres__id=genre_id.strip())

        return queryset.filter(q_objects)

    def filter_by_authors(self, queryset, name, value):
        authors_ids = value.split(',')
        q_objects = Q()

        for author_id in authors_ids:
            q_objects |= Q(authors__id=author_id.strip())

        return queryset.filter(q_objects)
