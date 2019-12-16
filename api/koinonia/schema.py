import graphene
from graphene_django.types import DjangoObjectType

from . import models

# https://docs.graphene-python.org/projects/django/en/latest/tutorial-plain/#hello-graphql-schema-and-object-types


class ChurchType(DjangoObjectType):
    class Meta:
        model = models.Church


class ResourceType(DjangoObjectType):
    class Meta:
        model = models.Resource


class Query(object):
    """
    A mixin, inheriting from object. This is because we will now
    create a project-level query class which will combine all our
    app-level mixins.
    """
    all_churches = graphene.List(ChurchType)
    all_resources = graphene.List(ResourceType)

    def resolve_all_churches(self, info, **kwargs):
        return models.Church.objects.all()

    def resolve_all_resources(self, info, **kwargs):
        # We can easily optimize query count in the resolve method
        return models.Resource.objects.select_related('church').all()
