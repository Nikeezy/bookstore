from django.conf import settings
from django.db import models


class Genre(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Author(models.Model):
    full_name = models.CharField(max_length=255)

    def __str__(self):
        return self.full_name


class Publisher(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class BookFormat(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Book(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    genres = models.ManyToManyField(Genre)
    authors = models.ManyToManyField(Author)
    publisher = models.ForeignKey(Publisher, on_delete=models.SET_NULL, null=True)
    publication_date = models.DateField(null=True, blank=True)
    cover_image = models.ImageField(upload_to='book_covers/', null=True, blank=True)
    num_pages = models.PositiveIntegerField(null=True, blank=True)
    language = models.CharField(max_length=50, default='English')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    format = models.ForeignKey(BookFormat, on_delete=models.SET_NULL, null=True, blank=True)
    rating = models.FloatField(default=0.0)

    AGE_RATING_CHOICES = (
        ('0', '0'),
        ('6', '6'),
        ('12', '12'),
        ('16', '16'),
        ('18', '18'),
    )

    age_rating = models.CharField(max_length=5, choices=AGE_RATING_CHOICES, default='0')

    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.title


class Cart(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cart of {self.user}"


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name='items', on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} of {self.book}"
