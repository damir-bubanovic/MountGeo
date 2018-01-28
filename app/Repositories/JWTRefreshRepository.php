<?php

namespace App\Repositories;

use Tymon\JWTAuth\Facades\JWTAuth;

class JWTRefreshRepository
{
    public function refreshToken() {
        $token = JWTAuth::getToken();
        $newToken = JWTAuth::refresh($token);

        return $newToken;
    }
}