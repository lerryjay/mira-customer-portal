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
    $lastname   ??= '';
    $firstname  ??= '';
    $othername  ??= '';
    $email      ??= '';
    $password   ??= '';
    $telephone  ??= '';
    
    $lga        ??= '';
    $address    ??= '';
    $stateid    ??= '';
    $countryid  ??= '';
      
    $companytelephone  ??= '';
    $companyemail      ??= '';
    $companylga        ??= '';
    $companyaddress    ??= '';
    $companystateid    ??= '';
    $companycountryid  ??= '';

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
    $update = $this->clientModel->updateClient($clientUserId,['businessname'=>$businessname,'telephone'=>$companyTelephone,'email'=>$companyEmail,'address'=>$companyAddress,'country_id'=>$companyCountryId,'state_id'=>$companyStateId,'lga'=>$companyLga]);
    if($update) $response = ['status'=>true,'message'=>'Product update sucessfully!'.$message];
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
    $companytelephone  ??= '';
    $companyemail      ??= '';
    $companylga        ??= '';
    $companyaddress    ??= '';
    $companystateid    ??= '';
    $companycountryid  ??= '';
    $businessName =  $businessname ?? '';
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
    return ['businessName'=>$businessName,'companyTelephone'=>$companytelephone,'companyEmail'=>$companyemail,'companyAddress'=>$companyaddress,'companyStateId'=>$companystateid,'companyCountryId'=>$companycountryid,'companyLga'=>$companylga,'clientUserId'=>$clientUserId,'client'=>$client,'user'=>$user,'userId'=>$userId];
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
  public function addproduct()
  {
    $data = $this->validateAddClientProduct();
    extract($data);
    $insert = $this->clientModel->addClientProducts($clientUserId,$productId,$modules,$cost);
    if($insert){
      $response =  ['status'=>true,'message'=>'Client product registered successfully!'];
    }else $response =  ['status'=>false,'message'=>'An unexpected error occured!'];

    $this->setOutputHeader(['Content-type:application/json']);
    $this->setOutput(json_encode($response)); 
  }

  /**
   * Validate adding a new client
   *
   * @param 
   * @return array clientUserId,productId,client,product,user,userId,modules
   **/
  private function validateAddClientProduct()
  {
    extract($_POST);
    $userId  =  $this->userId ?? $userid ??  '';
    $modules =  isset($modules) ? explode(',',$modules) : [];
    $cost  ??= 0;
    
    $productId    =  $productid ?? '';
    $clientUserId =  $clientid ?? '';


    loadModel('product');
    loadModel('client');
    loadModel('user');
    loadController('user');
    $productInvalid  = Validate::string($productId,false,true,2,20);
    $userInvalid     = Validate::string($userId,false,true,2,20);
    $clientInvalid   = Validate::string($clientUserId,false,true,2,20);

    $user = User::validateUser($userId,true);

    $this->clientModel  = new ClientModel();
    $client = $this->clientModel->getClientByUserId($clientUserId);
    if(!$client){
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode(['status'=>false,'message'=>'Client does not exist' ])); 
    }

    $this->productModel = new ProductModel();
    $product = $this->productModel->getProductById($productId);
    if(!$product){
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode(['status'=>false,'message'=>'Product does not exist' ])); 
    }

    $invalidModules = [];
    $productModules  = $this->productModel->getModulesByProductId($productId);
    
    foreach ($productModules as $module) {
      $itemExist = array_search($module['id'],$modules);
      if($itemExist !== false) array_splice($modules,$itemExist);
    }

    if(count($modules) > 0){
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode(['status'=>false,'message'=>'Invalid modules supplied!','data'=>['modules'=>$modules] ])); 
    }else $modules = $_POST['modules'];

    return ['user'=>$user,'userId'=>$userId,'client'=>$client,'clientUserId'=>$clientUserId,'product'=>$product,'productId'=>$productId,'modules'=>$modules,'cost'=>$cost];
  }



  /**
   * Undocumented function long description
   *
   * @param Type $var Description
   * @return type
   * @throws conditon
   **/
  public function updateproduct()
  {
    extract($this->validateUpdateProduct());
    loadModel('client');
    $this->clientModel = new ClientModel();

    $updated = $this->clientModel->updateClientProducts($clientUserId,$productId,['modules'=>$modules]);
    
    if($updated) $response = ['status'=>true,'message'=>'Client product update sucessfully!'];
    else $response = ['status'=>false,'message'=>'Client product update failed due to an expected error!'];
    $this->setOutputHeader(['Content-type:application/json']);
    $this->setOutput(json_encode($response));
  }

  /**
   * Undocumented function long description
   *
   * @param Type $var Description
   * @return type
   * @throws conditon
   **/
  private function validateUpdateProduct()
  {
    extract($_POST);

    $userId       = $this->userId ?? $userid ??  '';
    $productId    = $productid ?? '';
    $clientUserId = $clientid ?? '';

    $modules      = explode(',',$modules) ?? [];

    loadModel('product');
    loadController('user');

    $user = User::validateUser($userId,true);

    $this->productModel = new ProductModel();
    $product = $this->productModel->getProductById($productId);
    if(!$product){
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode(['status'=>false,'message'=>'Product does not exist' ])); 
    }

    $productModules  = $this->productModel->getModulesByProductId($productId);
    
    foreach ($productModules as $module) {
      $itemExist = array_search($module['id'],$modules);
      if($itemExist !== false) array_splice($modules,$itemExist);
    }

    if(count($modules) > 0){
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode(['status'=>false,'message'=>'Invalid modules supplied!','data'=>['modules'=>$modules] ])); 
    }else $modules = $_POST['modules'];

    return ['user'=>$user,'userId'=>$userId,'clientUserId'=>$clientUserId,'modules'=>$modules,'product'=>$product,'productId'=>$productId ];
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
  public function products()
  {
    extract($_GET);
    loadModel('client');
    loadController('user');
    $clientUserId =  $clientid ?? '';
    $userId       =  $this->userId ?? $userid ??  '';


    $this->clientModel  = new ClientModel();
    $client = $this->clientModel->getClientByUserId($clientUserId);
    if(!$client){
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode(['status'=>false,'message'=>'Client does not exist' ])); 
    }

    User::validateUser($userId,true);
    $products = $this->clientModel->getClientProductsByClient($clientUserId);
    if($products){
      loadModel('product');
      $this->productModel = new ProductModel();
      for ($i=0; $i < count($products); $i++) { 
        $products[$i]['modules'] = explode(',',$products[$i]['modules']);
        $modules = [];
        foreach ($products[$i]['modules'] as $module) {
          $modules[] = $this->productModel->getModuleInfo($module);
        }
        $products[$i]['modules'] = $modules;
      }
      $response = ['status'=>true,'message'=>'Clients products successfully retrieved','data'=>$products];
    }else $response = ['status'=>false,'message'=>'No products has been added for this client!'];
    $this->setOutputHeader(['Content-type:application/json']);
    $this->setOutput(json_encode($response));
  }
}


?>