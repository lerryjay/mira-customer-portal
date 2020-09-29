<?php
  /**
   * undocumented class
   */
  class Apilog extends Controller
  {

    public function add()
    {
      extract($_POST);
      $ip = $ip ?? $_SERVER['remote_addr'] ?? '';
      $error = false;
      $invalidIp = Validate::ip($ip);
      if($invalidIp) $error = 'Invalid IP address supplied';

      if(!$error){
        loadModel('apilog');
        $this->apilogModel = new ApilogModel();
        $add = $this->apilogModel->add();
        if($add){

        }else $response = ['status'=>false,'message'=>'Error funding waller'.$error];
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    };
      
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
    public function list()
    {
      extract($_GET);

      $userid = $userid ?? '';
      $error = false;
      loadController('user');
      $user = User::validateUser($userid);
      $clientUserId = $user['role'] == 'admin' ? $clientid ??  '' : $userid;

      loadModel('user');
      $this->userModel = new UserModel();

      loadModel('apilog');

      $filters = ($user['role'] == 'user') ? 
      [
        "userId"=>$clientUserId,
        "companyId"=>$user['company_id'],
        "limit"=>$limit,
        "pageno"=>$pageno,
        "on"=>$on,
        "startdate"=>$startdate,
        "enddate"=>$enddate,
        "type"=>$type 
      ] : [
        "companyId"=>$user['company_id'],
        "limit"=>$limit,
        "pageno"=>$pageno,
        "userId"=>$clientUserId, 
        "on"=>$on,
        "startdate"=>$startdate,
        "enddate"=>$enddate,
        "type"=>$type
      ];


      $this->apilogModel = new ApilogModel();
      $logs = $this->apilogModel->getAllLogs($filters);
      if(!$logs){
        $response = ['status'=>true,'message'=>'Api logs retrieved successfuly', 'data'=>$logs];
      }else $response = ['status'=>false,'message'=>'Error fetching transactions'.$error];
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));

    } 
  }
  
?>