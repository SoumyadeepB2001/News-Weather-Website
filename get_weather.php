<?php
header("Content-Type: application/json");

$apiKey = "YOUR_API_KEY"; // Replace with your GNews API key

$city = isset($_GET['city']) ? urlencode($_GET['city']) : "";
$unit = isset($_GET['unit']) ? $_GET['unit'] : "metric"; 

if (empty($city)) {
    echo json_encode(["error" => "City parameter is required."]);
    exit;
}

$url = "https://api.openweathermap.org/data/2.5/weather?q={$city}&appid={$apiKey}&units={$unit}";

// Make API request
$response = file_get_contents($url);

if ($response === FALSE) {
    echo json_encode(["error" => "Failed to fetch weather data."]);
    exit;
}

// Return API response as JSON
echo $response;
?>
