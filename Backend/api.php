<?php
    require 'database.php';

    class listEntry {
        public function __construct($description, $url, $submission_date, $subject)
        {
            $this->description = $description;
            $this->url = $url;
            $this->submissionDate = $submission_date;
            $this->subject = $subject;
        }
    }

    $query = $pdo->prepare("SELECT * FROM todos");
    $query->execute();
    $entries = array();
    while($row = $query->fetch()){
        array_push($entries, new listEntry($row['todo_description'], $row['todo_url'], $row['submission_date'], $row['subject']));
    }

    echo json_encode($entries);
?>