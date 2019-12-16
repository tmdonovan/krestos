FROM python:latest

RUN pip install --no-cache-dir uwsgi

ENV PROJECT=koinonia
ENV CONTAINER_HOME=/srv
ENV CONTAINER_PROJECT=$CONTAINER_HOME/$PROJECT
ENV DJANGO_SETTINGS_MODULE=www.settings
ENV PYTHONPATH=.:${PYTHONPATH}

WORKDIR $CONTAINER_PROJECT

RUN mkdir -p $CONTAINER_PROJECT

COPY requirements.txt $CONTAINER_PROJECT
RUN pip install --no-cache-dir -r $CONTAINER_PROJECT/requirements.txt

COPY uwsgi.ini $CONTAINER_PROJECT
COPY www $CONTAINER_PROJECT/www
COPY $PROJECT $CONTAINER_PROJECT/$PROJECT

RUN django-admin collectstatic --noinput

#CMD django-admin migrate koinonia zero && django-admin migrate && django-admin load mcgis && uwsgi --ini uwsgi.ini
CMD django-admin migrate && uwsgi --ini uwsgi.ini

EXPOSE 5003
