<?php
  /**
   * undocumented class
   */
  class Client extends Model
  {
    /**
     * Registers a clients into the system
     *
     * @param String $name Name of the clients
     * @param String $address Address of the clients
     * @param String $telephone Telephone number of the clients
     * @param String $email Email addres of the clients
     * @return Array [ status:boolean, message:String, data:[ insertId:Integer ] ]
     **/
    public function addClient($userId,$businessName)
    {
      $id = uniqid();
      $insert =  $this->insert('clients',['id'=>$id,'user_id'=>$userId,'businessname'=>$businessName]);
      if ($insert['status']) return $id;
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
      $sql = 'SELECT * FROM clients '.$condition;
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
      $sql = 'SELECT * FROM clients '.$condition;
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
    public function getClientById($clientsId,$status = 1)
    {
      return $this->getClient('WHERE id = ? AND status = ? ','si',[$clientsId,$status]);
    }
  }
?>