<?php

//========== Static validation class ==========//
/*
1. String data
2. Email address - Valid email address
3. ID - Valid integar
4. Amount - Valid float
5. EMUN - Select valid array of data
6. Password - Validate password
7. Phone Number - Valid phone number
8. Url - Valid Url address
9. Address - Valid image data
10. Date - Valid Date
11. Bool - Valid boolean
12. IP - Validate IP address
*/

class Validate{

	public static function string($string, $with_html = true, $trim= false, $min=2, $max=1000){
		$with_html ? $str = filter_var($string, FILTER_SANITIZE_STRING): $str = $string;
		$trim ? trim($str) : $str;
		if( ctype_space($str) || empty($str) || is_null($str) || !is_string($str)){
			return 'Invaild '.$string;
		}
		if(strlen($str)> $max){ 
			return $string." character is more than ".$max;
		}elseif (strlen($str) <= $min) {
			return $string." character is less than ".$min;
		}
		return null;
	}
	public static function email($email){
		if(!filter_var(trim($email), FILTER_VALIDATE_EMAIL)){
			return 'Invalid email address';
		} 
		return null;
	}
	public static function integar($integar){
		if(!filter_var($integar, FILTER_VALIDATE_INT)){
			return 'Invalid number';
		}
		return null;
	}
	public static function float($float){
		if(!filter_var($float, FILTER_VALIDATE_FLOAT)){
			return 'Invalid float value';
		}
		return null;
	}
	public static function select($value, $array){
		if(!is_array($array)){
			return 'Second argument should be an array';
		}
		$check = in_array($value, $array);
		if(empty($check)){
			return 'Invalid option';
		}
		return null;

	}
	public static function password($pwd,
	 	$min=6,
	 	$must_contain_num=true,
		$must_contain_uppercase=true,
		$must_contain_lowercase=true,
	 	$must_contain_symbol =true){
		// http://buildregex.com/
		$reg_num ='/[0-9]/';
		$reg_uppercase ='/[A-Z]/';
		$reg_lowercase = '/[a-z]/';
		$reg_symbol = '/[^a-zA-Z0-9]/';
		$error_array=array();
		if(ctype_space($pwd) || empty($pwd) || is_null($pwd)){
			return 'Password can not be empty'
		;
		}
		// regex check
		if($must_contain_num){ if(!preg_match($reg_num, $pwd)){
			array_push($error_array, 'Password must contain atleast one (1) number');}
		}
		if($must_contain_uppercase ){ if(!preg_match($reg_uppercase, $pwd)){
			array_push($error_array, 'Password must contain atleast one (1) uppercase');}
		}
		if($must_contain_lowercase){ if(!preg_match($reg_lowercase, $pwd)){
			array_push($error_array, 'Password must contain atleast one (1) lowcase');}
		}
		if($must_contain_symbol){ if(!preg_match($reg_symbol, $pwd)){
			array_push($error_array, 'Password must contain atleast one (1) symbol');}
		}
		// min check
		if(strlen($pwd) < $min){
			array_push($error_array, 'Password must be more than '.$min);
		}

		if(count($error_array) > 0){
			return $error_array;
		}
	
		return null;
	}
	public static function telephone($telephone){
		#88002345675 | +7 (960) 000 00 00 | +7(4855)23-34-56
		$reg_num ='([+]?\d[ ]?[(]?\d{3}[)]?[ ]?\d{2,3}[- ]?\d{2}[- ]?\d{2})';
		if(!preg_match($reg_num, $telephone)){
			return 'Invalid phone, e.g( 88002345675 | +7 (960) 000 00 00 | +7(4855)23-34-56 )';
		}
		return null;
	}
	public static function url($url, $query_string=true){
		if($query_string){
			if(!filter_var(trim($url), FILTER_VALIDATE_URL, FILTER_FLAG_QUERY_REQUIRED)){
			return 'Invalid url, url should have query string (e.g https://example.com?=123)';
		} 
		return null;
		}
		if(!filter_var(trim($url), FILTER_VALIDATE_URL)){
			return 'Invalid url (e.g https://example.com)';
		} 
		
		return null;
	}
	public static function address($addr){
		if($addr != strip_tags($addr)){
			return 'Invalid address';
		}
		return null;
	}
	public static function date($date){
		// source: https://regexr.com/39tr1
		$reg_date='/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/';
		if(!preg_match($reg_date, $date)){
			return 'Invalid date (e.g dd/mm/yyyy)';
		}
		return null;

	}
	public static function bool($bool){
		if(!filter_var($bool, FILTER_VALIDATE_BOOLEAN)){
			return 'Invalid boolean value';
		}
		return null;
	}
	public static function ip($ip){
		if(!filter_var($ip, FILTER_VALIDATE_IP)){
			return 'Invalid IP address';
		}
		return null;
	}

};


?>