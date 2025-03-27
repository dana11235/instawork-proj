# Instawork Coding Project

Welcome to my instawork coding project.

## Setup using Docker

To setup and run this project using Docker:

```
docker compose build
docker compose up
```

## Setup not using Docker

If you don't want to use Docker, the following instructions should work:

### Backend Setup/Run

```
cd api
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend Setup/Run

```
cd frontend
npm install
npm run build
npm run start
```

## Accessing the App

After setting up and running the project, it should be available at http://localhost:3000
