<?php
  /**
   * Products model
   */
  class Products extends Model
  {
    public function addProduct($productName,$desription,$companyId)
    {
      return $this->insert('products',['name'=>$productName,'desription'=>$desription,'company_id'=>$companyId,'createdat'=>date("Y-m-d H:i:s")]);
    }

    public function addProductPackage($productId,$packageName,$description)
    {
      return $this->insert('productpackage',['name'=>$packageName,'desription'=>$desription,'product_id'=>$productId,'createdat'=>date("Y-m-d H:i:s")]);
    }


    public function getProduct($condition = '',$string = '',$values = [])
    {
      $sql = 'SELECT * FROM products '+$condition;
      $query = $this->query($sql,$string,$values); 
      if($query) return $this->row;
      else return false;
    }

    public function getProducts($condition = '',$string = '',$values = [])
    {
      $sql = 'SELECT * FROM products '+$condition;
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
     * Retrieves all packages
     *
     * @param QueryConditionString $condtion - Condition  for retrieving packages
     * @param BindStrings $string  bind string for all parameters passed e.g 'ssii' for string,string,int,int
     * @param BindValues $values
     * @return bool false if query fails or @return object if query passes
     **/
    public function gePackages($condition = '',$string = '',$values = [])
    {
      $sql = 'SELECT * FROM productpackage '+$condition;
      $query = $this->query($sql,$string,$values); 
      if($query) return $this->rows;
      else return false;
    }


    /**
     * Retrieves a single package
     *
     * @param QueryConditionString $condtion - Condition  for retrieving packages
     * @param BindStrings $string  bind string for all parameters passed e.g 'ssii' for string,string,int,int
     * @param BindValues $values
     * @return bool false if query fails or @return object if query passes
     **/
    public function getPackage($condition = '',$string = '',$values = [])
    {
      $sql = 'SELECT * FROM productpackage '+$condition;
      $query = $this->query($sql,$string,$values); 
      if($query) return $this->rows;
      else return false;
    }

    /**
     * Retrieves product packages
     *
     * @param Int $productId 
     * @param Int $status  1 = not deleted, 0 = deleted
     * @return bool false if query fails or @return object if query passes
     **/
    public function getPackagesByProductId($productId,$status = 1)
    {
      return $this->getPackages('WHERE product_id = ? AND status = ? ','ii', [$productId,$status]);
    }

    /**
     * Retrieves all the data about a package
     *
     * @param Int $packageId Id of package to be retrieved
     * @return bool false if query fails or @return object if query passes
     **/
    public function getPackageInfo($packageId,$status = 1)
    {
      return $this->getProductPackages('WHERE id = ? AND status = ? ','ii', [$packageId,$status]); 
    }

    public function updateProduct($productId,$productName,$desription)
    {
      return $this->update('products', ['name'=>$productName,'description'=>$description ], ['id'=>$productId]);
    }

    public function updateProductPackage($packageId,$productId, $packageName,$description)
    {
      return $this->update('productpackage', ['name'=>$packageName,'description'=>$description,'product_id'=>$productId ], ['id'=>$packageId]);
    }

    public function deleteProduct($productId)
    {
      return $this->update('products', ['status'=> 0 ], ['id'=>$productId]);
    }

    public function deleteProductPackage($packageId)
    {
      return $this->update('productpackage', ['status'=> 0 ], ['id'=>$packageId]);
    }
  }
?>