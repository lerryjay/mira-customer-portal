<?php
/**
 * undocumented class
 */
class Service extends Controller
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
    $this->list();
  }
  public function add()
  {
    extract($_POST);

    $error  = false;
    $userId = $userid ?? '';
    $title  = $title ?? '';
    $code   = $code ?? '';
    $cost   = $cost ?? '';

    $invalidUser  = Validate::string($userId,false,true,2,25);
    if(!$error && $invalidUser) $error = 'Invalid user id proivded';
    $invalidTitle = Validate::string($title,false,true,2,32);
    if(!$error && $invalidTitle) $error = 'Invalid title proivded';
    $invalidCode  = Validate::string($code,false,true,2,6);
    if(!$error && $invalidCode) $error = 'Invalid code proivded';

    loadController('user');
    $user = User::validateUser($userId,true);

    loadModel('service');
    $this->serviceModel = new ServiceModel();
    $services = $this->serviceModel->getAllServiceCodes();
    if(in_array($code,array_values($services)) && !$error) $error = 'Code has been used to represent another service ';

    if(!$error){
      $insert = $this->serviceModel->add($title,$code,$cost);
      if($insert) $response = ['status'=>true,'message'=>'Service Saved successfully',];
      else $response = ['status'=>false,'message'=>'Error adding service: An unexpected error occured'];
    }else $response = ['status'=>false,'message'=>'Error adding service: '.$error];
    $this->setOutputHeader(['Content-type:application/json']);
    $this->setOutput(json_encode($response));
  }

  public function update()
  {
    extract($_POST);
    $error     = false;
    $code      = $code ?? '';
    $cost      = $cost ?? '';
    $title     = $title ?? '';
    $userId    = $userid ?? '';
    $serviceId = $serviceid ?? '';

    $invalidUser  = Validate::string($userId,false,true,2,25);
    if(!$error && $invalidUser) $error = 'Invalid user id proivded';
    $invalidService  = Validate::string($serviceId,false,true,2,25);
    if(!$error && $invalidService) $error = 'Invalid service id proivded';
    $invalidTitle = Validate::string($title,false,true,2,32);
    if(!$error && $invalidTitle) $error = 'Invalid title proivded';
    $invalidCode  = Validate::string($code,false,true,2,6);
    if(!$error && $invalidCode) $error = 'Invalid code proivded';

    loadController('user');
    $user = User::validateUser($userId,true);

    loadModel('service');
    $this->serviceModel = new ServiceModel();

    if(!$error){
      $update = $this->serviceModel->updateService($serviceId,['title'=>$title,'cost'=>$cost]);
      if(!$update)$response = ['status'=>false,'message'=>'An unexpected error occurred'];
      else $response = ['status'=> true,'message'=>'Update successful'];
    }else $response = ['status'=>false,'message'=>'Error updating service: '.$error];
    $this->setOutputHeader(['Content-type:application/json']);
    $this->setOutput(json_encode($response));
  }

  public function delete()
  {
    extract($_POST);
    $error     = false;
    $userId    = $userid ?? '';
    $serviceId = $serviceid ?? '';

    $invalidUser  = Validate::string($userId,false,true,2,25);
    if(!$error && $invalidUser) $error = 'Invalid user id proivded';
    $invalidService  = Validate::string($serviceId,false,true,2,25);
    if(!$error && $invalidService) $error = 'Invalid service id proivded';

    loadController('user');
    $user = User::validateUser($userId,true);

    loadModel('service');
    $this->serviceModel = new ServiceModel();

    if(!$error){
      $update = $this->serviceModel->updateService($serviceId,['status'=>0]);
      if(!$update)$response = ['status'=>false,'message'=>'An unexpected error occurred'];
      else $response = ['status'=> true,'message'=>'Delete successful'];
    }else $response = ['status'=>false,'message'=>'Error deleting service: '.$error];
    $this->setOutputHeader(['Content-type:application/json']);
    $this->setOutput(json_encode($response));
  }

  public function list()
  {
    extract($_GET);
    
    loadModel('service');
    $this->serviceModel = new ServiceModel();
    $services = $this->serviceModel->getAllServices();
    if($services)$response = ['status'=>true,'message'=>'Services retrieved successsfully','data'=> $services];
    else $response = ['status'=>true,'message'=>'Unable to retrieve services no records found','data'=> []];
    $this->setOutputHeader(['Content-type:application/json']);
    $this->setOutput(json_encode($response));
  }

  public function info()
  {
    extract($_GET);
    $serviceId = $serviceid ?? '';
    $invalidTitle = Validate::string($serviceId,false,true,2,32);
    if(!$error && $invalidService) $error = 'Invalid service id proivded';

    loadModel('service');
    $this->serviceModel = new ServiceModel();
    $service = $this->serviceModel->getServiceById($serviceId);
    if($services)$response = ['status'=>true,'message'=>'Services retrieved successsfully','data'=> $data];
    else $response = ['status'=>false,'message'=>'Unable to retrieve service not records found','data'=> []];
    $this->setOutputHeader(['Content-type:application/json']);
    $this->setOutput(json_encode($response));
  }
}
?>