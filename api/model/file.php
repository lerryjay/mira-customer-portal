<?php
  /**
   * File Handler class
   */
  class File
  {
    /**
     * Undocumented function long description
     *
     * @param Type $var Description
     * @return type
     * @throws conditon
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
          if(count($files)) return $files;
          else return false;
        }else{
          $newFilePath     = $path.uniqid().$_FILES[$filekey]['name'];
          $newFilePathMove =  $targetdir.$newFilePath;
          $tmpFilePath = $_FILES[$filekey]['tmp_name'];
          if (move_uploaded_file($tmpFilePath, $newFilePathMove)) {
            return $newFilePath;
          }
        }
        
      }
      return false;
    }
  }
  


?>