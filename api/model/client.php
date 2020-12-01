<?php
  /**
   * undocumented class
   */
  class ClientModel extends Model
  {
    /**
     * Registers a clients into the system
     *
     * @param String $userId UserId of the client
     * @param String $businessName business name  of the client
     * @return boolean, false if !insert OR @return String  userId
     **/
    public function addClient($userId,$businessName,$email,$telephone,$address,$countryId,$stateId,$lga)
    {
      // $id = uniqid();'id'=>$id,
      $insert =  $this->insert('clients',['user_id'=>$userId,'businessname'=>$businessName,'telephone'=>$telephone,'email'=>$email,'address'=>$address,'country_id'=>$countryId,'state_id'=>$stateId,'lga'=>$lga]);
      if ($insert['status']) return $userId;
      else return false;
    }
    

    /**
     * Retrives a single client entry
     *
     * @param Type $condition Condition to query by
     * @param String $bindString represenntation of values passed e.g name:String,id:integer = 'si'.
     * @return Array $bindValues $values values to be passed to the query
     **/
    public function getClient($condition = '',$bindString='',$bindValues=[])
    {
      $sql = 'SELECT clients.user_id,clients.businessname,clients.address,clients.telephone AS companytelephone,clients.email AS companyemail,clients.lga AS companylga,clients.address AS companyaddress,clients.country_id AS companycoutryid,clients.state_id AS companystateid,(SELECT name FROM countries WHERE country_id = clients.country_id) AS companycountry,(SELECT name FROM states WHERE states_id = clients.state_id) AS companystate, firstname,lastname,othername,users.email,users.telephone,username,users.imageurl FROM clients INNER JOIN users ON users.id = clients.user_id '.$condition;
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
    public function getClients($condition = '',$bindString = '',$bindValues = [])
    {
      $sql = 'SELECT clients.user_id,clients.businessname,clients.address,clients.telephone AS companytelephone,clients.email AS companyemail,clients.lga AS companylga,clients.address AS companyaddress,clients.country_id AS companycoutryid,clients.state_id AS companystateid, firstname,lastname,othername,users.email,users.telephone,username,users.imageurl FROM clients INNER JOIN users ON users.id = clients.user_id '.$condition;
      $query = $this->query($sql,$bindString,$bindValues); 
      if($query) return $this->rows;
      else return false;
    }

    /**
     * Fetches clients data by quering with its Id
     *
     * @param Int $clientsId ID of the clients to be retrieved
     * @return Array Database clients Obeject upon success @return boolean false on error
     **/
    public function getClientByUserId($clientUserId,$status = 1)
    {
      return $this->getClient('WHERE clients.user_id = ? AND clients.status = ? ','si',[$clientUserId,$status]);
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
    public function getCompanyClients($companyId,$status =1)
    {
      return $this->getClients('WHERE users.company_id = ? AND clients.status = ? ','si',[$companyId,$status]);
    }

    /**
     * Updates client business information
     *
     * @param Type $userId user Id of the client
     * @param Type $data array client data to be updated
     * @return bool
     **/
    public function updateClient($userId,$data = [])
    {
      return $this->update('clients',$data, ['user_id'=>$userId]);
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
    public function delete($userId)
    {
      return $this->update('clients',['status'=>0], ['user_id'=>$userId]);
    }
  }
?>