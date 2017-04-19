<?php
	require_once('config.php'); // Path to config file

	if ($_GET['action'] == 'signup') {
		
		mysql_connect(MYSQL_SERVER, MYSQL_DATABASE, MYSQL_PASSWORD);
		mysql_select_db(MYSQL_DATABASE);

		$email = mysql_real_escape_string($_POST['newsletterEmail']);

		if (empty($email)) {
			$status = "error";
			$message = "You did not enter an email address!";
		} else if (!preg_match('/^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/', $email)) {
			$status = "error";
			$message = "You have entered an invalid email address!";
		} else {
			$existingSignup = mysql_query("SELECT * FROM newsletter_signup WHERE email='$email'");
			if (mysql_num_rows($existingSignup) < 1) {

				$date = date('Y-m-d');
				$time = date('H:i:s');

				$insertSignup = mysql_query("INSERT INTO newsletter_signup (email, date, time) VALUES ('$email','$date','$time')");
				if ($insertSignup) {
					$status = "success";
					$message = "You have been signed up!";
				} else {
					$status = "error";
					$message = "Ooops, there's been a technical error!";
				}
			} else {
				$status = "error";
				$message = "This email address has already been registered!";
			}
		}

		$data = array(
			'status' => $status,
			'message' => $message
		);

		echo json_encode($data);

		exit;

	}
?>
