<?php
    require_once 'RomanNumeralGenerator.php';

    $generator = new RomanGenerator;

    if (isset($_POST['number-to-convert'])) {
        print filter_var($generator->convert($_POST['number-to-convert']), FILTER_SANITIZE_STRING);
    }
