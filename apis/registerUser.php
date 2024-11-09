<?php

include "connection.php";

$username = $_POST['username'];
$password = $_POST['password'];

//$hashed = password_hash($password, PASSWORD_DEFAULT);

$duplicate =  $connection->prepare("SELECT * FROM users WHERE name = ?");
$duplicate->bind_param("s",$username);
$duplicate->execute();
if($duplicate->get_result()->num_rows>0){
    echo "Username has already been taken";
}else{
    $query = $connection->prepare("INSERT INTO users (name,password) VALUES (?,?)");

    if (! $query) {
        die("Statement preparation failed: " . $connection->error);
    }

    $query->bind_param("ss",$username, $password);
    $query->execute();

    if ($query->affected_rows !=0) {
        header("Location: ../dashboard.html");
        exit();
    } else {
        echo "Error: " . $query->error;
    }
    $query->close();
}

$connection->close();

?>