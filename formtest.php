<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") { 
    $jobreferencenumber = htmlspecialchars($_POST['jobreferencenumber']);
    $firstname = htmlspecialchars($_POST['firstname']);
    $lastname = htmlspecialchars($_POST['lastname']);
    $DOB = htmlspecialchars($_POST['DOB']);
    $gender = htmlspecialchars($_POST['gender']);
    $streetaddress = htmlspecialchars($_POST['streetaddress']);
    $suburb = htmlspecialchars($_POST['suburb']);
    $state = htmlspecialchars($_POST['state'] ?? "Not selected"); 
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $position = htmlspecialchars($_POST['position'] ?? "Not Selected");
    $skills = $_POST['skills'] ?? [];
    $other_skills = htmlspecialchars($_POST['other-skills']);

    echo "<h2>Form submitted successfully!</h2>";
    echo "<h3>Personal Information</h3>";
    echo "First Name: $firstname<br>";
    echo "Last Name: $lastname<br>";
    echo "Date of Birth: $DOB<br>";
    echo "Gender: $gender<br>";
    echo "Street Address: $streetaddress<br>";
    echo "Suburb/Town: $suburb<br>";
    echo "State: $state<br>";

    echo "<h3>Contact Information</h3>";
    echo "Email: $email<br>";
    echo "Phone Number: $phone<br>";

    echo "<h3>Job References</h3>";
    echo "Position: $position<br>";

    echo "Skills: ";
    if (!empty($skills)) {
        echo implode(", ", array_map('htmlspecialchars', $skills));
    } else {
        echo "None selected";
    }
    echo "<br>";

    echo "Other Skills: " . nl2br($other_skills) . "<br>";
} else {
    echo "Invalid request.";
}
?>
