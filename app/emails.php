<script type="text/javascript">
  <?php
    //get db config
    require_once 'db.php';
    
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$db", $username, $password);
        // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        //Connected successfully, let's get what we need
        $sql = "SELECT * FROM $table ORDER BY sent desc";
        $statement = $conn->prepare($sql);
        $statement->execute();
        //get emails as associative array_change_key_case
        $emails = $statement->fetchAll(PDO::FETCH_ASSOC);
        //output it to the page          
        echo "var emails = " . json_encode($emails) . ";";
    }catch(Exception $e){
      //future error handling
      $error = $e;
  ?>  var fetchError = {
        message: "Error when fetching emails from the database"
      };
      console.log(fetchError);
  <?php
    }       
  ?>
</script>