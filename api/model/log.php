<?php
  /**
   * undocumented class
   */
  class LogModel extends Model 
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
    public function add($companyId,$deploymentId,$servicecode,$statuscode,$count,$ip)
    {
      $id = rand(10000,99999999);
      $insert =  $this->insert('apilogs',['id'=>$id,'company_id'=>$companyId,'deployment_id'=>$deploymentId,'statuscode'=>$statuscode,'servicecode'=>$servicecode,'count'=>$count,'ip'=>$ip ]);
      if($insert) return $id;
      else false;
    }
   
    public function getLogs($condition = '',$string = '',$values = [])
    {
      $sql = 'SELECT *, (SELECT name from products WHERE id = d.product_id ) AS productname, (SELECT businessname FROM clients WHERE user_id = d.user_id) AS businessname, (SELECT firstname FROM users WHERE id = d.user_id) AS clientname,  (SELECT email FROM users WHERE id = d.user_id) AS email FROM apilogs a INNER JOIN deployments d ON d.id = a.deployment_id '.$condition;
      $query = $this->query($sql,$string,$values); 
      if($query) return $this->rows;
      else return false;
    }

    public function getLog($condition = '',$string = '',$values = [])
    {
      $sql = 'SELECT *, (SELECT name from products WHERE id = d.product_id ) AS productname, (SELECT businessname FROM clients WHERE user_id = d.user_id) AS businessname, (SELECT firstname FROM users WHERE id = d.user_id) AS clientname,  (SELECT email FROM users WHERE id = d.user_id) AS email FROM apilogs a INNER JOIN deployments d ON d.id = a.deployment_id '.$condition;
      $query = $this->query($sql,$string,$values); 
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
    public function getAllLogs($filter,$status = 1 )
    {
      $conditions  = '';
      $conditions .= isset($filter['type']) && $filter['type'] != NULL  ? "AND type = '".$filter['type']."'" : "";
      $conditions .= isset($filter['userId']) && $filter['userId'] != NULL  ? "AND d.user_id = '".$filter['userId']."'" : "";
      
      $conditions .= isset($filter['deploymentId']) && $filter['deploymentId'] != NULL  ? "AND deployment_id = '".$filter['deploymentId']."'" : "";
      $conditions .= isset($filter['servicecode']) && $filter['servicecode'] != NULL  ? "AND servicecode = '".$filter['servicecode']."'" : "";
      $conditions .= isset($filter['statuscode']) && $filter['statuscode'] != NULL  ? "AND statuscode = '".$filter['statuscode']."'" : "";

      $conditions .= isset($filter['on'])  && $filter['on'] != NULL ? "AND created_at LIKE '%".$filter['on']."%'" : "";
      $conditions .= isset($filter['startDate'])  && $filter['startDate'] != NULL ? "AND created_at >= '".$filter['startDate']."'" : "";
      $conditions .= isset($filter['endDate']) && $filter['endDate'] != NULL  ? "AND created_at <= '".$filter['endDate']."'" : "";

      $conditions .= isset($filter['order_by']) ? " ORDER BY ".$filter['order_by'] : " ORDER BY created_at";
      $conditions .= isset($filter['order']) ? " ".$filter['order'] : " DESC";

      $limit       = (int) isset($filter['limit']) ? $filter['limit'] : 20;
      $pageno      = (string) isset($filter['pageno']) ? $filter['pageno'] : 1;
      $conditions .= ' LIMIT '.(string) $limit;
      $conditions .= ' OFFSET '.(string) (($pageno - 1 ) * $limit);
      echo $conditions;//  = ltrim($conditions,'AND');
      return $this->getLogs('WHERE a.status = ? '.$conditions,'i',[$status]);
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
    private function getStatistics($condition = '',$string = '',$values = [])
    {
      $sql = 'SELECT COUNT(*) AS total FROM apilogs a '.$condition;
      $query = $this->query($sql,$string,$values); 
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
    public function searchStatistics($filter,$status = 1){
      $conditions  = '';
      $conditions .= isset($filter['type']) && $filter['type'] != NULL  ? "AND type = '".$filter['type']."'" : "";
      $conditions .= isset($filter['userId']) && $filter['userId'] != NULL  ? "AND d.user_id = '".$filter['userId']."'" : "";
      
      $conditions .= isset($filter['deploymentId']) && $filter['deploymentId'] != NULL  ? "AND deployment_id = '".$filter['deploymentId']."'" : "";
      $conditions .= isset($filter['deploymentId']) && $filter['deploymentId'] != NULL  ? "AND deployment_id = '".$filter['deploymentId']."'" : "";
      $conditions .= isset($filter['servicecode']) && $filter['servicecode'] != NULL  ? "AND servicecode = '".$filter['servicecode']."'" : "";
      $conditions .= isset($filter['statuscode']) && $filter['statuscode'] != NULL  ? "AND statuscode = '".$filter['statuscode']."'" : "";

      $conditions .= isset($filter['on'])  && $filter['on'] != NULL ? "AND created_at LIKE '%".$filter['on']."%'" : "";
      $conditions .= isset($filter['startDate'])  && $filter['startDate'] != NULL ? "AND created_at >= '".$filter['startDate']."'" : "";
      $conditions .= isset($filter['endDate']) && $filter['endDate'] != NULL  ? "AND created_at <= '".$filter['endDate']."'" : "";
      return $this->getStatistics('WHERE status = ? '.$conditions,'i',[$status]);
    }
  }
?>