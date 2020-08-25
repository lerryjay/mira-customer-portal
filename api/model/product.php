<?php
  /**
   * Products model
   */
  class ProductModel extends Model
  {
    public function addProduct($productName,$description,$companyId)
    {
      $id = uniqid();
      $insert =  $this->insert('products',['id'=>$id,'name'=>$productName,'description'=>$description,'company_id'=>$companyId,'createdat'=>date("Y-m-d H:i:s")]);
      if($insert['status']) return $id;
      return false;
    }

    public function addProductModule($productId,$moduleName,$description)
    {
      return $this->insert('productmodules',['name'=>$moduleName,'description'=>$description,'product_id'=>$productId,'createdat'=>date("Y-m-d H:i:s")]);
    }


    public function getProduct($condition = '',$string = '',$values = [])
    {
      $sql = 'SELECT * FROM products '.$condition;
      $query = $this->query($sql,$string,$values); 
      if($query) return $this->row;
      else return false;
    }

    public function getProducts($condition = '',$string = '',$values = [])
    {
      $sql = 'SELECT * FROM products '.$condition;
      $query = $this->query($sql,$string,$values); 
      if($query) return $this->rows;
      else return false;
    }

    /**
    * Retrieves a company products
    *
    * @param Integer $companyId Id of company whose products are to retrieved
    * @param Integer $status
    * @return bool false if query fails or @return object if query passes
    **/
    public function getCompanyProducts($companyId,$status = 1)
    {
      return $this->getProducts('WHERE company_id = ? AND status = ?','si',[$companyId,$status]);
    }

    /**
    * Retrieves product using it Id
    *
    * @param Integer $productId  Id of product to be retrieved
    * @param Integer $status
    * @return bool false if query fails or @return object if query passes
    **/
    public function getProductById($productId,$status = 1)
    {
      return $this->getProduct('WHERE product_id = ? AND status = ?','si',[$productId,$status]);
    }

    /**
     * Retrieves all modules
     *
     * @param QueryConditionString $condtion - Condition  for retrieving modules
     * @param BindStrings $string  bind string for all parameters passed e.g 'ssii' for string,string,int,int
     * @param BindValues $values
     * @return bool false if query fails or @return object if query passes
     **/
    public function getModules($condition = '',$string = '',$values = [])
    {
      $sql = 'SELECT * FROM productmodules '.$condition;
      $query = $this->query($sql,$string,$values); 
      if($query) return $this->rows;
      else return false;
    }


    /**
     * Retrieves a single module
     *
     * @param QueryConditionString $condtion - Condition  for retrieving modules
     * @param BindStrings $string  bind string for all parameters passed e.g 'ssii' for string,string,int,int
     * @param BindValues $values
     * @return bool false if query fails or @return object if query passes
     **/
    public function getModule($condition = '',$string = '',$values = [])
    {
      $sql = 'SELECT * FROM productmodules '.$condition;
      $query = $this->query($sql,$string,$values); 
      if($query) return $this->rows;
      else return false;
    }

    /**
     * Retrieves product modules
     *
     * @param Int $productId 
     * @param Int $status  1 = not deleted, 0 = deleted
     * @return bool false if query fails or @return object if query passes
     **/
    public function getModulesByProductId($productId,$status = 1)
    {
      return $this->getModules('WHERE product_id = ? AND status = ? ','ii', [$productId,$status]);
    }

    /**
     * Retrieves all the data about a module
     *
     * @param Int $moduleId Id of module to be retrieved
     * @return bool false if query fails or @return object if query passes
     **/
    public function getModuleInfo($moduleId,$status = 1)
    {
      return $this->getProductModules('WHERE id = ? AND status = ? ','ii', [$moduleId,$status]); 
    }

    public function updateProduct($productId,$productName,$description)
    {
      return $this->update('products', ['name'=>$productName,'description'=>$description ], ['id'=>$productId]);
    }

    public function updateProductModule($moduleId,$productId, $moduleName,$description)
    {
      return $this->update('productmodules', ['name'=>$moduleName,'description'=>$description,'product_id'=>$productId ], ['id'=>$moduleId]);
    }

    public function deleteProduct($productId)
    {
      return $this->update('products', ['status'=> 0 ], ['id'=>$productId]);
    }

    public function deleteProductModule($moduleId)
    {
      return $this->update('productmodules', ['status'=> 0 ], ['id'=>$moduleId]);
    }
  }
?>