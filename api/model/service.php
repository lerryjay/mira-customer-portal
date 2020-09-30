<?php
  /**
   * undocumented class
   */
  class ServiceModel extends Model
  {
    /**
     * undocumented function summary
     *
     * Undocumented function long description
     *
     * @param Type $var Description
     * @return type
     * @throws conditon
     **/
    public function add($title,$code,$cost)
    {
      $id     =  uniqid();
      $insert =  $this->insert('services',['id'=>$id,'title'=>$title,'code'=>$code,'cost'=>$cost]);
      if ($insert['status']) return $id;
      else return false;
    }

    public function updateService($serviceId,$data)
    {
      return $this->update('services',$data,['id'=>$serviceId]);
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
    public function getService($condition,$bindString,$bindValues)
    {
      $sql = 'SELECT * FROM services '.$condition;
      $query = $this->query($sql,$bindString,$bindValues); 
      if($query) return $this->row;
      else return false;
    }

    public function getServices($condition,$bindString,$bindValues)
    {
      $sql = 'SELECT * FROM services '.$condition;
      $query = $this->query($sql,$bindString,$bindValues); 
      if($query) return $this->rows;
      else return false;
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
    public function getAllServices($status = 1)
    {
      return $this->getServices('WHERE status = ?','i',[$status]);
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
    public function getServiceById($serviceId,$status = 1)
    {
      return $this->getService('WHERE service_id = ? AND status = ?','si',[$code,$status]);
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
    public function getServiceByCode($code,$status = 1)
    {
      return  $this->getService('WHERE code = ? AND status = ?','si',[$code,$status]);

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
    public function getServiceCode($condition,$bindString,$bindValues)
    {
      $sql = 'SELECT code FROM services '.$condition;
      $query = $this->query($sql,$bindString,$bindValues); 
      if($query) return $this->row;
      else return false;
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
    public function getServiceCodes($condition,$bindString,$bindValues)
    {
      $sql = 'SELECT code FROM services '.$condition;
      $query = $this->query($sql,$bindString,$bindValues); 
      if($query) return $this->rows;
      else return false;
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
    public function getAllServiceCodes($status = 1)
    {
      $results = $this->getServiceCodes('WHERE status = ? ','i',[$status]);
      $codes = [];
      foreach($results as $code => $value ){
        array_push($codes,$value['code']);
      }
      return $codes;
    }
  }
?>