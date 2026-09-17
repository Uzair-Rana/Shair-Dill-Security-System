# SDSSS Project Setup Guide

Complete setup instructions for running the SDSSS Security Solutions website with Django backend.

## Project Structure

```
SDSSS/
├── Frontend/          # Vue 3 + TypeScript frontend
├── Backend/           # Django REST API
└── SETUP.md          # This file
```

## Prerequisites

- **Python** (v3.8+) - [Download](https://www.python.org/)
- **pip** - Comes with Python
- **Node.js** (v16+) - For frontend - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js

## Step 1: Backend Setup (Django)

### 1.1 Create Virtual Environment

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### 1.2 Install Dependencies

```bash
cd Backend
pip install -r requirements.txt
```

### 1.3 Configure Environment

Edit `.env` file:
```bash
SECRET_KEY=django-insecure-change-me-in-production
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database (SQLite for development)
DB_ENGINE=django.db.backends.sqlite3
DB_NAME=db.sqlite3

# CORS Settings
CORS_ALLOWED_ORIGINS=http://localhost:5174,http://127.0.0.1:5174
```

### 1.4 Setup Database

```bash
# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Seed initial data
python manage.py seed_data

# Create superuser (admin account)
python manage.py createsuperuser
# Enter username, email, password when prompted
```

### 1.5 Start Django Server

```bash
python manage.py runserver
```

You should see:
```
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

### 1.6 Verify Backend is Working

```bash
# In another terminal
curl http://localhost:8000/api/health/
```

Response:
```json
{
  "status": "OK",
  "message": "SDSSS Django Backend is running"
}
```

### 1.7 Access Django Admin

1. Go to `http://localhost:8000/admin/`
2. Login with superuser credentials created earlier
3. Manage all content from the admin panel

## Step 2: Frontend Setup

1. **Open new terminal and navigate to Frontend:**
   ```bash
   cd Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Verify API configuration:**
   ```bash
   # Check .env.development has:
   # VITE_API_URL=http://localhost:8000/api
   ```

4. **Start the frontend server:**
   ```bash
   npm run dev
   ```

   You should see:
   ```
   ➜  local:   http://localhost:5174/
   ```

## Step 3: Access the Application

Open your browser and navigate to:
```
http://localhost:5174
```

The frontend will automatically fetch data from the backend API at `http://localhost:8000/api`.

## Verifying Data Flow

### Check if data is loading:

1. Open browser DevTools (F12)
2. Go to Network tab
3. Reload the page
4. You should see API calls to:
   - `/api/hero-slides/`
   - `/api/products/`
   - `/api/features/`
   - `/api/stats/`
   - `/api/testimonials/`

### If data doesn't load:

1. Check backend is running: `http://localhost:8000/api/health/`
2. Check frontend console for CORS errors
3. Verify `.env.development` has correct API URL
4. Check Django CORS settings in `Backend/config/settings.py`

## API Endpoints

### Hero Slides
```bash
GET http://localhost:8000/api/hero-slides/
POST http://localhost:8000/api/hero-slides/
PUT http://localhost:8000/api/hero-slides/{id}/
DELETE http://localhost:8000/api/hero-slides/{id}/
```

### Products
```bash
GET http://localhost:8000/api/products/
POST http://localhost:8000/api/products/
PUT http://localhost:8000/api/products/{id}/
DELETE http://localhost:8000/api/products/{id}/
```

### Features
```bash
GET http://localhost:8000/api/features/
POST http://localhost:8000/api/features/
PUT http://localhost:8000/api/features/{id}/
DELETE http://localhost:8000/api/features/{id}/
```

### Stats
```bash
GET http://localhost:8000/api/stats/
POST http://localhost:8000/api/stats/
PUT http://localhost:8000/api/stats/{id}/
DELETE http://localhost:8000/api/stats/{id}/
```

### Testimonials
```bash
GET http://localhost:8000/api/testimonials/
POST http://localhost:8000/api/testimonials/
PUT http://localhost:8000/api/testimonials/{id}/
DELETE http://localhost:8000/api/testimonials/{id}/
```

## Example: Adding a New Product

Using curl:
```bash
curl -X POST http://localhost:8000/api/products/ \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Security Camera",
    "description": "Advanced surveillance camera with AI",
    "image": "https://example.com/camera.jpg",
    "category": "cameras",
    "cta_text": "Get Quote",
    "cta_link": "#",
    "order": 13
  }'
```

The frontend will automatically refresh and display the new product.

## Managing Content

### Via Django Admin Panel

1. Go to `http://localhost:8000/admin/`
2. Click on any model (Hero Slides, Products, Features, Stats, Testimonials)
3. Add, edit, or delete items
4. Changes appear on website immediately

### Via API

Use any REST client (curl, Postman, Insomnia) or the frontend interface.

## Environment Variables

### Backend (.env)
```
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database (SQLite for development)
DB_ENGINE=django.db.backends.sqlite3
DB_NAME=db.sqlite3

# For PostgreSQL (production):
# DB_ENGINE=django.db.backends.postgresql
# DB_NAME=sdsss
# DB_USER=postgres
# DB_PASSWORD=your_password
# DB_HOST=localhost
# DB_PORT=5432

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:5174,http://127.0.0.1:5174
```

### Frontend (.env.development)
```
VITE_API_URL=http://localhost:8000/api
```

### Frontend (.env.production)
```
VITE_API_URL=https://api.yourdomain.com/api
```

## Database Management

### View data in Django shell:
```bash
python manage.py shell
>>> from api.models import Product
>>> Product.objects.all()
```

### Reset Database:
```bash
python manage.py flush
python manage.py migrate
python manage.py seed_data
```

### Backup Database:
```bash
# SQLite
cp db.sqlite3 db.sqlite3.backup
```

## Troubleshooting

### Virtual environment issues

**Error:** `python: command not found`
- Use `python3` instead of `python` on macOS/Linux
- Ensure Python is installed and in PATH

**Error:** `venv not activating`
- Windows: Run PowerShell as Administrator
- macOS/Linux: Use `source venv/bin/activate`

### Django won't start

**Error:** `ModuleNotFoundError: No module named 'django'`
- Ensure virtual environment is activated
- Run `pip install -r requirements.txt`

**Error:** `django.core.exceptions.ImproperlyConfigured`
- Check `.env` file exists
- Verify `SECRET_KEY` is set
- Run migrations: `python manage.py migrate`

### Frontend shows "Loading..." forever

- Check if backend is running: `http://localhost:8000/api/health/`
- Open DevTools and check Network tab for failed API requests
- Check CORS errors in Console
- Verify `.env.development` has correct API URL

### Port already in use

**Django (port 8000):**
```bash
# macOS/Linux
lsof -i :8000
kill -9 <PID>

# Windows (PowerShell)
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

**Frontend (port 5174):**
```bash
# macOS/Linux
lsof -i :5174

# Windows
netstat -ano | findstr :5174
```

## Development Workflow

1. **Make changes** to models or data
2. **Use Django admin** for easy content management
3. **Frontend automatically fetches** new data from API
4. **No rebuild needed** for data changes

## Production Deployment

### Using PostgreSQL

1. **Create database:**
   ```sql
   CREATE DATABASE sdsss;
   CREATE USER sdsss_user WITH PASSWORD 'secure_password';
   GRANT ALL PRIVILEGES ON DATABASE sdsss TO sdsss_user;
   ```

2. **Update .env:**
   ```
   DB_ENGINE=django.db.backends.postgresql
   DB_NAME=sdsss
   DB_USER=sdsss_user
   DB_PASSWORD=secure_password
   DB_HOST=your_db_host
   DB_PORT=5432
   ```

3. **Run migrations:**
   ```bash
   python manage.py migrate
   python manage.py seed_data
   ```

### Deploy with Gunicorn

```bash
pip install gunicorn
gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 4
```

### Configure Nginx as Reverse Proxy

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location / {
        proxy_pass http://your-frontend-cdn;
    }
}
```

## Quick Commands Reference

```bash
# Backend (Terminal 1)
cd Backend
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate      # Windows
python manage.py runserver

# Frontend (Terminal 2)
cd Frontend
npm run dev

# Database operations
python manage.py makemigrations
python manage.py migrate
python manage.py seed_data
python manage.py createsuperuser
python manage.py flush

# Django shell
python manage.py shell

# Access Django admin
# http://localhost:8000/admin/

# Access frontend
# http://localhost:5174
```

## Support

For issues or questions:
1. Check Backend logs (Terminal 1)
2. Check Frontend console (F12 in browser)
3. Verify .env files are configured correctly
4. Check CORS settings if API calls fail
5. See `Backend/README.md` for detailed backend documentation

## Project Documentation

- Backend: See `Backend/README.md`
- Frontend: See `Frontend` project files
- Django Models: See `Backend/api/models.py`

---

**Ready to go?** Run the commands above and visit `http://localhost:5174` 🚀
