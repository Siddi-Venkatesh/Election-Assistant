# Build step for React App
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production step for Flask Server
FROM python:3.9-slim
WORKDIR /app/backend

# Copy the Flask app
COPY backend/ ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the built React app into the Flask static folder
COPY --from=build /app/dist ./static

# Expose port (Cloud Run sets the PORT env variable automatically, default to 5000)
EXPOSE 5000

# Command to run the application using gunicorn
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 app:app
