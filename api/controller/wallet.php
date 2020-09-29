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
      if(!$error){
        $funded = $this->walletModel->addTransaction($this->companyId,$clientUserId,0,$amount,$description,$tlog);
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
    public function transactions()
    {
      loadController('user');
      extract($_GET);
      $userid       = $userid ?? '';
      $error  = false;
      $user = User::validateUser($userid);

      loadModel('client');
      loadModel('wallet');

      $userId     = isset($userid) ? $userid : $this->userId;
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
      if(!$transactions){
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
      loadController('user');
      $this->walletModel = new WalletModel();

      $userId       = $userid ??  '';
      $clientUserId = $clientid ?? '';

      $user = User::validateUser($userid);
      if($user['role'] == 'user')  $clientUserId = $userId;

      $balance = $this->walletModel->getUserWalletBalance($clientUserId);
      if(!$balance){
        $response = ['status'=>true,'message'=>'Your wallet balance is '.$balance, 'data'=>$balance];
      }else $response = ['status'=>false,'message'=>'An unexpected error occured'.$error];
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }
  }
  

?>