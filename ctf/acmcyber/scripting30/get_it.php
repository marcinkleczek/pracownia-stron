<?php

$url = "https://ssalandary.github.io/ScriptingChallenges/pathchallenge/304afc32b7ff2e2326754c58222d6f930ca90bcb24e2d67a1453616a3aea8cd7.html";
// if it stucks. Or get just las one.
$url = "https://ssalandary.github.io/ScriptingChallenges/pathchallenge/38ecdce1d344bea5d23d6af59ab3c7754bceaa540a06bc18f149d5e1783fa361.html";
$path = "https://ssalandary.github.io/ScriptingChallenges/pathchallenge/";

$num = 0;
do {
    $fileName = "./files/".basename($url).".html";
    if (file_exists($fileName)) {
        $body = file_get_contents($fileName);
    } else {
        $body = file_get_contents($url);
        file_put_contents($fileName, $body);
    }

    preg_match("#Next page at (.*)</p>#", $body, $matches);
    echo "\n".$num . ':'.($matches[1] ?? "NIE MA LINKA!");
    if (!isset($matches[1])) {
        echo $body;
        exit();
    }

    $url = $path .$matches[1] . '.html';
    if ($num++ > 1150) {
        echo "\nNope. I can't get no satisfaction.\n";
        break;
    }
} while(true);
