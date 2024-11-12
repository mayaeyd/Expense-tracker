<?php

include "connection.php";

header("Content-Type: application/json");

$username = $_POST['username'] ?? null;
$password = $_POST['password'] ?? null;

if (!$username || !$password) {
    echo json_encode(["status" => "Error", "message" => "Username and password are required."]);
    exit();
}

// Hash the password
$hashed = password_hash($password, PASSWORD_DEFAULT);

// Check if the username already exists
$duplicate = $connection->prepare("SELECT * FROM users WHERE name = ?");
$duplicate->bind_param("s", $username);
$duplicate->execute();
$result = $duplicate->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["status" => "Error", "message" => "Username has already been taken."]);
} else {
    $query = $connection->prepare("INSERT INTO users (name, password) VALUES (?, ?)");
    if (!$query) {
        echo json_encode(["status" => "Error", "message" => "Statement preparation failed: " . $connection->error]);
        exit();
    }

    $query->bind_param("ss", $username, $hashed);
    $query->execute();

    if ($query->affected_rows > 0) {
        $user_id = $query->insert_id;
        echo json_encode([
            "status" => "Login Successful",
            "id" => $user_id
        ]);
    } else {
        echo json_encode(["status" => "Error", "message" => "Error: " . $query->error]);
    }
    $query->close();
}

$duplicate->close();
$connection->close();

?>
