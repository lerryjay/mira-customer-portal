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
  public function addTransaction($companyId,$userId,$credit,$debit,$description,$tlog)
  {
    $id = rand(10000,99999999);
    $insert =  $this->insert('wallet',['company_id'=>$companyId,'user_id'=>$userId,'credit'=>$credit,'debit'=>$debit,'description'=>$description,'tlog'=>$tlog]);
    if($insert) return $id;
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
    $sql = 'SELECT *, (SELECT businessname FROM clients WHERE user_id = user_id) AS businssname, (SELECT firstname FROM users WHERE id = user_id) AS clientname,  (SELECT email FROM users WHERE id = user_id) AS email FROM wallet '.$condition;
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
  public function searchTransactions($filters,$status = 1)
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
      $conditions  = ltrim($conditions,'AND');
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
  public function getUserWalletBalance($userId)
  {
    $sql = 'SELECT SUM(credit - debit ) AS balance FROM waller WHERE user_id =  ?';
    $query = $this->query($sql,'s',[$userId]); 
    if($query) return $this->row['balance'];
    else return false;
  }
}
?>