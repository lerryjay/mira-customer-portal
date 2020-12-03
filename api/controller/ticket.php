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
      loadController('user');
      $userId = isset($userid) ? $userid : '';
      $user = User::validateUser($userId);
      $user = $this->userModel->row;
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
        $response['data'] = $hasTickets['data'];
        $response['message'] = "Ticket records found";
      }
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }

    /**
     * Creates a new ticket for the given customer of a specific company
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

      extract($_POST);
      $data = $this->validateNewTicket();
      extract($data);
      loadController('user');
      $user = User::validateUser($userId);
      if($_FILES){
        $files = File::upload("files",'ticket');
        if($files) $files = json_encode($files);
        else $files   = "[]";
      }else $files   = "[]";
      $customerId = $user['role'] == 'user' ? $userId : $customerId;
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
      $userId      = isset($userid) ? $userid : '';
      $customerId  = isset($customerid) ? $customerid : '';
      $title       = isset($title) ? $title : '';
      $message     = isset($message) ? $message : '';
      $type        = isset($type) ? $type : '';
      $productId    = isset($productid) ? $productid : 'all';
      $titleError  = Validate::string($title,false,false,4);
      if($titleError){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid ticket title', 'data'=>['field'=>'title']]));
      } 

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

      loadModel('ticket');
      $this->ticketModel = new TicketModel();
      return ['title'=>$title,'message'=>$message,'type'=>$type,'customerId'=>$customerId,'userId'=>$userId,'productId'=>$productId];
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
      $ticket = $this->ticketModel->getTicketById($ticketid);
      if($ticket || $ticket['ticketstatus'] == 'closed'){
        if($userid == $ticket['customer'] || $user['role'] == 'admin'){
          if($_FILES['file']){
            $files = File::upload("files",'ticket');
            if($files) $files = json_encode($files);
            else $files   = "[]";
          }else $files   = "[]";
          $saved = $this->ticketModel->addTicketChat($ticketid,$message,$files,$userid,$user['role']);
          if($saved){
            $response['status']  = true;
            $response['message'] = 'Ticket reply success';
          }else $response['message'] = "Unexpected error saving ticket reply!";
        }else $response['message'] = "You do not have the authority to perform this action!";
      }else $response ['message'] = !$ticket ?  "Invalid ticket!" : "This ticket has been closed no further replys can be submitted";
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

      $message     = isset($message) ? $message : '';
      $files       = isset($files) ? $files : '';

      $user = User::validateUser($userId); 

      $messageError =  Validate::string($message,false,false,1);
      if($messageError){
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid ticket title', 'data'=>['field'=>'title']]));
      } 
      return ['message'=>$message,'files'=>$files,'user'=>$user,'userId'=>$userId];
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

      loadModel('ticket');
      $this->ticketModel = new TicketModel();

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
      extract($_POST);
      loadModel('user');
      $userId   = isset($userid) ? $userid : '';
      $tciketId = isset($ticketid) ? $ticketid : '';
      $user     = User::validateUser($userId); 
      $ticket   = $this->ticketModel->getTicketById($ticketId);
      if($ticket || $ticket['ticketstatus'] != 'closed'){
        if($user['id'] == $ticket['customer']) return ['user'=> $user,'ticket'=>$ticket,'ticketId'=>$ticketId,'userId'=>$userId];
        else $response['message'] = "You do not have the authority to perform this action!";
      }else $response ['message'] = !$ticket ?  "Invalid ticket!" : "This ticket has been closed no further replys can be submitted";
      $response['status']   = false;
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }
  }
?>