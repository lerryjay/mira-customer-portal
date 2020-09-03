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
            'name'=>$user['name'],
            'email'=>$user['email'],
            'telephone'=>$user['telephone'],
            'imageurl'=>$user['imageurl'],
            'permissions'=>$user['permissions'],
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
    public function add(Type $var = null)
    {
      $data = $this->validateRegistration();
      extract($data);
      $password = $this->encryptPassword($password);
      $imageurl = '';
      if(isset($_FILES['file'])){
        $imageurl = File::upload("file",'user',false);
        $imageurl ?: '';
      }
      $response = $this->userModel->register($name,$email,$telephone,$password,$this->companyId,$imageurl,'admin');
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
      return ['telephone'=>$telephone,'email'=>$email,'name'=>$name,'password'=>$password,'companyId'=>$this->companyId];
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
    public function user()
    {
      
    }
  }
  
?>