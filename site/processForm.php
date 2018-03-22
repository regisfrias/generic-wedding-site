<?php

// Define some constants
define( "RECIPIENT_NAME", "Taanilan hääsivu" );
define( "RECIPIENT_EMAIL", "not.validaddress@email.com" );
define( "EMAIL_SUBJECT", "Message from website form: Uusi ilmoittautuminen" );

// Read the form values
$success = false;
$senderName = isset( $_POST['senderName'] ) ? preg_replace( "/[^\.\-\' a-zA-Z0-9]/", "", $_POST['senderName'] ) : "";
$guests = isset( $_POST['guests'] ) ? preg_replace( "/[^\.\-\' a-zA-Z0-9]/", "", $_POST['guests'] ) : "";
$allergies = isset( $_POST['allergies'] ) ? preg_replace( "/[^\.\-\' a-zA-Z0-9]/", "", $_POST['allergies'] ) : "";
$senderEmail = isset( $_POST['senderEmail'] ) ? preg_replace( "/[^\.\-\_\@a-zA-Z0-9]/", "", $_POST['senderEmail'] ) : "";
$ride1 = isset( $_POST['ride1'] ) ? preg_replace( "/[^\.\-\_\@a-zA-Z0-9]/", "", $_POST['ride1'] ) : "";
$ride2 = isset( $_POST['ride2'] ) ? preg_replace( "/[^\.\-\_\@a-zA-Z0-9]/", "", $_POST['ride2'] ) : "";
$message = isset( $_POST['message'] ) ? preg_replace( "/(From:|To:|BCC:|CC:|Subject:|Content-Type:)/", "", $_POST['message'] ) : "";

// If all values exist, send the email
if ( $senderName && $senderEmail && $message ) {
  $recipient = RECIPIENT_NAME . " <" . RECIPIENT_EMAIL . ">";
  $headers = "From: " . RECIPIENT_NAME . " <" . RECIPIENT_EMAIL . ">";
  $msg = "From: " . $senderName . ", " . $senderEmail . "\n" . "Vieraat: " . $guests . "\nAllergiat: " . $allergies . "\nKyyti kirkolta: " . $ride1 . "\nKyyti juhlapaikalta: " . $ride2 . "\nViesti: " . $message;
  $success = mail( $recipient, EMAIL_SUBJECT, $msg, $headers );
}

// Return an appropriate response to the browser
if ( isset($_GET["ajax"]) ) {
  echo $success ? "success" : "error";
} else {
?>
<html>
  <head>
    <title>Thanks!</title>
  </head>
  <body>
  <?php if ( $success ) echo "<p>Thanks for sending your message! We'll get back to you shortly.</p>" ?>
  <?php if ( !$success ) echo "<p>There was a problem sending your message. Please try again.</p>" ?>
  <p>Click your browser's Back button to return to the page.</p>
  </body>
</html>
<?php
}
?>
