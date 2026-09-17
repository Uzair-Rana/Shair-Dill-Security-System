# SDSSS Django Backend API

Complete REST API for SDSSS Security Solutions website, built with Django and Django REST Framework.

## Prerequisites

- Python 3.8+
- pip (Python package manager)
- Virtual environment (recommended)

## Installation

1. **Create a virtual environment:**
   ```bash
   python -m venv venv
   
   # Activate virtual environment
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment variables:**
   Edit `.env` file with your settings:
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
   ```

4. **Create migrations and database:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Seed initial data:**
   ```bash
   python manage.py seed_data
   ```

6. **Create superuser (admin account):**
   ```bash
   python manage.py createsuperuser
   ```

7. **Start the development server:**
   ```bash
   python manage.py runserver
   ```

   Server will run on `http://localhost:8000`

## API Endpoints

### Hero Slides
- `GET /api/hero-slides/` - Get all active hero slides
- `GET /api/hero-slides/{id}/` - Get single slide
- `POST /api/hero-slides/` - Create new slide
- `PUT /api/hero-slides/{id}/` - Update slide
- `DELETE /api/hero-slides/{id}/` - Delete slide

### Products
- `GET /api/products/` - Get all active products
- `GET /api/products/{id}/` - Get single product
- `POST /api/products/` - Create new product
- `PUT /api/products/{id}/` - Update product
- `DELETE /api/products/{id}/` - Delete product

### Features
- `GET /api/features/` - Get all active features
- `GET /api/features/{id}/` - Get single feature
- `POST /api/features/` - Create new feature
- `PUT /api/features/{id}/` - Update feature
- `DELETE /api/features/{id}/` - Delete feature

### Statistics
- `GET /api/stats/` - Get all active stats
- `GET /api/stats/{id}/` - Get single stat
- `POST /api/stats/` - Create new stat
- `PUT /api/stats/{id}/` - Update stat
- `DELETE /api/stats/{id}/` - Delete stat

### Testimonials
- `GET /api/testimonials/` - Get all active testimonials
- `GET /api/testimonials/{id}/` - Get single testimonial
- `POST /api/testimonials/` - Create new testimonial
- `PUT /api/testimonials/{id}/` - Update testimonial
- `DELETE /api/testimonials/{id}/` - Delete testimonial

### Admin & Health
- `GET /api/health/` - API health check
- `GET /admin/` - Django admin panel (requires superuser login)

## Project Structure

```
Backend/
├── api/
│   ├── migrations/
│   ├── management/
│   │   └── commands/
│   │       └── seed_data.py
│   ├── models.py
│   ├── views.py
│   ├── serializers.py
│   ├── urls.py
│   ├── admin.py
│   └── apps.py
├── config/
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── .env
├── manage.py
├── requirements.txt
└── README.md
```

## Database Models

### HeroSlide
```python
{
    id: Integer,
    title: String,
    heading: String,
    description: Text,
    image: URL,
    cta_text: String,
    cta_link: String,
    order: Integer,
    is_active: Boolean,
    created_at: DateTime,
    updated_at: DateTime
}
```

### Product
```python
{
    id: Integer,
    title: String,
    description: Text,
    image: URL,
    category: String (cameras, access-control, alarms, sensors, monitoring, other),
    cta_text: String,
    cta_link: String,
    price: String,
    features: Text,
    order: Integer,
    is_active: Boolean,
    created_at: DateTime,
    updated_at: DateTime
}
```

### Feature
```python
{
    id: Integer,
    icon: String (emoji),
    title: String,
    description: Text,
    order: Integer,
    is_active: Boolean,
    created_at: DateTime,
    updated_at: DateTime
}
```

### Stat
```python
{
    id: Integer,
    number: String,
    label: String,
    description: Text,
    order: Integer,
    is_active: Boolean,
    created_at: DateTime,
    updated_at: DateTime
}
```

### Testimonial
```python
{
    id: Integer,
    name: String,
    role: String,
    company: String,
    content: Text,
    rating: Integer (1-5),
    image: URL,
    order: Integer,
    is_active: Boolean,
    created_at: DateTime,
    updated_at: DateTime
}
```

## Example API Usage

### Get all products
```bash
curl http://localhost:8000/api/products/
```

### Create a new product
```bash
curl -X POST http://localhost:8000/api/products/ \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Product",
    "description": "Product description",
    "image": "https://example.com/image.jpg",
    "category": "cameras",
    "cta_text": "Learn More",
    "cta_link": "#"
  }'
```

### Update a product
```bash
curl -X PUT http://localhost:8000/api/products/1/ \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "description": "Updated description"
  }'
```

## Django Admin Panel

Access the admin panel at `http://localhost:8000/admin/`

Login with your superuser credentials to:
- Manage all content (Hero Slides, Products, Features, Stats, Testimonials)
- View database records
- Reorder items using the "order" field
- Enable/disable items using the "is_active" checkbox
- View creation and update timestamps

## Production Setup

### Using PostgreSQL

1. **Install PostgreSQL** and create a database:
   ```sql
   CREATE DATABASE sdsss;
   CREATE USER sdsss_user WITH PASSWORD 'secure_password';
   ALTER ROLE sdsss_user SET client_encoding TO 'utf8';
   ALTER ROLE sdsss_user SET default_transaction_isolation TO 'read committed';
   ALTER ROLE sdsss_user SET default_transaction_deferrable TO on;
   GRANT ALL PRIVILEGES ON DATABASE sdsss TO sdsss_user;
   ```

2. **Update .env:**
   ```
   DB_ENGINE=django.db.backends.postgresql
   DB_NAME=sdsss
   DB_USER=sdsss_user
   DB_PASSWORD=secure_password
   DB_HOST=localhost
   DB_PORT=5432
   ```

3. **Run migrations:**
   ```bash
   python manage.py migrate
   python manage.py seed_data
   ```

### Deployment (Gunicorn + Nginx)

1. **Install Gunicorn:**
   ```bash
   pip install gunicorn
   ```

2. **Run with Gunicorn:**
   ```bash
   gunicorn config.wsgi:application --bind 0.0.0.0:8000
   ```

3. **Configure Nginx** as reverse proxy (recommended)

## CORS Configuration

The API is configured to accept requests from `http://localhost:5174` (Frontend).
Update `CORS_ALLOWED_ORIGINS` in `.env` for production.

## Common Commands

```bash
# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Seed data
python manage.py seed_data

# Create superuser
python manage.py createsuperuser

# Run development server
python manage.py runserver

# Access Django shell
python manage.py shell

# Collect static files
python manage.py collectstatic --noinput
```

## Troubleshooting

### Port already in use

```bash
# macOS/Linux
lsof -i :8000
kill -9 <PID>

# Windows (PowerShell)
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### Database issues

```bash
# Reset database (development only)
python manage.py flush
python manage.py migrate
python manage.py seed_data
```

### Missing migrations

```bash
python manage.py makemigrations api
python manage.py migrate
```

## License

SDSSS (Pvt) Ltd. - All rights reserved.
