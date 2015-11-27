<?php

$recepient = "pashakiz@gmail.com";
$sitename = "PulsarVideo";

$name = trim($_POST["name"]);
$phone = trim($_POST["phone"]);
$email = trim($_POST["email"]);
$summ_order = trim($_POST["summ"]);;
//$summ_order = 9999;

$videotype = "Ошибка: Не были переданы параметры";

if ($_POST["videotype"] == "noselect") {
	$videotype = "Не выбранно";
}
if ($_POST["videotype"] == "conference") {
	$videotype = "Конференция";
}
if ($_POST["videotype"] == "presentation") {
	$videotype = "Презентация";
}
if ($_POST["videotype"] == "trainig") {
	$videotype = "Тренинг";
}
if ($_POST["videotype"] == "seminar") {
	$videotype = "Семинар";
}
if ($_POST["videotype"] == "lecture") {
	$videotype = "Лекция";
}
if ($_POST["videotype"] == "other") {
	$videotype = "Другое видео";
}

$options = "Опции:\r\n";

if (isset($_POST["default_option1"])) {
	$options .= "- Многокамерный монтаж\r\n";
}
if (isset($_POST["default_option2"])) {
	$options .= "- Монтаж презентации\r\n";
}
// if (isset($_POST["default_option3"])) {
// 	$options .= "- Свои пожелания\r\n";
// }

if (isset($_POST["item1_option1"])) {
	$options .= "- Многокамерный монтаж\r\n";
}
if (isset($_POST["item1_option2"])) {
	$options .= "- Монтаж презентации\r\n";
}

if (isset($_POST["item2_option1"])) {
	$options .= "- Многокамерный монтаж\r\n";
}
if (isset($_POST["item2_option2"])) {
	$options .= "- Монтаж презентации\r\n";
}

if (isset($_POST["item3_option1"])) {
	$options .= "- Многокамерный монтаж\r\n";
}
if (isset($_POST["item3_option2"])) {
	$options .= "- Монтаж презентации\r\n";
}

if (isset($_POST["item4_option1"])) {
	$options .= "- Многокамерный монтаж\r\n";
}
if (isset($_POST["item4_option2"])) {
	$options .= "- Монтаж презентации\r\n";
}

if (isset($_POST["item5_option1"])) {
	$options .= "- Многокамерный монтаж\r\n";
}
if (isset($_POST["item5_option2"])) {
	$options .= "- Монтаж презентации\r\n";
}

if (isset($_POST["item6_option1"])) {
	$options .= "- Многокамерный монтаж\r\n";
}
if (isset($_POST["item6_option2"])) {
	$options .= "- Монтаж презентации\r\n";
}


$pagetitle = "Новая заявка с сайта \"$sitename\"";
$message = "Имя: $name \r\nТелефон: $phone \r\nEmail: $email \r\n\r\nТип: $videotype \r\n\r\n$options\r\nСумма заказа: $summ_order руб.";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\r\n From: $name <$email>");