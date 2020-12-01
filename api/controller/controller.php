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
        if(function_exists('apache_request_headers')){
            $headers = apache_request_headers();
        }else{
            $headers['api-key'] = $_SERVER['HTTP_API_KEY'];
        }
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

     /**
     * undocumented function summary
     *
     * Undocumented function long description
     *
     * @param Type $var Description
     * @return type
     * @throws conditon
     **/
    public function do_post($url, $params=array(),$headers = []) 
    {
      $ch = curl_init();
      curl_setopt($ch,CURLOPT_URL,$url);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    
      $params_string = '';
      if (is_array($params) && count($params)) {
        foreach($params as $key=>$value) {
          $params_string .= $key.'='.$value.'&'; 
        }
        rtrim($params_string, '&');
        curl_setopt($ch,CURLOPT_POST, count($params));
        curl_setopt($ch,CURLOPT_POSTFIELDS, $params_string);
      }
      curl_setopt($ch, CURLOPT_HTTPHEADER,$headers);
      //execute post
      $result = curl_exec($ch);
      //close connection
      curl_close($ch);
      return $result;
    }

    /**
     * undocumented function summary
     *
     * Undocumented function long description
     *
     * @param Type $var Description
     * @return type
     * @throws conditon
     **/
    public function do_get($url,$params = [],$headers = [])
    {
      $ch = curl_init();
      $params_string = '';
      if (is_array($params) && count($params)) {
        foreach($params as $key=>$value) {
          $params_string .= $key.'='.$value.'&'; 
        }
        rtrim($params_string, '&');
      }
      curl_setopt($ch, CURLOPT_HTTPHEADER,$headers);
      curl_setopt($ch,CURLOPT_URL,$url.'?'.$params_string);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
      //execute get
      $result = curl_exec($ch);
      //close connection
      curl_close($ch);
      return $result;
    }
  }
?>