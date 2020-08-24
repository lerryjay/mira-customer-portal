<?
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
    public static function upload($filekey,$path)
    {
      $targetdir = BASE_PATH."/public/".$path.'/';
      $path = 'public/'.$path.'/';
      $files = [];

      if(!empty($_FILES)){
        $file_array = count($_FILES['files'][$filekey]);
        for( $i=0 ; $i < $file_array ; $i++ ) {
          $tmpFilePath = $_FILES['files']['tmp_name'][$i];
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
      }
      return false;
    }
  }
  


?>