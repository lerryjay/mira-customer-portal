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
      $clientUserId = $this->userModel->register($name,$email,$telephone,$this->encryptPassword($password),$companyId,$imageurl);
    }
    $register = $this->clientModel->addClient($clientUserId,$businessName);
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
   * @param Type $var Description
   * @return type
   * @throws conditon
   **/
  public function getclient()
  {
    extract($_GET);

    $userId       = $userid ?? $this->userId ?? '';
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
    $update = $this->clientModel->updateClient($clientUserId,['name'=>$name]);
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

    $userId       = $userid ?? $this->userId ?? '';
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

    $name    ??= '';  
    $nameError = Validate::string($name,false,true,4); 
    if($nameError){
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid client name', 'data'=>['field'=>'name']]));
    } 
    return ['name'=>$name,'clientUserId'=>$clientUserId,'client'=>$client,'user'=>$user,'userId'=>$userId];
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
    $userId  =  $userid ?? $this->userId ?? '';
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

    $userId       = $userid ?? $this->userId ?? '';
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
    $userId       =  $userid ?? $this->userId ?? '';


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