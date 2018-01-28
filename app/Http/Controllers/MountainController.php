<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Repositories\JWTRefreshRepository;

class MountainController extends Controller
{
    /**
     * Refresh Token Constructor
     */
    private $refreshtoken;

    public function __construct(JWTRefreshRepository $refreshtoken) {
        $this->refreshtoken = $refreshtoken;
    }


    /**
     * Show mountains
     *
     * @return mountains
     */
    public function getMountains() {
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
        $this->validate($request, array(
            'data.name'  =>  'required|string|min:2|max:60'
        ));

        $now = Carbon::now();

        $mountain = DB::table('mountains')
                        ->insert([
                            'name'          =>  $request->data['name'],
                            'created_at'    =>  $now
                        ]);

        $token = $this->refreshtoken->refreshToken();

        return response()->json([
            'mountain'  =>  $mountain,
            'token'     =>  $token
        ], 201);
    }


    /**
     * Update Mountain
     */
    public function updateMountain(Request $request) {
        $this->validate($request, array(
            'mountain_id'        =>  'required|numeric',
            'name'               =>  'required|string|min:2|max:60',
        ));

        /**
         * Update Mountain
         */
        $now = Carbon::now();

        $store = DB::table('mountains')
                        ->where('id', $request->{'mountain_id'})
                        ->update([
                            'name'         =>  $request->name,
                            'updated_at'   =>  $now
                        ]);

        $token = $this->refreshtoken->refreshToken();

        return response()->json([
            'Mountain Updated',
            'token'     =>  $token
        ], 200);
    }


    /**
     * Delete Mountain
     * > TEST THIS EXTENSIVLY
     */
    public function deleteMountain(Request $request) {
        $this->validate($request, array(
            'data.mountain'                    =>  'required|numeric',
        ));

        $deleteMountain = DB::table('mountains')
                        ->where('id',$request->data['mountain'])
                        ->delete();

        // $route_id = DB::table('routes')
        //                 ->select('id')
        //                 ->where('mountain_id', $request->data['mountain'])
        //                 ->first();


        // $deleteRoute = DB::table('routes')
        //                 ->where('id', $route_id)
        //                 ->delete();

        // $route = DB::table('routes')
        //                 ->where('mountain_id',$request->data['mountain'])
        //                 ->delete();

        $token = $this->refreshtoken->refreshToken();

        return response()->json([
            'Mountain Deleted',
            'token'     =>  $token
        ], 200);

    }

}
