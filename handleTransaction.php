<?php

include "connection.php";

print_r($_POST);

$username = $_POST['username'];
$name = $_POST['name'];
$amount = $_POST['amount'];
$tel = $_POST['tel'];
$currency = $_POST['currency'];
$amount = $_POST['amount'];
$date = date('Y-m-d');

var_dump($username, $name, $amount, $tel, $currency, $amount, $date);

// $query = $connection->prepare("INSERT INTO TABLE users (name) VALUES ($username)");
// $query->bind_param("s", $username);
// $query->execute();
// echo "aded";

// // if(isset($_POST['username'])){
// //     $username = $_POST['username'];
// //     echo "The name passed is ". $username;
// // }else{
// //     echo "No name was passed";
// // }

echo "PHP is working";

?>


