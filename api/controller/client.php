<?php 

/**
 * Controller class for customers
 */
class Client extends Controller 
{
  /**
   * undocumented function summary
   *
   * @param Type $var Description
   * @return type
   * @throws conditon
   **/
  public function add()
  {
    $data = $this->validateAddClient();
    extract($data);
    if(strlen($clientUserId) < 1){ 
      $password = 3224;//TODO : generate random login password
      $clientId = $this->userModel->register($name,$email,$telephone,$this->encryptPassword($password),$companyId);
    }
    $register = $this->clientModel->add($clientUserId,$businessName);
    if($register){
      $response = ['status'=>true, 'message'=>'Client registration successful!'];
    }else $response = ['status'=>false, 'message'=>'Client registration failed due to an unexpected error!'];
    $this->setOutputHeader(['Content-type:application/json']);
    $this->setOutput(json_encode($response));
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
  public function validateAddClient()
  {
    extract($_POST);
      $name       ??= '';
      $email      ??= '';
      $password   ??= '';
      $telephone  ??= '';
      $userId       =  $userid ?? '';
      $clientUserId =  $clientid ?? '';
      $companyId    =  $companyId ?? '';
      $businessName =  $businessname ?? '';
      

      $emailValid      = Validate::email($email);
      if($emailValid && strlen ($clientUserId) < 1){ 
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>$emailValid, 'data'=>['field'=>'email']]));
      }

      $telephoneValid  = Validate::telephone($telephone);
      if($telephoneValid && strlen ($clientUserId) < 1){ 
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>$telephoneValid, 'data'=>['field'=>'telphone']]));
        return ;
      }

      $businessNameValid       = Validate::string($businessName,false,false,4);
      if($businessNameValid && strlen ($clientUserId) < 1){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>$businessNameValid, 'data'=>['field'=>'businessname']]));
      } 
      
      $nameValid       = Validate::string($name,false,false,4);
      if($nameValid && strlen ($clientUserId) < 1){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>$nameValid, 'data'=>['field'=>'name']]));
      } 

      loadModel('user');
      loadModel('client');
      loadController('user');
      User::validateUser($userId,true);

      //TODO : validate clientUserId is valid
      $this->userModel = new UserModel();
      $this->clientModel = new ClientModel();
      // check email exists
      $emailExists    = $this->userModel->getUserByLoginId($email);
      if($emailExists && strlen ($clientUserId) < 1){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Email is associated with another account!', 'data'=>['field'=>'email']]));
      }

      // check telephone exists
      $telephoneExists = $this->userModel->getUserByTelephone($telephone);

      if($telephoneExists && strlen ($clientUserId) < 1){ 
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Telephone is associated with another account!', 'data'=>['field'=>'telephone']]));
      }

      if(strlen ($userid) > 0){
        $clientExists = $this->clientModel->getClientByUserId($clientUserId);
        if($clientExists){
          $this->setOutputHeader(['Content-type:application/json']);
          $this->setOutput(json_encode(['status'=>false, 'message'=>'Userid is associated with another client!', 'data'=>['field'=>'userid']]));
        }
      }
      // no errors
      return ['telephone'=>$telephone,'businessName'=>$businessName,'email'=>$email,'name'=>$name,'password'=>$password,'companyId'=>$this->companyId,'clientUserId'=>$clientUserId];
  }

  /**
   * undocumented function summary
   *
   * @param Type $var Description
   * @return type
   * @throws conditon
   **/
  public function list()
  {
    loadController('user');
    User::validateUser(true);
    loadModel('client');
    $this->clientModel = new ClientModel();
    $clients  = $this->clientModel->getCompanyClients($this->companyId);
    if($clients){
      $response = [ 'status'=>true,'message'=>'Company clients successfully retrieved','data'=>$clients];
    }else $response = [ 'status'=>true,'message'=>'Company has no registered clients on this platform','data'=>[]];
    $this->setOutputHeader(['Content-type:application/json']);
    $this->setOutput(json_encode($response)); 
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
  public function addclientproduct()
  {
    # code...
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
  private function validateAddClientProduct()
  {
    extract($_POST);
    $userId    =  $userid ?? '';
    $modules ??=  '';
    $clientId  =  $clientid ?? '';
    $productId =  $productd ?? '';

  }

  
  /**
   * undocumented function summary
   *
   * @param Type $var Description
   * @return type
   * @throws conditon
   **/
  public function addactivity(Type $var = null)
  {
    # code...
  }
}


?>