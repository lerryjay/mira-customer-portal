<?php
/**
 * undocumented class
 */
class WeblogModel extends Model
{
      /**
     * Registers a clients into the system
     *
     * @param String $userId UserId of the client
     * @param String $businessName business name  of the client
     * @return boolean, false if !insert OR @return String  userId
     **/
    public function addLog($ip,$device,$browser,$url,$page,$location,$carrier,$sessionId)
    {
      $id = uniqid();
      $insert =  $this->insert('weblog',['id'=>$id,'ip'=>$ip,'device'=>$device,'browser'=>$browser,'url'=>$url,'page'=>$page,'location'=>$location,'carrier'=>$carrier,'sessionid'=>$sessionId]);
      if ($insert['status']) return $id;
    }

 /**
   * Retrives a single company entry
   *
   * @param Type $condition Condition to query by
   * @param String $bindString represenntation of values passed e.g name:String,id:integer = 'si'.
   * @return Array $bindValues $values values to be passed to the query
   **/
  public function getLog($condition = '',$bindString='',$bindValues=[])
  {
    $sql = 'SELECT * FROM weblog '.$condition;
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
  public function getlogs($condition = '',$bindString = '',$bindValues = [])
  {
    $sql = 'SELECT * FROM weblog '.$condition;
    $query = $this->query($sql,$bindString,$bindValues); 
    if($query) return $this->rows;
    else return false;
  }


  /**
   * Undocumented function long description
   *
   * @param Type $var Description
   * @return type
   * @throws conditon
   **/
  public function filterLogs($filter = [])
  {
    $conditions  = '';
    $conditions .= isset($filter['url']) && $filter['url'] != NULL  ? "AND url = '".$filter['url']."'" : "";
    $conditions .= isset($filter['page']) && $filter['page'] != NULL  ? "AND page = '".$filter['page']."'" : "";
    $conditions .= isset($filter['sessionid']) && $filter['sessionid'] != NULL  ? "AND sessionid = '".$filter['sessionid']."'" : "";
    $conditions .= isset($filter['ip']) && $filter['ip'] != NULL  ? "AND ip = '".$filter['ip']."'" : "";
    $conditions .= isset($filter['device']) && $filter['device'] != NULL  ? "AND device = '".$filter['device']."'" : "";
    $conditions .= isset($filter['browser']) && $filter['browser'] != NULL  ? "AND browser = '".$filter['browser']."'" : "";

    $conditions .= isset($filter['location']) && $filter['location'] != NULL  ? "AND location LIKE '%".$filter['location']."%'" : "";

    $conditions .= isset($filter['carrier']) && $filter['carrier'] != NULL  ? "AND carrier = '".$filter['carrier']."'" : "";

    $conditions .= isset($filter['on'])  && $filter['on'] != NULL ? "AND created_at LIKE '%".$filter['on']."%'" : "";
    $conditions .= isset($filter['startDate'])  && $filter['startDate'] != NULL ? "AND created_at >= '".$filter['startDate']."'" : "";
    $conditions .= isset($filter['endDate']) && $filter['endDate'] != NULL  ? "AND created_at <= '".$filter['endDate']."'" : "";
    $conditions  = ltrim($conditions,'AND');
    $conditions  = strlen($conditions) > 1 ? 'WHERE '.$conditions : '';

    $conditions .= isset($filter['order_by']) ? " ORDER BY ".$filter['order_by'] : " ORDER BY created_at";
    $conditions .= isset($filter['order']) ? " ".$filter['order'] : " DESC";

    $limit       = (int) isset($filter['limit']) ? $filter['limit'] : 20;
    $pageno      = (string) isset($filter['pageno']) ? $filter['pageno'] : 1;
    $conditions .= ' LIMIT '.(string) $limit;
    $conditions .= ' OFFSET '.(string) (($pageno - 1 ) * $limit);
    return $this->getlogs($conditions,[]);
  }
}

?>