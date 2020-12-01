<?php

  /**
   * undocumented class
   */
  class Wallet extends Controller
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
    public function fund()
    {
      loadController('user');
      extract($_POST);
      $userid       = $userid ?? '';
      $amount       = $amount ?? 0;
      $description  = $description ?? 'Add wallet fund';
      $error        = false;
      $user         = User::validateUser($userid);
      $clientUserId = $user['role'] == 'admin' ? $clientid ??  '' : $userid;
      $tlog         = $tlog ?? date('Y-m-d H:i:s').'|'.$clientUserId;
      loadModel('client');
      loadModel('wallet');

      $this->clientModel  = new ClientModel();
      $client = $this->clientModel->getClientByUserId($clientUserId);
      if(!$client){
        $error = 'Client does not exist'; 
      }
      

      $invalidAmount = Validate::float($amount);
      if($invalidAmount) $error = 'Invalid fund amount';

      $this->walletModel = new WalletModel();
      if(!$error){
        $funded = $this->walletModel->addTransaction($this->companyId,$clientUserId,$amount,'0',$description,$tlog);
        if($funded)  $response = ['status'=>true,'message'=>'Wallet funded successfuly'];
      }else $response = ['status'=>false,'message'=>'Error funding waller'.$error];
      $this->setOutputHeader(['Content-type:application/jso n']);
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
    public function servicecharge()
    {
      extract($_POST);
      loadModel('service');
      loadModel('deployment');
      loadModel('wallet');

      $error        = false;
      $debit        = false;
      $service      = [];
      $deployment   = [];
      $servicecode  = $servicecode ?? '';
      $deploymentId = $deploymentid ?? '';
      $extraCharge  = $extra ?? 0;

      $this->serviceModel = new ServiceModel();
      $this->deploymentModel = new DeploymentModel();

      $deployment = $this->deploymentModel->getDeploymentById($deploymentId);
      if(!$deployment) $error = 'Invalid deployment ID supplied';
      
      if(!$error) $service = $this->serviceModel->getServiceByCode($servicecode);
      if(!$service && !$error) $error = 'Service not recognised';

      if(!$error){
        $clientUserId = $deployment['user_id'];
        $tlog         = $tlog ?? date('Y-m-d H:i:s').'|'.$clientUserId;
        $description  = $description ?? $service['title'];
        $this->walletModel = new WalletModel();
        $balance = $this->walletModel->getUserWalletBalance($clientUserId);
        $tAmount = $service['cost'] + $extraCharge;
        
        if($balance < $tAmount){
          $response = ['status'=>false,'message'=>'Insufficient funds'];
        }else{ 
          $debit    = $this->walletModel->addTransaction($this->companyId,$clientUserId,0,$tAmount,$description,$tlog);
          $response = ['status'=>true,'message'=>'Transaction successful'];
        }
      }else $response = ['status'=>false,'message'=>'Transaction failed: '.$error];
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
    public function debit()
    {
      loadController('user');
      extract($_POST);
      $userid       = $userid ?? '';
      $clientUserId = $clientid ?? '';
      $amount       = $amount ?? 0;
      $description  = $description ?? '';
      $error        = false;
      $user         = User::validateUser($userid);
      $clientUserId = $user['role'] == 'admin' ? $clientid ??  '' : $userid;
      $tlog         = $tlog ?? date('Y-m-d H:i:s').'|'.$clientUserId;
      loadModel('client');
      loadModel('wallet');

      $this->clientModel  = new ClientModel();
      $client = $this->clientModel->getClientByUserId($clientUserId);
      if(!$client){
        $error = 'Client does not exist'; 
      }

      $invalidAmount = Validate::float($amount);
      if($invalidAmount) $error = 'Invalid fund amount';
      $this->walletModel = new WalletModel();
      $balance = $this->walletModel->getUserWalletBalance($clientUserId);
      if($amount > $balance) $error = 'Insufficient Funds';

      $this->walletModel = new WalletModel();
      if(!$error){
        $funded = $this->walletModel->addTransaction($this->companyId,$clientUserId,0,$amount,$description,$tlog);
        if($funded)  $response = ['status'=>true,'message'=>'Wallet debited successfuly'];
      }else $response = ['status'=>false,'message'=>'Debit error:'.$error];
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
    public function transactions()
    {
      extract($_GET);
      
      $error  = false;
      $userid = $userid ?? '';

      if(isset($deploymentid)){
        loadModel('user');
        loadModel('deployment');
        $this->deploymentModel = new DeploymentModel();
        $deployment = $this->deploymentModel->getDeploymentById($deploymentid);
        if($deployment){
          $this->userModel = new UserModel();
          $user        = $this->userModel->getUserById($deployment['user_id']);
          $customerId  = $user['id'];
          $sender      = $sender ?? '';  
          $senderEmail = $senderemail ?? ''; 
        }
        }else{
          loadController('user');
          $user = User::validateUser($userid);
        }
      

      loadModel('client');
      loadModel('wallet');

      $userId     = isset($userid) ? $userid : $this->userId ?? '';
      $on         = isset($on) ? $on : '';
      $type       = isset($type) ? $type : '';
      $limit      = isset($limit) ? $limit : 25;
      $pageno     = isset($pageno) ? $pageno : 1;
      $enddate    = isset($enddate) ? $enddate : '';
      $startdate  = isset($startdate) ? $startdate : '';
      $clientid   = isset($clientid) ? $clientid : null;
      $user = User::validateUser($userId);

      $filters = ($user['role'] == 'user') ? 
      [
        "userId"=>$userid,
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
        "userId"=>$clientid, 
        "on"=>$on,
        "startdate"=>$startdate,
        "enddate"=>$enddate,
        "type"=>$type
      ];
      $this->walletModel = new WalletModel();
      $transactions = $this->walletModel->searchTransactions($filters);
      if($transactions){
        $response = ['status'=>true,'message'=>'Wallet transactions retrieved successfuly', 'data'=>$transactions];
      }else $response = ['status'=>false,'message'=>'Error fetching transactions'.$error];

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
    public function balance()
    {
      extract($_GET);
      loadModel('wallet');
      loadModel('deployment');
      loadController('user');
      $this->walletModel = new WalletModel();
      $this->deploymentModel = new DeploymentModel();


      $error        = false;
      $userId       = $userid ??  '';
      $clientUserId = $clientid ?? '';
      $deploymentId = $deploymentid ?? '';

      $user = [];
      $deployment  = $this->deploymentModel->getDeploymentById($deploymentId);
      if(!$deployment) $user = User::validateUser($userId);
      else $user = User::validateUser($deployment['user_id']);
      if(!$deployment && !$user) $error = 'Request could not be authenticated';

      $clientUserId = $user['role'] == 'admin' ? ($clientid ??  '') : $userid;
      if(!$error){
        $balance = $this->walletModel->getUserWalletBalance($clientUserId) ?: 0;
        $response = ['status'=>true,'message'=>'Your wallet balance is '.$balance, 'data'=>$balance];
      }else ['status'=>true,'message'=>'Error fetching balance: '.$error, 'data'=>$balance];

      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }

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
        'groupby'=> $groupby // 'servicecode, w.tdate'
      ];
      loadModel('wallet');
      $this->walletModel = new WalletModel();
      $transactions      = $this->walletModel->whatever($filters);
      if($transactions){
        $response = ['status'=>true,'message'=>'Wallet report retrieved successfuly', 'data'=>$transactions];
      }else $response = ['status'=>false,'message'=>'Error fetching report'];

      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }
  }
  

?>