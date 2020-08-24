<?php
  /**
   * 
   *Base user controller class
   *  
  **/
  class User extends Controller{
    function __construct(){
      loadModel('user');
      $this->userModel = new UserModel();
    }

    /**
     * Registers a new user
     *
     * @param HTTPPOSTPARAMS $_POST - email,name,telephone,username,password,role - role of the user
     * @return JSONRESPONSE 
     **/
    public function register()
    {
      $data = $this->validateRegistration();
      extract($data);
      $password = $this->encryptPassword($password);
      $response = $this->userModel->register($name,$email,$telephone,$password,$companyId);
      if($response){
        $_SESSION['companyid'] = $companyId;
        $_SESSION['userid'] = $response;
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
      $name       = isset($name) ? $name : '';
      $email      = isset($email) ? $email : '';
      $password   = isset($password) ? $password : '';
      $telephone  = isset($telephone) ? $telephone : '';
      $companyId  = isset($companyid) ? $companyid : '';

      $emailValid      = Validate::email($email);
      if($emailValid){ 
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>$emailValid, 'data'=>['field'=>'email']]));
      }
      $passwordValid   = Validate::password($password);
      if($passwordValid){ 
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>$passwordValid, 'data'=>['field'=>'password']]));
      }

      $telephoneValid  = Validate::telephone($telephone);
      if($telephoneValid){ 
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>$telephoneValid, 'data'=>['field'=>'telphone']]));
        return ;
      }
      
      $nameValid       = Validate::string($name,false,false,4);
      if($nameValid){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>$nameValid, 'data'=>['field'=>'name']]));
      } 

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
      return ['telephone'=>$telephone,'email'=>$email,'name'=>$name,'password'=>$password,'companyId'=>$this->companyId];
    }

    /**
     * Validate login data
     *
     * @param HTTPPOSTPARAMS $_POST - loginId, password
     * @return LOGINDATA Array if data is valid, else exits the application with appropriate response 
     * 
     **/
    public function validateLogin()
    {
      extract($_POST);
      $loginId  = isset($loginid) ? $loginid : '';
      $password = isset($password) ? $password : '';

      $response = [
        'status'=>false,
        'message'=>'Invalid username or password'
      ];

      $loginValid     = Validate::string($loginId);
      $passwordValid  = Validate::password($password);

      if(!$loginValid && !$passwordValid) return ['loginId'=>$loginId, 'password'=>$password ];
      
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }

    /**
     *  Login user 
     *
     * @param HTTPPOSTPARAMS $_POST - loginId, password
     * @return LOGINDATA Array if data is valid, else exits the application with appropriate response 
     * 
     **/
    public function login()
    {
      $response = [
        'status'=>false,
        'message'=>'Invalid username or password'
      ];
      $loginData = $this->validateLogin();
      extract($loginData);
      $user = $this->userModel->getUserByLoginId($loginId);
      if($user){
        if (password_verify($password,$user['password'])) {
          $_SESSION['companyid'] = $user['company_id'];
          $_SESSION['userid'] = $user['id'];
          $response = [
            'status'=>true,
            'message'=>'Login Successful!',
            'data'=>[
              'email'=>$user['email'],
              'telephone'=>$user['telephone'],
              'fullname'=>$user['name'],
              'companyid'=>$user['company_id'],
            ]
          ];
        }
      }
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }

    /**
     * First stage in password reset process
     *
     * @param HTTPPOSTPARAM  $email Email of account whose password is to be reset
     * @return HTTPRESPONSE [ status:boolean, message:String ]
     **/
    public function forgotpassword()
    {
      extract($_POST);
      $email = isset($email) ? $email : '';
      if(Validate::email($email)){
        $response = [
          'status'=>false,
          'message'=>'Please enter username or email to reset password!'
        ];
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode($response));
      }
      loadModel('user');
      $this->userModel = new UserModel();
      $user = $this->userModel->getUserByLoginId($email);
      if(!$user){
        $response = [
          'status'=>false,
          'message'=>'No account found! Please signup or register'
        ];
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode($response));
      }
      $token = 123342;
      $tokenexpdate = date("Y-m-d", strtotime("+ 30minutes"));
      $tokenexptime = date("H:i:s", strtotime("+ 30minutes"));
      $updated =   $this->userModel->updateUser($user['id'],['token'=>$token,'tokenexpdate'=>$tokenexpdate,'tokenexptime'=>$tokenexptime]);
      if($updated){
        Alert::sendMail($user['email'],'Password reset token',"<b>$token</b>");
        $response = [
          'status'=>true,
          'message'=>'A token has been sent to your email. Please enter token to continue'
        ];
      }else{
        $response = [
          'status'=>false,
          'message'=>'Unexpected expected error occured'
        ];
      }
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }

    /**
     *  Update a user's password
     *
     * @param HTTPPOSTPARAMS $_POST - userid, oldpassword,newpassword
     * @return JSONDATA exits application with appropriate response
     * 
     **/
    public function updatepassword()
    {
      $response = [
        'status'=>false,
        'message'=>'Invalid userid'
      ];

      extract($_POST);
      if(!isset($userid)){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode($response));
      }

      if(!isset($oldpassword) || Validate::password($oldpassword)){
        $response['message'] = isset($oldpassword) ? Validate::password($oldpassword) : 'Old password is required to complete this action';
        $response['data']['field'] = 'oldpassword';
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode($response));
      }

      if(!isset($newpassword) || Validate::password($newpassword)){
        $response['message'] = isset($newpassword) ? Validate::password($newpassword) : 'Please enter new password!';
        $response['data']['field'] = 'newpassword';
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode($response));
      }

      $user = $this->userModel->getUserById($userId);
      if($user){
        if (password_verify($oldpassword,$user['password'])) {
          $updated = $this->userModel->updatePassword($userId,$newpassword);
          if($updated['status']){
            $response['status'] = true;
            $response['message'] = 'Password update successful';
          }else $response['message'] = 'Unexpected error occurred!';
        }else{
          $response['message'] = 'Invalid authentication!';
        }
      }else{
        $response['message'] = 'Account not found!';
      }
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }

    /**
     *  Verifies user token
     *
     * @param HTTPPOSTPARAMS $_POST - userid, token
     * @return JSONDATA exits application with appropriate response
     * 
     **/
    public function verifytoken()
    {
      $response = [
        'status'=>false,
        'message'=>'Invalid userid'
      ];
      extract($_POST);
      if(!isset($userid)){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode($response));
      }

      if(!isset($token) || Validate::string($token,false,true)){
        $response['message'] = isset($token) ? Validate::string($token) : 'Please provide token';
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode($response));
      }

      $user = $this->userModel->getUserById($userid);
      if($user){
        if($user['token'] != $token || date("Y-m-d") > date("Y-m-d", strtotime($user['tokenexpdate']))  || date("H:i:s") > date("H:i:s", strtotime($user['tokenexptime']))) $response['message'] = 'Invalid token!';
        else{
          $response = [
            'status'=>true,
            'message'=>'Token valid!'
          ];
        }
      }else{
        $response['message'] = 'Account not found!';
      }
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }

     /**
     *  Reset a user's password
     *
     * @param HTTPPOSTPARAMS $_POST - userid, password
     * @return JSONDATA exits application with appropriate response
     * 
     **/
    public function resetpassword()
    {
      $response = [
        'status'=>false,
        'message'=>'Invalid userid'
      ];

      extract($_POST);

      if(!isset($userid)){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode($response));
      }

      $userId = $userid;

      if(!isset($password) || Validate::password($password)){
        $response['message'] = isset($password) ? Validate::password($password) : 'Please enter new password';
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode($response));
      }

      if(!isset($token) || Validate::string($token,false,false,4)){
        $response['message'] = isset($token) ? Validate::string($token,false,false,4) : 'Please validate token!';
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode($response));
      }

      $user = $this->userModel->getUserById($userId);
      if($user){
        if($user['token'] != $token || date("Y-m-d") > date("Y-m-d", strtotime($user['tokenexpdate']))  || date("H-i-s") > date("Y-m-d", strtotime($user['tokenexptime']))) $response['message'] = 'Invalid token!';
        else{
          $updated = $this->userModel->updatePassword($userId,$password);
          if($updated){
            $response = [
              'status'=>true,
              'message'=>'Password updated!'
            ];
          }else{
            $response['message'] = 'Password update failed';
          }
          
        }
      }else{
        $response['message'] = 'Account not found!';
      }
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }

    /**
     *  Reset a user's password
     *
     * @param HTTPPOSTPARAMS $_POST - userid, name,username,telephone,
     * @return JSONDATA exits application with appropriate response
     * 
     **/
    public function updateprofile()
    {
      $response = [
        'status'=>false,
        'message'=>'Invalid userid'
      ];
      $data = $this->validateProfile();
      extract($data);

      $user = $this->userModel->getUserById($userId);
      if($user){
        $updated = $this->userModel->updateUser($userId,['username'=>$username,'name'=>$name,'telephone'=>$telephone]);
        if($updated){
          $response = [
            'status'=>true,
            'message'=>'Profile update sucessful!'
          ];
        }else{
          $response['message'] = 'Profile update failed';
        }
      }else{
        $response['message'] = 'Account not found!';
      }
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }

    /**
     * validates user profile
     *
     * @param HTTPPOSTPARAMS $_POST - userid,name,telephone,username
     * @return JSONRESPONSE 
     **/
    private function validateProfile()
    {
      extract($_POST);
      $name       = isset($name) ? $name : '';
      $userId     = isset($userid) ? $userid : '';
      $username   = isset($username) ? $username : '';
      $telephone  = isset($telephone) ? $telephone : '';

      if(!isset($userid)){
        $response = ['status'=>false,'message'=>"User not found"];
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode($response));
      }

      $usernameValid   = Validate::string($username,false,true,4);
      if($usernameValid){ 
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>$usernameValid, 'data'=>['field'=>'username']]));
      }

      $telephoneValid  = Validate::telephone($telephone);
      if($telephoneValid){ 
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>$telephoneValid, 'data'=>['field'=>'telphone']]));
        return ;
      }
      
      $nameValid       = Validate::string($name,false,true,4);
      if($nameValid){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>$nameValid, 'data'=>['field'=>'name']]));
      }
      
      // check email exists
      $usernameExists    = $this->userModel->getUserByLoginId($username);
      if($usernameExists && $username !== $usernameExists['username']){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Username is associated with another account!', 'data'=>['field'=>'username']]));
      }
      return ['username'=>$username,'telephone'=>$telephone,'name'=>$name,'userId'=>$userId];
    }


    /**
     * validate that a user exists within the database
     *
     * @param UsierId $userid Primary Id of the user
     * @param boolean $isAdmin Check if user is admin
     * @return DatabaseUserObject
     **/
    public static function validateUser($userId,$isAdmin = false)
    {
      $_this   = new Self();
      if(!isset($userId) || strlen($userId) < 1){
        $response['status']  = false;
        $response['message'] = "User not recognised";
        $response['data']['field'] = 'userid';
        $_this->setOutputHeader(['Content-type:application/json']);
        $_this->setOutput(json_encode($response));
      }

      $user = $_this->userModel->getUserById($userId);
      if(!$user){
        $response['status']  = false;
        $response['message'] = "User not recognised";
      }else if($user['role'] == 'user' && $isAdmin){
        $response['status']  = false;
        $response['message'] = "You do not have the correct resource to perform this action";
      }else  return  $user;
      $_this->setOutputHeader(['Content-type:application/json']);
      $_this->setOutput(json_encode($response));
    }
  }
?>