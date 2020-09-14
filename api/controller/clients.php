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
    $update = $this->clientModel->updateClient($clientUserId,['businessname'=>$businessName,'telephone'=>$companyTelephone,'email'=>$companyEmail,'address'=>$companyAddress,'country_id'=>$companyCountryId,'state_id'=>$companyStateId,'lga'=>$companyLga]);
    if($update) $response = ['status'=>true,'message'=>'Product update sucessfully!'];
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

    $attachedFiles = [];
    if(isset($_FILES['files'])){
      $attachedFiles = File::upload("files",'deployment',true);
      $attachedFiles = $attachedFiles['status'] ? $attachedFiles['data']: [];
    }

    switch ($licenseDuration) {
      case 'weekly':
        $expiryDate = date('Y-m-d',strtotime($deploymentDate.'+1 week'));
        break;
      case 'monthly':
        $expiryDate = date('Y-m-d',strtotime($deploymentDate.'+1 month'));
        break;
      case 'indefinite':
        $expiryDate = date('Y-m-d',strtotime($deploymentDate.'+100 year'));
        break;
      case 'bi-annual':
        $expiryDate = date('Y-m-d',strtotime($deploymentDate.'+2 year'));
        break;
      default:
        $expiryDate = date('Y-m-d',strtotime($deploymentDate.'+1 year'));
        break;
    }
    
    $insert = $this->clientModel->addClientProducts($clientUserId,$productId,$modules,$cost,$remarks,$deploymentDate,$deploymentStatus,$trainingDate,$trainingStatus,$paymentDate,$paymentStatus,$licenseDuration,$expiryDate,implode(',',$attachedFiles));
    
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

    $error = false;

    $remarks      ??= ''; 
    if(strlen($remarks) > 0 && !$error  && Validate::string($remarks,true,true,2,1500)) $error = 'Invalid deployment remark or remark too long';
    
    $trainingdate = isset($trainingdate) ? date("Y-m-d",strtotime($trainingdate)) : date("Y-m-d", strtotime('0000-00-00')); 
    $trainingstatus ??= 'pending';
    if(strlen($trainingstatus) > 0 && !$error && Validate::select($trainingstatus,['pending','ongoing','complete','incomplete'])) $error = 'Training status can only be either "pending","ongoing","complete","incomplete"';

    $paymentdate  = isset($paymentdate) ? date("Y-m-d",strtotime($paymentdate)) : date("Y-m-d", strtotime('0000-00-00')); 
    $paymentstatus  ??= 'pending'; 
    if(strlen($paymentstatus) > 0 && !$error && Validate::select($paymentstatus,['pending','complete','incomplete'])) $error = 'Payment status can only be either "pending","complete","incomplete"';
    
    $licenseduration  ??=  'annual';
    if(strlen($licenseduration) > 0 && !$error && Validate::select($licenseduration,['weekly','monthly','annual', 'bi-annual','indefinite'])) $error = 'License duration can only be either "weekly","monthly","annual", "bi-annual","indefinite"';
    
    $deploymentdate  = isset($deploymentdate) ? date("Y-m-d",strtotime($deploymentdate)) : date("Y-m-d", strtotime('0000-00-00')); 
    $deploymentstatus ??= 'pending'; 
    if(strlen($deploymentstatus) > 0 && !$error && Validate::select($deploymentstatus,['pending','complete','ongoing','suspended','cancelled'])) $error = 'Deployment status can only be either "pending","complete","ongoing","suspended","cancelled"';
    
    $productId    =  $productid ?? '';
    $clientUserId =  $clientid ?? '';


    loadModel('product');
    loadModel('client');
    loadModel('user');
    loadController('user');
    $error = false;
    $productInvalid  = Validate::string($productId,false,true,2,20);
    if($productInvalid  && !$error) $error = 'Invalid product Id';
    $userInvalid     = Validate::string($userId,false,true,2,20);
    if($userInvalid  && !$error ) $error = 'Invalid user Id';
    $clientInvalid   = Validate::string($clientUserId,false,true,2,20);
    if($userInvalid  && !$error ) $error = 'Invalid client Id';

    $user = User::validateUser($userId,true);

    $this->clientModel  = new ClientModel();
    $client = $this->clientModel->getClientByUserId($clientUserId);
    if(!$client  && !$error ) $error = 'Client does not exist';

    $this->productModel = new ProductModel();
    $product = $this->productModel->getProductById($productId);
    if(!$product  && !$error ) $error = 'Product does not exist';

    $invalidModules = [];
    $productModules = $this->productModel->getModulesByProductId($productId);
    
    foreach ($productModules as $module) {
      $itemExist = array_search($module['id'],$modules);
      if($itemExist !== false) array_splice($modules,$itemExist);
    }

    if(count($modules) > 0){
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode(['status'=>false,'message'=>'Invalid modules supplied!','data'=>['modules'=>$modules] ])); 
    }else $modules = $_POST['modules'];

    if($error){
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode(['status'=>false,'message'=>$error ])); 
    }

    return ['user'=>$user,'userId'=>$userId,'client'=>$client,'clientUserId'=>$clientUserId,'product'=>$product,'productId'=>$productId,'modules'=>$modules,'cost'=>$cost,'trainingDate'=>$trainingdate,'trainingStatus'=>$trainingstatus,'paymentDate'=>$paymentdate,'paymentStatus'=>$paymentstatus,'licenseDuration'=>$licenseduration,'deploymentDate'=>$deploymentdate,'deploymentStatus'=>$deploymentstatus,'remarks'=>$remarks];
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

    switch ($licenseDuration) {
      case 'weekly':
        $expiryDate = date('Y-m-d',strtotime($deploymentDate.'+1 week'));
        break;
      case 'monthly':
        $expiryDate = date('Y-m-d',strtotime($deploymentDate.'+1 month'));
        break;
      case 'indefinite':
        $expiryDate = date('Y-m-d',strtotime($deploymentDate.'+100 year'));
        break;
      case 'bi-annual':
        $expiryDate = date('Y-m-d',strtotime($deploymentDate.'+2 year'));
        break;
      default:
        $expiryDate = date('Y-m-d',strtotime($deploymentDate.'+1 year'));
        break;
    }

    $updated = $this->clientModel->updateClientProducts($clientProductId,['modules'=>$modules,'deploymentdate'=>$deploymentDate,'deploymentstatus'=>$deploymentStatus,'trainingdate'=>$trainingDate,'trainingstatus'=>$trainingStatus,'expirydate'=>$expiryDate,'licenseduration'=>$licenseDuration,'remarks'=>$remarks]);
    
    if($updated) $response = ['status'=>true,'message'=>'Client product update sucessfully!'];
    else $response = ['status'=>false,'message'=>'Client product update failed due to an expected error!'];
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
  public function deleteproduct()
  {
    extract($_GET);

    $userId = $this->userId ?? $userid ?? '';
    $clientproductid ??= '';

    loadController('user');

    $user = User::validateUser($userId,true);
    $response = ['status'=>false,'message'=>'Invalid client product id'];
    
    $invalidId  = Validate::string($clientproductid,false,true,2);
    if(!$invalidId){
      loadModel('client');
      $this->clientModel = new ClientModel();
      $deleted  = $this->clientModel->deleteClientProduct($clientproductid);
      if($deleted)     {
        $response = ['status'=>true,'message'=>'Product deleted successfully'];
      }else $response['message'] =  'Unable to delete product';
    }
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
    $error        = false;
    $userId       = $this->userId ?? $userid ??  '';
    $clientproductid ??= '';

    loadController('user');
    loadModel('client');
    $this->clientModel = new ClientModel();
    $product  = $this->clientModel->getClientProductByClientProductId($clientproductid);
    $invalidId  = Validate::string($clientproductid,false,true,2);
    if(!$invalidId || !$product){
      $error = 'Invalid or unverifyable client product id ';
    }
    

    $modules      = explode(',',$modules) ?? [];
    $remarks      ??= ''; 
    if(strlen($remarks) > 0 && !$error  && Validate::string($remarks,true,true,2,1500)) $error = 'Invalid deployment remark or remark too long';
    
    $trainingdate = isset($trainingdate) ? date("Y-m-d",strtotime($trainingdate)) : date("Y-m-d", strtotime('0000-00-00')); 
    $trainingstatus ??= 'pending';
    if(strlen($trainingstatus) > 0 && !$error && Validate::select($trainingstatus,['pending','ongoing','complete','incomplete'])) $error = 'Training status can only be either "pending","ongoing","complete","incomplete"';

    $paymentdate  = isset($paymentdate) ? date("Y-m-d",strtotime($paymentdate)) : date("Y-m-d", strtotime('0000-00-00')); 
    $paymentstatus  ??= 'pending'; 
    if(strlen($paymentstatus) > 0 && !$error && Validate::select($paymentstatus,['pending','complete','incomplete'])) $error = 'Payment status can only be either "pending","complete","incomplete"';
    
    $licenseduration  ??=  'annual';
    if(strlen($licenseduration) > 0 && !$error && Validate::select($licenseduration,['weekly','monthly','annual', 'bi-annual','indefinite'])) $error = 'License duration can only be either "weekly","monthly","annual", "bi-annual","indefinite"';
    
    $deploymentdate  = isset($deploymentdate) ? date("Y-m-d",strtotime($deploymentdate)) : date("Y-m-d", strtotime('0000-00-00')); 
    $deploymentstatus ??= 'pending'; 
    if(strlen($deploymentstatus) > 0 && !$error && Validate::select($deploymentstatus,['pending','complete','ongoing','suspended','cancelled'])) $error = 'Deployment status can only be either "pending","complete","ongoing","suspended","cancelled"';


    loadModel('product');
    loadController('user');

    $user = User::validateUser($userId,true);
    $productId    = !$product ? '' : $product['product_id'];
    $clientUserId = $clientId ?? $product['user_id'] ?? '';
    
    $this->productModel = new ProductModel();
    $product      = $this->productModel->getProductById($productId);
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

    return ['clientProductId'=>$clientproductid,'user'=>$user,'userId'=>$userId,'clientUserId'=>$clientUserId,'modules'=>$modules,'product'=>$product,'productId'=>$productId,'trainingDate'=>$trainingdate,'trainingStatus'=>$trainingstatus,'paymentDate'=>$paymentdate,'paymentStatus'=>$paymentstatus,'licenseDuration'=>$licenseduration,'deploymentDate'=>$deploymentdate,'deploymentStatus'=>$deploymentstatus,'remarks'=>$remarks];
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
  public function getHypothenus(int $a, int $b):int
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
  public function adddeploymentfile()
  {
    extract($_POST);
    $clientproductid ??= '';
    $userId = $this->userId ?? $userid ?? '';

    loadController('user');

    $user = User::validateUser($userId,true);
    $response = ['status'=>false,'message'=>'Invalid client product id'];
    $invalidId  = Validate::string($clientproductid,false,true,2);
    if(!$invalidId){
      loadModel('client');
      $this->clientModel = new ClientModel();
      $product  = $this->clientModel->getClientProductByClientProductId($clientproductid);
      if($product)     {
        loadModel('product');
        $attachedFiles = '';
        if(isset($_FILES['files'])){
          $attachedFiles = File::upload("files",'deployment',true);
          $attachedFiles = $attachedFiles['status'] ? $attachedFiles['data']: '';

          $attachedFiles = strlen($product['files']) > 0 ? array_merge(explode(',',$product['files']),$attachedFiles) : $attachedFiles;
          $attachedFileString = implode(',',$attachedFiles);
          $updated = $this->clientModel->updateClientProducts($clientproductid,['files'=>$attachedFileString]);
          if($updated) $response =  ['status'=>true,'message'=>'File upload success', 'data'=>$attachedFiles];
        }else $response['message'] = 'File upload failed! Please check file type or if file is attached';
      }
    }
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
  public function deletedeploymentfile()
  {
    extract($_GET);
    $fileindex ??= '';
    $clientproductid ??= '';
    $userId = $this->userId ?? $userid ?? '';


    loadController('user');

    $user = User::validateUser($userId,true);
    $response = ['status'=>false,'message'=>'Invalid client product id'];
    $invalidId  = Validate::string($clientproductid,false,true,2);
    if(!$invalidId){
      loadModel('client');
      $this->clientModel = new ClientModel();
      $product  = $this->clientModel->getClientProductByClientProductId($clientproductid);
      if($product)     {
        loadModel('product');
        $this->productModel = new ProductModel();
        $product['files'] = strlen($product['files']) > 1 ? explode(',',$product['files']) : [];
        array_splice($product['files'],$fileindex,1);
        $deleted  = $this->clientModel->updateClientProducts($clientproductid,['files'=>implode(',',$product['files'])]);
        if($deleted)     {
          $response = ['status'=>true,'message'=>'File deleted successfully'];
        }else $response['message'] =  'Invalid file index';
      }else $response['message'] =  'Invalid client product';
    }
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

    $user = User::validateUser($userId);
    if($user['role'] !== 'admin'  && $clientUserId !== $userId){
      $response = [ 'status'=>false,'message'=>'You don\'t have the right priviledges to access this resource'];
    }else{
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
    }
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
  public function getproductdata()
  {
    extract($_GET);

    $userId = $this->userId ?? $userid ?? '';
    $clientproductid ??= '';

    loadController('user');

    $user = User::validateUser($userId);
    $response = ['status'=>false,'message'=>'Invalid client product id'];   
    $invalidId  = Validate::string($clientproductid,false,true,2);
    if(!$invalidId){
      loadModel('client');
      $this->clientModel = new ClientModel();
      $product  = $this->clientModel->getClientProductByClientProductId($clientproductid);
      
      if($product){
        if($user['role'] !== 'admin'  && $product['user_id'] !== $userId){
          $response = [ 'status'=>false,'message'=>'You don\'t have the right priviledges to access this resource'];
        }else{
          loadModel('product');
          $this->productModel = new ProductModel();
          $product['files'] = strlen($product['files']) > 1 ? explode(',',$product['files']) : [];
          $product['modules'] = explode(',',$product['modules']);
          $modules = [];
          foreach ($product['modules'] as $module) {
            $module = $this->productModel->getModuleInfo($module);
            if($module) $modules[] = $module;
          }
          $product['modules'] = $modules;
          $response = ['status'=>true,'message'=>'Client product retrieved successfully', 'data'=>$product];
        }
      }else $response['message'] =  'Invalid client product';
    }
    $this->setOutputHeader(['Content-type:application/json']);
    $this->setOutput(json_encode($response));
  }
}
?>