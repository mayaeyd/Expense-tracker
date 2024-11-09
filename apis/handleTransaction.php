<?php

header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");

include "connection.php";

//gets userID from url
$userID = $_GET['userID'];
$name = $_POST['name'];
$amount = $_POST['amount'];
$tel = $_POST['tel'];
$currency = $_POST['currency'];
$amount = $_POST['amount'];
$date = date('Y-m-d');

$query = $connection->prepare("SELECT * FROM transactions WHERE userID = ?");
$query->bind_param("i", $userID);  
$query->execute();
$result = $query->get_result();

$transactions = [];

//iterate over every row as $row and store it in array
while($row = $result->fetch_assoc()){
    $transactions[] = $row;
}

echo json_encode($transactions);

$query->close();
$connection->close();

?>


