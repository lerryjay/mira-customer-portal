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
      
      $userId       = $userid ?? '';
      $count        = $count ?? 1;
      $status       = $status ?? '00';
      $amount       = $amount ?? 0.00;
      $deploymentId = $deploymentid ?? '';
      $servicecode  = $servicecode ?? '';
      $description  = $description ?? '';
      $tdate        = $tdate ?? date('Y-m-d');
      $tlog         = $tlog ?? date('Y-m-d H:i:s').'|'.$amount.'|'.$deploymentid;
      
      $ip    = $ip ?? $_SERVER['REMOTE_ADDR'] ?? '';
      $error = Validate::string($deploymentid,false,true,3,16);

      loadModel('deployment');
      $this->deploymentModel = new DeploymentModel();
      $deployment  = $this->deploymentModel->getDeploymentById($deploymentId);
      if(!$deployment  && !$error) $error = 'Invalid deploymentid provided';

      loadModel('service');
      $this->serviceModel = new ServiceModel();
      $service = $this->serviceModel->getServiceByCode($servicecode);
      if(!$service && !$error) $error = 'Invalid service code';

      loadModel('wallet');
      $this->walletModel = new WalletModel();
      $balance = $this->walletModel->getUserWalletBalance($deployment['user_id']);
      if(!$error  && $service['cost'] != 0 && $service['cost'] > $balance)  $error = 'Insufficient funds';
      if(!$error){
        loadModel('log');
        $userId = $deployment['user_id'];
        $this->logModel    = new LogModel();
        $credit    = $servicecode == 'FUND' ? $amount : 0.00;
        $debit     = $servicecode != 'FUND' ? $amount : 0.00;
        $addWallet = $this->walletModel->addTransaction($this->companyId,$userId,$credit,$debit,$description,$tlog,$tdate);
        $addLog    = $this->logModel->add($this->companyId,$addWallet,$deploymentId,$servicecode,$status,$count,$ip);
        if($addLog)$response = ['status'=>true,'message'=>"Log succsessful"];
        else $response = ['status'=>false,'message'=>'Error saving log'];
      }else  $response = ['status'=>false,'message'=>'Error adding log: '.$error];
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
    public function report()
    {
      extract($_GET);
      $on           = $on ?? '';
      $enddate      = $enddate ?? '';
      $startdate    = $startdate ?? '';
      $description  = $description ?? '';
      $deploymentid = $deploymentid ?? '';
      $debit        = $debit ?? '';
      $credit       = $credit ?? '';
      $order        = $order ?? '';
      $groupby      = $group ?? '';
      $sort         = $sort ?? '';
      $servicecode  = $servicecode ?? '';
      $filters = [
        'on'=>$on,
        'enddate'=>$enddate,
        'startdate'=>$startdate,
        'description'=>$description,
        'servicecode'=>$servicecode,
        'deploymentId'=>$deploymentid,
        'debit'=>$debit,
        'credit'=>$credit,
        'orderby'=>$order,
        'sort'=>$sort,
        'groupby'=> $groupby
      ];
      loadModel('log');
      $this->logModel = new LogModel();
      $transactions      = $this->logModel->aggregateReport($filters);
      if($transactions){
        $response = ['status'=>true,'message'=>'Log report retrieved successfuly', 'data'=>$transactions];
      }else $response = ['status'=>false,'message'=>'Error fetching report'];

      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }

    public function reportInfo()
    {
      extract($_GET);
      $on           = $on ?? '';
      $enddate      = $enddate ?? '';
      $startdate    = $startdate ?? '';
      $description  = $description ?? '';
      $deploymentid = $deploymentid ?? '';
      $debit        = $debit ?? '';
      $credit       = $credit ?? '';
      $order        = $order ?? '';
      $groupby      = $group ?? '';
      $sort         = $sort ?? '';
      $servicecode  = $servicecode ?? '';
      $filters = [
        'startdate'=>$startdate,
        'on'=>$on,
        'description'=>$description,
        'servicecode'=>$servicecode,
        'deploymentId'=>$deploymentid,
        'debit'=>$debit,
        'credit'=>$credit,
        'orderby'=>$order,
        'sort'=>$sort,
        'groupby'=> $groupby
      ];
      loadModel('log');
      $this->logModel = new LogModel();
      $transactions   = $this->logModel->logReport($filters);
      if($transactions){
        $response = ['status'=>true,'message'=>'Wallet report retrieved successfuly', 'data'=>$transactions];
      }else $response = ['status'=>false,'message'=>'Error fetching report'];

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