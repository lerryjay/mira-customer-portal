<?php
/**
 * Base controller for Company
 */
class Company extends Controller
{
  /**
   * undocumented function summary
   *
   * Undocumented function long description
   *
   * @param Type $var Description
   * @return type
   * @throws conditon
   **/
  public function index(Type $var = null)
  {
      $apiKey = $this->generateApiKey();
    // echo  json_encode(['teet'=>'ies','key'=> ]);
  }

  /**
   * undocumented function summary
   *
   * @param HTTPPOSTPARAM $name Name of the registering company
   * @param HTTPPOSTPARAM $packageid Package being
   * @return 
   **/
  public function add()
  {
    $data = $this->validateNewCompany();
    extract($data);
    $apiKey = $this->generateApiKey();
    $insert = $this->companyModel->addCompany($name,$address,$telephone,$email,$apiKey,$packageId);
    if($insert){
      loadModel('user');
      $this->userModel = new UserModel();
      $this->userModel->register($name,$email,$telephone,$password,$insert);
      $response = [
        'status'=>true,
        'message'=>'Company created successfully',
        'data'=>[
          'apikey'=>$apiKey,

        ]
      ];
    }else{
      $response = [
        'status'=>false,
        'message'=>'An error was encountered. Please try again later!'
      ];
    }
    $this->setOutputHeader(['Content-type:application/json']);
    $this->setOutput(json_encode($response));
  }

  /**
   * 
   */
  private function generateApiKey()
  {
    return implode('-', str_split(substr(strtolower(md5(microtime().rand(1000, 9999))), 0, 30), 6));
  }

  /**
   * 
   *
   * @param HTTPPOSTPARAM $name Name of the registering company
   * @return Array of comapny data if valid else @return exits application
   **/
  private function validateNewCompany()
  {
    extract($_POST);
    loadModel('company');
    $name      = isset($name) ? $name : '';
    $email     = isset($email) ? $email :  '';
    $address   = isset($address) ? $address :  '';
    $password  = isset($password) ? $password :  uniqid();
    $packageId = isset($packageid) ? $packageid : 1;
    $telephone = isset($telephone) ? $telephone : '';
    $nameError = Validate::string($name,false,false,2);
    if($nameError){
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid company name', 'data'=>['field'=>'name']]));
    }

    $emailError = Validate::email($email);
    if($emailError){
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode(['status'=>false, 'message'=>$emailError, 'data'=>['field'=>'email']]));
    }

    $telephoneError = Validate::telephone($telephone);
    if($telephoneError){
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode(['status'=>false, 'message'=>$telephoneError, 'data'=>['field'=>'telephone']]));
    }
    
    $this->companyModel = new CompanyModel();
    //validate selected package later

    return ['name'=>$name,'packageId'=>$packageId,'email'=>$email,'telephone'=>$telephone,'address'=>$address,'password'=>$password];
  }
}

?>