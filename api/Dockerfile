FROM python:3.12.9-bullseye
ENV PYTHONUNBUFFERED=1
WORKDIR /api
COPY . .
RUN pip install -r requirements.txt
RUN python manage.py migrate
EXPOSE 8000