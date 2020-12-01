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
    public function add($companyId,$transactionId,$deploymentId,$servicecode,$statuscode,$count,$ip)
    {
      $id = rand(10000,99999999);
      $insert =  $this->insert('apilogs',['transaction_id'=>$transactionId,'id'=>$id,'company_id'=>$companyId,'deployment_id'=>$deploymentId,'statuscode'=>$statuscode,'servicecode'=>$servicecode,'count'=>$count,'ip'=>$ip ]);
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
      $conditions;//  = ltrim($conditions,'AND');
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
      $innerConditions =  strlen($condition) > 0 ? ' AND '. ltrim($condition, 'WHERE') : "";
      $sql = 'SELECT COUNT(*) AS total,(SELECT COUNT(*) FROM apilogs  INNER JOIN deployments d ON d.id = apilogs.deployment_id WHERE statuscode = "0" OR statuscode = "00" '.$innerConditions.') AS success,(SELECT COUNT(*) FROM apilogs  INNER JOIN deployments d ON d.id = apilogs.deployment_id WHERE statuscode = "11"  '.$innerConditions.') AS error, (SELECT COUNT(*) FROM apilogs   INNER JOIN deployments d ON d.id = apilogs.deployment_id WHERE statuscode = "22"  '.$innerConditions.') AS cancelled FROM apilogs a INNER JOIN deployments d ON d.id = a.deployment_id '.$condition;
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
    public function searchStatistics($filter){
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
      $conditions  = ltrim($conditions,'AND');
      $conditions = strlen($conditions) > 1 ? 'WHERE '.$conditions : '';
      return $this->getStatistics($conditions,[]);
    }

  public function aggregateReport($filter,$status = 1)
  {
    $conditions   = '';
    $conditions .= isset($filter['transactionId']) && $filter['transactionId'] != NULL ? " AND  w.transaction_id = '".$filter['transactionId']."'" : "";
    $conditions .= isset($filter['debit']) && $filter['debit'] != NULL  ? " AND  w.debit = '".$filter['debit']."'" : "";
    $conditions .= isset($filter['credit']) && $filter['credit'] != NULL  ? " AND  w.credit = '".$filter['credit']."'" : "";
    $conditions .= isset($filter['companyId']) && $filter['companyId'] != NULL  ? " AND  a.company_id = '".$filter['companyId']."'" : "";
    $conditions .= isset($filter['deploymentId']) && $filter['deploymentId'] != NULL  ? " AND  a.deployment_id = '".$filter['deploymentId']."'" : "";
    $conditions .= isset($filter['servicecode'])  && $filter['servicecode'] != NULL ? " AND  servicecode = '".$filter['servicecode']."'" : "";

    $conditions .= isset($filter['on'])  && $filter['on'] != NULL ? " AND  w.tdate = '".$filter['on']."'" : "";
    $conditions .= isset($filter['startDate'])  && $filter['startDate'] != NULL ? " AND  w.tdate >= '".$filter['startDate']."'" : "";
    $conditions .= isset($filter['endDate']) && $filter['endDate'] != NULL  ? " AND w.tdate <= '".$filter['endDate']."'" : "";

    $conditions .= isset($filter['groupby']) && strlen($filter['groupby']) > 0  ? " GROUP BY ".$filter['groupby'] : "";
    $conditions .= isset($filter['orderby']) && strlen($filter['orderby']) > 0 ? " ORDER BY ".$filter['orderby'] : " ORDER BY w.tdate";
    $conditions .= isset($filter['order']) ? " ".$filter['order'] : " DESC";
    $conditions   = 'WHERE a.status = ? '.$conditions;

    $sql  = "SELECT w.tdate,(SELECT title FROM services WHERE code = a.servicecode) AS description,SUM(credit) AS creditsum,SUM(debit) AS debitsum,SUM(count) AS countsum FROM apilogs a INNER JOIN wallet w ON w.transaction_id = a.transaction_id $conditions ";

    $query = $this->query($sql,'i',[$status]); 
    if($query) return $this->rows;
    else return false;
  }
  public function logReport($filter,$status = 1)
  {
    $conditions   = '';
    $conditions .= isset($filter['transactionId']) && $filter['transactionId'] != NULL ? " AND  w.transaction_id = '".$filter['transactionId']."'" : "";
    $conditions .= isset($filter['debit']) && $filter['debit'] != NULL  ? " AND  w.debit = '".$filter['debit']."'" : "";
    $conditions .= isset($filter['credit']) && $filter['credit'] != NULL  ? " AND  w.credit = '".$filter['credit']."'" : "";
    $conditions .= isset($filter['companyId']) && $filter['companyId'] != NULL  ? " AND  a.company_id = '".$filter['companyId']."'" : "";
    $conditions .= isset($filter['deploymentId']) && $filter['deploymentId'] != NULL  ? " AND  a.deployment_id = '".$filter['deploymentId']."'" : "";
    $conditions .= isset($filter['servicecode'])  && $filter['servicecode'] != NULL ? " AND  servicecode = '".$filter['servicecode']."'" : "";

    $conditions .= isset($filter['on'])  && $filter['on'] != NULL ? " AND  w.tdate = '".$filter['on']."'" : "";
    $conditions .= isset($filter['startDate'])  && $filter['startDate'] != NULL ? " AND  w.tdate >= '".$filter['startDate']."'" : "";
    $conditions .= isset($filter['endDate']) && $filter['endDate'] != NULL  ? " AND w.tdate <= '".$filter['endDate']."'" : "";

    $conditions .= isset($filter['groupby']) && strlen($filter['groupby']) > 0  ? " GROUP BY ".$filter['groupby'] : "";
    $conditions .= isset($filter['orderby']) && strlen($filter['orderby']) > 0 ? " ORDER BY ".$filter['orderby'] : " ORDER BY w.tdate";
    $conditions .= isset($filter['order']) ? " ".$filter['order'] : " DESC";
    $conditions   = 'WHERE a.status = ? '.$conditions;

    $sql  = "SELECT tdate,tlog,w.description, (SELECT title FROM services WHERE code = a.servicecode) AS service,credit ,debit ,count FROM apilogs a INNER JOIN wallet w ON w.transaction_id = a.transaction_id $conditions ";

    $query = $this->query($sql,'i',[$status]); 
    if($query) return $this->rows;
    else return false;
  }
}
?>