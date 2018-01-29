<?php

require_once 'vendor/predis/predis/autoload.php';
Predis\Autoloader::register();

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Access-Control-Allow-Methods: GET, POST, DELETE");

Global $db;
$db = new mysqli("localhost", "ilgarsh", "Ilgar", "mymessenger");

Global $redis;
$redis = new Predis\Client();


function check_authorization() {
    if (isset($_SESSION['user'])) {
        return false;
    } else {
        return true;
    }
}

function get_chats($username) {
    Global $db;
    $sql = "SELECT chat_id FROM chats WHERE username = '$username'";
    $result = $db -> query($sql);
    $resultArray = $result->fetch_all(MYSQLI_NUM);
    $chats = array();
    foreach ($resultArray as $chat_id) {
        $chats []= (int)$chat_id[0];
    }
    return $chats;
}

function build_unauthorized_access() {
    $resp->success = false;
    $resp->session = session_id();
    $resp->error = 'unauthorized access';
    return json_encode($resp);
}
