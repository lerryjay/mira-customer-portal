<?php 

/**
 * Controller class for customers
 */
class Clients extends Controller 
{
  /**
   * undocumented function summary
   *
   * @param Type $var Description
   * @return type
   * @throws conditon
   **/
  public function index()
  {
    extract($_GET);
    $userId =  $userid ?? '';
    loadController('user');
    
    User::validateUser($userId,true);
    loadModel('client');
    $this->clientModel = new ClientModel();
    $clientExists  = $this->clientModel->getCompanyClients($this->companyId);
    if($clientExists){
      $clients = [];
      foreach($clientExists as $client){
        $clients[] = ['businessname'=>$client['businessname'],'user_id'=>$client['user_id']];
      }
      $response = [ 'status'=>true,'message'=>'Company clients successfully retrieved','data'=>$clients];
    }else $response = [ 'status'=>true,'message'=>'Company has no registered clients on this platform','data'=>[]];
    $this->setOutputHeader(['Content-type:application/json']);
    $this->setOutput(json_encode($response)); 
  }

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
      $imageurl = '';
      if(isset($_FILES['file'])){
        $imageurl = File::upload("file",'user',false);
        $imageurl ?: '';
      }
      $password = 3224;//TODO : generate random login password
      $clientUserId = $this->userModel->register($firstname,$lastname,$othername,$email,$telephone,$this->encryptPassword($password),$companyId,$imageurl);
    }
    $register = $this->clientModel->addClient($clientUserId,$businessName,$companyEmail,$companyTelephone,$companyAddress,$companyCountryId,$companyStateId,$companyLga);
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
    $lastname   = $lastname ?? '';
    $firstname  = $firstname ?? '';
    $othername  = $othername ?? '';
    $email      = $email ?? '';
    $password   = $password ?? '';
    $telephone  = $telephone ?? '';
    
    $lga        = $lga ?? '';
    $address    = $address ?? '';
    $stateid    = $stateid ?? '';
    $countryid  = $countryid ?? '';
      
    $companytelephone = $companytelephone ?? '';
    $companyemail     = $companyemail ?? '';
    $companylga       = $companylga ?? '';
    $companyaddress   = $companyaddress ?? '';
    $companystateid   = $companystateid ?? '';
    $companycountryid = $companycountryid ?? '';

    $userId       =  $userid ?? '';
    $clientUserId =  $clientid ?? '';
    $companyId    =  $companyId ?? '';
    $businessName =  $businessname ?? '';
      

    $emailInvalid      = Validate::email($email);
    if($emailInvalid && strlen ($clientUserId) < 1){ 
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>$emailInvalid, 'data'=>['field'=>'email']]));
    }

    

    $telephoneInvalid  = Validate::telephone($telephone);
    if($telephoneInvalid && strlen ($clientUserId) < 1){ 
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>$telephoneInvalid, 'data'=>['field'=>'telphone']]));
        return ;
    }

    $businessNameInvalid       = Validate::string($businessName,false,false,4);
    if($businessNameInvalid && strlen ($clientUserId) < 1){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>$businessNameInvalid, 'data'=>['field'=>'businessname']]));
    } 
      

    $addressInvalid      = Validate::string($address,false,true,0,300);
    if($addressInvalid  && strlen ($clientUserId) < 1 && strlen($address) > 0)
    {
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid address', 'data'=>['field'=>'address']]));
    }

    $countryInvalid      = Validate::string($countryid,false,true,0,20);
    if($countryInvalid && strlen ($clientUserId) < 1 && strlen($countryid) > 0){ 
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid  country', 'data'=>['field'=>'countryid']]));
    }

    $stateInvalid      = Validate::string($stateid,false,true,0,20);;
    if($stateInvalid && strlen ($clientUserId) < 1 && strlen($stateid) > 0){ 
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid  state', 'data'=>['field'=>'stateid']]));
    }

    $lgaInvalid      = Validate::string($lga,false,true,0,200);;
    if($lgaInvalid && strlen ($clientUserId) < 1 && strlen($lga) > 0){ 
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Please provide  lga', 'data'=>['field'=>'lga']]));
    }
    
    $companyemailInvalid      = Validate::email($companyemail);
    if($companyemailInvalid){ 
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid company email', 'data'=>['field'=>'companyemail']]));
    }

    $companyTelephoneInvalid  = Validate::telephone($companytelephone);
    if($companyTelephoneInvalid){ 
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid company telephone', 'data'=>['field'=>'companytelephone']]));
        return;
    }

    $companyaddressInvalid      = Validate::string($companyaddress,false,true,4);
    if($companyaddressInvalid){ 
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid company address', 'data'=>['field'=>'companyaddress']]));
    }

    $companycountryInvalid      = Validate::string($companycountryid,false,true,4,20);
    if($companycountryInvalid){ 
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid company country', 'data'=>['field'=>'companycountryid']]));
    }

    $companystateInvalid      = Validate::string($companystateid,false,true,4,20);;
    if($companystateInvalid){ 
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid company state', 'data'=>['field'=>'companystateid']]));
    }

    $companylgaInvalid      = Validate::string($companylga,false,true,4,20);;
    if($companylgaInvalid){ 
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Please provide company lga', 'data'=>['field'=>'companylga']]));
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
    return ['telephone'=>$telephone,'businessName'=>$businessName,'email'=>$email,'lastname'=>$lastname,'othername'=>$othername,'firstname'=>$firstname,'password'=>$password,'companyId'=>$this->companyId,'clientUserId'=>$clientUserId,'companyTelephone'=>$companytelephone,'companyEmail'=>$companyemail,'companyAddress'=>$companyaddress,'companyStateId'=>$companystateid,'companyCountryId'=>$companycountryid,'companyLga'=>$companylga,'address'=>$address,'stateId'=>$stateid,'countryId'=>$countryid,'lga'=>$lga];
  }

  /**
   * undocumented function summary
   * @param Type $var Description
   * @return type
   * @throws conditon
   **/
  public function getclient()
  {
    extract($_GET);

    $userId       = $this->userId ?? $userid ??  '';
    $clientUserId = $clientid ?? '';
    loadController('user');
    $user = User::validateUser($userId,true); 
    loadModel('client');
    $this->clientModel  = new ClientModel();
    $client = $this->clientModel->getClientByUserId($clientUserId);
    if(!$client){
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode(['status'=>false,'message'=>'Client does not exist' ])); 
    }

    $this->setOutputHeader(['Content-type:application/json']);
    $this->setOutput(json_encode(['status'=>true,'message'=>'Client retrieved sucessfully!', 'data'=>$client]));
  }

  /**
   * Undocumented function long description
   *
   * @param Type $var Description
   * @return type
   * @throws conditon
  **/
   public function update()
  {
    extract($this->validateUpdateClient());
    $update = $this->clientModel->updateClient($clientUserId,['businessname'=>$businessName,'telephone'=>$companyTelephone,'email'=>$companyEmail,'address'=>$companyAddress,'country_id'=>$companyCountryId,'state_id'=>$companyStateId,'lga'=>$companyLga]);
    
    $this->userModel->updateUser($clientUserId,['email'=>$email,'firstname'=>$firstname,'lastname'=>$lastname,'telephone'=>$telephone,'othername'=>$othername]);
    if($update) $response = ['status'=>true,'message'=>'Client updated sucessfully!'];
    else $response = ['status'=>false,'message'=>'Client update failed due to an expected error!'];
    $this->setOutputHeader(['Content-type:application/json']);
    $this->setOutput(json_encode($response));
  }

  /**
   * undocumented function summaryuserId
   * 
   * @param Type $var Description
   * @return type
   * @throws conditon
   **/
  private function validateUpdateClient()
  {
    extract($_POST);
    $companytelephone = $companytelephone ?? '';
    $companyemail = $companyemail ?? '';
    $companylga = $companylga ?? '';
    $companyaddress = $companyaddress ?? '';
    $companystateid = $companystateid ?? '';
    $companycountryid = $companycountryid ?? '';
    $businessName =  $businessname ?? '';
    
    $email     = $email ?? '';
    $telephone = $telephone ?? '';
    $firstname = $firstname ?? '';
    $lastname  = $lastname ?? '';
    $othername = $othername ?? '';


    $userId       = $this->userId ?? $userid ??  '';
    $clientUserId = $clientid ?? '';
    loadController('user');
    $user = User::validateUser($userId,true); 
    loadModel('client');

    $this->clientModel  = new ClientModel();
    $client = $this->clientModel->getClientByUserId($clientUserId);
    if(!$client){
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode(['status'=>false,'message'=>'Client does not exist' ])); 
    }
    
    loadModel('user');
    $this->userModel = new UserModel();
    
    $emailInvalid      = Validate::email($email);
    if($emailInvalid && strlen ($clientUserId) < 1){ 
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>$emailInvalid, 'data'=>['field'=>'email']]));
    }

    $emailExists    = $this->userModel->getUserByLoginId($email);
    if($emailExists && $emailExists['userid'] !== $clientUserId){
        $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode(['status'=>false, 'message'=>'Email is associated with another account!', 'data'=>['field'=>'email']]));
    }

    $telephoneInvalid  = Validate::telephone($telephone);
    if($telephoneInvalid && strlen ($clientUserId) < 1){ 
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>$telephoneInvalid, 'data'=>['field'=>'telphone']]));
        return ;
    }

    // check telephone exists
    $telephoneExists = $this->userModel->getUserByTelephone($telephone);
    if($telephoneExists && $telephoneExists['userid'] !== $clientUserId){ 
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode(['status'=>false, 'message'=>'Telephone is associated with another account!', 'data'=>['field'=>'telephone']]));
    }
    

    $businessNameInvalid       = Validate::string($businessName,false,false,4);
    if($businessNameInvalid && strlen ($clientUserId) < 1){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>$businessNameInvalid, 'data'=>['field'=>'businessname']]));
    } 
    
    $companyemailInvalid      = Validate::email($companyemail);
    if($companyemailInvalid){ 
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid company email', 'data'=>['field'=>'companyemail']]));
    }

    $companyTelephoneInvalid  = Validate::telephone($companytelephone);
    if($companyTelephoneInvalid){ 
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid company telephone', 'data'=>['field'=>'companytelephone']]));
        return;
    }

    $companyaddressInvalid      = Validate::string($companyaddress,false,true,4);
    if($companyaddressInvalid){ 
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid company address', 'data'=>['field'=>'companyaddress']]));
    }

    $companycountryInvalid      = Validate::integar($companycountryid);
    if($companycountryInvalid){ 
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid company country', 'data'=>['field'=>'companycountryid']]));
    }

    $companystateInvalid      = Validate::integar($companystateid);;
    if($companystateInvalid){ 
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid company state', 'data'=>['field'=>'companystateid']]));
    }

    $companylgaInvalid      = Validate::string($companylga,false,true,4,120);;
    if($companylgaInvalid){ 
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Please provide company lga', 'data'=>['field'=>'companylga']]));
    }
    
    $firstnameInvalid  = Validate::string($firstname,false,true,2,200);
    if($firstnameInvalid){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid firstname', 'data'=>['field'=>'firstname']]));
    }
      
    $lastnameInvalid       = Validate::string($lastname,false,true,1);
    if($lastnameInvalid){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid lastname', 'data'=>['field'=>'lastname']]));
    } 

    $othernameInvalid       = Validate::string($othername,false,true,2);
    if($othernameInvalid && strlen($othername) > 0){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid othername', 'data'=>['field'=>'othername']]));
    } 
    return ['businessName'=>$businessName,'companyTelephone'=>$companytelephone,'companyEmail'=>$companyemail,'companyAddress'=>$companyaddress,'companyStateId'=>$companystateid,'companyCountryId'=>$companycountryid,'companyLga'=>$companylga,'clientUserId'=>$clientUserId,'firstname'=>$firstname,'lastname'=>$lastname,'othername'=>$othername,'email'=>$email,'telephone'=>$telephone,'client'=>$client,'user'=>$user,'userId'=>$userId];
  }

  /**
     * Update user imageurl
     *
     * @param HTTPFILE $file iamge - png,jpg,jpeg,gif
     * @param HTTPPOST $userid user
     * @return JSON status:bool,message:string,data:string if sucess or null
     **/
    public function updateimage()
    {
      extract($_POST);
      if(!isset($userid)){
        $this->setOutputHeader(['Content-type:application/jsonerror']);
        $this->setOutput(json_encode($response));
      }
      $userId       = $this->userId ?? $userid ??  '';
      $clientUserId = $clientid ?? '';
      loadController('user');
      $user = User::validateUser($userId,true); 
      loadModel('client');
      loadModel('user');
  
      $this->clientModel  = new ClientModel();
      $this->userModel  = new UserModel();
      $client = $this->clientModel->getClientByUserId($clientUserId);
      if(!$client){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false,'message'=>'Client does not exist' ])); 
      }
      if($client){
        $imageurl = '';
        if(isset($_FILES['file'])){
          $upload = File::uploadImage("file",'user',false,450);
          if($upload['status']){
           $update = $this->userModel->updateUser($clientUserId,['imageurl'=>$upload['data']]);
           $response = $update  ? ['status'=>true,'message'=>'Image updated successfully!', 'data'=>$upload['data']] : ['status'=>false,'message'=>'Image updated failed. An unexpected error occured!'];
          }else $response = ['status'=>false,'message'=>$upload['mesage']];
        }else $response = ['status'=>false,'message'=>'Please select an image for upload!'];
      }else $response = ['status'=>false,'message'=>'Account not found!'];
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
  public function delete()
  {
    extract($_GET);
    
    $deleteuser = $deleteuser ?? false;
    $userid     = $userid ?? '';
    $clientid   = $clientid ?? '';

    loadController('user');
    $user = User::validateUser($userid,true);
    loadModel('client');
    $this->clientModel = new ClientModel();
    $deleted = $this->clientModel->delete($clientid);
    if($deleted) {
      $response =  ['status'=>true,'message'=>'Client account deleted successfully'];
      if($deleteuser){
        loadModel('user');
        $this->userModel =  new UserModel();
        $userdeleted = $this->userModel->updateUser($clientid,['status'=> 0 ]);
        if(!$userdeleted) $response['message'] .= ' Unable to delete user account';
      } 
    }else $response =  ['status'=>false,'message'=>'Client account delete failed'];

    $this->setOutputHeader(['Content-type:application/json']);
    $this->setOutput(json_encode($response)); 
  }
}
?>