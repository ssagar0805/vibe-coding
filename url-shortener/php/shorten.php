<?php
header('Content-Type: application/json');
require_once 'db_connect.php'; // Establishes $conn

function generateShortCode($length = 7) {
    // Characters to use for the short code
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charLength - 1)];
    }
    return $randomString;
}

$response = ['status' => 'error', 'message' => 'Invalid request.'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['longUrl']) && !empty(trim($_POST['longUrl']))) {
        $longUrl = trim($_POST['longUrl']);

        // Validate the URL format
        if (filter_var($longUrl, FILTER_VALIDATE_URL) === FALSE) {
            $response['message'] = 'Invalid URL format.';
        } else {
            // Generate a unique short code
            $shortCode = '';
            $isUnique = false;
            $maxAttempts = 10; // Prevent infinite loop in case of many collisions
            $attempts = 0;

            // Loop to ensure the generated short code is unique
            while (!$isUnique && $attempts < $maxAttempts) {
                $shortCode = generateShortCode();
                // Check if the generated short code already exists in the database
                $stmt = $conn->prepare("SELECT id FROM urls WHERE short_code = ?");
                $stmt->bind_param("s", $shortCode);
                $stmt->execute();
                $stmt->store_result();
                if ($stmt->num_rows === 0) {
                    $isUnique = true; // Found a unique code
                }
                $stmt->close();
                $attempts++;
            }

            if (!$isUnique) {
                $response['message'] = 'Could not generate a unique short code. Please try again.';
            } else {
                // Insert into database
                $stmt = $conn->prepare("INSERT INTO urls (long_url, short_code) VALUES (?, ?)");
                $stmt->bind_param("ss", $longUrl, $shortCode);

                if ($stmt->execute()) {
                    // Construct the base URL. This might need adjustment depending on server setup.
                    // For XAMPP, if your project is in htdocs/url-shortener, this should be correct.
                    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
                    $host = $_SERVER['HTTP_HOST']; // e.g., localhost or your domain
                    // Construct the base URL for the shortened link.
                    // This assumes .htaccess is configured to route requests like 'http://host/url-shortener/SHORTCODE'
                    // to the redirect.php script.
                    $baseUrl = $protocol . $host . '/url-shortener/';

                    $response = [
                        'status' => 'success',
                        'short_url' => $baseUrl . $shortCode // The final shortened URL
                    ];
                } else {
                    $response['message'] = 'Database error: Could not save URL. ' . $conn->error;
                }
                $stmt->close();
            }
        }
    } else {
        $response['message'] = 'No URL provided.';
    }
}

$conn->close();
echo json_encode($response);
?>
