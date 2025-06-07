document.addEventListener('DOMContentLoaded', () => {
    const shortenForm = document.getElementById('shortenForm');
    const longUrlInput = document.getElementById('longUrl');
    const resultDiv = document.getElementById('result');

    if (shortenForm) {
        shortenForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent default form submission
            const longUrl = longUrlInput.value.trim();

            if (!longUrl) {
                resultDiv.innerHTML = '<p style="color: red;">Please enter a URL.</p>';
                return;
            }

            try {
                new URL(longUrl); // Basic client-side validation for URL structure
            } catch (_) {
                resultDiv.innerHTML = '<p style="color: red;">Please enter a valid URL format (e.g., https://example.com).</p>';
                return;
            }

            resultDiv.innerHTML = '<p>Shortening...</p>';

            try {
                const formData = new URLSearchParams();
                formData.append('longUrl', longUrl);

                const response = await fetch('php/shorten.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: formData
                });

                if (!response.ok) {
                    // Handle HTTP errors like 500, 404 etc.
                    throw new Error(`Server error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();

                if (data.status === 'success' && data.short_url) {
                    resultDiv.innerHTML = `
                        <p>Shortened URL: <a href="${data.short_url}" target="_blank">${data.short_url}</a></p>
                        <p><button onclick="copyToClipboard('${data.short_url}')">Copy</button></p>
                    `;
                } else if (data.message) {
                    resultDiv.innerHTML = `<p style="color: red;">Error: ${data.message}</p>`;
                } else {
                    resultDiv.innerHTML = '<p style="color: red;">An unknown error occurred.</p>';
                }

            } catch (error) {
                console.error('Error during fetch:', error);
                resultDiv.innerHTML = `<p style="color: red;">An error occurred while trying to shorten the URL. ${error.message}. Please check the console for more details.</p>`;
            }
        });
    }
});

function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            alert('Copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy using navigator.clipboard: ', err);
            // Fallback for older browsers or if navigator.clipboard fails
            fallbackCopyTextToClipboard(text);
        });
    } else {
        // Fallback for older browsers that don't support navigator.clipboard at all
        fallbackCopyTextToClipboard(text);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            alert('Copied to clipboard!');
        } else {
            alert('Failed to copy to clipboard. Please copy manually.');
        }
    } catch (err) {
        console.error('Fallback copy failed: ', err);
        alert('Failed to copy to clipboard. Please copy manually.');
    }

    document.body.removeChild(textArea);
}
