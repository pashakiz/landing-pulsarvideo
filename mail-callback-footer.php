<?php

$recepient = "kuptsov@phystech.edu";
$sitename = "PulsarVideo";

$name = trim($_POST["cf_name"]);
$phone = trim($_POST["cf_phone"]);
$email = trim($_POST["cf_email"]);

$pagetitle = "Новая заявка с сайта \"$sitename\"";
$message = "Имя: $name \r\nТелефон: $phone \r\nEmail: $email";

mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\r\n From: $name <$email>");