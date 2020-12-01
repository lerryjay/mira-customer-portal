<?php
  /**  
   * Base User Model class
  */
  class UserModel extends Model{
    public function getUser($condition = '',$string = '',$values = [])
    {
      $sql = "SELECT *, id As userid, FROM users $condition";
      $query = $this->query($sql,$string,$values); 
      if($query) return $this->row;
      else return false;
    }

    public function getUsers($condition = '',$string = '',$values = [])
    {
      $sql = 'SELECT *, id As userid, IFNULL((SELECT businessname FROM clients WHERE user_id = users.id ),"") AS businessname,IF((SELECT count(businessname) FROM clients WHERE user_id = users.id ) > 0,1,0) AS isclient FROM users '.$condition;
      $query = $this->query($sql,$string,$values); 
      if($query) return $this->rows;
      else return false;
    }

    public function getUserByLoginId($loginId,$status = 1 )
    {
      return $this->getUser('WHERE( email = ? OR username = ? )AND status = ? ', 'ssi', [$loginId,$loginId,$status]);
    }

    public function getUserByToken($token,$status = 1 )
    {
      return $this->getUser('WHERE token = ? AND status = ? ', 'si', [$token,$status]);
    }
    public function getUserByStringToken($token,$status = 1 )
    {
      return $this->getUser('WHERE hfield = ? AND status = ? ', 'si', [$token,$status]);
    }

    public function getUserByTelephone($telephone,$status = 1)
    {
      return $this->getUser('WHERE telephone = ? AND status = ?', 'si', [$telephone,$status]);
    }

    public function getUserById($userId,$status = 1)
    {
      return $this->getUser('WHERE id = ? AND status = ?', 'si', [$userId,$status]);
    }

    public function register($firstname,$lastname,$othername,$email,$telephone,$password,$companyId,$imageurl,$role ='user')
    {
      $id = uniqid();

      $insert =  $this->insert('users',['id'=>$id,'firstname'=>$firstname,'lastname'=>$lastname,'othername'=>$othername,'company_id'=>$companyId,'email'=>$email,'telephone'=>$telephone,'password'=>$password,'role'=>$role,'createdat'=>date("Y-m-d H:i:s"),'imageurl'=>$imageurl]);
      if($insert['status']) return $id;
      else return false;
    }

    /**
     * Updates with key value array pair based on key => value condtions
     *
     * @param Array $fields Fields are associative array with column name as key and value as value
     * @param Array $condition Fields are associative array with column name as key and value as value
     * @return Array boolean 
     **/
    public function updateUser($id,$data)
    {
      $update =  $this->update('users',$data,['id'=>$id]);
      if($update) return true;
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
    public function updatePassword($id,$password)
    {
      $update =  $this->update('users',['password'=>$password],['id'=>$id]);
      if($update) return true;
      else return false;
    }

    /**
    * retrieves a company users
    *
    * @param String $companyId Id of the company
    * @param Int  $status 1 = still existing, 0 = deleted
    * @return boolean false if not found @return Array of users with matching roles
    **/
    public function getCompanyUsers($companyId,$status = 1)
    {
      return $this->getUsers('WHERE company_id = ? AND status = ?','si', [$companyId,$status]);
    }

    /**
     * retrieves a company users based on the role
     *
     * @param String $companyId Id of the company
     * @param String $role admin, user
     * @param Int  $status 1 = still existing, 0 = deleted
     * @return boolean false if not found @return Array of users with matching roles
     **/
    public function getCompanyUsersByRole($companyId, $role,$status = 1)
    {
      return $this->getUsers('WHERE company_id = ? AND role = ? AND status = ?','ssi', [$companyId,$role, $status]);
    }
  }
?>