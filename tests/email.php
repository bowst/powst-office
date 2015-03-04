<?php
  $headers = 'From: test@powst.com'; 
  mail('nobody@example.com', 'Test email using PHP', 'This is a test email message', $headers, '-ftest@powst.com'); 
?>