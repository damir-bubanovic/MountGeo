<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;


class RefugeController extends Controller
{
    /**
     * Get Refuges
     * 1) Verify request data
     * 2) Get refuges from database from specific mountain id
     */
    public function getRefuges(Request $request) {
        $user = JWTAuth::parseToken()->toUser();

        $mountain_id = $request->{'mountain_id'};

        $refuges = DB::table('refuges')
                        ->select('id', 'name')
                        ->where('mountain_id', $mountain_id)
                        ->orderBy('id', 'desc')
                        ->get();

        return response()->json([
            'refuges'  =>  $refuges
        ], 200);

    }

    /**
     * Post Refuges
     *
     * 1) Verify request data
     * 2) Create Now instance
     * 3) Post Refuge Road
     * 4) Post Refuge Stuff
     * 5) Post Refuge Main Info
     * 6) Post Refuge Contact
     *         - target array, count & loop through data
     */
    public function postRefuge(Request $request) {
        $user = JWTAuth::parseToken()->toUser();

        $this->validate($request, array(
            'refuge.mountain'           =>  'required|numeric',
            'refuge.name'               =>  'required|string|min:2|max:60',
            'refuge.longitude'          =>  'required|gps_lng',
            'refuge.latitude'           =>  'required|gps_lat',
            'information.startTime'     =>  'required',
            'information.endTime'       =>  'required',
            'information.water'         =>  'required|boolean',
            'information.food'          =>  'required|boolean',
            'information.beds'          =>  'required|numeric',
            'information.road'          =>  'required|boolean',
            'information.macadam'       =>  'required|boolean',
            'information.foot'          =>  'required|boolean',
            'contact.0.*.contact'       =>  'required|string',
            'contact.0.*.email'         =>  'email',
            'contact.0.*.phone'         =>  'numeric'
        ));

        $now = Carbon::now();

        /**
         * Post Refuge Main Info
         */
        $refuge_id = DB::table('refuges')
                        ->insertGetId([
                            'name'                  =>  $request->refuge['name'],
                            'mountain_id'           =>  $request->refuge['mountain'],
                            'longitude'             =>  $request->refuge['longitude'],
                            'latitude'              =>  $request->refuge['latitude'],
                            'created_at'            =>  $now
                        ]);

        /**
         * Post Refuge Road
         */
        $refuge_road_id = DB::table('refuge_road')
                        ->insert([
                            'refuge_id'     =>  $refuge_id,
                            'road'          =>  $request->information['road'],
                            'macadam'       =>  $request->information['macadam'],
                            'foot'          =>  $request->information['foot'],
                            'created_at'    =>  $now
                        ]);

        /**
         * Post Refuge Information
         */
        $refuge_information_id = DB::table('refuge_information')
                        ->insert([
                            'refuge_id'     =>  $refuge_id,
                            'open'          =>  $request->information['startTime'],
                            'close'         =>  $request->information['endTime'],
                            'water'         =>  $request->information['water'],
                            'food'          =>  $request->information['food'],
                            'beds'          =>  $request->information['beds'],
                            'created_at'    =>  $now
                        ]);

        /**
         * Post Refuge Contact
         * > get each contact
         * > loop through contact & insert them to database
         */
        $data_contact = $request->contact[0];

        $data_contact_number = count($data_contact);

        for($i = 0; $i < $data_contact_number; $i++) {
            $insert_data = array(
                'refuge_id'     =>  $refuge_id,
                'person'        =>  $data_contact[$i]['contact'],
                'email'         =>  $data_contact[$i]['email'],
                'phone'         =>  $data_contact[$i]['phone'],
                'created_at'    =>  $now
            );
            DB::table('refuge_contacts')->insert($insert_data);
        }

        return response()->json([
            'Refuge Data Saved'
        ], 200);



    }
}