<?php
  /**
   * File Handler class
   */
  class File
  {
    /**
     * Upload file to a target diectory
     *
     * @param string $filekey Index of the file
     * @param string $path Storage Dir of the file
     * @param bool $multiple  Upload multiple files
     * @param int $maxSize  maximum file input size in kilobyte
     * @return array ['status':bool,'message':string,'data':[Array if mulitple else String]]
     **/
    public static function upload($filekey,$path,$multiple = false)
    {
      $targetdir = BASE_PATH;
      $path = '/public/'.$path.'/';
      $files = [];

      if(!empty($_FILES)){
        if($multiple){
          $file_count = isset($_FILES[$filekey]['name'][0]) ?  count($_FILES[$filekey]['name']) : 1;
          for( $i=0 ; $i < $file_count ; $i++ ) {
            $tmpFilePath = $_FILES[$filekey]['tmp_name'][$i];
            if ($tmpFilePath != ""){
              $newFilePath     = $path.uniqid().$_FILES['files']['name'][$i];
              $newFilePathMove =  $targetdir.$newFilePath;
              if (move_uploaded_file($tmpFilePath, $newFilePathMove)) {
                array_push($files, $newFilePath);
              }
            }
          }
          if(count($files)) return ['status'=>true,'message'=>'File upload success','data'=>$files];
          else return ['status'=>false, 'message'=>'File upload failed'];
        }else{
          $newFilePath     = $path.uniqid().$_FILES[$filekey]['name'];
          $newFilePathMove =  $targetdir.$newFilePath;
          $tmpFilePath = $_FILES[$filekey]['tmp_name'];
          if (move_uploaded_file($tmpFilePath, $newFilePathMove)) {
            return ['status'=>true,'message'=>'file upload success','data'=>$newFilePath];
          }
        }
        
      }
      return ['status'=>false, 'message'=>'File upload failed'];
    }

    /**
     * Upload Imae file to a target diectory
     *
     * @param string $filekey Index of the image
     * @param string $path Storage Dir of the image
     * @param bool $multiple  Upload multiple images
     * @param int $maxSize  maximum file input size in kilobyte
     * @return array ['status':bool,'message':string,'data':[Array if mulitple else String]]
     **/
    public static function uploadImage($filekey,$path,$multiple = false,$maxSize = 200)
    {
      if(!empty($_FILES)){
        $error;
        if(!in_array( strtolower(pathinfo($_FILES[$filekey]['name'],PATHINFO_EXTENSION)),['png','jpg','jpeg','gif'])){
          $error = 'Unsupported file format';
        }
        if(getimagesize($_FILES[$filekey]["tmp_name"]) >  200 && $error)  $error = 'File too large';
        else{
          return Self::upload($filekey,$path,$multiple);
        }
        return ['status'=>False,'message'=>$error];
      }
    }
  }
  


?>