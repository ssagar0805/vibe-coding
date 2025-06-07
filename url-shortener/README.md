# Simple PHP URL Shortener

A basic URL shortener application built with PHP, MySQL, HTML, CSS, and JavaScript. It uses an XAMPP server environment.

## Features

*   Shortens long URLs to a concise format.
*   Redirects short URLs to their original long URL.
*   Simple web interface to input URLs and get shortened links.
*   Uses `.htaccess` for clean URLs (e.g., `http://localhost/url-shortener/shortcode`).
*   Copy-to-clipboard functionality for the shortened URL.

## Project Structure

```
url-shortener/
├── css/
│   └── style.css         # Styles for the frontend
├── js/
│   └── script.js         # Frontend JavaScript for interactions and API calls
├── php/
│   ├── db_connect.php    # Handles MySQL database connection
│   ├── shorten.php       # Backend logic to create short URLs
│   └── redirect.php      # Backend logic to handle redirection from short URLs
├── .htaccess             # Apache configuration for clean URLs
└── index.html            # Main HTML page for the user interface
```

## Prerequisites

*   **XAMPP:** Download and install XAMPP (which includes Apache, MySQL, PHP, and phpMyAdmin).
    *   Official XAMPP website: [https://www.apachefriends.org](https://www.apachefriends.org)

## Setup and Installation

1.  **Download/Clone the Project:**
    Place the `url-shortener` project folder into your XAMPP `htdocs` directory (e.g., `C:/xampp/htdocs/url-shortener` or `/Applications/XAMPP/htdocs/url-shortener`).

2.  **Start XAMPP Services:**
    Open the XAMPP Control Panel and start the **Apache** and **MySQL** services.

3.  **Create the Database:**
    *   Open your web browser and go to `http://localhost/phpmyadmin`.
    *   Click on the "Databases" tab (or "New").
    *   Enter `url_shortener` as the database name.
    *   Select a collation (e.g., `utf8mb4_general_ci`) and click "Create".

4.  **Create the `urls` Table:**
    *   Select the `url_shortener` database in phpMyAdmin.
    *   Go to the "SQL" tab.
    *   Execute the following SQL query:
        ```sql
        CREATE TABLE urls (
            id INT AUTO_INCREMENT PRIMARY KEY,
            short_code VARCHAR(50) NOT NULL UNIQUE,
            long_url TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        ```

5.  **Configure Apache for Clean URLs (Optional but Recommended):**
    The included `.htaccess` file enables clean URLs (e.g., `http://localhost/url-shortener/yourcode` instead of `http://localhost/url-shortener/php/redirect.php?code=yourcode`). For this to work:
    *   **Enable `mod_rewrite`:**
        *   Open your Apache configuration file (`httpd.conf`). This is usually found in `xampp/apache/conf/httpd.conf`.
        *   Search for the line `LoadModule rewrite_module modules/mod_rewrite.so`.
        *   Ensure it is uncommented (remove the `#` at the beginning if present).
    *   **Set `AllowOverride`:**
        *   In the same `httpd.conf` file, find the `<Directory>` block that applies to your `htdocs` folder (e.g., `<Directory "C:/xampp/htdocs">`).
        *   Ensure the `AllowOverride` directive within this block is set to `All` (i.e., `AllowOverride All`).
    *   **Restart Apache:** After making changes to `httpd.conf`, you **must** restart the Apache service from the XAMPP Control Panel.

## Usage

1.  Open your web browser and navigate to: `http://localhost/url-shortener/`
2.  Enter a long URL into the input field.
3.  Click the "Shorten" button.
4.  The shortened URL will be displayed. You can click it to test or use the "Copy" button.

## How It Works

*   **Frontend (`index.html`, `js/script.js`, `css/style.css`):** Provides the user interface. JavaScript handles form submission, sends an AJAX request to the backend, and displays the result.
*   **Backend (`php/`):**
    *   `db_connect.php`: Establishes and manages the database connection.
    *   `shorten.php`: Receives the long URL, generates a unique short alphanumeric code, stores the pair in the database, and returns the short URL.
    *   `redirect.php`: Takes a short code, looks up the corresponding long URL in the database, and performs a 301 redirect.
*   **.htaccess:** Intercepts requests for short URLs and internally routes them to `redirect.php` for processing.

```
