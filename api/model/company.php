<?php
  /**
   * Base Model Class for Company
   */
  class CompanyModel extends Model
  {
    /**
     * Registers a company into the system
     *
     * @param String $name Name of the company
     * @param String $address Address of the company
     * @param String $telephone Telephone number of the company
     * @param String $email Email addres of the company
     * @return Array [ status:boolean, message:String, data:[ insertId:Integer ] ]
     **/
    public function addCompany($name,$address,$telephone,$email,$apiKey,$packageId)
    {
      $id = uniqid();
      $insert =  $this->insert('company',['id'=>$id,'name'=>$name,'address'=>$address,'email'=>$email,'telephone'=>$telephone,'createdat'=>date("Y-m-d H:i:s"),'apikey'=>$apiKey,'apppackage_id'=>$packageId]);
      if ($insert['status']) return $id;
      else return false;
    }

    /**
     * Retrives a single company entry
     *
     * @param Type $condition Condition to query by
     * @param String $bindString represenntation of values passed e.g name:String,id:integer = 'si'.
     * @return Array $bindValues $values values to be passed to the query
     **/
    public function getCompany($condition = '',$bindString='',$bindValues=[])
    {
      $sql = 'SELECT * FROM company '.$condition;
      $query = $this->query($sql,$bindString,$bindValues); 
      if($query) return $this->row;
      else return false;
    }

    /**
     * Retrieves several comapny entries as an associative array
     *
     * @param Type $condition Condition to query by
     * @param String $bindString represenntation of values passed e.g name:String,id:integer = 'si'.
     * @return Array $bindValues $values values to be passed to the query
     **/
    public function getCompanies($condition = '',$bindString = '',$bindValues = [])
    {
      $sql = 'SELECT * FROM company '.$condition;
      $query = $this->query($sql,$bindString,$bindValues); 
      if($query) return $this->rows;
      else return false;
    }

    /**
     * Fetches company data by quering with its Id
     *
     * @param Int $companyId ID of the company to be retrieved
     * @return Array Database company Obeject upon success @return boolean false on error
     **/
    public function getCompanyById($companyId,$status = 1)
    {
      return $this->getCompany('WHERE id = ? AND status = ? ','si',[$companyId,$status]);
    }

    /**
     * Retrives company by APIKEY
     *
     * @param String $apiKey APIKEY of the company to be retrieved
     * @return Array Database company Obeject upon success @return boolean false on error
     **/
    public function getCompanyByApiKey($apiKey,$status = 1)
    {
      return $this->getCompany('WHERE apikey = ? AND status = ? ','si',[$apiKey,$status]);
    }

    /**
     * Fetches company data by quering with its email
     * 
     * @param Int $companyId ID of the company to be retrieved
     * @return Array Database company Obeject upon success @return boolean false on error
     **/
    public function getCompanyByEmail($email,$status = 1)
    {
      return $this->getCompany('WHERE id = ? AND status = ? ','si',[$email,$status]);
    }
  }
?>