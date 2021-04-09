<?php
    require 'database.php';

    $query = $pdo->prepare("INSERT INTO todos (submission_date, todo_description, todo_url) VALUES(?, ?, ?)");
    $query->execute([$_POST['due'], $_POST['description'], $_POST['url']]);
    echo("Inserted");
?>