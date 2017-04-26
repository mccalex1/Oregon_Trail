<?php

$servername = "studentdb-maria.gl.umbc.edu";
$username = "b101";
$password = "lupoli433";
$dbname = "b101";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "DELETE FROM highscores";

$result = $conn->query($sql);
if($result){
    echo "Success!";
}else{
    echo "Insert failed: " . $conn->error;
}

$conn->close();
?>