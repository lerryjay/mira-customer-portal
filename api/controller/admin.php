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
            'permissions'=>strlen($user['permissions']) > 1 ?explode('|',$user['permissions']) : [],
            'activation'=>$user['activation'],
            'status'=>$user['activation'],
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
      $password = rand(10000,999999);//TODO : generate random login password
      $encpassword = $this->encryptPassword($password);
      $imageurl = '';
      if(isset($_FILES['file'])){
        $imageurl = File::upload("file",'user',false);
        $imageurl ?: '';
      }
      $response = $this->userModel->register($firstname,$lastname,$othername,$email,$telephone,$encpassword,$this->companyId,$imageurl,'admin');
      if($response){
        $this->sendAdminRegistrationMail($email,$password,$firstname);
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

      $admin = $admin ?? '';
      $userid = $userid ?? '';

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

     $admin = $admin ?? '';
      $userid = $userid ?? '';
      $error = false;
      loadController('user');
      $user  = Self::validatepermission($userid,'UPDATEADMIN');
      $this->userModel = new UserModel();
      $admin  = $this->userModel->getUserById($adminid);
      if(!$admin || $admin['role'] !== 'admin'){
        $error = ['status'=>false,'message'=>'This user is not an administrator or cannot be verified within the app','data'=>['field'=>'adminid']];
      }

      $permissions = $permissions ?? '';
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
    
    /** 
    * Sends admin mail upon account creation
    * @return array [status:boolean, message:string]
    */
    
    public function sendAdminRegistrationMail($email,$password,$admin)
    {
        $html = '<body>
        <div style="background-color:#f0f0f0;top:0;left:0;right:0;bottom:0;position:relative;width:100%;display:flex;height:100vh">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family: Fakt Pro,Segoe UI,SanFrancisco Display,Arial,sans-serif;font-size:14px;background-color:inherit;">
            <tbody>
              <tr>
                <td width="100%" style="padding:5% 0">
                  <table width="95%" cellpadding="0" cellspacing="0" border="0" align="center">
                    <tbody>
                        <tr>
                            <td align="center" width="100%"
                                style="background-color:#fff;box-shadow:1px 2px 10px 3px #d8d8d8;">
                                <!-- Header -->
                                <table>
                                    <tbody>
                                        <tr>
                                            <td style="padding:10% 0">
                                                <img src="https://miratechnologiesng.com/img/icons/miraicon.png" alt="miratechnologies_Logo" width="70">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <!-- /Header -->
                                <hr align="center" width="75%" style="color:#ffffff">

                                <!-- Body -->
                                <table align="center" width="75%" cellspacing="0" cellpadding="10">
                                    <tbody>
                                        <tr>
                                            <td>
                                              <h4>
                                                Dear '.$admin.',
                                              </h4>
                                              <p style="font-family:inherit;color:#222;outline:none;margin:0;padding:0;font-size:12px">
                                                      Please informed that an adminstrator account has been created for you on the miratechnologies customer portal. Please  <a href="http://www.miratechnologies.com.ng/ticketapp">
                                                      Click</a> to login to your account using the following credentials
                                                      <br />
                                                  </p>
                                              
                                                <h4>
                                                    Login&#95;ID&nbsp;&#58;&nbsp;
                                                    <span  style="font-style: oblique;letter-spacing: 1px;font-weight: 500;font-size: 14px;">&#35;'.$email.' </span>
                                                </h4>
                                                <h4>
                                                    Passwprd
                                                    <span  style="font-style: oblique;letter-spacing: 1px;font-weight: 500;font-size: 14px;">&#35;'.$password.' </span>
                                                </h4>
                                                <p
                                                    style="font-family:inherit;color:#222;outline:none;margin:0;padding:0;font-size:12px">
                                                    Please endeavor to change your password immediately you gain access to the platform. Disregard and delete this message if you have no affialiation with Mira Technologies
                                                    <br /><br />
                                                    <strong>
                                                      <span style="padding:10px 0;font-weight: bold;color:#222">
                                                           Mira Technologies 
                                                      </span>
                                                    </strong>
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <!-- /Body -->
                                <hr align="center" width="75%" style="background-color:white;color:white">

                                <!-- For Spacing -->
                                <table align="center" width="75%" cellspacing="0" cellpadding="0"
                                    bgcolor="#01579b" style="padding: 30px 10px;">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <h5 style="text-align:center;color:#eee;padding-bottom: 20px;font-size: 12px;">
                                                <br />&quot;Mira Technologies. Secure software solutions you can trust.&quot;</h5>

                                            </td>
                                        </tr>

                                        <tr>
                                            <td align="center" style="color:#aaa">
                                                <p style="color:#ddd;font-size: 12px;">29, Oritshe Street, Off
                                                    Awolowo Way, by Balogun Bus-Stop, Ikeja, Lagos, Nigeria.</p>
                                                <p style="color:#ddd;font-size: 12px;">
                                                    <strong>Email</strong>:&nbsp;<a
                                                        href="mailto:info@miratechnologiesng.com"
                                                        style="text-decoration: none;color:#ddd">info@miratechnologiesng.com,</a>
                                                    <strong>Whatsapp</strong>:&nbsp;<a
                                                        href="https://api.whatsapp.com/send?phone=2348139432906&text=I%20want%20to%20find%20out%20about%20your%20products"
                                                        style="text-decoration: none;color:#ddd">&nbsp;+2348139432906</a>
                                                </p>

                                                <p style="color:#ddd;font-size: 12px;">Copyright &copy; 2020<a
                                                        href="https://www.miratechnologiesng.com/"
                                                        style="text-decoration: none;color:#ddd;font-size: 12px;">&nbsp;Mira&nbsp;Technologies</a>&nbsp;<span
                                                        style="border-right: 2px solid #ddd;">&nbsp;</span><a
                                                        href="https://www.miratechnologiesng.com/privacy"
                                                        style="text-decoration: none;color:#ddd;font-size: 12px;">&nbsp;Privacy&ensp;Policy</a>
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <!-- /For Spacing -->

                                <hr align="center" width="75%" style="background-color:white;color:white">

                                <!-- For Spacing -->
                                <table align="center" width="70%" cellspacing="0" cellpadding="0">
                                    <tbody>
                                        <tr>
                                            <td style="padding: 3px 0;"></td>
                                        </tr>
                                    </tbody>
                                </table>
                                

                                <!-- Social media icon -->
                                <table align="center" width="70%" cellspacing="0" cellpadding="0">
                                    <tbody>
                                        <tr>
                                            <td align="center">
                                                <a href="https://www.facebook.com/miratechng"
                                                    style="text-decoration:none" target="_blank">
                                                    <img src="https://bulkmailer.miratechnologies.com.ng/assets/imgs/sm_facebook.png"
                                                        alt="Facebook" title="Facebook" class="CToWUd"
                                                        width="20px">
                                                </a>
                                                <span style="padding: 0 2px;"></span>
                                                <a href="https://www.instagram.com/miratechng"
                                                    style="text-decoration:none" target="_blank">
                                                    <img src="https://bulkmailer.miratechnologies.com.ng/assets/imgs/sm_instagram.png"
                                                        alt="Instagram Handle" width="20px">
                                                </a>
                                                <span style="padding: 0 2px;"></span>
                                                <a href="https://www.linkedin.com/company/miratechnologiesng"
                                                    style="text-decoration:none" target="_blank">
                                                    <img src="https://bulkmailer.miratechnologies.com.ng/assets/imgs/sm_linkedin.png"
                                                        alt="Linkedin Handle" width="20px">
                                                </a>
                                                <span style="padding: 0 2px;"></span>
                                                <a href="https://twitter.com/miratechng"
                                                    style="text-decoration:none" target="_blank">
                                                    <img src="https://bulkmailer.miratechnologies.com.ng/assets/imgs/sm_twitter.png"
                                                        alt="Twitter Handle" width="20px">
                                                </a>
                                            </td>
                                    </tbody>
                                </table>
                                <!-- Social media icon -->
                                <table align="center" width="70%" cellspacing="0" cellpadding="0">
                                    <tbody>
                                        <tr>
                                            <td style="padding-top: 10px;"></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <!-- /For Spacing -->
                            </td>
                        </tr>
                      </tbody>
                    </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </body>';
      $subject = 'TCustomer Portal: Account Registration';
      return Alert::sendMail($email,$subject,$html);
    }
  }
  
?>