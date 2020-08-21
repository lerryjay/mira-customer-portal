<?php
  /**
   * undocumented class
  */
  class DBModel extends Dbconn{

    function __construct()
    {
      parent::connect();
    }
    public function query($sql,$bindString = '',$bindValues = [])
    {
      $prepare = $this->conn->prepare($sql);
      !(count($bindValues) > 0) ?: $prepare->bind_param($bindString,...$bindValues);
      $prepare->execute();
      $select_record = $prepare->get_result();
      $this->rows =  $select_record->fetch_all(MYSQLI_ASSOC) ?? [];
      $this->row  =  count($this->rows) > 0 ? $this->rows[0] : [];
      $rowNums    =  count($this->rows);
      $this->num_rows = $rowNums;
      if($rowNums < 1) return false;
      return true;
    }

    public function insert($table,$data){
      $fields = array_keys($data);
      $string = '';
      $plc_holder = '';
      $values = array();
      for ($i=0; $i < sizeof($fields); $i++) { 
        if(is_numeric($data[$fields[$i]])) {$string .= 'i'; }else{ $string .= 's';}
        if ($i == (sizeof($fields)-1)) {$plc_holder .= '?';}else{ $plc_holder .= '?,'; }
        array_push($values,$data[$fields[$i]]);
      }
      $sql = " INSERT INTO $table (".implode(',',$fields).")  VALUES ( $plc_holder )";
      $prep_insert = $this->conn->prepare($sql);
      // echo $string;
      $prep_insert->bind_param($string, ...$values);
      $prep_insert->execute();			
      if (!$prep_insert) {
        return array('message' => mysqli_error($this->conn), 'status' => false);
      }else{
        return array('message' => 'Data insert successful', 'data'=>['insertId'=>$this->conn->insert_id],'status' => true);
      }
    }

    public function update($tablename,$data,$condition){
      $fields = array_keys($data);
      $string = '';
      $values = array();
      $conditions = '';
      for ($i=0; $i < sizeof($fields); $i++) { 
        $conditions .= $fields[$i];
        if(is_numeric($data[$fields[$i]])) {$string .= 'i'; }else{ $string .= 's';}
        if ($i == (sizeof($fields)-1)) { $conditions .= '= ? ';  }else{ $conditions .= '= ?,'; }
        array_push($values,$data[$fields[$i]]);
      }
      $clause = array_keys($condition);
      $where = '';
      for ($i=0; $i < count($clause); $i++) { 
        $where  .= $clause[$i];
        if(is_numeric($condition[$clause[$i]])) {$string .= 'i'; }else{ $string .= 's';}
        array_push($values,$condition[$clause[$i]]);
        if ($i == (sizeof($clause)-1)) { $where .= '= ? '; }else{ $where .= '= ? AND '; }
      }
      $sql = " UPDATE $tablename SET $conditions WHERE $where";
      $prep_update = $this->conn->prepare($sql);
      $prep_update->bind_param($string, ...$values);
      $prep_update->execute();
      if (!$prep_update) {
        return  false;
      }else{
        return true;
      }
    }
  
  }
?>