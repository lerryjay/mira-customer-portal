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
      $user = User::validateUser($userid);
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
      $user = User::validateUser($userid);
      $customerId = $user['role'] == 'user' ? $userid : $customerId;
      $add = $this->ticketModel->addTicket($user['company_id'],$productId,$packageId,$customerId,$title,$type,$message,$files,'pending');
      if($add['status']){
        $response['status'] = true;
        $response['message'] = "Ticket created successfully";
        $response['data'] = ['ticketid'=>TICKET_PREFIX.$add['data']['insertId']];
      }
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
      extract($_POST);
      $user = User::validateUser($userid); 
      $ticket = $this->ticketModel->getTicketById($ticketid);
      if($ticket || $ticket['ticketstatus'] == 'closed'){
        if($userid == $ticket['customer'] || $user['role'] == 'admin'){
          if($_FILES['file']){
            $files = $this->moveUploadedFiles();
            if($files) $files = json_encode($files['datat']);
          }else $files = "[]";
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

      if($_FILES['file']){
        $files = $this->moveUploadedFiles();
        if($files) $files = json_encode($files['datat']);
      }else $files = "[]";
      $saved = $this->ticketModel->addTicketChat($ticket['id'],$message,$files,$user['id'],$user['role']);
      if($saved){
        $response['status']  = true;
        $response['message'] = 'Ticket reply success';
      }else $response['message'] = "Unexpected error saving ticket reply!";
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
      $user = User::validateUser($userid); 
      $ticket = $this->ticketModel->getTicketById($ticketid);
      if($ticket || $ticket['ticketstatus'] != 'closed'){
        if($user['id'] == $ticket['customer'])return ['user'=> $user,'ticket'=>$ticket];
        else $response['message'] = "You do not have the authority to perform this action!";
      }else $response ['message'] = !$ticket ?  "Invalid ticket!" : "This ticket has been closed no further replys can be submitted";
      $response['status']   = false;
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($response));
    }
  }
?>