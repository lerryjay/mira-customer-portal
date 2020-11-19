<?php
/**
 * undocumented class
 */
class RegionModel extends Model
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
  public function addCountry(Type $var = null)
  {
    # code...
  }

   /**
     * Retrives a single company entry
     *
     * @param Type $condition Condition to query by
     * @param String $bindString represenntation of values passed e.g name:String,id:integer = 'si'.
     * @return Array $bindValues $values values to be passed to the query
     **/
    public function getCountry($condition = '',$bindString='',$bindValues=[])
    {
      $sql = 'SELECT * FROM countries '.$condition;
      $query = $this->query($sql,$bindString,$bindValues); 
      if($query) return $this->row;
      else return false;
    }

    /**
     * Retrieves several comapny entries as an associative array
     *
     * @param Type $condition Condition to query by
     * @param String $bindString represenntation of values passed e.g name:String,id:integer = 'si'.
     * @return Array $bindValues $values values to be passed to the query
     **/
    public function getCountries($condition = '',$bindString = '',$bindValues = [])
    {
      $sql = 'SELECT * FROM countries '.$condition;
      $query = $this->query($sql,$bindString,$bindValues); 
      if($query) return $this->rows;
      else return false;
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
    public function getCountryById($countryId,$status = 1)
    {
      return $this->getCountry('WHERE status = ? AND country_id = ? ','is',[$status,$countryId]);
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
  public function getAllCountries($status = 1)
  {
    return $this->getCountries('WHERE status = ? ','i',[$status]);
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
  public function addState(Type $var = null)
  {
    # code...
  }


  /**
   * Retrives a single company entry
   *
   * @param Type $condition Condition to query by
   * @param String $bindString represenntation of values passed e.g name:String,id:integer = 'si'.
   * @return Array $bindValues $values values to be passed to the query
   **/
  public function getState($condition = '',$bindString='',$bindValues=[])
  {
    $sql = 'SELECT * FROM states '.$condition;
    $query = $this->query($sql,$bindString,$bindValues); 
    if($query) return $this->row;
    else return false;
  }

  /**
   * Retrieves several comapny entries as an associative array
   *
   * @param Type $condition Condition to query by
   * @param String $bindString represenntation of values passed e.g name:String,id:integer = 'si'.
   * @return Array $bindValues $values values to be passed to the query
   **/
  public function getStates($condition = '',$bindString = '',$bindValues = [])
  {
    $sql = 'SELECT * FROM states '.$condition;
    $query = $this->query($sql,$bindString,$bindValues); 
    if($query) return $this->rows;
    else return false;
  }

  /**
   *
   * Undocumented function long description
   *
   * @param string $countryId Id of country whose state is to be retireved
   * @returnArray OR @return bool - false
   **/
  public function getCountryStates($countryId,$status = 1)
  {
    return $this->getStates('WHERE country_id = ? AND status = ?','si',[$countryId,$status]);
  }

   /**
   *
   * Undocumented function long description
   *
   * @param string $countryId Id of country whose state is to be retireved
   * @returnArray OR @return bool - false
   **/
  public function getStateById($stateId,$status = 1)
  {
    return $this->getState('WHERE states_id = ? AND status = ?','si',[$stateId,$status]);
  }
}


?>