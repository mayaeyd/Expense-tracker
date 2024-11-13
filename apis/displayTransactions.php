<?php
// display-transactions.php

// Enable error reporting for debugging (remove in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Set response header to JSON
header('Content-Type: application/json');

include "connection.php";

$requestData = json_decode(file_get_contents('php://input'), true);
$userId = isset($requestData['userId']) ? $requestData['userId'] : null;

if (!$userId) {
    echo json_encode(["error" => "User ID is required"]);
    exit();
}

$sql = "SELECT name, amount, created_at, currency, tel FROM transactions WHERE user_id = ?";
$stmt = $connection->prepare($sql);
$stmt->bind_param("i", $userId);

if ($stmt->execute()) {
    $result = $stmt->get_result();
    $transactions = [];

    while ($row = $result->fetch_assoc()) {
        $row['created_at'] = date("Y-m-d H:i:s", strtotime($row['created_at']));
        $transactions[] = $row;
    }


    echo json_encode($transactions);
} else {
    echo json_encode(["error" => "Failed to fetch transactions"]);
}

$stmt->close();
$connection->close();
?>
