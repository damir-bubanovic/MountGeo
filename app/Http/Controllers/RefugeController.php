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

        $this->validate($request, array(
            'mountain_id'            =>  'required|numeric',
        ));

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
     * Get Refuge
     * 1) Verify request data
     * 2) Get refuge from database from specific refuge id
     */
    public function getRefuge(Request $request) {
        $user = JWTAuth::parseToken()->toUser();

        $this->validate($request, array(
            'refuge'            =>  'required|numeric',
        ));

        $refuge_id = $request->{'refuge'};

        $refuge = DB::table('refuges')
                        ->select('id', 'name', 'longitude', 'latitude', 'created_at', 'updated_at')
                        ->where('id', $refuge_id)
                        ->get();
        $refuge_information = DB::table('refuge_information')
                        ->select('open', 'close', 'water', 'food', 'beds')
                        ->where('refuge_id', $refuge_id)
                        ->get();
        $refuge_road = DB::table('refuge_road')
                        ->select('road', 'macadam', 'foot')
                        ->where('refuge_id', $refuge_id)
                        ->get();
        $refuge_contacts = DB::table('refuge_contacts')
                        ->select('person', 'email', 'phone')
                        ->where('refuge_id', $refuge_id)
                        ->get();


        return response()->json([
            'refuge'                =>  $refuge,
            'refuge_information'    =>  $refuge_information,
            'refuge_road'           =>  $refuge_road,
            'refuge_contacts'       =>  $refuge_contacts,
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
            'contact.0.*.contact'       =>  'string',
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


    /**
     * Update Refuge & Refuge_Contacts & Refuge_Road & Refuge_Information
     */
    public function updateRefuge(Request $request) {
        $user = JWTAuth::parseToken()->toUser();

        $this->validate($request, array(
            'refuge_id'                 =>  'required|numeric',
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
            'contact.0.*.person'        =>  'string',
            'contact.0.*.email'         =>  'email',
            'contact.0.*.phone'         =>  'numeric'
        ));

        /**
         * Update Route
         */
        $now = Carbon::now();

        $refuge = DB::table('refuges')
                        ->where('id', $request->refuge['refuge_id'])
                        ->update([
                            'name'          =>  $request->refuge['name'],
                            'longitude'     =>  $request->refuge['longitude'],
                            'latitude'      =>  $request->refuge['latitude'],
                            'updated_at'    =>  $now
                        ]);

        $refuge_information = DB::table('refuge_information')
                        ->where('refuge_id', $request->refuge['refuge_id'])
                        ->update([
                            'open'          =>  $request->information['startTime'],
                            'close'         =>  $request->information['endTime'],
                            'water'         =>  $request->information['water'],
                            'food'          =>  $request->information['food'],
                            'beds'          =>  $request->information['beds'],
                            'updated_at'    =>  $now
                        ]);

        $refuge_road = DB::table('refuge_road')
                        ->where('refuge_id', $request->refuge['refuge_id'])
                        ->update([
                            'road'          =>  $request->information['road'],
                            'macadam'       =>  $request->information['macadam'],
                            'foot'          =>  $request->information['foot'],
                            'updated_at'    =>  $now
                        ]);

        $refuge_contacts_delete = DB::table('refuge_contacts')
                        ->where('refuge_id', $request->refuge['refuge_id'])
                        ->delete();

        /**
         * Update Refuge Contact
         * > get each contact
         * > loop through contact & update them to database
         */
        $data_contact = $request->contact[0];

        $data_contact_number = count($data_contact);

        for($i = 0; $i < $data_contact_number; $i++) {
            $insert_data = array(
                'refuge_id'     =>  $request->refuge['refuge_id'],
                'person'        =>  $data_contact[$i]['person'],
                'email'         =>  $data_contact[$i]['email'],
                'phone'         =>  $data_contact[$i]['phone'],
                'updated_at'    =>  $now
            );
            DB::table('refuge_contacts')->insert($insert_data);
        }

        return response()->json([
            'Refuge Updated'
        ], 200);
    }


    /**
     * Delete Refuge & Refuge_Contacts & Refuge_Road & Refuge_Information
     */
    public function deleteRefuge(Request $request) {
        $this->validate($request, array(
            'data.refuge'       =>  'required|numeric',
        ));

        $refuge = DB::table('refuges')
                        ->where('id', $request->data['refuge'])
                        ->delete();

        return response()->json([
            'Refuge Deleted'
        ], 200);
    }

}
