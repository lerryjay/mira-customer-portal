<?php

  class DBModel extends Dbconn{

    function __construct()
    {
      parent::connect();
    }
    public function query($sql,$bindString = '',$bindValues = [])
    {
      $prepare = $this->conn->prepare($sql);
      !(count($bindValues) > 0) ?: $prepare->bindParam($bindString,...$bindValues);
      $prepare->execute();
      $select_record = $prepare->get_result();
      $rowNums      =  $select_record->num_rows;
      if($rowNums < 1) return false;
      $this->num_rows = $rowNums;
      $this->rows =  $select_record->fetch_all(MYSQLI_ASSOC);
      $this->row =  $select_record->fetch_assoc();
      // $this->affected_rows =  $select_record->fetch_assoc();
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
  }
?>