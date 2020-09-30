<?php
  /**
   * undocumented class
   */
  class Deployment extends Controller
  {
    public function index(){
      return $this->list();
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
    public function add()
    {
      $data = $this->validateAddDeployment();
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
      
      $insert = $this->deploymentModel->add($clientUserId,$productId,$modules,$cost,$remarks,$deploymentDate,$deploymentStatus,$trainingDate,$trainingStatus,$paymentDate,$paymentStatus,$licenseDuration,$expiryDate,implode(',',$attachedFiles));
      
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
    private function validateAddDeployment()
    {
      extract($_POST);
      $userId  =  $this->userId ?? $userid ??  '';
      $modules =  isset($modules) ? explode(',',$modules) : [];
      $cost    =  $cost ??  0;

      loadModel('deployment');

      $error = false;

      $remarks =  $remarks ?? ''; 
      if(strlen($remarks) > 0 && !$error  && Validate::string($remarks,true,true,2,1500)) $error = 'Invalid deployment remark or remark too long';
      
      $trainingdate = isset($trainingdate) ? date("Y-m-d",strtotime($trainingdate)) : date("Y-m-d", strtotime('0000-00-00')); 
      $trainingstatus = $trainingstatus ?? 'pending';
      if(strlen($trainingstatus) > 0 && !$error && Validate::select($trainingstatus,['pending','ongoing','complete','incomplete'])) $error = 'Training status can only be either "pending","ongoing","complete","incomplete"';

      $paymentdate   = isset($paymentdate) ? date("Y-m-d",strtotime($paymentdate)) : date("Y-m-d", strtotime('0000-00-00')); 
      $paymentstatus = $paymentstatus ?? 'pending'; 
      if(strlen($paymentstatus) > 0 && !$error && Validate::select($paymentstatus,['pending','complete','incomplete'])) $error = 'Payment status can only be either "pending","complete","incomplete"';
      
      $licenseduration  = $licenseduration ??  'annual';
      if(strlen($licenseduration) > 0 && !$error && Validate::select($licenseduration,['weekly','monthly','annual', 'bi-annual','indefinite'])) $error = 'License duration can only be either "weekly","monthly","annual", "bi-annual","indefinite"';
      
      $deploymentdate   = isset($deploymentdate) ? date("Y-m-d",strtotime($deploymentdate)) : date("Y-m-d", strtotime('0000-00-00')); 
      $deploymentstatus =  $deploymentstatus ?? 'pending'; 
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
      $this->deploymentModel  = new DeploymentModel();
      $client = $this->clientModel->getClientByUserId($clientUserId);
      if(!$client  && !$error ) $error = 'Client does not exist';

      $this->productModel = new ProductModel();
      $product = $this->productModel->getProductById($productId);
      if(!$product  && !$error ) $error = 'Product does not exist';

      $invalidModules = [];
      $productModules = $this->productModel->getModulesByProductId($productId);
      $productModules = $productModules ?: [];
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
    public function update()
    {
      extract($this->validateUpdate());
      loadModel('client');
      
      $this->deploymentModel = new DeploymentModel();

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

      $updated = $this->deploymentModel->updateDeployment($deploymentId,['modules'=>$modules,'deploymentdate'=>$deploymentDate,'deploymentstatus'=>$deploymentStatus,'trainingdate'=>$trainingDate,'trainingstatus'=>$trainingStatus,'expirydate'=>$expiryDate,'licenseduration'=>$licenseDuration,'remarks'=>$remarks]);
      
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
    public function delete()
    {
      extract($_GET);

      $userId = $this->userId ?? $userid ?? '';
      $deploymentid = $deploymentid ?? '';

      loadController('user');

      $user = User::validateUser($userId,true);
      $response = ['status'=>false,'message'=>'Invalid client product id'];
      
      $invalidId  = Validate::string($deploymentid,false,true,2);
      if(!$invalidId){
        loadModel('client');
        $this->deploymentModel = new DeploymentModel();
        $deleted  = $this->deploymentModel->delete($deploymentid);
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
    private function validateUpdate()
    {
      extract($_POST);
      $error        = false;
      $userId       = $this->userId ?? $userid ??  '';
      $deploymentid = $deploymentid ?? '';

      loadController('user');
      loadModel('client');
      loadModel('deployment');

      $this->deploymentModel = new DeploymentModel();
      $product  = $this->deploymentModel->getDeploymentById($deploymentid);
      $invalidId  = Validate::string($deploymentid,false,true,2);
      if(!$invalidId || !$product){
        $error = 'Invalid or unverifyable client product id ';
      }
      

      $modules      = explode(',',$modules) ?? [];
      $remarks      = $remarks ??  ''; 
      if(strlen($remarks) > 0 && !$error  && Validate::string($remarks,true,true,2,1500)) $error = 'Invalid deployment remark or remark too long';
      
      $trainingdate = isset($trainingdate) ? date("Y-m-d",strtotime($trainingdate)) : date("Y-m-d", strtotime('0000-00-00')); 
      $trainingstatus =  $trainingstatus ?? 'pending';
      if(strlen($trainingstatus) > 0 && !$error && Validate::select($trainingstatus,['pending','ongoing','complete','incomplete'])) $error = 'Training status can only be either "pending","ongoing","complete","incomplete"';

      $paymentdate   = isset($paymentdate) ? date("Y-m-d",strtotime($paymentdate)) : date("Y-m-d", strtotime('0000-00-00')); 
      $paymentstatus = $paymentstatus  ?? 'pending'; 
      if(strlen($paymentstatus) > 0 && !$error && Validate::select($paymentstatus,['pending','complete','incomplete'])) $error = 'Payment status can only be either "pending","complete","incomplete"';
      
      $licenseduration   = $licenseduration  ??  'annual';
      if(strlen($licenseduration) > 0 && !$error && Validate::select($licenseduration,['weekly','monthly','annual', 'bi-annual','indefinite'])) $error = 'License duration can only be either "weekly","monthly","annual", "bi-annual","indefinite"';
      
      $deploymentdate     = isset($deploymentdate) ? date("Y-m-d",strtotime($deploymentdate)) : date("Y-m-d", strtotime('0000-00-00')); 
      $deploymentstatus   = $deploymentstatus ?? 'pending'; 
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

      return ['deploymentId'=>$deploymentid,'user'=>$user,'userId'=>$userId,'clientUserId'=>$clientUserId,'modules'=>$modules,'product'=>$product,'productId'=>$productId,'trainingDate'=>$trainingdate,'trainingStatus'=>$trainingstatus,'paymentDate'=>$paymentdate,'paymentStatus'=>$paymentstatus,'licenseDuration'=>$licenseduration,'deploymentDate'=>$deploymentdate,'deploymentStatus'=>$deploymentstatus,'remarks'=>$remarks];
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
    public function addfile()
    {
      extract($_POST);
      $deploymentid = $deploymentid ?? '';
      $userId = $this->userId ?? $userid ?? '';

      loadController('user');
      loadModel('deployment');

      $user = User::validateUser($userId,true);
      $response = ['status'=>false,'message'=>'Invalid client product id'];
      $invalidId  = Validate::string($deploymentid,false,true,2);
      if(!$invalidId){
        loadModel('client');
        $this->deploymentModel = new DeploymentModel();
        $product  = $this->deploymentModel->getDeploymentById($deploymentid);
        if($product)     {
          loadModel('product');
          $attachedFiles = '';
          if(isset($_FILES['files'])){
            $attachedFiles = File::upload("files",'deployment',true);
            $attachedFiles = $attachedFiles['status'] ? $attachedFiles['data']: '';

            $attachedFiles = strlen($product['files']) > 0 ? array_merge(explode(',',$product['files']),$attachedFiles) : $attachedFiles;
            $attachedFileString = implode(',',$attachedFiles);
            $updated = $this->deploymentModel->updateDeployment($deploymentid,['files'=>$attachedFileString]);
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
    public function deletefile()
    {
      extract($_GET);
      $fileindex = $fileindex ?? '';
      $deploymentid = $deploymentid ?? '';
      $userId = $this->userId ?? $userid ?? '';

      loadController('user');
      loadModel('deployment');

      $user = User::validateUser($userId,true);
      $response = ['status'=>false,'message'=>'Invalid client product id'];
      $invalidId  = Validate::string($deploymentid,false,true,2);
      if(!$invalidId){
        loadModel('client');
        $this->deploymentModel = new DeploymentModel();
        $product  = $this->deploymentModel->getDeploymentById($deploymentid);
        if($product)     {
          loadModel('product');
          $this->productModel = new ProductModel();
          $product['files'] = strlen($product['files']) > 1 ? explode(',',$product['files']) : [];
          array_splice($product['files'],$fileindex,1);
          $deleted  = $this->deploymentModel->updateDeployment($deploymentid,['files'=>implode(',',$product['files'])]);
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
    public function list()
    {
      extract($_GET);
      loadModel('client');
      loadModel('deployment');
      loadController('user');
      $clientUserId =  $clientid ?? '';
      $userId       =  $this->userId ?? $userid ??  '';


      $this->clientModel      = new ClientModel();
      $this->deploymentModel  = new DeploymentModel();
      $client = $this->clientModel->getClientByUserId($clientUserId);
      if(!$client){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false,'message'=>'Client does not exist' ])); 
      }

      $user = User::validateUser($userId);
      if($user['role'] !== 'admin'  && $clientUserId !== $userId){
        $response = [ 'status'=>false,'message'=>'You don\'t have the right priviledges to access this resource'];
      }else{
        $products = $this->deploymentModel->getDeploymentsByClient($clientUserId);
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
    public function info()
    {
      extract($_GET);

      $userId = $this->userId ?? $userid ?? '';
      $deploymentid = $deploymentid ?? '';

      loadController('user');
      loadModel('deployment');

      $user = User::validateUser($userId);
      $response = ['status'=>false,'message'=>'Invalid client product id'];   
      $invalidId  = Validate::string($deploymentid,false,true,2);
      if(!$invalidId){
        loadModel('client');
        $this->deploymentModel = new DeploymentModel();
        $product  = $this->deploymentModel->getDeploymentById($deploymentid);
        
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