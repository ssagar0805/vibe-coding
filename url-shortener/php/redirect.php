<?php
require_once 'db_connect.php'; // Establishes $conn

if (isset($_GET['code']) && !empty(trim($_GET['code']))) {
    $shortCode = trim($_GET['code']);

    // Prepare statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT long_url FROM urls WHERE short_code = ?");
    if ($stmt === false) {
        // Handle error, perhaps log it and show a generic message
        error_log("Prepare failed: (" . $conn->errno . ") " . $conn->error);
        die("An error occurred. Please try again later. (DB Prep)");
    }

    $stmt->bind_param("s", $shortCode);

    if (!$stmt->execute()) {
        // Handle error
        error_log("Execute failed: (" . $stmt->errno . ") " . $stmt->error);
        die("An error occurred. Please try again later. (DB Exec)");
    }

    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($longUrl);
        $stmt->fetch();

        // Perform a 301 Permanent Redirect to the original long URL.
        // The true parameter replaces the existing header, and 301 is the HTTP status code.
        header("Location: " . $longUrl, true, 301);
        exit; // Important to prevent further script execution after a redirect header.
    } else {
        // No short code found
        // Option 1: Display a message
        http_response_code(404); // Not Found
        echo "<h1>404 - URL Not Found</h1>";
        echo "<p>The short URL you requested does not exist in our records.</p>";
        echo "<p><a href=\"../index.html\">Go to Homepage</a></p>";

        // Option 2: Redirect to homepage (less informative for the user about the specific error)
        // header("Location: ../index.html");
        // exit;
    }

    $stmt->close();
} else {
    // No code parameter provided
    // Option 1: Display a message
    http_response_code(400); // Bad Request
    echo "<h1>Bad Request</h1>";
    echo "<p>No short code provided.</p>";
    echo "<p><a href=\"../index.html\">Go to Homepage</a></p>";

    // Option 2: Redirect to homepage
    // header("Location: ../index.html");
    // exit;
}

$conn->close();
?>
