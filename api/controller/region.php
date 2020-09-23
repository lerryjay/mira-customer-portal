<?php

/**
 * undocumented class
 */
class Region extends Controller 
{
  /**
   * undocumented function summary
   *
   * Undocumented function long description
   *
   * @param Type $var Description
   * @return type
   * @throws conditon
   **/
  public function countries(Type $var = null)
  {
    loadModel('region');
    $this->regionModel = new RegionModel();
    $countries = $this->regionModel->getAllCountries();
    if($countries){
      $response = ['status'=>true,'message'=>'Countries retrieved successfully','data'=>$countries];
    }else $response = ['status'=>true,'message'=>'No country has been added','data'=>[]];

    $this->setOutputHeader(['Content-type:application/json']);
    $this->setOutput(json_encode($response));
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
  public function states()
  {
    extract($_GET);
    $countryid = $countryid ?? '';
    loadModel('region');

    $countryInvalid    = Validate::integar($countryid);;
    if($countryInvalid){ 
        $this->setOutputHeader(['Content-type:application/json']);
        $this->setOutput(json_encode(['status'=>false, 'message'=>'Invalid countryid', 'data'=>['field'=>'countryid']]));
    }

    $this->regionModel = new RegionModel();
    $states = $this->regionModel->getCountryStates($countryid);
    if($states){
      $response = ['status'=>true,'message'=>'States retrieved successfully','data'=>$states];
    }else $response = ['status'=>true,'message'=>'Country has no states','data'=>[]];

    $this->setOutputHeader(['Content-type:application/json']);
    $this->setOutput(json_encode($response));
  }
}
?>