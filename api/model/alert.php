<?php 
  /**
   * Class for sending notifications and alerts
   */
  class Alert
  {
    /**
     * send email to client 
     * @param String $email - recipient email
     * @param String $message - html string message
     * @return bool 
     **/
    public function sendMail($email,$subject,$message)
    {
      require BASE_PATH.'/api/model/phpmailer/class.phpmailer.php';
      $headers = 'MIME-Version: 1.0'. "\r\n";
      $headers .= 'Content-type: text/html; charset=iso-8859' . "\r\n";
      $headers .= "From: notice@habopay.com";
    
      $mail = new PHPMailer;
      $mail->isSMTP();
      $mail->Host = 'mail.mirahpro.com';
      $mail->SMTPSecure = 'ssl';
      $mail->SMTPAuth = true;
      $mail->SMTPDebug = false;
      $mail->ContentType = 'text/html';
      $mail->WordWrap = 300;
      $mail->SMTPOptions = array(
        'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
        )
      );
      //$mail->Host = 'smtp.gmail.com';
      
      //$mail->SMTPSecure = "ssl";                          
      //Set TCP port to connect to
      $mail->Port = 465;        
      $mail->Username = 'habopay@habopayapp.mirahpro.com';
      $mail->Password = 'PasSw0rd75!@#';
      $mail->setFrom('habopay@habopayapp.mirahpro.com');
      $mail->addAddress($email);
      $mail->Subject = $subject;
      $mail->Body = $message;

      if($mail->send()) return ['status'=>true,'message'=>'Message sent!'];
      else return ['status'=>true,'message'=>'Sending failed!'.['data'=> $mail->ErrorInfo]];
    }

    /**
     * send sms function
     *
     * @param Type $var Description
     * @return type
     * @throws conditon
     **/
    public function sendSMS(Type $var = null)
    {
      
    }
  }
?>