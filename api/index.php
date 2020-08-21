<?php
  session_start();
  $path = explode('/', trim($_SERVER['PHP_SELF'],'/'));
  define('BASE_PATH', $_SERVER['DOCUMENT_ROOT'].'/'.$path[0]);
  define('TICKET_PREFIX','TKT');

  $db_server = '192.168.1.4';
  $db_user = 'root';
  $db_password = '';
  $db = 'ticketapp';

  function getroute(){
    $route = array(); 
    if (isset($_SERVER['REQUEST_URI'] )){
      $route = explode('/', trim(parse_url($_SERVER['REQUEST_URI'],PHP_URL_PATH),'/'));
      array_shift($route);
    }  
    if (sizeof($route) == 0 || $route[0] == '') {
      $route[0] = $default;
      array_push($route,'index');
    }else{
      if (!isset($route[1])) {
        array_push($route,'index');
      }
    }
    return $route;
  }
  /**
   * loads a model
   *
   * @param SCRIPTNAME $name Name of the model to be loaded e.g ./model/user = user
   * @return void
   **/
  function loadModel(String $name):void
  {
    require_once BASE_PATH.'/api/model/'.$name.'.php';
  }

  /**
   * loads a controller
   *
   * @param SCRIPTNAME $name Name of the model to be loaded e.g ./model/user = user
   * @return void
   **/
  function loadController(String $name):void
  {
    require_once BASE_PATH.'/api/controller/'.$name.'.php';
  }
  
  loadModel('dbconn');
  loadModel('dbmodel');
  loadModel('model');
  loadModel('validator');
  loadModel('file');
  loadModel('alert');
  require_once BASE_PATH.'/api/controller/controller.php';
  $route = getroute();

  require_once BASE_PATH.'/api/controller/'.$route[1].'.php';
  $class = ucfirst($route[1]);
  $class = new $class();
  if(isset($route[2])){
   $func = $route[2];
    $class->$func();
    // // if(method_exists($class->$func())) $class->$func();
    // else{
    //   header(json_encode(['status'=>false,'message'=>'Not Found']),false,404);
    //   exit;
    // }
  }
  else $class->index();
?>