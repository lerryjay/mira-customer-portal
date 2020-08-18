<?php

  /**
   * Base controller class
   */
  class Controller 
  {

    function __construct(){
      loadModel('user');
      $this->userModel = new UserModel();
    }
    /**
     * Sets the output header
     *
     * @param Type $var Description
     * @return void
     **/
    public function setOutputHeader($headers) :void
    {
     foreach($headers as $header){
       header($header);
     }
    }
    
    /**
     * Set Output and exit application
     *
     * @param HTTPOUTPUT $output
     * @return VOID
     **/
    public function setOutput($output):VOID
    {
      exit($output);
    }
  }
?>