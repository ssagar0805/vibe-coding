<?php
// Database configuration
$dbHost = 'localhost';      // or '127.0.0.1'
$dbUsername = 'root';       // Default XAMPP username
$dbPassword = '';           // Default XAMPP password (empty)
$dbName = 'url_shortener';  // The database name you chose

// Create database connection
$conn = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);

// Check connection
if ($conn->connect_error) {
    // Log error to a file or display a generic message for the user
    // For production, you might want to log detailed errors and show a user-friendly message
    error_log("Connection failed: " . $conn->connect_error);
    die("Sorry, we're having some technical difficulties. Please try again later.");
    // Or, for development/debugging:
    // die("Connection failed: " . $conn->connect_error);
}

// Optional: Set character set to utf8mb4 (recommended for broader character support)
if (!$conn->set_charset("utf8mb4")) {
    error_log("Error loading character set utf8mb4: " . $conn->error);
    // Handle error as appropriate, maybe proceed without it or die
}

// The $conn object can now be used by other PHP scripts that include this file.
// Example: require_once 'db_connect.php';
?>
