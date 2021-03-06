<?php
  class Training extends Controller {
    private $url     = 'http://192.168.1.4:8080/training_portal/api/';// = 'https://www.miratechologies.com.ng/training-portal/api/';
    private $appUser = '5f7487f8691f8';
    private $headers   = ['API-KEY: 97899c-7d0420-1273f0-901d29-84e2f8'];

    /** Courses */
    
    /**
     * undocumented function summary
     *
     * @param Type $var Description
     * @return type
     * @throws conditon
     **/
    public function addcourse()
    {
      $post = $_POST;
      $post['userid'] = $this->appUser;
      $res = $this->do_post($this->url.'course/add',$post,$this->headers);

      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput($res);
    }

    /**
     * undocumented function summary
     *
     * @param Type $var Description
     * @return type
     * @throws conditon
     **/
    public function updatecourse()
    {
      $post = $_POST;
      $post['userid'] = $this->appUser;
      $res = $this->do_post($this->url.'course/update',$post,$this->headers);

      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput($res);
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
    public function deletecourse()
    {
      $get = $_GET;
      $get['userid'] = $this->appUser;
      $res = $this->do_get($this->url.'course/delete',$get,$this->headers);

      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput($res);
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
    public function listcourses()
    {
      $get = $_GET;
      $get['userid'] = $this->appUser;
      $res = $this->do_get($this->url.'course/list',$get,$this->headers);

      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput($res);
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
    public function getcourse()
    {
      $get = $_GET;
      $get['userid'] = $this->appUser;
      $res = $this->do_get($this->url.'course/getcourse',$get,$this->headers);

      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput($res);
    }


 


    /** Student */
    
    /**
     * undocumented function summary
     *
     * Undocumented function long description
     *
     * @param Type $var Description
     * @return type
     * @throws conditon
     **/
    public function addstudent()
    {
      $post = $_POST;
      $post['userid'] = $this->appUser;
      $res = $this->do_post($this->url.'user/register',$post,$this->headers);

      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput($res);
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
    public function liststudents()
    {
      $get = $_GET;
      $get['userid'] = $this->appUser;
      $res = $this->do_get($this->url.'user/list',$get,$this->headers);

      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput($res);
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
    public function studentprofile()
    {
      $get = $_GET;
      $get['userid'] = $this->appUser;
      $res = $this->do_get($this->url.'user/profile',$get,$this->headers);
      $res = json_decode($res,true);
      if($res['status']){
        $courses = $this->do_get($this->url.'training/list',$get,$this->headers);
        $courses = json_decode($courses,true);
        if($courses['status'])$res['data']['courses'] = $courses['data'];
        else $res['data']['courses'] = [];
      }
      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput(json_encode($res));
    }

      /**
     * Undocumented function long description
     *
     * @param Type $var Description
     * @return type
     * @throws conditon
     **/
    public function suspendstudent()
    {
      $get = $_GET;
      $get['userid'] = $this->appUser;
      $res = $this->do_get($this->url.'user/suspend',$get,$this->headers);

      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput($res);
    }

    /**
     * Undocumented function long description
     *
     * @param Type $var Description
     * @return type
     * @throws conditon
     **/
    public function studentcourses()
    {
      $get = $_GET;
      $get['userid'] = $this->appUser;
      $res = $this->do_get($this->url.'training/list',$get,$this->headers);

      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput($res);
    }

    /**
     * Undocumented function long description
     *
     * @param Type $var Description
     * @return type
     * @throws conditon
     **/
    public function studentcourse()
    {
      $get = $_GET;
      $get['userid'] = $this->appUser;
      $res = $this->do_get($this->url.'training/info',$get,$this->headers);

      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput($res);
    }

    /**
     * Undocumented function long description
     *
     * @param Type $var Description
     * @return type
     * @throws conditon
     **/
    public function addstudentcourse()
    {
      $post = $_POST;
      $post['userid'] = $this->appUser;
      $res = $this->do_post($this->url.'training/add',$post,$this->headers);

      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput($res);
    }

    /**
     * Undocumented function long description
     *
     * @param Type $var Description
     * @return type
     * @throws conditon
     **/
    public function deletestudentcourse()
    {
      $get = $_GET;
      $get['userid'] = $this->appUser;
      $res = $this->do_get($this->url.'training/delete',$get,$this->headers);

      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput($res);
    }


    /**Training Payment */

    /**
     * undocumented function summary
     *
     * Undocumented function long description
     *
     * @param Type $var Description
     * @return type
     * @throws conditon
     **/
    public function updatepaymentstatus()
    {
      $post = $_POST;
      $post['userid'] = $this->appUser;
      $res = $this->do_post($this->url.'training/updatepaymentstatus',$post,$this->headers);

      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput($res);
    }

    public function sendreciept()
    {
      $post = $_POST;
      $post['userid'] = $this->appUser;
      $res = $this->do_post($this->url.'training/sendpaymentreciept',$post,$this->headers);

      $this->setOutputHeader(['Content-type:application/json']);
      $this->setOutput($res);
    }
  }
?>