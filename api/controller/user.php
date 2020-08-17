<?php
  class User extends Controller{

    public function register()
    {
      
      $data = $this->validateRegistration();
      if($data) $response;
      else{
        extract($data);
        $password = $this->encrypt->password($password);
        $response = $this->userModel->register($name,$email,$telephone,$password,$companyId);
      }
      
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }

    private function validateRegistration()
    {
      extract($_POST);
      $name       = isset($name) ? $name : '';
      $email      = isset($email) ? $email : '';
      $password   = isset($password) ? $password : '';
      $telephone  = isset($telephone) ? $telephone : '';

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
      return ['telephone'>$telephone,'email'=>$email,'name'=>$name,'password'=>$password,'companyId'=>$companyId];
    }

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

    public function updatepassword()
    {
      $response = [
        'status'=>false,
        'message'=>'Invalid userid'
      ];

      extract($_POST);
      $userExists = $this->userModel->getUserById($userid);
      if($userExists){
        $user  = $this->userModel->row;
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

    public function verifytoken()
    {
      $response = [
        'status'=>false,
        'message'=>'Invalid userid'
      ];

      extract($_POST);
      $userExists = $this->userModel->getUserById($userid);
      if($userExists){
        $user  = $userExists;
        if($user['token'] != $token || date("Y-m-d") > date("Y-m-d", strtotime($user['tokenexpdate']))  || date("H-i-s") > date("Y-m-d", strtotime($user['tokenexptime']))) $response['message'] = 'Invalid token!';
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

    public function resetpassword()
    {
      $response = [
        'status'=>false,
        'message'=>'Invalid userid'
      ];

      extract($_POST);
      $userExists = $this->userModel->getUserById($userid);
      if($userExists){
        $user  = $userExists;
        if($user['token'] != $token || date("Y-m-d") > date("Y-m-d", strtotime($user['tokenexpdate']))  || date("H-i-s") > date("Y-m-d", strtotime($user['tokenexptime']))) $response['message'] = 'Invalid token!';
        else{
          $updated = $this->userModel->updatePassword($userId,$password);
          if($updated){
            $response = [
              'status'=>true,
              'message'=>'Password updatez!'
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

    public function updateprofile()
    {
      $response = [
        'status'=>false,
        'message'=>'Invalid userid'
      ];
      extract($_POST);
      $userExists = $this->userModel->getUserById($userid);
      if($userExists){
        $updated = $this->userModel->updateProfile($userId,$username,$telephone,$fullnmae);
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
     * validate that a user exists within the database
     *
     * @param UsierId $userid Primary Id of the user
     * @return DatabaseUserObject
     **/
    public static function validateUser($userId)
    {

      $_this   = new Self();
      $userExists = $_this->userModel->getUserById($userId);
      if($userExists)return  $userExists;
      else{
        $response['status']  = false;
        $response['message'] = "User not recognised";
      }
      $_this->setOutputHeader(['Content-type:application/json']);
      $_this->setOutput(json_encode($response));
    }
  }
?>