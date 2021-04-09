<?php
    require 'database.php';

    class listEntry {
        public function __construct($description, $url, $submission_date)
        {
            $this->description = $description;
            $this->url = $url;
            $this->submissionDate = $submission_date;
        }
    }

    $query = $pdo->prepare("SELECT * FROM todos");
    $query->execute();
    $entries = array();
    while($row = $query->fetch()){
        array_push($entries, new listEntry($row['todo_description'], $row['todo_url'], $row['submission_date']));
    }

    echo json_encode($entries);
?>