<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET");

include "connection.php";

$username = $_POST["username"];
$password = $_POST["password"];


$query = $connection->prepare("SELECT * FROM users WHERE name = ?");
$query->bind_param("s", $username);
$query->execute();

$result = $query->get_result();

if ($result->num_rows != 0) {

    $user = $result->fetch_assoc();

    $check = password_verify($password, $user["password"]);

    if($check){
        //send a json response with the user id
        echo json_encode([
            "status"=>"Login Successful",
            "id"=>$user["id"], //pass user id to JS
        ]);
    }else{
        echo json_encode([
            "status" => "Password Incorrect",
        ]);
    }
    //exit();
}else{
    echo json_encode([
        "status" => "Invalid Credentials",
        "message" => "Could not create records",
    ]);
}

$query->close();
$connection->close();

?>