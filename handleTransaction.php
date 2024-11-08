<?php

include "connection.php";

//print_r($_POST);

$username = $_POST['username'];
$name = $_POST['name'];
$amount = $_POST['amount'];
$tel = $_POST['tel'];
$currency = $_POST['currency'];
$amount = $_POST['amount'];
$date = date('Y-m-d');

//var_dump($username, $name, $amount, $tel, $currency, $amount, $date);

$query = "INSERT INTO users (name) VALUES (?)";

$stmt= $connection->prepare($query);

if (!$stmt) {
    die("Statement preparation failed: " . $connection->error);
}

$stmt->bind_param("s", $username);

if ($stmt->execute()) {
    echo "Record Saved!!";  
} else {
    echo "Error: " . $stmt->error; 
}

$stmt->close();
$connection->close();

echo "PHP is working";

?>


