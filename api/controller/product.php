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
      // extract($_GET);
      // $userId = isset($userid) ? $userid : '';
      // $user   = User::validateUser($userId); 

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
     * Undocumented function long description
     *
     * @param Type $var Description
     * @return type
     * @throws conditon
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
      $this->productModel = new ProductModel();
      $add = $this->productModel->addProduct($name,$description,$user['company_id']);
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
      $response['data']     = $modules;

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

      $add  = $this->productModel->addProductModule($product['id'],$moduleName,$description);
      if($add['status']){
        $response = [
          'status'=>true,
          'message'=>'Module saved successfully'
        ];
      }

      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }

    public function validateduserproductpermission()
    {
      extract($_GET);
      loadController('user');
      loadModel('product');
      $userid ??= '';
      $user = User::validateUser($userid); 
      $this->productModel = new ProductModel();
      $product = $this->productModel->getProductById($productid);

      if($product ){
        if($product['company_id'] == $user['company_id'])return ['user'=> $user,'product'=>$product];
        else $response['message'] = "You do not have the right priviledges to complete this request!";
      } $response['message']  =  "Invalid product!";
      $response['status']   = false;
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }

    /**
     * Vslidation for a new product
     *
     * @param HTTPPOST userid,name-productname,description
     * @return PRODUCTOBJECT if valid else @return HTTPEXITRESPONSE 
     **/
    public function validateAddProduct()
    {
      loadController('user');
      extract($_POST);
      $userId = isset($userid) ? $userid : '';
      $user   = User::validateUser($userId,true);
      $name      = $name ?? '';
      $nameError =   Validate::string($name,false,false,4); 
      if($nameError){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid product name', 'data'=>['field'=>'name']]));
      } 

      $description       = $description ?? '';
      $descriptionError  = Validate::string($description,false,false,4); 
      if($descriptionError){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid product description', 'data'=>['field'=>'description']]));
      } 
      return ['name'=>$name,'description'=>$description,'user'=>$user];
    }

    /**
     * Vslidation for a new module
     *
     * @param HTTPPOST userid,name-productname,description
     * @return PRODUCTOBJECT if valid else @return HTTPEXITRESPONSE 
     **/
    public function validateAddModule()
    {
      loadModel('product');
      loadController('user');
      extract($_POST);
      $userId    = isset($userid) ? $userid : '';
      $productId = isset($productid) ? $productid : '';
      $user      = User::validateUser($userId,true);

      $product = $this->productModel->getProductById($productId);

      if(!$product){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Product not found', 'data'=>['field'=>'productid']]));
      }elseif($product['company_id'] !== $user['company_id']){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Product not found', 'data'=>['field'=>'productid']]));
      }

      $name      = $name ?? '';
      $nameError =   Validate::string($name,false,false,4); 
      if($nameError){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid module name', 'data'=>['field'=>'name']]));
      } 

      $description       = $description ?? '';
      $descriptionError  = Validate::string($description,false,false,4); 
      if($descriptionError){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid module description', 'data'=>['field'=>'description']]));
      } 
      return ['name'=>$name,'description'=>$description,'user'=>$user, 'product'=>$product];
    }
  }
  
?>