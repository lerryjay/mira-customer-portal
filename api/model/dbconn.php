<?php 
  // namespace GREY\GCore;
  class Dbconn
  {
		public function connect(){
			global $db_server;
			global $db_user;
			global $db_password;
			global $db; 
			try {
				$this->conn =  new mysqli($db_server, $db_user, $db_password, $db);
				return $this->conn ;
			} catch (Exception $e) {
				return $e;
			}
			
		}
  }
?>