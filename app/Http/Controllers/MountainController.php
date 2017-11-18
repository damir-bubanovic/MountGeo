<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class MountainController extends Controller
{
    /**
     * Show mountains
     *
     * @return mountains
     */
    public function getMountains() {
        $user = JWTAuth::parseToken()->toUser();

        $mountains = DB::table('mountains')
                        ->select('id', 'name')
                        ->orderBy('name', 'desc')
                        ->get();

        return response()->json([
            'mountains'  =>  $mountains
        ], 200);
    }

    /**
     * Post Mountains
     *
     * -> validate data
     * @return mountain
     */
    public function postMountain(Request $request) {
        $user = JWTAuth::parseToken()->toUser();

        $this->validate($request, array(
            'data.name'  =>  'required|string|min:2|max:60'
        ));

        $now = Carbon::now();

        $mountain = DB::table('mountains')
                        ->insert([
                            'name'          =>  $request->data['name'],
                            'created_at'    =>  $now
                        ]);

        return response()->json([
            'mountain'  =>  $mountain
        ], 201);
    }

}
