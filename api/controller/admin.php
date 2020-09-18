<?php
  /**
   * undocumented class
   */
  class Admin extends Controller
  {
    /**
     * Undocumented function long description
     *
     * @param Type $var Description
     * @return type
     * @throws conditon
     **/
    public function index()
    {
      extract($_GET);
      $userId = $this->userId ?? $userid ??  '';
      loadModel('user');
      loadController('user');

      $user = User::validateUser($userId,true);
      $this->userModel = new UserModel();
      $data = $this->userModel->getCompanyUsersByRole($this->companyId,'admin');
      $users = [];
      if($data){
        foreach($data as $user) {
          $users[] = [
            'adminid'=>$user['id'],
            'firstname'=>$user['firstname'],
            'lastname'=>$user['lastname'],
            'email'=>$user['email'],
            'telephone'=>$user['telephone'],
            'imageurl'=>$user['imageurl'],
            'permissions'=>explode('|',$user['permissions']),
            'activation'=>$user['activation']
          ];
        }$response = ['status'=>true,'message'=>'Administrators retrieved successfully', 'data'=>$users];
        }else $response = ['status'=>true,'message'=>'No administrator registered','data'=>[]];

      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
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
    public function add()
    {
      $data = $this->validateRegistration();
      extract($data);
      $password = 3224;//TODO : generate random login password
      $password = $this->encryptPassword($password);
      $imageurl = '';
      if(isset($_FILES['file'])){
        $imageurl = File::upload("file",'user',false);
        $imageurl ?: '';
      }
      $response = $this->userModel->register($firstname,$lastname,$othername,$email,$telephone,$password,$this->companyId,$imageurl,'admin');
      if($response){
        $response = [
          'status'=>true,
          'message'=>'Registration Successful!',
          'data'=>[
            'userid'=>$response
          ]
        ];
      }else{
          $response = [
            'status'=>false,
            'message'=>'Registration failed'
          ];
        }
      
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }

     /**
     * Registers a new user
     *
     * @param HTTPPOSTPARAMS $_POST - email,name,telephone,username,password,role - role of the user
     * @return User Array if data is valid else exits the application with appropriate response 
     * 
     **/
    private function validateRegistration()
    {
      extract($_POST);
      $firstname  = isset($firstname) ? $firstname : '';
      $lastname   = isset($lastname) ? $lastname : '';
      $othername  = isset($othername) ? $othername : '';
      $email      = isset($email) ? $email : '';
      $telephone  = isset($telephone) ? $telephone : '';
      $companyId  = isset($companyid) ? $companyid : '';

      $emailValid      = Validate::email($email);
      if($emailValid){ 
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>$emailValid, 'data'=>['field'=>'email']]));
      }

      $telephoneValid  = Validate::telephone($telephone);
      if($telephoneValid){ 
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>$telephoneValid, 'data'=>['field'=>'telphone']]));
        return ;
      }
      
      $firstnameInvalid       = Validate::string($firstname,false,false,2);
      if($firstnameInvalid){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid firstname', 'data'=>['field'=>'firstname']]));
      } 

      $lasttnameInvalid       = Validate::string($lastname,false,false,2);
      if($lasttnameInvalid){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid lastname', 'data'=>['field'=>'lastname']]));
      } 

      $othernameInvalid       = Validate::string($othername,false,false,1);
      if($othernameInvalid && strlen($othername) > 0){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid othername', 'data'=>['field'=>'name']]));
      } 

      loadModel('user');
      $this->userModel = new UserModel();
      // check email exists
      $emailExists    = $this->userModel->getUserByLoginId($email);
      if($emailExists){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Email is associated with another account!', 'data'=>['field'=>'email']]));
      }

      // check telephone exists
      $telephoneExists = $this->userModel->getUserByTelephone($telephone);

      if($telephoneExists){ 
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Telephone is associated with another account!', 'data'=>['field'=>'telephone']]));
      }
      // no errors
      return ['telephone'=>$telephone,'email'=>$email,'firstname'=>$firstname,'lastname'=>$lastname,'othername'=>$othername,'companyId'=>$this->companyId];
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
    public function suspend()
    {
      extract($_GET);
      loadModel('user');

      $adminid ??= '';
      $userid ??= '';

      loadController('user');
      $user = User::validateUser($userid,true);

      $this->userModel = new UserModel();

      $update = $this->userModel->updateUser($adminid,['activation'=>'SUSPENDED']);
      if($update) $response =  ['status'=>true,'message'=>'Account updated sucessfully'];
      else  $response =  ['status'=>true,'message'=>'Account update failed'];

      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }

    /**
     * undocumented function summary
     *
     * @param Type $var Description
     * @return type
     * @throws conditon
     **/
    public function updatepermission()
    {
      extract($_POST);
      loadModel('user');

      $adminid ??= '';
      $userid ??= '';
      $error = false;
      loadController('user');
      $user  = Self::validatepermission($userid,'UPDATEADMIN');
      $this->userModel = new UserModel();
      $admin  = $this->userModel->getUserById($adminid);
      if(!$admin || $admin['role'] !== 'admin'){
        $error = ['status'=>false,'message'=>'This user is not an administrator or cannot be verified within the app','data'=>['field'=>'adminid']];
      }

      $permissions  ??= '';
      $permissions = explode('|',$permissions);
      $invalidPermissions = [];
      foreach($permissions as $permission){
        if(!in_array($permission,ADMINPERMISSIONS)) array_push($invalidPermissions,$permission);
      }

      if(count($invalidPermissions) > 0 && !$error){
        $error = ['status'=>false,'message'=>'Unknown permissions supplied','data'=>['invalid'=>$invalidPermissions]];
      }

      if(!$error){
        $update = $this->userModel->updateUser($adminid,['permissions'=>implode('|',$permissions)]);
        if($update) $response = ['status'=>true,'message'=>'User permissions updated successfully'];
        else $response = ['status'=>false,'message'=>'Update failed due to an unexpected error'];
      }else $response = $error;

      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
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
    public static function validatepermission($adminId,$permission)
    {
      $_this   = new Self();
      $error   = false;
      if(!isset($userId) || strlen($adminId) < 1){
        $error = ['status'=> false,'message'=>"User not recognised","data"=>['field'=>"userid"]];
      }
      $_this->userModel = new UserModel();
      $user = $_this->userModel->getUserById($adminId);
      if(!$user){
        $response['status']  = false;
        $response['message'] = "User not recognised";
      }else if($user['role'] == 'user' || !in_array($permission,explode('|',$user['permissions']))){
        $response['status']  = false;
        $response['message'] = "You do not have the correct resource to perform this action";
      }else  return  $user;
      $_this->setOutputHeader(['Content-type:application/json']);
      $_this->setOutput(json_encode($response));
    }
  }
  
?>