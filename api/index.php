<?php
$path = explode('/', trim($_SERVER['PHP_SELF'],'/'));
define('BASE_PATH', $_SERVER['DOCUMENT_ROOT'].'/'.$path[0]);

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
  
  loadModel('dbconn');
  loadModel('dbmodel');
  loadModel('model');
  loadModel('validator');
  require_once BASE_PATH.'/api/controller/controller.php';
  $route = getroute();

  require_once BASE_PATH.'/api/controller/'.$route[1].'.php';
  $class = ucfirst($route[1]);
  $class = new $class();
  $func = $route[2];
  if(isset($route[2])) $class->$func();
  else $class->index();
?>