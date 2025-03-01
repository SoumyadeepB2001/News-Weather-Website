<?php
header('Content-Type: application/json');

function fetchNews($query) {
    $api_key = "YOUR_API_KEY"; // Replace with your GNews API key
    $base_url = "https://gnews.io/api/v4/";

    // If the query is 'top-headlines', use the correct GNews endpoint for top-headlines
    if ($query === "top-headlines") {
        $api_url = $base_url . "top-headlines?lang=en&token=" . $api_key;
    } else {
        $api_url = $base_url . "search?q=" . urlencode($query) . "&lang=en&token=" . $api_key;
    }

    $response = file_get_contents($api_url);

    if ($response === FALSE) {
        echo json_encode(["error" => "Unable to fetch news"]);
        exit;
    }

    echo $response;
}

if (isset($_GET['query'])) {
    fetchNews($_GET['query']);
} else {
    echo json_encode(["error" => "No query provided"]);
}
?>
