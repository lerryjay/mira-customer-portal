<?php
  /**
   * undocumented class
   */
  class Log extends Controller
  {

    public function add()
    {
      extract($_POST);
      loadController('user');
      
      // $userId       = $userid ?? '';
      // $user         = User::validateUser($userid);
      $type         = $type ?? '';
      $count        = $count ?? 1;
      $status       = $status ?? '00';
      $deploymentId = $deploymentid ?? '';
      
      $ip    = $ip ?? $_SERVER['REMOTE_ADDR'] ?? '';
      $error = Validate::string($deploymentid,false,true,3,16);

      loadModel('deployment');
      loadModel('service');

      $this->deploymentModel = new DeploymentModel();

      $deployment  = $this->deploymentModel->getDeploymentById($deploymentId);
      if(!$deployment  && !$error) $error = 'Invalid deploymentid provided';

      $this->serviceModel = new ServiceModel();
      $services = $this->serviceModel->getAllServiceCodes();
      $services = $services ?: [];
      if(!in_array($type,array_values($services)) && !$error) $error = 'Invalid service code';

      if(!$error){
        loadModel('log');
        $this->logModel = new LogModel();
        $add = $this->logModel->add($this->companyId,$deploymentId,$type,$status,$count,$ip);
        if($add)$response = ['status'=>true,'message'=>"Log succsessful"];
        else $response = ['status'=>false,'message'=>'Error saving log'];
      }else  $response = ['status'=>false,'message'=>'Error saving log: '.$error];
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
      
    }
    
    /**
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
      $on = $on ?? '';
      $error = false;
      $type = $type ?? '';
      $limit = $limit ?? 20;
      $pageno = $pageno ?? 1;
      $servicecode  = $servicecode ?? '';
      $statuscode   = $statuscode ?? '';
      $clientid = $clientid ?? '';
      $enddate = $enddate ?? '';
      $startdate = $startdate ?? '';
      $clientUserId = $clientid ?? '';
      $deploymentId = $deploymentid ?? '';


      loadModel('log');
      loadModel('user');
      loadModel('deployment');
      loadController('user');
      $this->userModel       = new UserModel();
      $this->deploymentModel = new DeploymentModel();
      $user = [];
      $deployment  = $this->deploymentModel->getDeploymentById($deploymentId);
      
      if(!$deployment) $user = User::validateUser($userid);
      else $user = User::validateUser($deployment['user_id']);
      if(!$deployment && !$user) $error = 'Request could not be authenticated';
      $clientUserId = $user['role'] == 'admin' ? ($clientid ??  '') : ( $deployment ? $deployment['user_id'] : $userid);
      
      $filters = 
      [
        "userId"=>$clientUserId,
        "deploymentId"=>$deploymentId,
        "companyId"=>$this->companyId,
        "limit"=>$limit,
        "pageno"=>$pageno,
        "on"=>$on,
        "startdate"=>$startdate,
        "enddate"=>$enddate,
        "statuscode"=>$statuscode,
        "servicecode"=>$servicecode,
        "type"=>$type 
      ];

      $this->logModel = new LogModel();
      if(!$error){
        $logs = $this->logModel->getAllLogs($filters);
        if($logs){
          $data = [];
          foreach($logs as $item =>$value){
            $data[] = [
              'productname'=>$value['productname'],
              'businessname'=>$value['businessname'],
              'date'=>$value['created_at'],
              'clientname'=>$value['clientname'],
              'email'=>$value['email'],
              'ip'=>$value['ip'],
              'servicecode'=>$value['servicecode'],
              'statuscode'=>$value['statuscode'],
              'count'=>$value['count'],
            ];
          }
          $response = ['status'=>true,'message'=>'Api logs retrieved successfuly', 'data'=>$data];
        }else  $response = ['status'=>true,'message'=>'No log records','data'=>[]];
      }else $response = ['status'=>false,'message'=>'Error fetching logs: '.$error];
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
    public function dailystatistics()
    {
      extract($_GET);
      $userid = $userid ?? '';
      $on = $on ?? '';
      $error = false;
      $type = $type ?? '';
      $enddate = $enddate ?? '';
      $clientid = $clientid ?? '';
      $startdate = $startdate ?? '';
      $statuscode   = $statuscode ?? '';
      $servicecode  = $servicecode ?? '';
      $clientUserId = $clientid ?? '';
      $deploymentId = $deploymentid ?? '';

      loadController('user');
      loadModel('deployment');
      $this->deploymentModel = new DeploymentModel();

      $deployment  = $this->deploymentModel->getDeploymentById($deploymentId);
      if(!$deployment) $user = User::validateUser($userid);
      else $user = User::validateUser($deployment['user_id']);
      if(!$deployment && !$user) $error = 'Request could not be authenticated';
      $clientUserId = $user['role'] == 'admin' ? ($clientid ??  '') : ( $deployment ? $deployment['user_id'] : $userid);

      $dates = [];
      loadModel('log');
      $this->logModel = new LogModel();
      $statistics = [];
      for ($i=0; $i < 8; $i++) { 
        $on =  date('Y-m-d',strtotime('-'.$i.'days'));
        $filter = 
        [
          "userId"=>$clientUserId,
          "deploymentId"=>$deploymentId,
          "companyId"=>$this->companyId,
          "on"=>$on,
          "startdate"=>$startdate,
          "enddate"=>$enddate,
          "statuscode"=>$statuscode,
          "servicecode"=>$servicecode,
          "type"=>$type 
        ];
        $data = $this->logModel->searchStatistics($filter);
        $data = $data ?: ['total'=>0];
        $statistics[] = ['date'=>$on,'value'=>$data['total']];
      }
      $response = ['status'=>true,'message'=>'Daily usage statistics retrieved successfully','data'=>$statistics];
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
    public function statistics()
    {
      extract($_GET);
      $userid = $userid ?? '';
      $on = $on ?? '';
      $error = false;
      $type = $type ?? '';
      $enddate = $enddate ?? '';
      $clientid = $clientid ?? '';
      $startdate = $startdate ?? '';
      $statuscode   = $statuscode ?? '';
      $servicecode  = $servicecode ?? '';
      $clientUserId = $clientid ?? '';
      $deploymentId = $deploymentid ?? '';

      loadModel('log');
      loadModel('deployment');
      loadController('user');
      $this->deploymentModel = new DeploymentModel();
      $this->logModel = new LogModel();
      $deployment  = $this->deploymentModel->getDeploymentById($deploymentId);
      if(!$deployment) $user = User::validateUser($userid);
      else $user = User::validateUser($deployment['user_id']);
      if(!$deployment && !$user) $error = 'Request could not be authenticated';
      $clientUserId = $user['role'] == 'admin' ? ($clientid ??  '') : ( $deployment ? $deployment['user_id'] : $userid);

      $filter = 
      [
        "userId"=>$clientUserId,
        "deploymentId"=>$deploymentId,
        "companyId"=>$this->companyId,
        "on"=>$on,
        "startdate"=>$startdate,
        "enddate"=>$enddate,
        "statuscode"=>$statuscode,
        "servicecode"=>$servicecode,
        "type"=>$type 
      ];

      $data = $this->logModel->searchStatistics($filter);
      $data = $data ?: ['total'=>0,'error'=>0,'success'=>0,'cancelled'=>0];
        
      $response = ['status'=>true,'message'=>'Statistics fetch success','data'=>$data];
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }
  }
  
?>