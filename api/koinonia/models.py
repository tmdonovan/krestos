from django.contrib.auth.models import AbstractUser
from django.db import models

from . import valid_values

"""
On creating models...

Every iteration of the models will yield a few changes to other files.
- admin.py: Place to modify the Admin Web UI 
- schema.py: Place where the Graphene changes are applied
- migrations/: Place where any schema changes are catalogued after the `makemigrations` command is run.
"""


class Network(models.Model):
    """
    churches are a part of a network of churches
    """
    name = models.CharField(max_length=64)
    slug = models.CharField(max_length=64, blank=True)

    def __str__(self):
        return self.name.__str__()


class Church(models.Model):
    name = models.CharField(max_length=64)
    slug = models.CharField(max_length=64, blank=True)
    address_1 = models.CharField(max_length=64, blank=True)
    address_2 = models.CharField(max_length=64, blank=True)
    address_3 = models.CharField(max_length=64, blank=True)
    city = models.CharField(max_length=64, blank=True)
    state = models.CharField(max_length=2, blank=True, choices=valid_values.US_STATES)
    zip = models.IntegerField(blank=True, null=True)
    phone_number = models.IntegerField(blank=True, null=True)

    class Meta:
        verbose_name_plural = 'Churches'

    def __str__(self):
        return self.name.__str__()


class Team(models.Model):
    name = models.CharField(max_length=64)
    slug = models.CharField(max_length=64, blank=True)

    def __str__(self):
        return self.name.__str__()


class Member(AbstractUser):
    address_1 = models.CharField(max_length=64, blank=True)
    address_2 = models.CharField(max_length=64, blank=True)
    address_3 = models.CharField(max_length=64, blank=True)
    city = models.CharField(max_length=64, blank=True)
    state = models.CharField(max_length=2, blank=True, choices=valid_values.US_STATES)
    zip = models.IntegerField(blank=True, null=True)
    phone_number = models.IntegerField(blank=True, null=True)

    def __str__(self):
        if self.first_name and self.last_name:
            return f'{self.first_name.__str__()} {self.last_name.__str__()}'
        elif self.first_name:
            return self.first_name.__str__()
        elif self.last_name:
            return self.last_name.__str__()
        else:
            return self.username.__str__()


class RelationshipType(models.Model):
    """
    types of relationships people can have with one another
    """
    name = models.CharField(max_length=64)
    slug = models.CharField(max_length=64, blank=True)

    def __str__(self):
        return self.name.__str__()


class Relationship(models.Model):
    """
    How people can connect with one another
    """
    from_member = models.ForeignKey(Member, related_name='from_member', on_delete=models.CASCADE)
    to_member = models.ForeignKey(Member, related_name='to_member', on_delete=models.CASCADE)
    relationship_type = models.ForeignKey(RelationshipType, on_delete=models.CASCADE)


class TeamMembership(models.Model):
    """
    How people can be related to teams.
    """
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)


class ChurchMembership(models.Model):
    """
    How people can be related to churches
    """
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    church = models.ForeignKey(Church, on_delete=models.CASCADE)


class NetworkMembership(models.Model):
    """
    How churches can be related to networks.
    """
    church = models.ForeignKey(Church, on_delete=models.CASCADE)
    network = models.ForeignKey(Network, on_delete=models.CASCADE)


class Resource(models.Model):
    """
    What a person could have.
    """
    name = models.CharField(max_length=64)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=16, choices=(('good', 'Good'), ('service', 'Service')))
    church_owner = models.ForeignKey(Church, blank=True, null=True, on_delete=models.CASCADE)
    member_owner = models.ForeignKey(Member, blank=True, null=True, on_delete=models.CASCADE)
    network_owner = models.ForeignKey(Network, blank=True, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.name.__str__()
