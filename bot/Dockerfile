# === Base image ===
FROM python:3.11-slim

# === Set work directory ===
WORKDIR /app

# === Copy files ===
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
ARG WEBAPP_URL
ARG BOT_TOKEN
ENV WEBAPP_URL=${WEBAPP_URL}
ENV BOT_TOKEN=${BOT_TOKEN}

# === Run the bot ===
CMD ["python", "main.py"]
