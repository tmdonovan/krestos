## Getting Started with Development

1) Clone the repo
1) Change directory into repo
1) Create Virutal Environment
1) Create .env file `www/.env` with debug mode set `DEBUG=True` 
1) Create Database: `python manage.py migrate`
1) Create Super User (make sure their username is `user`): `python manage.py createsuperuser`
1) (not ready yet) Load data: `python manage.py loaddata koinonia`


## Saving work

#### Save changes made to `models.py`

```bash
python manage.py makemigrations
git add .
git commit -m "modified models.py"
git push
```

#### Take snapshot of app database

```bash
python manage.py dumpdata koinonia \ 
  --natural-primary \
  --natural-foreign \
  --indent 2 \
  -o koinonia/fixtures/sample.json
```
