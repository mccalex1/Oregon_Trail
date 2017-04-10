<?php
$servername = "studentdb-maria.gl.umbc.edu";
$username = "";
$password = "";
$dbname = "b101";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT * from highscores ORDER BY score DESC LIMIT 5";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "Name: " . $row["name"] . " Score: " . $row["score"] . "<br>";
    }
} else {
    echo "0 results";
}
$conn->close();
?>