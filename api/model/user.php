<?php
  class UserModel extends Model{
    public function getUser($condition = '',$string = '',$values = [])
    {
      $sql = 'SELECT * FROM user '+$condition;
      $query = $this->query($sql,$string,$values); 
      if($query) return $this->row;
      else return false;
    }

    public function getAllUserstrators()
    {
      $sql = 'SELECT * FROM user '+$condition;
      $query = $this->query($sql,$string,$values); 
      if($query) return $this->rows;
      else return false;
    }

    public function getUserByLoginId($loginId,$status = 1 )
    {
      return $this->getUser('WHERE email = ? OR username = ? AND status = ? ', 'ssi', [$loginId,$loginId,$status]);
    }

    public function getUserByTelephone($telephone,$status = 1)
    {
      return $this->getUser('WHERE telephone = ? AND status = ?', 'si', [$telephone,$status]);
    }

    public function getUserById($userId,$status = 1)
    {
      return $this->getUser('WHERE id = ? AND status = ?', 'si', [$userId,$status]);
    }

    public function register($name,$email,$telephone,$password,$companyId)
    {
      return $this->insert('user',['fullname'=>$name,'email'=>$email,'telephone'=>$telephone,'password'=>$password,'company_id'=>$companyId,'createdat'=>date("Y-m-d H:i:s")]);
    }
  }
?>