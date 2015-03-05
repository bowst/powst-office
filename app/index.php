<!DOCTYPE html>
<html>
  <head>
    <title>Powst Office</title>
    <link rel="icon" href="favicon.ico">
    <?php include_once 'emails.php';?>
    <!-- inject:css -->
    <!-- endinject -->
  </head>
  <body>
    <div class="ui page one column grid vertically padded">
      <?php if($error): ?>
        <div class="ui warning icon message">
          <div class="content">
          <div class="header">Error!</div>
            <div>
              Neither snow nor rain nor heat nor gloom of night stays us from the swift completion of our appointed rounds.
              <br/><br>
              Unfortunately the creed does't mention anything about bugs.  Here's some info though!
              <br/><br/>
              <?php echo nl2br(print_r($error));?>
              <br/><br/>
              If that's not useful, help us help you!  File a bug on <a href="http://github.com/bowst/powst-office/issues">Github</a>.
            </div>
          </div>
        </div>
      <?php endif ?>
      <div class="column" id="app">        
      </div>
    </div>
    <!-- inject:js -->
    <!-- endinject -->
  </body>
</html>