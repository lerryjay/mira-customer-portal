<?php
  /**
  * Tciket controller class
  */
  class Ticket extends Controller
  {
    /**
    * Default function in class 
    * retrieves user tickets if role is user, 
    * retrieves comapny tickets if role is user
    * 
    * @param HTTPPOSTPARAMS $_POST - userid
    * @return JSONRESPONSE 
    **/
    public function index()
    {
      $response =  [
        "status"=>true,
        "data"=>[],
        "message"=>"No ticket records!"
      ];

      extract($_GET);
      loadModel('ticket');
      loadController('user');
      $this->ticketModel = new TicketModel();

      $userId     = isset($userid) ? $userid : $this->userId;
      $on         = isset($on) ? $on : '';
      $type       = isset($type) ? $type : '';
      $limit      = isset($limit) ? $limit : 25;
      $pageno     = isset($pageno) ? $pageno : 1;
      $enddate    = isset($enddate) ? $enddate : '';
      $startdate  = isset($startdate) ? $startdate : '';
      $customerId = isset($customerid) ? $customerid : null;
      $user = User::validateUser($userId);
      $filters = ($user['role'] == 'user') ? 
      [
        "customerId"=>$userid,
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
        "customerId"=>$customerId, 
        "on"=>$on,
        "startdate"=>$startdate,
        "enddate"=>$enddate,
        "type"=>$type
      ];
      $hasTickets =   $this->ticketModel->searchTicket($filters);
      if($hasTickets){
        $response['data'] = $hasTickets;
        $response['message'] = "Ticket records found";
      }
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }

    /**
     * Creates a new ticket for
     *  the given customer of a specific company
     *
     * @param HTTPPOSTPARAMS $_POST - companyId,customerid,title,message,type - request,complaint,enquiry -,files, 
     * @return JSONRESPONSE 
     **/
    public function add()
    {
      $response =  [
        "status"=>false,
        "data"=>[],
        "message"=>"Error creating ticket!"
      ];

      $data = $this->validateNewTicket();
      extract($data);
      
      if(isset($_FILES['files']) && count($_FILES['files']) > 0){
        $files = File::upload("files",'ticket',true);
        if($files['data']) $files = json_encode($files['data']);
        else $files   = json_encode([]);
      }else $files   = json_encode([]);
      
      $add = $this->ticketModel->addTicket($user['company_id'],$productId,$customerId,$title,$type,$message,$files,'pending');
      if($add){
        $response['status'] = true;
        $response['message'] = "Ticket created successfully";
        $response['data'] = ['ticketid'=>TICKET_PREFIX.'-'.$add];
      }
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }

    /**
     * Validates creating a new ticket
     *
     * @param HTTPPOSTPARAMS $_POST - companyId,customerid,title,message,type - request,complaint,enquiry -,files, 
     * @return User Array if data is valid else exits the application with appropriate response 
     **/
    public function validateNewTicket()
    {
      extract($_POST);
      $userId      = $this->userId ?? $userid ??  '';
      $title       = isset($title) ? $title : '';
      $message     = isset($message) ? $message : '';
      $type        = isset($type) ? $type : '';
      $customerId  = $customerid ?? '';
      $productId   = $productid ?? '';
      $typeError   = Validate::select($type,['request','complaint','enquiry']);
      if($typeError){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Please select the nature of the ticket', 'data'=>['field'=>'type']]));
      } 
      
      $messageError =  Validate::string($message,false,false,1);
      if($messageError){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Please enter a breif description of the issue', 'data'=>['field'=>'message']]));
      } 

      loadController('user');
      $user = User::validateUser($userId);
      $customerId = $user['role'] == 'user' ? $userId : $customerId;
      if($user['role'] == 'admin')
      {
        $this->userModel = new UserModel();
        $customer = $this->userModel->getUser($customerId);
        if(!$customer){
          $this->setOutputHeader(['Content-type:application/json']);
          $this->setOutput(json_encode(['status'=>false, 'message'=>'Please enter a customerid', 'data'=>['field'=>'customerid']]));
        }
      }

      loadModel('ticket');
      $this->ticketModel = new TicketModel();
      return ['title'=>$title,'message'=>$message,'type'=>$type,'customerId'=>$customerId,'userId'=>$userId,'productId'=>$productId,'user'=>$user];
    }

    /**
     * retrieves the ID of a ticket
     *
     * @param String $ticket Id iof ticket to be retrieved
     * @return type
     **/
    public function getticket()
    {
      $data = $this->validateUserTicketPermission();
      extract($data);

      $response['status']   = true;
      $response['message']  = 'Ticket data retrived';
      $response['data']     = $ticket;

      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }

    /**
     * Reply to an open ticket
     *
     * @param HTTPPOSTPARAMS $_POST - userid,message, files
     * @return JSONRESPONSE
     **/
    public function replyticket()
    {
      $response =  [
        "status"=>false,
        "data"=>[],
        "message"=>"Error saving ticket reply!"
      ];
      $data   = $this->validateTicketReply();
      extract($data);   
      loadModel('file');
      if($userId == $ticket['customer_id'] || $user['role'] == 'admin'){
        if(isset($_FILES['files'])){
          $files = File::upload("files",'ticket',true);
          if($files['status']) $files = json_encode($files['data']);
          else $files   = "[]";
        }else $files   = "[]";
        $saved = $this->ticketModel->addChat($ticketid,$message,$files,$userId,$user['role']);
        if($saved){
          $response['status']  = true;
          $response['message'] = 'Ticket reply success';
          $response['data'] = ['replyid'=>$saved];
        }else $response['message'] = "Unexpected error saving ticket reply!";
      }else $response['message'] = "You do not have the authority to perform this action!";
      
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }

    /**
     * Validates the ticket reply
     *
     * 
     * @param HTTPPOSTPARAMS  - ticketId,userId,message,files
     * @return TICKETREPLYDATAOBJECT
     **/
    public function validateTicketReply()
    {
      extract($_POST);
      $userId      = isset($userid) ? $userid : '';
      $ticketId      = isset($ticketid) ? $ticketid : '';
      $message     = isset($message) ? $message : '';
      $files       = isset($files) ? $files : '';
      loadController('user');
      $user = User::validateUser($userId); 

      $messageError =  Validate::string($message,false,false,1);
      if($messageError){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid ticket message', 'data'=>['field'=>'message']]));
      } 
      loadModel('ticket');
      $this->ticketModel = new TicketModel();
      $ticket = $this->ticketModel->getTicketById($ticketId);
      if(!$ticket || $ticket['ticketstatus'] == 'closed'){
        $message = !$ticket ?  "Invalid ticket!" : "This ticket has been closed no further replys can be submitted";
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>$message]));
      }
      if($user['company_id'] !== $ticket['company_id']){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>"You do not have the permission to perform this action!"]));
      }

      return ['message'=>$message,'files'=>$files,'user'=>$user,'userId'=>$userId,'ticket'=>$ticket,'ticketid'=>$ticketId];
    }

    /**
     * replys 
     *
     * @param HTTPPOSTPARAMS $var replys
     * @return JSONRESPONSE
     **/
    public function replys()
    {
      $response =  [
        "status"=>false,
        "data"=>[],
        "message"=>"Error fetching tickets replys!"
      ];
      $data = $this->validateUserTicketPermission();
      extract($data);

      
      $data = $this->ticketModel->getChatsByTicketId($ticketId);
      if($data){
        $response['status'] = true;
        $response['data'] = $data;
        $response['message'] = 'Ticket replys fetched successfully';
      }else $response['message'] = 'Ticket has no reply\'s yet';
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }
    
    
    
    /**
     * Update the status of a ticket
     *
     * @param HTTPPOSTPARAMS  - ticketId,status
     * @return JSONRESPONSE
     **/
    public function updatestatus()
    {
      $response =  [
        "status"=>false,
        "data"=>[],
        "message"=>"Error fetching replys!"
      ];
      $data = $this->validateUserTicketPermission();
      extract($data);

      $updated = $this->ticketModel->updateTicketStatus($tciketId,$status);
      if($updated['status']){
        $response['status'] = true;
        $response['message'] = ['Ticket status updated successfully'];
      }else $response['message'] = "An unexpected error occured. Please try again later";
      
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
      
    }
    
    /**
     * Access control for the ticket data
     *
     * @param HTTPPOSTPARAMS  - ticketId,userId
     * @return JSONRESPONSE
     **/
    public function validateUserTicketPermission()
    {
      extract($_GET);
      extract($_POST);
      loadModel('ticket');
      loadController('user');
      
      $userId   = isset($userid) ? $userid : '';
      $ticketId = isset($ticketid) ? $ticketid : '';
      $user     = User::validateUser($userId);

      $this->ticketModel = new TicketModel();
      $ticket   = $this->ticketModel->getTicketById($ticketId);
      
      if(!$ticket){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>"Invalid ticket!"]));
      }elseif($user['company_id'] !== $ticket['company_id']){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>"You do not have the permission to perform this action!"]));
      }elseif($user['role'] == 'admin' || $user['id'] == $ticket['customer_id']) return ['user'=> $user,'ticket'=>$ticket,'ticketId'=>$ticketId,'userId'=>$userId];

    }
  }
?>