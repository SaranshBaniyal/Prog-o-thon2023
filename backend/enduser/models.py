from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.contrib import admin
import uuid

class EndUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        return self.create_user(email, password, **extra_fields)

class EndUser(AbstractBaseUser, PermissionsMixin):
    id = models.CharField(
        max_length=36, default=uuid.uuid4, primary_key=True, unique=True
    )
    email = models.EmailField(max_length=100, unique=True)
    name = models.CharField(max_length=100)
    wallet_id = models.CharField(max_length=42, unique=True)
    rollno = models.CharField(max_length=5, unique=True)
    branch = models.CharField(
        max_length=3,
        choices=(("CSE", "CSE"), ("ECE", "ECE"), ("IT", "IT")),
    )
    year = models.CharField(max_length=4)

    # image = models.ImageField(upload_to='pictures', default='default.svg')
    image_encodings = models.JSONField(null=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = EndUserManager()

    USERNAME_FIELD = "email"

    def __str__(self):
        return self.email

@admin.register(EndUser)
class EndUserAdmin(admin.ModelAdmin):
    list_display = ('email', 'name', 'branch', 'year')  # Customize the fields displayed in the list view
    list_filter = ('branch', 'year')  # Add filters for the list view
    search_fields = ('email', 'name')  # Add search functionality