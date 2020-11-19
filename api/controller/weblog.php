<?php
    /**
     * undocumented class
     */
    class Weblog extends Controller
    {
        /**
         * Undocumented function long description
         *
         * @param Type $var Description
         * @return type
         * @throws conditon
         **/
        public function add()
        {
           loadModel('weblog');
           $this->weblogModel = new WeblogModel();

           $this->weblogModel->addLog($ip,$device,$browser,$url,$page,$location,$carrier,$sessionid);

           $this->setOutputHeader(['Content-type:application/json']);
           $this->setOutput(json_encode(['status'=>true,'message'=>'Log registered successfully!']));
        }

        /**         
         * Undocumented function long description
         *
         * @param Type $var Description
         * @return type
         * @throws conditon
         **/
        private function validateAddLog()
        {
            extract($_POST);
            

            if(isset($url) && Validate::url($url)){
                $this->setOutputHeader(['Content-type:application/json']);
                $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid url address', 'data'=>['field'=>'url']]));
            }   

            if(isset($ip) && Validate::ip($ip)){
                $this->setOutputHeader(['Content-type:application/json']);
                $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid ip address supplied', 'data'=>['field'=>'ip']]));
            }   

            if(isset($sessionid) && Validate::string($sessionid,true,true,2,100)){
                $this->setOutputHeader(['Content-type:application/json']);
                $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid sessionid or too long', 'data'=>['field'=>'sessionid']]));
            } 

            if(isset($browser) && Validate::string($browser,true,true,2,100)){
                $this->setOutputHeader(['Content-type:application/json']);
                $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid browser or name too long', 'data'=>['field'=>'browser']]));
            } 
            
            if(isset($location) && Validate::string($location,true,true,2,100)){
                $this->setOutputHeader(['Content-type:application/json']);
                $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid location or location too long', 'data'=>['field'=>'browser']]));
            } 
            
            if(isset($device) && Validate::string($device,true,true,2,100)){
                $this->setOutputHeader(['Content-type:application/json']);
                $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid device or device name too long', 'data'=>['field'=>'device']]));
            } 

            if(isset($carrier) && Validate::string($carrier,true,true,2,100)){
                $this->setOutputHeader(['Content-type:application/json']);
                $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid carrier or carrier name too long', 'data'=>['field'=>'carrier']]));
            } 

            if(isset($page) && Validate::string($page,true,true,2,100)){
                $this->setOutputHeader(['Content-type:application/json']);
                $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid page or page name too long', 'data'=>['field'=>'page']]));
            } 

            return $_POST;
        }

        /**
         * Undocumented function long description
         *
         * @param Type $var Description
         * @return type
         * @throws conditon
         **/
        public function filter()
        {
            extract($_GET);
            $on         = $on ?? '';
            $limit      = $limit ?? 20;
            $pageno     = $pageno ?? 1;
            $enddate    = $enddate ?? '';
            $startdate  = $startdate ?? '';
            $ip         = $ip ?? '';
            $device     = $device ?? '';
            $browser    = $browser ?? '';
            $url        = $url ?? '';
            $page       = $page  ?? '';
            $location   = $location ?? '';
            $carrier    = $carrier ?? '';
            $sessionid  = $sessionid ?? '';

            $filters = 
            [
                "limit"=>$limit,
                "pageno"=>$pageno,
                "on"=>$on,
                "startdate"=>$startdate,
                "enddate"=>$enddate,
                'ip'=>$ip,
                'device'=>$device,
                'browser'=>$browser,
                'url'=>$url,
                'page'=>$page,
                'location'=>$location,
                'carrier'=>$carrier,
                'sessioni'=>$sessionid
            ];

            loadModel('weblog');

            $this->weblogModel = new WeblogModel();

            $res = $this->weblogModel->filterLogs($filters);
            if($res)$response =  ['status'=>true, 'message'=>'Website logs retrieved successfully', 'data'=>$res];
            else $response =  ['status'=>true, 'message'=>'There are currently no logs available','data'=>[]];
            
            $this->setOutputHeader(['Content-type:application/json']);
            $this->setOutput(json_encode($response));
        }
    }
    


?>