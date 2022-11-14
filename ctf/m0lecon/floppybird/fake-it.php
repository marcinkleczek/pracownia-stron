<?php

$token = json_decode(file_get_contents("https://floppybird.challs.m0lecon.it/get-token"), true)['token'];
//$token = 'd2c616bdf743b49f95b269dcd4b68bfa';

if (!$token) {
    exit("Can't get the token.");
}
printf("Token: %s\n", $token);

$score = 0;
$max = 1002;

do {
    $context = stream_context_create([
        'http' => [
            'method'  => 'POST',
            'header'  =>
                "Content-Type: application/json\r\n" .
                "Referer: https://floppybird.challs.m0lecon.it/\r\n"
            ,
            'content'    => json_encode(['token' => $token, 'score' => $score]),
            'timeout' => 6,
        ],
    ]);

    $body = file_get_contents("https://floppybird.challs.m0lecon.it/update-score", false, $context);
    print("SCORE: ".$score."\n");
    var_dump($body);
    usleep(700);
} while($score++ <= $max);

