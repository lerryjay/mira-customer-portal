<?php
  /**
   * undocumented class
   */
  class DeploymentModel extends Model
  {
    /**
     * Undocumented function long description
     *
     * @param Type $var Description
     * @return type
     **/
    public function add($userId,$productId,$modules,$cost,$remarks,$deploymentDate,$deploymentStatus,$trainingDate,$trainingStatus,$paymentDate,$paymentStatus,$licenseDuration,$expiryDate,$attachedFiles)
    {
      $id = uniqid();
      $insert =  $this->insert('deployments',['id'=>$id,'user_id'=>$userId,'product_id'=>$productId,'modules'=>$modules,'cost'=>$cost,'paymentdate'=>$paymentDate,'paymentstatus'=>$paymentStatus,'deploymentdate'=>$deploymentDate,'deploymentstatus'=>$deploymentStatus,'trainingdate'=>$trainingDate,'trainingstatus'=>$trainingStatus,'licenseduration'=>$licenseDuration,'expirydate'=>$expiryDate,'files'=>$attachedFiles,'remarks'=>$remarks]);
      if ($insert['status']) return $id;
      else return false;
    }


    /**
     * Updates client business information
     *
     * @param Type $userId user Id of the client
     * @param Type $data array client data to be updated
     * @return bool
     **/
    public function updateDeployment($deploymentId,$data = [])
    {
      return $this->update('deployments',$data, ['id'=>$deploymentId]);
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
    public function getDeployment($condition,$bindString,$bindValues)
    {
      $sql = 'SELECT *,(SELECT name FROM products WHERE id = product_id) AS name,(SELECT imageurl FROM products WHERE id = product_id) AS imageurl,(SELECT description FROM products WHERE id = product_id) AS description FROM deployments '.$condition;
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
    public function getDeployments($condition,$bindString,$bindValues)
    {
      
      $sql = 'SELECT *,(SELECT name FROM products WHERE id = product_id) AS name,(SELECT imageurl FROM products WHERE id = product_id) AS imageurl,(SELECT description FROM products WHERE id = product_id) AS description FROM deployments '.$condition;
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
    public function getDeploymentsByClient($clientsId,$status = 1)
    {
      return $this->getDeployments('WHERE user_id = ? AND status = ?','si',[$clientsId,$status]);
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
    public function getDeploymentsByClientProduct($clientId,$productId,$status = 1)
    {
      return $this->getDeployments('WHERE user_id = ? AND product_id AND status = ?','ssi',[$clientId,$productId,$status]);
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
    public function getDeploymentById($deploymentId,$status = 1)
    {
      return $this->getDeployment('WHERE id = ? AND status = ?','si',[$deploymentId,$status]);
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
    public function delete($deploymentId)
    {
      return $this->update('deployments',['status'=>0], ['id'=>$deploymentId]);
    }
  }
?>