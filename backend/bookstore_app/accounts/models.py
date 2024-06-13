from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import EmailValidator, MinLengthValidator, MaxLengthValidator

from .managers import UserManager


# Create your models here.

class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True,
                              validators=[EmailValidator(message='Invalid Email')], max_length=254)
    first_name = models.CharField(validators=[MinLengthValidator(1)], max_length=255)
    last_name = models.CharField(validators=[MinLengthValidator(1)], max_length=255)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = UserManager()

    def __str__(self):
        return self.email
