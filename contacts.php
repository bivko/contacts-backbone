<?php
	$contactsFile = "res/js/contacts.txt";
	$groupsFile = "res/js/groups.txt";
	$string = file_get_contents($contactsFile);
	$stringGroups = file_get_contents($groupsFile);
	$json = json_decode($string, true);
	$jsonGroups = json_decode($stringGroups, true);
	
	
	if ($_SERVER['REQUEST_METHOD'] === 'GET'){
		if($_GET['type'] == 'getAll'){
			print_r($string);
		}
		if($_GET['type'] == 'getAllGroups'){
			print_r($stringGroups);
		}
		exit();
	};

	if ($_SERVER['REQUEST_METHOD'] === 'PUT'){
		$putData = json_decode(file_get_contents("php://input"), true);
		if($putData['isNew']){
			array_push($json, array(
				'id' => ''.$putData['id'],
				'name' => $putData['name'],
				'mail' => $putData['mail'],
				'phone' => $putData['phone'],
				'group' => $putData['group']
			));
		}else{
			for ($i = 0; $i < count($json); $i++) {
				//print_r($json);
				if( $json[$i]['id'] == $putData['id']){
					$json[$i] = array(
						'id' => ''.$putData['id'],
						'name' => $putData['name'],
						'mail' => $putData['mail'],
						'phone' => $putData['phone'],
						'group' => $putData['group']
					);
					break;
				}
			}
		}
		echo 'true';
		$string = json_encode($json);
		file_put_contents($contactsFile, $string);
		exit();
	};

	if ($_SERVER['REQUEST_METHOD'] === 'DELETE'){
		$deleteData = json_decode(file_get_contents("php://input"), true);
		for ($i = 0; $i < count($json); $i++) {
			if( $json[$i]['id'] == $deleteData['contactID']){
				unset($json[$i]);
				break;
			}
		}
		echo 'true';
		$string = json_encode($json);
		file_put_contents($contactsFile, $string);
		exit();
	};
?>