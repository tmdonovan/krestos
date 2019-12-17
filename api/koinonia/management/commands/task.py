from importlib import import_module

from django.core.management.base import BaseCommand, CommandError
from ... import models


def get_manager_method(app_model):
    app_name, model_name = app_model.split('.')

    import_module('{app_name}.tasks.{model_name}'.format(
        app_name=app_name, model_name=model_name)
    )


def get_task_method(app_task, *args, **kwargs):
    app_name, task_name = app_task.split('.')

    module = import_module('{app_name}.tasks'.format(app_name=app_name))
    return getattr(module, task_name)(*args, **kwargs)


class Command(BaseCommand):
    help = 'Execute a given task method in tasks.py.'

    def add_arguments(self, parser):
        parser.add_argument('app.method', nargs=1, type=str)
        parser.add_argument('args', nargs='+', type=str)

    def handle(self, *args, **options):
        for am in options['app.method']:
            get_task_method(am, *args)
