<?php

$servername = "studentdb-maria.gl.umbc.edu";
$username = "b101";
$password = "";
$dbname = "b101";

//get values to add
$q = $_GET['q'];
$vals = explode(',', $q);
$lowerBound = $vals[0];
$upperBound = $vals[1];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT * FROM tombstones WHERE mile >= $lowerBound AND mile <= $upperBound";
$result = $conn->query($sql);

$rows = array();
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
    echo json_encode($rows);
} else {
    echo "0 results";
}

$conn->close();
?>