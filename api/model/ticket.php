<?php
  class TicketModel extends DBModel
  {
    public function addTicket($productId,$packageId,$customerId,$title,$type,$message,$files,$status = 'pending')
    {
      return $this->insert('tickets',['productid'=>$productId,'packageid'=>$packageid,'customerid'=>$customerId,'title'=>$title,'type'=>$type,'message'=>$message,'files'=>$files,'company_id'=>$companyId,'ticketstatus'=>$status,'createdat'=>date("Y-m-d H:i:s")]);
    }
    
    public function addTicketChat($ticketId,$senderId,$message,$files)
    {
      return $this->insert('ticketchat',['ticket_id'=>$ticketId,'senderid'=>$senderId,'message'=>$message,'files'=>$files,'createdat'=>date("Y-m-d H:i:s")]);
    }

    public function updateTicketStatus($ticketId,$status)
    {
      return $this->update('tickets',['ticketstatus'=>$status],['id'=>$ticketId]);
    }

    public function getTickets($condition = '',$string = '',$values = [])
    {
      $sql = 'SELECT * FROM tickets '+$condition;
      $query = $this->query($sql,$string,$values); 
      if($query) return $this->rows;
      else return false;
    }


    public function searchTicket($filter)
    {
      $conditions .= isset($filter['ticketId']) ? "AND ticket_id = ".$filter['ticketId'] : "";
      $conditions .= isset($filter['type']) ? "AND type = ".$filter['type'] : "";
      $conditions .= isset($filter['customerId']) ? "AND customer_id = ".$filter['customerId'] : "";
      $conditions .= isset($filter['on']) ? "AND dateadded = ".$filter['on'] : "";
      $conditions .= isset($filter['startDate']) ? "AND dateadded >= ".$filter['startDate'] : "";
      $conditions .= isset($filter['endDate']) ? "AND dateadded <= ".$filter['endDate'] : "";

      $conditions .= isset($filter['order_by']) ? " ORDER BY ".$filter['order_by'] : "ORDER BY id";
      $conditions .= isset($filter['order']) ? " ".$filter['order'] : " DESC";

      ltrim($conditions,'AND');
      return $this->getTickets($conditions,'',[]);
    }
  }
?>