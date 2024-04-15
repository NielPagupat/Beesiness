from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

from App.workers.managers import CustomUserManager
# Create your models here.

class CustomUser(AbstractUser):
    avatar = models.ImageField(null=True, upload_to='images/profile/')
    email = models.EmailField(_('email address'), primary_key=True)

    first_name = models.CharField(max_length = 255, blank=True)
    last_name = models.CharField(max_length = 255, blank=True)
    middle_initial = models.CharField(max_length = 10, blank=True)
    birthday = models.DateField (null=True)
    gender = models.CharField(max_length = 50, blank=True)

    is_active = models.BooleanField(default = False)

    REQUIRED_FIELDS = ['email']

    objects = CustomUserManager()

    def __str__(self) -> str:
        return '{}-{}'.format(self.email, self.last_name)
    

