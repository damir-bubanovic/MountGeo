<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    public function register(Request $request) {
        $this->validate($request, [
            'name'      =>  'required',
            'email'     =>  'required|email|unique:users',
            'password'  =>  'required'
        ]);

        $user = new User([
            'name'      =>  $request->name,
            'email'     =>  $request->email,
            'password'  =>  Hash::make($request->password)
        ]);

        $user->save();

        return response()->json([
            'user'       =>  $user
        ], 201);
    }

    public function login(Request $request) {
        $this->validate($request, [
            'email'     =>  'required|email',
            'password'  =>  'required'
        ]);

        $credentials = $request->only('email', 'password');
        $user = DB::table('users')
                ->select('name')
                ->where('email', $request->email)
                ->first();

        try {
            if(!$token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'error'       =>  'Invalid Credentials!'
                ], 401);
            }
        } catch (JWTException $e) {
            return response()->json([
                'error'       =>  'Could Not Create Token!'
            ], 500);
        }

        return response()->json([
            'token'       =>  $token,
            'user'        =>  $user,
        ], 200);
    }

    public function logout(Request $request) {
        $this->validate($request, [
            'token'     =>  'required',
        ]);

        try {
            JWTAuth::invalidate($request->input('token'));

            return response()->json([
                'success'       =>  'Log Out'
            ], 200);
        } catch (JWTException $e) {
            return response()->json([
                'error'       =>  'Failed To Logout Please Try Again'
            ], 500);
        }

    }

}
