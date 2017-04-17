<?php

$servername = "studentdb-maria.gl.umbc.edu";
$username = "b101";
$password = "";
$dbname = "b101";

//get values to add
$q = $_GET['q'];
$vals = explode(',', $q);
$timestamp = $vals[0];
$DOD = $vals[1];
$name = $vals[2];
$mile = $vals[3];
$msg = $vals[4];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "INSERT INTO tombstones (timestamp, DOD, name, mile, message) VALUES ('$timestamp', '$DOD', '$name', '$mile', '$msg')";

$result = $conn->query($sql);
if($result){
    echo "Success!";
}else{
    echo "Insert failed: " . $conn->error;
}

$conn->close();
?>