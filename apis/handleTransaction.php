<?php

header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");

include "connection.php";

//gets userID from url
$userID = $_GET['userID'];
$name = $_GET['name'];
$amount = $_GET['amount'];
$tel = $_GET['tel'];
$currency = $_GET['currency'];
$date = date('Y-m-d');

$query = $connection->prepare("SELECT * FROM transactions WHERE userID = ?");
$query->bind_param("i", $userID);  
$query->execute();
$result = $query->get_result();

$transactions = [];

//iterate over every row as $row and store it in array
if($result->num_rows > 0){
    $transactions =[];
    while($row = $result->fetch_assoc()){
        $transactions[] = $row;
    }
    $response=[
        "array"=> $transactions,
    ];
    echo json_encode($response);
}else{$response=[
        "status"=> "error",
        "array"=> [],
    ];
    echo json_encode($response);
}

$query->close();

?>


