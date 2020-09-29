<?php
  /**
   * undocumented class
   */
  class Apilog extends Model 
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
    public function addLog($companyId,$userId,$type,$count,$ip)
    {
      $id = rand(10000,99999999);
      $insert =  $this->insert('apiusage',['id'=>$id,'company_id'=>$companyId,'user_id'=>$userId,'type'=>$type,'count'=>$count,'ip'=>$ip ]);
      if($insert) return $id;
      else false;
    }
   
    public function getLogs($condition = '',$string = '',$values = [])
    {
      $sql = 'SELECT *, (SELECT businessname FROM clients WHERE user_id = user_id) AS businssname, (SELECT firstname FROM users WHERE id = user_id) AS clientname,  (SELECT email FROM users WHERE id = user_id) AS email FROM apiusage '.$condition;
      $query = $this->query($sql,$string,$values); 
      if($query) return $this->rows;
      else return false;
    }

    public function getLog($condition = '',$string = '',$values = [])
    {
      $sql = 'SELECT *, (SELECT businessname FROM clients WHERE user_id = user_id) AS businssname, (SELECT firstname FROM users WHERE id = user_id) AS clientname,  (SELECT email FROM users WHERE id = user_id) AS email FROM apiusage '.$condition;
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
    public function getAllLogs($filters,$status = 1 )
    {
      $conditions  = '';
      $conditions .= isset($filter['type']) && $filter['type'] != NULL  ? "AND type = '".$filter['type']."'" : "";
      $conditions .= isset($filter['userId']) && $filter['userId'] != NULL  ? "AND user_id = '".$filter['userId']."'" : "";
      
      $conditions .= isset($filter['companyId']) && $filter['companyId'] != NULL  ? "AND company_id = '".$filter['companyId']."'" : "";
      $conditions .= isset($filter['on'])  && $filter['on'] != NULL ? "AND tdate = '".$filter['on']."'" : "";
      $conditions .= isset($filter['startDate'])  && $filter['startDate'] != NULL ? "AND tdate >= '".$filter['startDate']."'" : "";
      $conditions .= isset($filter['endDate']) && $filter['endDate'] != NULL  ? "AND tdate <= '".$filter['endDate']."'" : "";

      $conditions .= isset($filter['order_by']) ? " ORDER BY ".$filter['order_by'] : " ORDER BY tdate";
      $conditions .= isset($filter['order']) ? " ".$filter['order'] : " DESC";

      $limit       = (int) isset($filter['limit']) ? $filter['limit'] : 20;
      $pageno      = (string) isset($filter['pageno']) ? $filter['pageno'] : 1;
      $conditions .= ' LIMIT '.(string) $limit;
      $conditions .= ' OFFSET '.(string) (($pageno - 1 ) * $limit);
      $conditions  = ltrim($conditions,'AND');
      return $this->getLogs('WHERE status = ? '.$conditions,'i',[$status]);
    }
  }
?>