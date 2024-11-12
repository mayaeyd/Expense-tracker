<?php

include "connection.php";

$username = $_POST['username'];
$password = $_POST['password'];

$hashed = password_hash($password, PASSWORD_DEFAULT);

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

    $query->bind_param("ss",$username, $hashed);
    $query->execute();

    if ($query->affected_rows > 0) {
        // retrieve the ID of the newly inserted user
        $user_id = $query->insert_id;
        echo json_encode([
            "status" => "Login Successful",
            "id" => $user_id  // send the user ID back to JS
        ]);
        exit();
    } else {
        echo "Error: " . $query->error;
    }
    $query->close();
}

$connection->close();

?>