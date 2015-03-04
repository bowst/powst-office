<!DOCTYPE html>
<html>
  <head>
    <title>Powst Office</title>
    <link rel="icon" href="favicon.ico">
    <script type="text/javascript">
      <?php
        //get db config
        require_once 'db.php';
        
        try {
            $conn = new PDO("mysql:host=$servername;dbname=$db", $username, $password);
            // set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            //Connected successfully, let's get what we need
            $sql = "SELECT * FROM $table ORDER BY sent";
            $statement = $conn->prepare($sql)
            //get emails as associative array
            $emails = $statement->fetchAll(PDO::FETCH_ASSOC);
            //output it to the page          
            echo "var emails = " . json_encode($emails);
        }catch(PDOException $e){
          //future error handling
      ?>  var fetchError = {
            message: "Error when fetching emails from the database",
            error: <?php print_r($e) ?>
          };
      <?php
        }       
      ?>
    </script>
    <link type="text/css" rel="stylesheet" href="bower_components/semantic-ui/dist/semantic.css"></link>
    <link type="text/css" rel="stylesheet" href="app/css/main.css"></link>
    <script src="bower_components/jquery/dist/jquery.js"></script>
    <script src="bower_components/lodash/lodash.js"></script>
    <script src="bower_components/moment/moment.js"></script>
    <script src="bower_components/semantic-ui/dist/semantic.js"></script>
    <script src="bower_components/react/react-with-addons.js"></script>
    <script src="bower_components/react/JSXTransformer.js"></script>
    <!--React Components -->
    <script type="text/jsx" src="app/components/app.js"></script>
  </head>
  <body>
  <div class="ui page one column grid vertically padded">
    <div class="column" id="app">
    </div>
  </div>
  </body>
</html>