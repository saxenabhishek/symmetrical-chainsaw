from django.db import models


class Products_Model(models.Model):

    img_src = models.CharField(max_length=200, blank=False)
    colors = models.TextField(null=False, blank=False)
    tags = models.TextField(null=False, blank=False)
    name = models.TextField(null=False, blank=False)
    stars = models.CharField(max_length=50, blank=False)
    revs = models.CharField(max_length=10, blank=False)
    price = models.IntegerField(blank=False)
    og_price = models.CharField(max_length=10, blank=False)
