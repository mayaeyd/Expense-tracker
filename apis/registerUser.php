<?php

require "connection.php";

$username = $_POST['username'];
$password = $_POST['password'];

$hashed = password_hash($password, PASSWORD_DEFAULT);

$query = $connection->prepare("INSERT INTO users (name,password) VALUES (?,?)");

if (! $query) {
    die("Statement preparation failed: " . $connection->error);
}

$query->bind_param("ss",$username, $hashed);
$query->execute();

if ($query->affected_rows !=0) {
    header("Location: ../dashboard.html");
    exit();
} else {
    echo "Error: " . $query->error;
}

$query->close();
$connection->close();

?>