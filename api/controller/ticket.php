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
      $clientid = isset($clientid) ? $clientid : null;
      $user = User::validateUser($userId);
      $filters = ($user['role'] == 'user') ? 
      [
        "userId"=>$userid,
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

        //Send Notification
        $this->sendNewTicketMail(TICKET_PREFIX.'-'.$add,$customer['email'],$customerId !== $userId);
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
      return ['title'=>$title,'message'=>$message,'type'=>$type,'customerId'=>$customerId,'userId'=>$userId,'productId'=>$productId,'user'=>$user,'customer'=>$customer];
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
          if($user['role'] == 'admin'){
            loadModel('user');
            $this->userModel = new UserModel();
            $customer = $this->userModel->getUser($ticket['user_id']);
            $this->sendTicketStatusUpdateMail(TICKET_PREFIX.$ticketId,$customer['email']);
          }
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

      $updated = $this->ticketModel->updateTicketStatus($ticketId,$status);
      if($updated['status']){
        $response['status'] = true;
        $response['message'] = ['Ticket status updated successfully'];
        if($user['role'] == 'admin'){
          loadModel('user');
          $this->userModel = new UserModel();
          $customer = $this->userModel->getUser($ticket['user_id']);
          $this->sendTicketStatusUpdateMail(TICKET_PREFIX.$ticketId,$customer['email']);
        }
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

    /**
     * Sends Notification for new ticket 
     *
     * @param string $ticketId Id of the ticket
     * @param string $email Email address of the customer or client
     * @param bool $byAdmin If Admin opened the ticket
     * @return Array [ status : bool, message: string ]
     **/
    public function sendNewTicketMail($ticketId,$email,$byAdmin = false)
    {
      $html = '<body>
        <div style="background-color:#f0f0f0;top:0;left:0;right:0;bottom:0;position:relative;width:100%;display:flex;height:100vh">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family: Fakt Pro,Segoe UI,SanFrancisco Display,Arial,sans-serif;font-size:14px;background-color:inherit;">
            <tbody>
              <tr>
                <td width="100%" style="padding:5% 0">
                  <table width="95%" cellpadding="0" cellspacing="0" border="0" align="center">
                    <tbody>
                        <tr>
                            <td align="center" width="100%"
                                style="background-color:#fff;box-shadow:1px 2px 10px 3px #d8d8d8;">
                                <!-- Header -->
                                <table>
                                    <tbody>
                                        <tr>
                                            <td style="padding:10% 0">
                                                <img src="https://miratechnologiesng.com/img/icons/miraicon.png" alt="miratechnologies_Logo" width="70">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <!-- /Header -->
                                <hr align="center" width="75%" style="color:#ffffff">

                                <!-- Body -->
                                <table align="center" width="75%" cellspacing="0" cellpadding="10">
                                    <tbody>
                                        <tr>
                                            <td>'.
                                            (
                                            $byAdmin ?
                                              '<p style="font-family:inherit;color:#222;outline:none;margin:0;padding:0;font-size:12px">
                                                      A ticket has been created for you on our platform and is being attended to, for
                                                      reference purpose we have assigned this ticket&#95;id
                                                      to your ticket. Please visit <a href="http://www.miratechnologies.com.ng/ticket">Our Platform</a> to monitor the progress of yout ticket
                                                      <br />
                                                  </p>'
                                              : 
                                              '<p style="font-family:inherit;color:#222;outline:none;margin:0;padding:0;font-size:12px">
                                                    Your ticket has been created and is being attended to, for
                                                    reference purpose we have assigned this ticket&#95;id
                                                    to your ticket.
                                                    <br />
                                                </p>'
                                              ).'
                                                <h4>
                                                    Ticket&#95;ID&nbsp;&#58;&nbsp;
                                                    <span  style="font-style: oblique;letter-spacing: 1px;font-weight: 500;font-size: 14px;">&#35;'.$ticketId.' </span>
                                                </h4>
                                                <h4>
                                                    Date&nbsp;&#58;&#8259;&nbsp;
                                                    <span style="font-style: oblique;letter-spacing: 1px;font-weight: 500;font-size: 14px;">'.date('Y-m-d').'</span>
                                                </h4>
                                                <h4>
                                                    Time&nbsp;&#58;&#8259;&nbsp;<span
                                                        style="font-style: oblique;letter-spacing: 1px;font-weight: 500;font-size: 14px;">'.date("H : i").'/span>
                                                </h4>
                                                <p
                                                    style="font-family:inherit;color:#222;outline:none;margin:0;padding:0;font-size:12px">
                                                    Visit your dashboard to monitor the progress of your ticket
                                                    <br /><br />
                                                    <strong>
                                                      <span style="padding:10px 0;font-weight: bold;color:#222">
                                                           Mira Technologies 
                                                      </span>
                                                    </strong>
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <!-- /Body -->
                                <hr align="center" width="75%" style="background-color:white;color:white">

                                <!-- For Spacing -->
                                <table align="center" width="75%" cellspacing="0" cellpadding="0"
                                    bgcolor="#01579b" style="padding: 30px 10px;">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <h5 style="text-align:center;color:#eee;padding-bottom: 20px;font-size: 12px;">
                                                <br />&quot;Mira Technologies. Secure software solutions you can trust.&quot;</h5>

                                            </td>
                                        </tr>

                                        <tr>
                                            <td align="center" style="color:#aaa">
                                                <p style="color:#ddd;font-size: 12px;">29, Oritshe Street, Off
                                                    Awolowo Way, by Balogun Bus-Stop, Ikeja, Lagos, Nigeria.</p>
                                                <p style="color:#ddd;font-size: 12px;">
                                                    <strong>Email</strong>:&nbsp;<a
                                                        href="mailto:info@miratechnologiesng.com"
                                                        style="text-decoration: none;color:#ddd">info@miratechnologiesng.com,</a>
                                                    <strong>Whatsapp</strong>:&nbsp;<a
                                                        href="https://api.whatsapp.com/send?phone=2348139432906&text=I%20want%20to%20find%20out%20about%20your%20products"
                                                        style="text-decoration: none;color:#ddd">&nbsp;+2348139432906</a>
                                                </p>

                                                <p style="color:#ddd;font-size: 12px;">Copyright &copy; 2020<a
                                                        href="https://www.miratechnologiesng.com/"
                                                        style="text-decoration: none;color:#ddd;font-size: 12px;">&nbsp;Mira&nbsp;Technologies</a>&nbsp;<span
                                                        style="border-right: 2px solid #ddd;">&nbsp;</span><a
                                                        href="https://www.miratechnologiesng.com/privacy"
                                                        style="text-decoration: none;color:#ddd;font-size: 12px;">&nbsp;Privacy&ensp;Policy</a>
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <!-- /For Spacing -->

                                <hr align="center" width="75%" style="background-color:white;color:white">

                                <!-- For Spacing -->
                                <table align="center" width="70%" cellspacing="0" cellpadding="0">
                                    <tbody>
                                        <tr>
                                            <td style="padding: 3px 0;"></td>
                                        </tr>
                                    </tbody>
                                </table>
                                

                                <!-- Social media icon -->
                                <table align="center" width="70%" cellspacing="0" cellpadding="0">
                                    <tbody>
                                        <tr>
                                            <td align="center">
                                                <a href="https://www.facebook.com/miratechng"
                                                    style="text-decoration:none" target="_blank">
                                                    <img src="https://bulkmailer.miratechnologies.com.ng/assets/imgs/sm_facebook.png"
                                                        alt="Facebook" title="Facebook" class="CToWUd"
                                                        width="20px">
                                                </a>
                                                <span style="padding: 0 2px;"></span>
                                                <a href="https://www.instagram.com/miratechng"
                                                    style="text-decoration:none" target="_blank">
                                                    <img src="https://bulkmailer.miratechnologies.com.ng/assets/imgs/sm_instagram.png"
                                                        alt="Instagram Handle" width="20px">
                                                </a>
                                                <span style="padding: 0 2px;"></span>
                                                <a href="https://www.linkedin.com/company/miratechnologiesng"
                                                    style="text-decoration:none" target="_blank">
                                                    <img src="https://bulkmailer.miratechnologies.com.ng/assets/imgs/sm_linkedin.png"
                                                        alt="Linkedin Handle" width="20px">
                                                </a>
                                                <span style="padding: 0 2px;"></span>
                                                <a href="https://twitter.com/miratechng"
                                                    style="text-decoration:none" target="_blank">
                                                    <img src="https://bulkmailer.miratechnologies.com.ng/assets/imgs/sm_twitter.png"
                                                        alt="Twitter Handle" width="20px">
                                                </a>
                                            </td>
                                    </tbody>
                                </table>
                                <!-- Social media icon -->
                                <table align="center" width="70%" cellspacing="0" cellpadding="0">
                                    <tbody>
                                        <tr>
                                            <td style="padding-top: 10px;"></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <!-- /For Spacing -->
                            </td>
                        </tr>
                      </tbody>
                    </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </body>';
      $subject = $byAdmin ? 'Ticket : A ticket has been opened for you':'Ticket : Ticket successfully opened!';
      // return Alert::sendMail($email,$subject,$html);
    }

    /**
     * Sends Notification for changes or updates on the ticket 
     *
     * @param string $ticketId Id of the ticket
     * @param string $email Email address of the customer or client
     * @return Array [ status : bool, message: string ]
     **/
    public function sendTicketStatusUpdateMail($ticketId,$email)
    {
      
      $html = '<body>
        <div style="background-color:#f0f0f0;top:0;left:0;right:0;bottom:0;position:relative;width:100%;display:flex;height:100vh">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family: Fakt Pro,Segoe UI,SanFrancisco Display,Arial,sans-serif;font-size:14px;background-color:inherit;">
            <tbody>
              <tr>
                <td width="100%" style="padding:5% 0">
                  <table width="95%" cellpadding="0" cellspacing="0" border="0" align="center">
                    <tbody>
                        <tr>
                            <td align="center" width="100%"
                                style="background-color:#fff;box-shadow:1px 2px 10px 3px #d8d8d8;">
                                <!-- Header -->
                                <table>
                                    <tbody>
                                        <tr>
                                            <td style="padding:10% 0">
                                                <img src="https://miratechnologiesng.com/img/icons/miraicon.png" alt="miratechnologies_Logo" width="70">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <!-- /Header -->
                                <hr align="center" width="75%" style="color:#ffffff">

                                <!-- Body -->
                                <table align="center" width="75%" cellspacing="0" cellpadding="10">
                                    <tbody>
                                        <tr>
                                            <td>
                                              <p style="font-family:inherit;color:#222;outline:none;margin:0;padding:0;font-size:12px">
                                                  An update has been made on your ticket with reference 
                                                      <br />
                                                  </p>
                                              
                                                <h4>
                                                    Ticket&#95;ID&nbsp;&#58;&nbsp;
                                                    <span  style="font-style: oblique;letter-spacing: 1px;font-weight: 500;font-size: 14px;">&#35;'.$ticketId.' </span>
                                                </h4>
                                                <p style="font-family:inherit;color:#222;outline:none;margin:0;padding:0;font-size:12px">
                                                    Please visit your dashboard to verfy and monitor the update
                                                    <br /><br />
                                                    <strong>
                                                      <span style="padding:10px 0;font-weight: bold;color:#222">
                                                           Mira Technologies 
                                                      </span>
                                                    </strong>
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <!-- /Body -->
                                <hr align="center" width="75%" style="background-color:white;color:white">

                                <!-- For Spacing -->
                                <table align="center" width="75%" cellspacing="0" cellpadding="0"
                                    bgcolor="#01579b" style="padding: 30px 10px;">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <h5 style="text-align:center;color:#eee;padding-bottom: 20px;font-size: 12px;">
                                                <br />&quot;Mira Technologies. Secure software solutions you can trust.&quot;</h5>

                                            </td>
                                        </tr>

                                        <tr>
                                            <td align="center" style="color:#aaa">
                                                <p style="color:#ddd;font-size: 12px;">29, Oritshe Street, Off
                                                    Awolowo Way, by Balogun Bus-Stop, Ikeja, Lagos, Nigeria.</p>
                                                <p style="color:#ddd;font-size: 12px;">
                                                    <strong>Email</strong>:&nbsp;<a
                                                        href="mailto:info@miratechnologiesng.com"
                                                        style="text-decoration: none;color:#ddd">info@miratechnologiesng.com,</a>
                                                    <strong>Whatsapp</strong>:&nbsp;<a
                                                        href="https://api.whatsapp.com/send?phone=2348139432906&text=I%20want%20to%20find%20out%20about%20your%20products"
                                                        style="text-decoration: none;color:#ddd">&nbsp;+2348139432906</a>
                                                </p>

                                                <p style="color:#ddd;font-size: 12px;">Copyright &copy; 2020<a
                                                        href="https://www.miratechnologiesng.com/"
                                                        style="text-decoration: none;color:#ddd;font-size: 12px;">&nbsp;Mira&nbsp;Technologies</a>&nbsp;<span
                                                        style="border-right: 2px solid #ddd;">&nbsp;</span><a
                                                        href="https://www.miratechnologiesng.com/privacy"
                                                        style="text-decoration: none;color:#ddd;font-size: 12px;">&nbsp;Privacy&ensp;Policy</a>
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <!-- /For Spacing -->

                                <hr align="center" width="75%" style="background-color:white;color:white">

                                <!-- For Spacing -->
                                <table align="center" width="70%" cellspacing="0" cellpadding="0">
                                    <tbody>
                                        <tr>
                                            <td style="padding: 3px 0;"></td>
                                        </tr>
                                    </tbody>
                                </table>
                                

                                <!-- Social media icon -->
                                <table align="center" width="70%" cellspacing="0" cellpadding="0">
                                    <tbody>
                                        <tr>
                                            <td align="center">
                                                <a href="https://www.facebook.com/miratechng"
                                                    style="text-decoration:none" target="_blank">
                                                    <img src="https://bulkmailer.miratechnologies.com.ng/assets/imgs/sm_facebook.png"
                                                        alt="Facebook" title="Facebook" class="CToWUd"
                                                        width="20px">
                                                </a>
                                                <span style="padding: 0 2px;"></span>
                                                <a href="https://www.instagram.com/miratechng"
                                                    style="text-decoration:none" target="_blank">
                                                    <img src="https://bulkmailer.miratechnologies.com.ng/assets/imgs/sm_instagram.png"
                                                        alt="Instagram Handle" width="20px">
                                                </a>
                                                <span style="padding: 0 2px;"></span>
                                                <a href="https://www.linkedin.com/company/miratechnologiesng"
                                                    style="text-decoration:none" target="_blank">
                                                    <img src="https://bulkmailer.miratechnologies.com.ng/assets/imgs/sm_linkedin.png"
                                                        alt="Linkedin Handle" width="20px">
                                                </a>
                                                <span style="padding: 0 2px;"></span>
                                                <a href="https://twitter.com/miratechng"
                                                    style="text-decoration:none" target="_blank">
                                                    <img src="https://bulkmailer.miratechnologies.com.ng/assets/imgs/sm_twitter.png"
                                                        alt="Twitter Handle" width="20px">
                                                </a>
                                            </td>
                                    </tbody>
                                </table>
                                <!-- Social media icon -->
                                <table align="center" width="70%" cellspacing="0" cellpadding="0">
                                    <tbody>
                                        <tr>
                                            <td style="padding-top: 10px;"></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <!-- /For Spacing -->
                            </td>
                        </tr>
                      </tbody>
                    </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </body>';
      $subject = 'An update has been made on your ticket';
      // return Alert::sendMail($email,$subject,$html);
    }
  }
?>