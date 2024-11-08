<?php

require "connection.php";

$username = $_POST['username'];
$password = $_POST['password'];

$stmt = $connection->prepare("INSERT INTO users (name,password) VALUES (?,?)");

if (! $stmt) {
    die("Statement preparation failed: " . $connection->error);
}

$stmt->bind_param("ss",$username, $password);
$stmt->execute();
echo "Insert Successful.";
$stmt->close();
$connection->close();

?>