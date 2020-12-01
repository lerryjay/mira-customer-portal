<?php
/**
 * undocumented class
 */
class WalletModel extends Model
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
  public function addTransaction($companyId,$userId,$credit,$debit,$description,$tlog,$tdate)
  {
    $insert =  $this->insert('wallet',['company_id'=>$companyId,'user_id'=>$userId,'credit'=>$credit,'debit'=>$debit,'description'=>$description,'tlog'=>$tlog,'tdate'=>$tdate]);
    if($insert) return $insert['data']['insertId'];
    else false;
  }

 /**
   * Retrieve tickets .
   *
   * @param String $condition  - Query ticket condition
   * @param String $string String represenntation of values passed e.g name:String,id:integer = 'si'.
   * @param Array $values values to be passed to the query
   * @return Array [ status : boolean,message:string, data ?: Array['insertId':integer ] ]
   **/
  public function getTransactions($condition = '',$string = '',$values = [])
  {
    $sql = 'SELECT *, (SELECT businessname FROM clients WHERE user_id = wallet.user_id) AS businessname, (SELECT firstname FROM users WHERE id = wallet.user_id) AS clientname,  (SELECT email FROM users WHERE id = wallet.user_id) AS email FROM wallet '.$condition;
    
    $query = $this->query($sql,$string,$values); 
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
  public function searchTransactions($filter,$status = 1)
  {
      $conditions  = '';
      $conditions .= isset($filter['transactionId']) && $filter['transactionId'] != NULL ? "AND transaction_id = '".$filter['transactionId']."'" : "";
      $conditions .= isset($filter['debit']) && $filter['debit'] != NULL  ? "AND debit = '".$filter['debit']."'" : "";
      $conditions .= isset($filter['credit']) && $filter['credit'] != NULL  ? "AND credit = '".$filter['credit']."'" : "";
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

      return $this->getTransactions('WHERE status = ? '.$conditions,'i',[$status]);
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
  public function transactionReport($filter,$status = 1)
  {
      $conditions   = '';
      $subcondition = '';
      $conditions .= isset($filter['transactionId']) && $filter['transactionId'] != NULL ? "AND  w.transaction_id = '".$filter['transactionId']."'" : "";
      $conditions .= isset($filter['debit']) && $filter['debit'] != NULL  ? "AND  w.debit = '".$filter['debit']."'" : "";
      $conditions .= isset($filter['credit']) && $filter['credit'] != NULL  ? "AND  w.credit = '".$filter['credit']."'" : "";
      $conditions .= isset($filter['companyId']) && $filter['companyId'] != NULL  ? "AND  w.company_id = '".$filter['companyId']."'" : "";
      $conditions .= isset($filter['deploymentId']) && $filter['deploymentId'] != NULL  ? "AND  w.deployment_id = '".$filter['deploymentId']."'" : "";
     
      $conditions .= isset($filter['on'])  && $filter['on'] != NULL ? "AND  w.tdate = '".$filter['on']."'" : "";
      $conditions .= isset($filter['startDate'])  && $filter['startDate'] != NULL ? "AND  w.tdate >= '".$filter['startDate']."'" : "";
      $conditions .= isset($filter['endDate']) && $filter['endDate'] != NULL  ? "AND w.tdate <= '".$filter['endDate']."'" : "";
      
      $subcondition .= isset($filter['transactionId']) && $filter['transactionId'] != NULL ? " AND  transaction_id = '".$filter['transactionId']."'" : "";
      $subcondition .= isset($filter['debit']) && $filter['debit'] != NULL  ? "AND  debit = '".$filter['debit']."'" : "";
      $subcondition .= isset($filter['credit']) && $filter['credit'] != NULL  ? "AND  credit = '".$filter['credit']."'" : "";
      $subcondition .= isset($filter['companyId']) && $filter['companyId'] != NULL  ? "AND  company_id = '".$filter['companyId']."'" : "";
      $subcondition .= isset($filter['deploymentId']) && $filter['deploymentId'] != NULL  ? "AND  deployment_id = '".$filter['deploymentId']."'" : "";
     
      $subcondition .= isset($filter['on'])  && $filter['on'] != NULL ? "AND  w.tdate = '".$filter['on']."'" : "";
      $subcondition .= isset($filter['startDate'])  && $filter['startDate'] != NULL ? "AND  tdate >= '".$filter['startDate']."'" : "";
      $subcondition .= isset($filter['endDate']) && $filter['endDate'] != NULL  ? "AND tdate <= '".$filter['endDate']."'" : "";

      $conditions .= isset($filter['order_by']) ? " ORDER BY ".$filter['orderby'] : " ORDER BY w.tdate";
      $conditions .= isset($filter['order']) ? " ".$filter['order'] : " DESC";

      $conditions   = 'WHERE status = ? '.$conditions;
      $subcondition = 'WHERE status = ? AND description = w.description AND tdate = w.tdate '.$subcondition;

      $sql = "SELECT DISTINCT description,(SELECT SUM(debit) FROM wallet $subcondition ) AS debitsum, (SELECT SUM(credit) FROM wallet $subcondition ) AS creditsum,(SELECT  SUM(count) FROM apilogs WHERE transaction_id =  $subcondition AND debit != 0  ) AS count, (SELECT COUNT(credit) FROM wallet $subcondition  AND credit != 0 ) AS creditcount,w.tdate AS tdate, IFNULL((SELECT title FROM services WHERE code = description),description) AS description  FROM wallet w $conditions";
      $query = $this->query($sql,'iiiii',[$status,$status,$status,$status,$status]); 
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
  public function getUserWalletBalance($userId,$status = 1)
  {
    $sql = 'SELECT SUM(credit - debit ) AS balance FROM wallet WHERE user_id =  ? AND status = ? ';
    $query = $this->query($sql,'si',[$userId,$status]); 
    if($query) return $this->row['balance'];
    else return false;
  }
}
?>