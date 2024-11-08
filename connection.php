<?php
$host = "localhost";
$dbuser = "root";
$pass = "";
$dbname = "expensetrackerdb";

$connection = new mysqli($host, $dbuser, $pass, $dbname);

if($connection->connect_error){
    die("Error happened");
}