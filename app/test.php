<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);
$from = "GLaDOS@aperaturescience.com";
$to = "test_subject_23426@aperaturescience.com";
$subject = "RE: Your Brains";
$message = "All we want to is eat them....<strong>What's so bad about that?</strong>";
$headers = "From:" . $from;
mail($to, $subject, $message, $headers);

echo "Test email sent!";
  
  
?>