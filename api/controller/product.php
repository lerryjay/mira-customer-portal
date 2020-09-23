<?php
  /**
   * Products controller class
   */
  class Product extends Controller
  {
    /**
     * Index Function
     * Retrieves all company Products
     *
     * @param Type $var Description
     * @return type
     * @throws conditon
     **/
    public function index()
    {
      $response = [
        'status'=>false,
        'message'=>'An unexpected error occured'
      ];
      loadController('user');
      loadModel('product');

      $this->productModel = new ProductModel();

      $products = $this->productModel->getCompanyProducts($this->companyId);
      if($products){
        $response = [
          'status'=>true,
          'message'=>'Company products retrieved successfully',
          'data'=>$products
        ];
      }else{
        $response = [
          'status'=>true,
          'message'=>'Company has no products',
          'data'=>[]
        ];
      }
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }


    /**
     * Returns a product
     *
     * @param HTTPPOSTSTRING $productId 
     * @return JSON status:bool, message:string, data:Product
     **/
    public function getproduct()
    {
      $response = [
        'status'=>false,
        'message'=>'An unexpected error occured'
      ];
      
      $data = $this->validateduserproductpermission();
      extract($data);

      $response['status']   = true;
      $response['message']  = 'Products data retrived';
      $response['data']     = $product;

      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }

    /**
     * Add new product for the company
     *
     * @param HTTPPOSTPARAMS - userid, name, description
     * @return HTTPRESPONSE
     **/
    public function add()
    {
      $response = [
        'status'=>false,
        'message'=>'Error saving product!',
      ];
      $data = $this->validateAddProduct();
      extract($data);
      loadModel('product');
      $imageurl = '';
      if(isset($_FILES['file'])){
        $imageurl = File::upload("file",'product',false);
        $imageurl = $imageurl['status'] ? $imageurl['data']: '';
      }
      $this->productModel = new ProductModel();
      $add = $this->productModel->addProduct($name,$description,$user['company_id'],$imageurl);
      if($add){
        $response = [
          'status'=>true,
          'message'=>'Product saved successfully!',
        ];
      }
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }

    /**
     * Vslidation for a new product
     *
     * @param HTTPPOST userid,name-productname,description
     * @return PRODUCTOBJECT if valid else @return HTTPEXITRESPONSE 
     **/
    private function validateAddProduct()
    {
      loadController('user');
      extract($_POST);
      $userId =  $this->userId ?? $userid ??  '';
      $user   = User::validateUser($userId,true);
      $name      = $name ?? '';
      $nameError =   Validate::string($name,false,true,4); 
      if($nameError){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid product name', 'data'=>['field'=>'name']]));
      } 

      $description       = $description ?? '';
      $descriptionError  = Validate::string($description,false,true,4); 
      if($descriptionError){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid product description', 'data'=>['field'=>'description']]));
      } 
      return ['name'=>$name,'description'=>$description,'user'=>$user];
    }

    
    /**
     * Validate product update
     *
     * @param HTTPPOSTSTRING $productid Id of the product
     * @param HTTPPOSTSTRING $name New name of the product
     * @param HTTPPOSTSTRING $description New description of the product
     * @return JSON [status:bool,'message:string]
     **/
    public function update()
    {
      extract($this->validateupdateproduct());
      $imageurl = $product['imageurl'];
      $message = null;
      if(isset($_FILES['file'])){
        $upload = File::uploadImage("file",'product',false);
        $imageurl = $upload['status'] ? $upload['data'] : $imageurl;
        $message  = $upload['message'];
      }else $upload = ['status'=>true];
      $update = $this->productModel->updateProduct($productId,$name,$description,$imageurl);
      if($update && $upload['status']) $response = ['status'=>true,'message'=>'Product Updated sucessfully!'.$message];
      elseif($message)  $response = ['status'=>false,'message'=>$message];
      else $response = ['status'=>false,'message'=>'Product Update failed due to an expected error!'];
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }

    /**
     * Validate product update
     *
     * @param HTTPPOSTSTRING $productid Id of the product
     * @param HTTPPOSTSTRING $name New name of the product
     * @param HTTPPOSTSTRING $description New description of the product
     * @return array OR @return null
     **/
    private function validateupdateproduct()
    {
      extract($this->validateduserproductpermission());
      extract($_POST);
      if($user['role']  !== 'admin'){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false,'message'=>'You are not authorised to access this resource']));
      }

      $name = $name ?? '';
      $nameError = Validate::string($name,false,true,4); 
      if($nameError){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid product name', 'data'=>['field'=>'name']]));
      } 

      $description = $description ?? '';
      $descriptionError  = Validate::string($description,false,true,4); 
      if($descriptionError){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid product description', 'data'=>['field'=>'description']]));
      } 
      return ['name'=>$name,'description'=>$description,'product'=>$product,'user'=>$user,'productId'=>$productId,'userId'=>$userId];
    }


    /**
     * Update user imageurl
     *
     * @param HTTPFILE $file iamge - png,jpg,jpeg,gif
     * @param HTTPPOST $userid user
     * @param HTTPPOST $productid ID of the product
     * @return JSON status:bool,message:string,data:string if sucess or null
     **/
    public function updateimage()
    {
      extract($this->validateduserproductpermission());
      if($user['role'] != 'admin'){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false,'message'=>'You are not authorised to access this resource']));
      }
      if(isset($_FILES['file'])){
        $upload = File::uploadImage("file",'product',false);
        if($upload['status']){
          $update = $this->productModel->updateProductImage($productId,$upload['data']);
          $response = $update  ? ['status'=>true,'message'=>'Image updated successfully!', 'data'=>$upload['data']] : ['status'=>false,'message'=>'Image updated failed. An unexpected error occured!'];
        }else $response = ['status'=>false,'message'=>$upload['mesage']];
      }else $response = ['status'=>false,'message'=>'Please select an image for upload!'];
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }

    /**
     * Delete a product from the databsse
     *
     * @param HTTPGET $productId product to be deleted
     * @param HTTPGET $userId user performing the action
     * @return JSON [status:bool,message:string]
     **/
    public function delete()
    {
      extract($this->validateduserproductpermission());
      if($user['role'] !== 'admin'){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false,'message'=>'You do not have the required permission to perform access this resource!']));
      }
      $deleted = $this->productModel->deleteproduct($productId);
      if($deleted)$response = ['status'=>true,'message'=>'Product deleted successfully!'];
      else $response = ['status'=>false,'message'=>'Delete failed. An unexpected error occured!'];

      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }

    /**
     * Retrieves product modules product
     *
     * @param HTTPPOSTPARAMS $_POST - productid,$userid
     * @return JSONRESPONSE 
     **/
    public function modules()
    {
      $response = [
        'status'=>false,
        'message'=>'An unexpected error occured'
      ];
      
      $data = $this->validateduserproductpermission();
      extract($data);

      $modules = $this->productModel->getModulesByProductId($product['id']);
      
      $response['status']   = true;
      $response['message']  = 'Products modules retrived successfulty';
      $response['data']     = $modules ? $modules : [];

      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }

    /**
     * Add product module
     *
     * @param HTTPPOSTPARAMS $productId
     * @param HTTPPOSTPARAMS $name
     * @param HTTPPOSTPARAMS $description
     * @return HTTPRESPONSE [ status:boolean, message;String response from the request]
     **/
    public function addmodule()
    {
      $response = [
        'status'=>false,
        'message'=>'Error saving module'
      ];

      $data = $this->validateAddModule();
      extract($data);

      $add  = $this->productModel->addProductModule($product['id'],$name,$description);
      if($add){
        $response = [
          'status'=>true,
          'message'=>'Module saved successfully',
          'data'=>['moduleid'=>$add]
        ];
      }

      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }
    /**
     * Vslidation for a new module
     *
     * @param HTTPPOST userid,name-modulename,description,productid
     * @return PRODUCTOBJECT if valid else @return HTTPEXITRESPONSE 
     **/
    public function validateAddModule()
    {
      loadModel('product');
      loadController('user');
      extract($_POST);
      $userId    = $this->userId ?? $userid ??  '';
      $productId = isset($productid) ? $productid : '';
      $user      = User::validateUser($userId,true);
      $this->productModel = new ProductModel();
      $product = $this->productModel->getProductById($productId);

      if(!$product){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Product not found', 'data'=>['field'=>'productid']]));
      }elseif($product['company_id'] !== $user['company_id']){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Product not found', 'data'=>['field'=>'productid']]));
      }

      $name      = $name ?? '';
      $nameError =   Validate::string($name,false,true,2); 
      if($nameError){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid module name', 'data'=>['field'=>'name']]));
      } 

      $description       = $description ?? '';
      $descriptionError  = Validate::string($description,false,true,2); 
      if($descriptionError){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid module description', 'data'=>['field'=>'description']]));
      } 
      return ['name'=>$name,'description'=>$description,'user'=>$user, 'product'=>$product,'userId'=>$userId,'productId'=>$productId];
    }

    /**
     * Updates a product module
     *
     * @param HTTPPOSTSTRING $productid
     * @param HTTPPOSTSTRING $moduleid
     * @return JSONHTTPRESPONSE status:bool,message:string,data:string if sucess or null
     **/
    public function updatemodule()
    {
      extract($this->validateUpdateModule());
      $update = $this->productModel->updateProductModule($moduleId,$name,$description);
      if($update)$response = ['status'=>true,'message'=>'Update successful!'];
      else $response = ['status'=>false,'message'=>'Update failed. An unexpected error occured!'];

      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }

    
    /**
     * Valodate product module update
     *
     * @param HTTPPOSTSTRING $productid
     * @param HTTPPOSTSTRING $moduleid
     * @return array OR @return null
     **/
    private function validateUpdateModule ()
    {
      extract($this->validateusermodulepermission());
      extract($_POST);

      $name      = $name ?? '';
      $nameError =   Validate::string($name,false,true,2); 
      if($nameError){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid module name', 'data'=>['field'=>'name']]));
      } 

      $description       = $description ?? '';
      $descriptionError  = Validate::string($description,false,true,2); 
      if($descriptionError){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid module description', 'data'=>['field'=>'description']]));
      } 
      return ['name'=>$name,'description'=>$description,'user'=>$user, 'product'=>$product,'module'=>$module,'productId'=>$module['product_id'],'moduleId'=>$moduleId,'userId'=>$userId];
    }

    /**
     * Delete a module from the database
     *
     * @param HTTPGET $moduleid Module to be deleted
     * @param HTTPGET $userid user performing the action
     * @return [status:bool,message:string]
     **/
    public function deletemodule()
    {
      extract($this->validateusermodulepermission());
      if($user['role'] !== 'admin'){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false,'message'=>'You do not have the required permission to perform access this resource!']));
      }
      $deleted = $this->productModel->deleteProductModule($moduleId);
      if($deleted)$response = ['status'=>true,'message'=>'Module delete successful!'];
      else $response = ['status'=>false,'message'=>'Update failed. An unexpected error occured!'];

      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }
    

    /**
     * Validates that a user can access the module
     *
     * @param HTTPREQUEST $userid UserId attempting to carry out the action
     * @param HTTPREQUEST $moduleid moduleId to be accessed
     * @return array user,module,product,productId,moduleId,userId OR @return null
     **/
    public function validateusermodulepermission()
    {
      extract($_GET);
      extract($_POST);
      $userId = $this->userId ?? $userid ??  '';
      loadModel('product');
      loadController('user');
      $this->productModel = new ProductModel();
      $user = User::validateUser($userId); 
      $module = $this->productModel->getModuleInfo($moduleid);
      if($module){
        $product = $this->productModel->getProductById($module['product_id']);
        if($product['company_id'] !== $user['company_id']) $response['message']  =  "You do not have have the authorization to access this resource!";
        else return ['module'=>$module,'user'=>$user,'product'=>$product,'productId'=>$product['id'],'moduleId'=>$moduleid,'userId'=>$userId];
      }else $response['message']  =  "Module does not exist!";
      $response['status']   = false;
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }

    public function validateduserproductpermission()
    {
      extract($_GET);
      extract($_POST);
      loadController('user');
      loadModel('product');
      $userId = $this->userId ?? $userid ??  '';
      $user   = User::validateUser($userId); 
      $this->productModel = new ProductModel();
      $product = $this->productModel->getProductById($productid);

      if($product){
        if($product['company_id'] == $user['company_id'])return ['user'=> $user,'product'=>$product,'productId'=>$productid,'userId'=>$userId];
        else $response['message'] = "You do not have the right priviledges to complete this request!";
      } $response['message']  =  "Invalid product!";
      $response['status']   = false;
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }
  }
?>