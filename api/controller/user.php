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
      parent::__construct();
    }

    /**
     * undocumented function summary
     *
     * @param Type $var Description
     * @return type
     **/
    public function index()
    {
      extract($_GET);
      $userId = $this->userId ?? $userid ??  '';
      loadModel('user');

      $user = Self::validateUser($userId,true);
      $data = $this->userModel->getCompanyUsersByRole($this->companyId,'user');
      $users = [];
      if($data){
        foreach($data as $user) {
          $users[] = [
            'userid'=>$user['id'],
            'firstname'=>$user['firstname'],
            'lastname'=>$user['lastname'],
            'othername'=>$user['othername'],
            'email'=>$user['email'],
            'telephone'=>$user['telephone'],
            'imageurl'=>$user['imageurl'],
            'businessname'=>$user['businessname'],
            'isclient'=>$user['isclient'] ? true : false,
          ];
        }
        $response = ['status'=>true,'message'=>'Users retrieved successfully', 'data'=>$users];
      }
      else $response = ['status'=>true,'message'=>'No user registered','data'=>[]];

      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }

    /**
     * Registers a new user
     *
     * @param HTTPPOSTPARAMS $_POST - email,name,telephone,username,password,role - role of the user
     * @return JSONRESPONSE 
     **/
    public function register()
    {
      extract($this->validateRegistration());
      $password = $this->encryptPassword($password);
      $imageurl = '';
      if(isset($_FILES['file'])){
        $imageurl = File::upload("file",'user',false);
        $imageurl ?: '';
      }
      $response = $this->userModel->register($firstname,$lastname,$othername,$email,$telephone,$password,$this->companyId,$imageurl);
      if($response){
        $_SESSION['companyid'] = $this->companyId;
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
      $email      ??= '';
      $firstname  ??= '';
      $othername  ??= '';
      $lastname   ??= '';
      $password   ??= '';
      $telephone  ??= '';
      $companyId  = isset($companyid) ? $companyid : '';

      $emailInvalid      = Validate::email($email);
      if($emailInvalid){ 
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>$emailInvalid, 'data'=>['field'=>'email']]));
      }
      $passwordInvalid   = Validate::password($password);
      if($passwordInvalid){ 
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>$passwordInvalid, 'data'=>['field'=>'password']]));
      }

      $telephoneInvalid  = Validate::telephone($telephone);
      if($telephoneInvalid){ 
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>$telephoneInvalid, 'data'=>['field'=>'telphone']]));
        return ;
      }
      
      $firstnameInvalid  = Validate::string($firstname,false,true,2,200);
      if($firstnameInvalid){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid firstname', 'data'=>['field'=>'firstname']]));
      }
      
      $lastnameInvalid       = Validate::string($lastname,false,true,1);
      if($lastnameInvalid){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid lastname', 'data'=>['field'=>'lastname']]));
      } 

      $othernameInvalid       = Validate::string($othername,false,true,2);
      if($othernameInvalid && strlen($othername) > 0){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid othername', 'data'=>['field'=>'othername']]));
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
      return ['telephone'=>$telephone,'email'=>$email,'firstname'=>$firstname,'lastname'=>$lastname,'othername'=>$othername,'password'=>$password,'companyId'=>$this->companyId];
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
              'firstname'=>$user['firstname'],
              'lastname'=>$user['lastname'],
              'othername'=>$user['othername'],
              'companyid'=>$user['company_id'],
              'activation'=>$user['activation'],
              'imageurl'=>$user['imageurl'],
              'role'=>$user['role'],
              'userid'=>$user['id'],
              'permissions'=>explode('|',$user['permissions'])
            ]
          ];
        }else session_destroy();
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
        // Alert::sendMail($user['email'],'Password reset token',"<b>$token</b>");
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
      extract($this->validateProfile());
      $user = $this->userModel->getUserById($userId);
      if($user){
        $data = ['username'=>$username,'firstname'=>$firstname,'lastname'=>$lastname,'othername'=>$othername,'telephone'=>$telephone];
        if(isset($_FILES['files']['image'])){
          $image = File::upload("image",'images');
          if($image) $data['imageurl'] = $image;
        }
        $updated = $this->userModel->updateUser($userId,$data);
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
      $firstname  ??= '';
      $othername  ??= '';
      $lastname   ??= '';
      $telephone  ??= '';
      $userId     = isset($userid) ? $userid : '';
      $username   = isset($username) ? $username : '';

      if(!isset($userid)){
        $response = ['status'=>false,'message'=>"User not found"];
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode($response));
      }

      $usernameValid   = Validate::string($username,false,true,4);
      if($usernameValid && strlen($username) > 0){ 
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>$usernameValid, 'data'=>['field'=>'username']]));
      }

      $telephoneValid  = Validate::telephone($telephone);
      if($telephoneValid){ 
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>$telephoneValid, 'data'=>['field'=>'telphone']]));
        return ;
      }
      
      $firstnameInvalid  = Validate::string($firstname,false,true,2,200);
      if($firstnameInvalid){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid firstname', 'data'=>['field'=>'firstname']]));
      }
      
      $lastnameInvalid   = Validate::string($lastname,false,true,2,200);
      if($lastnameInvalid){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid lastname', 'data'=>['field'=>'lastname']]));
      } 

      $othernameInvalid  = Validate::string($othername,false,true,2);
      if($othernameInvalid && strlen($othername) > 0){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid othername', 'data'=>['field'=>'othername']]));
      } 
      
      // check email exists
      $usernameExists    = $this->userModel->getUserByLoginId($username);
      if($usernameExists && $username !== $usernameExists['username']){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Username is associated with another account!', 'data'=>['field'=>'username']]));
      }
      return ['username'=>$username,'telephone'=>$telephone,'firstname'=>$firstname,'lastname'=>$lastname,'othername'=>$othername,'userId'=>$userId];
    }

    /**
     * Update user imageurl
     *
     * @param HTTPFILE $file iamge - png,jpg,jpeg,gif
     * @param HTTPPOST $userid user
     * @return JSON status:bool,message:string,data:string if sucess or null
     **/
    public function updateimage()
    {
      extract($_POST);
      if(!isset($userid)){
        $this->setOutputHeader(['Content-type:application/jsonerror']);
        $this->setOutput(json_encode($response));
      }
      $userId = $userid ?? '';
      $user = $this->userModel->getUserById($userId);
      if($user){
        $imageurl = '';
        if(isset($_FILES['file'])){
          $upload = File::uploadImage("file",'user',false);
          if($upload['status']){
           $update = $this->updateUser($userId,['imageurl'=>$upload['data']]);
           $response = $update  ? ['status'=>true,'message'=>'Image updated successfully!', 'data'=>$upload['data']] : ['status'=>false,'message'=>'Image updated failed. An unexpected error occured!'];
          }else $response = ['status'=>false,'message'=>$upload['mesage']];
        }else $response = ['status'=>false,'message'=>'Please select an image for upload!'];
      }else $response = ['status'=>false,'message'=>'Account not found!'];
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }

    public function suspend()
    {
      extract($_GET);
      loadModel('user');

      $clientid ??= '';
      $userid ??= '';

      loadController('user');
      $user = User::validateUser($userid,true);

      $this->userModel = new UserModel();

      $update = $this->userModel->updateUser($clientid,['activation'=>'SUSPENDED']);
      if($update) $response =  ['status'=>true,'message'=>'Account updated sucessfully'];
      else  $response =  ['status'=>true,'message'=>'Account update failed'];

      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
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