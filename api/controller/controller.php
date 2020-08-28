<?php
  /**
   * Base controller class
   */
  class Controller 
  {
    /**
     * Undocumented function long description
     *
     * @param Type $var Description
     * @return type
     * @throws conditon
     **/
    public function __construct()
    {
      if(!isset($_SESSION) || count($_SESSION) < 1){
        $this->validateApiKey(true);
      }else if(count($_SESSION) > 0 ){
        $this->companyId = $_SESSION['companyid'];
        $this->userId = $_SESSION['userid'];
      }else{
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false,'message'=>'You do not have the permission to access this resource!']));
      }
    }

    public function encryptPassword($var){
      $options = [
          'cost' => 10,
      ];
      return password_hash($var, PASSWORD_BCRYPT, $options);
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

    public function validateApiKey($api = false)
    {
      $headers = apache_request_headers();
			$response = array();
		    // Verifying Authorization Header
	    if (!isset($headers['api-key']) && $api ) {
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false,'message'=>'You do  not have the permission to access this resource!']));
      }else{
        loadModel('company');
        $this->companyModel = new CompanyModel();
        $companyExists = $this->companyModel->getCompanyByApiKey($headers['api-key']);
        // var_dump($companyExists);
        if($companyExists){ 
          $this->companyId = $companyExists['id'];
          return true;
        }
        else if($api){
          $this->setOutputHeader(['Content-type:application/json']);
          $this->setOutput(json_encode(['status'=>false,'message'=>'You do  not have the permission to access this resource!']));
        }else{
          return false;
        }
      }
    }
  }
?>