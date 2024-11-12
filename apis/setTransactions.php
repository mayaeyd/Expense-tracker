<?php

include "connection.php"; // include your database connection file

header("Content-Type: application/json");

//decode the JSON gotten from the post body
$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['name']) || empty($data['amount']) || empty($data['tel']) || empty($data['currency']) || empty($data['userID'])) {
    echo json_encode(["status" => "Error", "message" => "All fields are required."]);
    exit();
}

$name = $data['name'];
$amount = $data['amount'];
$tel = $data['tel'];
$currency = $data['currency'];
$userID = $data['userID'];


?>
