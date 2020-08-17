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
    public function index(Type $var = null)
    {
      # code...
    }

    /**
     * Retrieves product packages
     *
     * @param HTTPPOSTPARAMS $_POST - productid,$userid
     * @return JSONRESPONSE 
     **/
    public function packages()
    {
      $response = [
        'status'=>false,
        'message'=>'An unexpected error occured'
      ];
      
      $data = $this->validateduserproductpermission();
      extract($data);

      $packages = $this->productModel->getPackagesByProductId($product['id']);
      
      $response['status']   = true;
      $response['message']  = 'Products packages retrived successfulty';
      $response['data']     = $packages;

      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }

    public function validateduserproductpermission()
    {
      extract($_POST);
      $user = User::validateUser($userid); 
      $product = $this->productModel->getProductById($productid);
      if($product ){
        if($product['company_id'] == $user['company_id'])return ['user'=> $user,'product'=>$product];
        else $response['message'] = "You do not have the right priviledges to complete this request!";
      } $response['message']  =  "Invalid product!";
      $response['status']   = false;
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }
  }
  
?>