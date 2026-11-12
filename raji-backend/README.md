# Raaji's Crafted Snacks — Backend CMS & REST API

This backend is built following the complete architecture specified in [`CMS_EDIT.md`](../CMS_EDIT.md), powered by **Laravel 13**, **Filament v5 Admin Panel**, **SQLite Database**, and **REST API**.

---

## 1. Quick Start

### Start Backend Server
Inside the `raji-backend` directory, run:
```bash
php artisan serve --port=8000
```
The backend will be available at:
* **Admin CMS Panel:** [`http://127.0.0.1:8000/admin`](http://127.0.0.1:8000/admin)
* **Public REST API:** [`http://127.0.0.1:8000/api/blogs`](http://127.0.0.1:8000/api/blogs)

---

## 2. Admin CMS Login Credentials

* **URL:** [`http://127.0.0.1:8000/admin/login`](http://127.0.0.1:8000/admin/login)
* **Email:** `admin@raajis.com`
* **Password:** `Admin@12345`

---

## 3. Subdomain "admin" Configuration

To access the CMS using the **`admin` subdomain** (e.g. `admin.rajjis.com` in production or `admin.localhost:8000` locally):

1. Set the domain in `raji-backend/.env`:
   ```env
   ADMIN_DOMAIN=admin.localhost
   # Or for production:
   # ADMIN_DOMAIN=admin.rajjis.com
   ```
2. In [`app/Providers/Filament/AdminPanelProvider.php`](app/Providers/Filament/AdminPanelProvider.php), the panel automatically binds to the subdomain specified by `ADMIN_DOMAIN`. If unset, it defaults to the standard `/admin` route path for seamless local development.

---

## 4. Key Endpoints & Architecture

| Route | Method | Description |
|---|---|---|
| `/admin` | `GET` | Filament CMS Dashboard |
| `/admin/login` | `GET/POST` | Admin Authentication |
| `/admin/blogs` | `GET` | List & Filter Blog Posts |
| `/admin/blogs/create` | `GET/POST` | Rich WYSIWYG Article Editor & Image Uploader |
| `/api/blogs` | `GET` | Public JSON list of published posts (supports `?category=...`, `?featured=1`, `?search=...`) |
| `/api/blogs/{slug}` | `GET` | Public JSON endpoint for a single article by slug |
| `/storage/blogs/*` | `GET` | Direct public image assets |
