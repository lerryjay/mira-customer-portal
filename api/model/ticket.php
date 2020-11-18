<?php
/** 
*
*Base Ticket Model Class
*
**/
  class TicketModel extends Model
  
  {
    /**
     * undocumented function summary
     *
     * Undocumented function long description
     *
     * @param String $companyId preegistered company Id tciket belongs to.
     * @param String $productId preregistered product Id tciket refers to.
     * @param String $customerId Userid of the sender .
     * @param String $title Title of the ticket.
     * @param String $title Ticket type.
     * @param String $message Description of the title.
     * @param String $files Registered company Id ticket belongs to.
     * @return Array [ status : boolean,message:string, data ?: Array['insertId':integer ] ]
     **/
    public function addTicket($companyId,$deploymentId,$customerId,$title,$type,$message,$sender,$senderEmail,$files,$status = 'pending'){
  
      $id = rand(10000,99999999);
      $insert =  $this->insert('tickets',['id'=>$id,'deployment_id'=>$deploymentId,'customer_id'=>$customerId,'title'=>$title,'createdat'=>date("Y-m-d H:i:s"),'message'=>$message,'company_id'=>$companyId,'type'=>$type,'files'=>$files,'ticketstatus'=>$status, 'sender'=>$sender,'senderemail'=>$senderEmail]);
      if($insert) return $id;
      else false;
    }
    
    /**
     * Adds a ticket function long description
     *
     * @param Integer $ticketId Id of tiket to add chat
     * @param Integer $senderId Userid of the sender .
     * @param String $message reply message.
     * @param String $files attached files.
     * @return Array [ status : boolean,message:string, data ?: Array['insertId':integer ] ]
     **/
    public function addChat($ticketId,$message,$files,$senderId,$senderRole,$sender,$senderEmail)
    {
      $id = uniqid();
      $insert =  $this->insert('ticketchat',['id'=>$id,'ticket_id'=>$ticketId,'sender_id'=>$senderId,'role'=>$senderRole,'sender'=>$sender,'senderemail'=>$senderEmail,'message'=>$message,'files'=>$files,'createdat'=>date("Y-m-d H:i:s")]);
      if($insert['status']) return $id;
      else return false;
    }

    /**
     * Updates the status of  a ticket.
     *
     * @param Integer $ticketId Id of tiket to add chat
     * @param String $status current status of the ticket.
     * @return Array [ status : boolean,message:string, data ?: Array['insertId':integer ] ]
     **/
    public function updateTicketStatus($ticketId,$status)
    {
      return $this->update('tickets',['ticketstatus'=>$status],['id'=>$ticketId]);
    }
    public function deleteTicket($ticketId)
    {
         return $this->update('tickets',['status'=>0],['id'=>$ticketId]);
    }
      /**
     * Retrieve tickets .
     *
     * @param String $condition  - Query ticket condition
     * @param String $string String represenntation of values passed e.g name:String,id:integer = 'si'.
     * @param Array $values values to be passed to the query
     * @return Array [ status : boolean,message:string, data ?: Array['insertId':integer ] ]
     **/
    public function getTickets($condition = '',$string = '',$values = [])
    {
      $sql = 'SELECT *, (SELECT businessname FROM clients WHERE user_id = customer_id) AS businssname, (SELECT firstname FROM users WHERE id = customer_id) AS clientname,  (SELECT email FROM users WHERE id = customer_id) AS email FROM tickets '.$condition;
      $query = $this->query($sql,$string,$values); 
      if($query) return $this->rows;
      else return false;
    }

    /**
     * Returns a database ticket object
     *
     * @param SQLQUERY~WHERE $condition to search ticket with
     * @param string $string SQL bindParam alphabet representation of $values '' e.g 'sis' - string,int,string
     * @param values $values SQL bindParam values
     * @return bool or @return DATABASETICKETOBEJCT 
     **/
    public function getTicket($condition = '',$string = '',$values = [])
    {
      $sql = 'SELECT *, (SELECT businessname FROM clients WHERE user_id = customer_id) AS businssname, (SELECT CONCAT(firstname) FROM users WHERE id = customer_id) AS clientname,  (SELECT email FROM users WHERE id = customer_id) AS email FROM tickets '.$condition;
      $query = $this->query($sql,$string,$values); 
      if($query) return $this->row;
      else return false;
    }

    /**
     * Returns a ticket by its Id
     *
     * @param UUID $ticketId primary key if the ticket table for the requested ticket
     * @return bool or @return DATABASETCIKETOBEJCT 
     **/
    public function getTicketById($ticketId,$status = 1)
    {
      return $this->getTicket('WHERE id = ? AND status = ? ','si',[$ticketId,$status]);
    }
    public function searchTicket($filter = [],$status = 1)
    {
      $conditions  = '';
      $conditions .= isset($filter['ticketId']) && $filter['ticketId'] != NULL ? " AND ticket_id = '".$filter['ticketId']."'" : "";
      $conditions .= isset($filter['type']) && $filter['type'] != NULL  ? " AND type = '".$filter['type']."'" : "";
      $conditions .= isset($filter['userId']) && $filter['userId'] != NULL  ? " AND customer_id = '".$filter['userId']."'" : "";
      $conditions .= isset($filter['deploymentId']) && $filter['deploymentId'] != NULL  ? " AND deployment_id = '".$filter['deploymentId']."'" : "";
      $conditions .= isset($filter['senderEmail']) && $filter['senderEmail'] != NULL  ? " AND senderemail = '".$filter['senderEmail']."'" : "";
      $conditions .= isset($filter['companyId']) && $filter['companyId'] != NULL  ? " AND company_id = '".$filter['companyId']."'" : "";
      $conditions .= isset($filter['on'])  && $filter['on'] != NULL ? " AND createdat LIKE '%".$filter['on']."%'" : "";
      $conditions .= isset($filter['startDate'])  && $filter['startDate'] != NULL ? " AND createdat >= '".$filter['startDate']."'" : "";
      $conditions .= isset($filter['endDate']) && $filter['endDate'] != NULL  ? " AND createdat <= '".$filter['endDate']."'" : "";

      $conditions .= isset($filter['order_by']) ? " ORDER BY ".$filter['order_by'] : " ORDER BY createdat";
      $conditions .= isset($filter['order']) ? " ".$filter['order'] : " DESC";

      $limit       = (int) isset($filter['limit']) ? $filter['limit'] : 20;
      $pageno      = (string) isset($filter['pageno']) ? $filter['pageno'] : 1;
      $conditions .= ' LIMIT '.(string) $limit;
      $conditions .= ' OFFSET '.(string) (($pageno - 1 ) * $limit);
      // $conditions  = ltrim($conditions,'AND');
      return $this->getTickets('WHERE status = ? '.$conditions,'i',[$status]);
    }
    
    
    public function getTicketFilterTotal($filter = [],$status = 1)
    {
      $conditions  = '';
      $conditions .= isset($filter['ticketId']) && $filter['ticketId'] != NULL ? " AND ticket_id = '".$filter['ticketId']."'" : "";
      $conditions .= isset($filter['type']) && $filter['type'] != NULL  ? " AND type = '".$filter['type']."'" : "";
      $conditions .= isset($filter['deploymentId']) && $filter['deploymentId'] != NULL  ? " AND deployment_id = '".$filter['deploymentId']."'" : "";
      $conditions .= isset($filter['senderEmail']) && $filter['senderEmail'] != NULL  ?  "AND senderemail = '".$filter['senderEmail']."'" : "";
      $conditions .= isset($filter['userId']) && $filter['userId'] != NULL  ? " AND customer_id = '".$filter['userId']."'" : "";
      $conditions .= isset($filter['companyId']) && $filter['companyId'] != NULL  ? " AND company_id = '".$filter['companyId']."'" : "";
      $conditions .= isset($filter['on'])  && $filter['on'] != NULL ? " AND createdat LIKE '%".$filter['on']."%'" : "";
      $conditions .= isset($filter['startDate'])  && $filter['startDate'] != NULL ? " AND createdat >= '".$filter['startDate']."'" : "";
      $conditions .= isset($filter['endDate']) && $filter['endDate'] != NULL  ? " AND createdat <= '".$filter['endDate']."'" : "";

      $conditions .= isset($filter['order_by']) ? " ORDER BY ".$filter['order_by'] : " ORDER BY createdat";
      $conditions .= isset($filter['order']) ? " ".$filter['order'] : " DESC";

      $limit       = (int) isset($filter['limit']) ? $filter['limit'] : 20;
      $pageno      = (string) isset($filter['pageno']) ? $filter['pageno'] : 1;
      
      return $this->getTickets('WHERE status = ? '.$conditions,'i',[$status]);
    }

    /**
     * Retrieves chats
     *
     * @param QueryConditionString $condtion - Condition  for retrieving packages
     * @param BindStrings $string  bind string for all parameters passed e.g 'ssii' for string,string,int,int
     * @param BindValues $values
     * @return bool false if query fails or @return object if query passes
     **/
    public function getChats($condition = '',$string = '',$values = [])
    {
      $sql = 'SELECT * FROM ticketchat '.$condition;
      $query = $this->query($sql,$string,$values); 
      if($query) return $this->rows;
      else return false;
    }

    /**
     * Retrieves a ticketchat
     *
     * @param QueryConditionString $condtion - Condition  for retrieving packages
     * @param BindStrings $string  bind string for all parameters passed e.g 'ssii' for string,string,int,int
     * @param BindValues $values
     * @return bool false if query fails or @return object if query passes
     **/
    public function getChat($condition = '',$string = '',$values = [])
    {
      $sql = 'SELECT * FROM ticketchat '.$condition;
      $query = $this->query($sql,$string,$values); 
      if($query) return $this->row;
      else return false;
    }

    /**
     * Retrieves all the chat for a ticket
     *
     * @param UUID $ticketId primary key if the ticket table for the requested ticket
     * @param Int $status 
     * @return bool or @return DATABASETICKETOBEJCT 
     **/
    public function getChatsByTicketId($ticketId,$status = 1)
    {
      return $this->getChats('WHERE ticket_id = ? AND status =  ?','si',[$ticketId,$status]);
    }

    
    /**
     * Retrieves all the chat for a ticket
     *
     * @param UUID $chatId primary key if the chat table for the requested ticket
     * @param Int $status 
     * @return bool or @return DATABASETICKETOBEJCT 
     **/
    public function getChatByChatId($chatId,$status = 1)
    {
      return $this->getChat('WHERE id = ? AND status =  ?','si',[$chatId,$status]);
    }


    /**
     * Retrieves all the chat for a ticket
     *
     * @param UUID $chatId primary key if the chat table for the requested ticket
     * @param Int $status 
     * @return bool or @return DATABASETICKETCHATOBJECT 
     **/
    public function getChatByFilter($filter,$status = 1)
    {
      $conditions  = '';
      $conditions .= isset($filter['ticketId']) && $filter['ticketId'] != NULL ? " AND ticket_id = '".$filter['ticketId']."'" : "";
      $conditions .= isset($filter['type']) && $filter['type'] != NULL  ? " AND type = '".$filter['type']."'" : "";
      $conditions .= isset($filter['senderEmail']) && $filter['senderEmail'] != NULL  ? " AND senderemail = '".$filter['senderEmail']."'" : "";
      $conditions .= isset($filter['on'])  && $filter['on'] != NULL ? " AND createdat LIKE '%".$filter['on']."%'" : "";
      $conditions .= isset($filter['startDate'])  && $filter['startDate'] != NULL ? " AND createdat >= '".$filter['startDate']."'" : "";
      $conditions .= isset($filter['endDate']) && $filter['endDate'] != NULL  ? " AND createdat <= '".$filter['endDate']."'" : "";

      $conditions .= isset($filter['order_by']) ? " ORDER BY ".$filter['order_by'] : " ORDER BY createdat";
      $conditions .= isset($filter['order']) ? " ".$filter['order'] : " ASC";

      return $this->getChat("WHERE status =  ? $conditions",'i',[$status]);
    }
  }
?>