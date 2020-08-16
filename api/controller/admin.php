<?php
  class Admin extends Controller{

    public function register()
    {
      extract($_POST);
      $valid = $this->validateRegistration($name,$email,$telephone,$password,$companyId);
      if(!$valid['status']) $response;
      else{
        $password = $this->encrypt->password($password);
        $response = $this->adminModel->register($name,$email,$telephone,$password,$companyId);
      }
      
      $this->setOutputHeader('Content-type:application/json');
      $this->setOutput($response);
    }

    private function validateRegistration($name,$email,$telephone,$password,$companyId)
    {
      $emailValid      = Validate::email($email);
      if($emailValid) return ['status'=>false, 'message'=>'Invalid email', 'data'=>['field'=>'email']];
      $passwordValid   = Validate::password($password);
      if($emailValid) return ['status'=>false, 'message'=>'Invalid password', 'data'=>['field'=>'password']];
      $telephoneValid  = Validate::telephone($telephone);
      if($emailValid) return ['status'=>false, 'message'=>'Invalid telphone number supplied', 'data'=>['field'=>'telphone']];
      $nameValid       = Validate::string($name,false,false,4);
      if($emailValid) return ['status'=>false, 'message'=>'Invalid name supplied', 'data'=>['field'=>'name']];

      // check email exists
      $emailExists    = $this->adminModel->getAdminByLoginId($email);
      if($emailExists) return ['status'=>false, 'message'=>'Email is associated with another account!', 'data'=>['field'=>'email']];

      // check telephone exists
      $telephoneExists = $this->adminModel->getAdminByTelephone($telephone);

      if($emailExists) return ['status'=>false, 'message'=>'Telephone is associated with another account!', 'data'=>['field'=>'telephone']];
      
      // no errors
      return ['status'=>true];
    }

    public function login()
    {
      $response = [
        'status'=>false,
        'message'=>'Invalid username or password'
      ];
      extract($_POST);
      $adminExists = $this->adminModel->getAdminByLoginId($loginid);
      if($adminExists){
        $admin  = $this->adminModel->row;
        if (password_verify($password,$admin['password'])) {
          $response = [
            'status'=>true,
            'message'=>'Login Successful!',
            'data'=>[
              'email'=>$admin['email'],
              'telephone'=>$admin['telephone'],
              'fullname'=>$admin['name'],
              'companyid'=>$admin['company_id'],
            ]
          ];
        }
      }
      $this->setOutputHeader('Content-type:application/json');
      $this->setOutput($response);
    }

    public function updatepassword()
    {
      $response = [
        'status'=>false,
        'message'=>'Invalid adminid'
      ];

      extract($_POST);
      $adminExists = $this->adminModel->getAdminById($adminid);
      if($adminExists){
        $admin  = $this->adminModel->row;
        if (password_verify($oldpassword,$admin['password'])) {
          $updated = $this->adminModel->updatePassword($adminId,$newpassword);
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
      $this->setOutputHeader('Content-type:application/json');
      $this->setOutput($response);
    }

    public function verifytoken()
    {
      $response = [
        'status'=>false,
        'message'=>'Invalid adminid'
      ];

      extract($_POST);
      $adminExists = $this->adminModel->getAdminById($adminid);
      if($adminExists){
        $admin  = $this->adminModel->row;
        if($admin['token'] != $token || date("Y-m-d") > date("Y-m-d", strtotime($admin['tokenexpdate']))  || date("H-i-s") > date("Y-m-d", strtotime($admin['tokenexptime']))) $response['message'] = 'Invalid token!';
        else{
          $response = [
            'status'=>true,
            'message'=>'Token valid!'
          ];
        }
      }else{
        $response['message'] = 'Account not found!';
      }
      $this->setOutputHeader('Content-type:application/json');
      $this->setOutput($response);
    }

    public function resetpassword()
    {
      $response = [
        'status'=>false,
        'message'=>'Invalid adminid'
      ];

      extract($_POST);
      $adminExists = $this->adminModel->getAdminById($adminid);
      if($adminExists){
        $admin  = $this->adminModel->row;
        if($admin['token'] != $token || date("Y-m-d") > date("Y-m-d", strtotime($admin['tokenexpdate']))  || date("H-i-s") > date("Y-m-d", strtotime($admin['tokenexptime']))) $response['message'] = 'Invalid token!';
        else{
          $updated = $this->adminModel->updatePassword($adminId,$password);
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
      $this->setOutputHeader('Content-type:application/json');
      $this->setOutput($response);
    }

    public function updateprofile()
    {
      $response = [
        'status'=>false,
        'message'=>'Invalid adminid'
      ];
      extract($_POST);
      $adminExists = $this->adminModel->getAdminById($adminid);
      if($adminExists){
        $updated = $this->adminModel->updateProfile($adminId,$username,$telephone,$fullnmae);
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
      $this->setOutputHeader('Content-type:application/json');
      $this->setOutput($response);
    }
  }
?>