<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use App\Repositories\JWTRefreshRepository;

class RouteController extends Controller
{
    /**
     * Refresh Token Constructor
     */
    private $refreshtoken;

    public function __construct(JWTRefreshRepository $refreshtoken) {
        $this->refreshtoken = $refreshtoken;
    }


    /**
     * Get Routes
     */
    public function getRoutes(Request $request) {
        $this->validate($request, array(
            'mountain_id'            =>  'required|numeric',
        ));

        $mountain_id = $request->{'mountain_id'};

        $routes = DB::table('routes')
                        ->select('id', 'name')
                        ->where('mountain_id', $mountain_id)
                        ->orderBy('id', 'desc')
                        ->get();

        $token = $this->refreshtoken->refreshToken();

        return response()->json([
            'routes'    =>  $routes,
            'token'     =>  $token
        ], 200);

    }

    /**
     * Get Route
     */
    public function getRoute(Request $request) {
        $this->validate($request, array(
            'route'            =>  'required|numeric',
        ));

        $route_id = $request->{'route'};

        $route = DB::table('routes')
                        ->select('id', 'name', 'description', 'difficulty', 'duration', 'distance', 'created_at', 'updated_at')
                        ->where('id', $route_id)
                        ->get();

        $refuge = DB::table('route_refuge')
                            ->join('refuges', 'route_refuge.refuge_id', '=', 'refuges.id')
                            ->select(
                                'refuges.id', 'refuges.name'
                            )
                            ->where('route_refuge.route_id', $route_id)
                            ->get();

        $story = DB::table('story')
                        ->join('route_story', 'story.id', '=', 'route_story.story_id')
                        ->select('story.id', 'story.title')
                        ->where('route_story.route_id', $route_id)
                        ->get();

        return response()->json([
            'route'   =>  $route,
            'refuge'  =>  $refuge,
            'story'   =>  $story,
        ], 200);

    }


    /**
     * Update Route
     */
    public function updateRoute(Request $request) {
        $this->validate($request, array(
            'route_id'                              =>  'required|numeric',
            'route.name'                            =>  'required|string|max:60',
            'information.difficulty'                =>  'required|numeric',
            'information.day'                       =>  'required|numeric',
            'information.hour'                      =>  'required|numeric',
            'information.min'                       =>  'required|numeric',
            'description.detail'                    =>  'required',
            'refuge.beforeActiveRefuges.*'          =>  'numeric',
            'refuge.afterActiveRefuges.*'           =>  'numeric',
            'story.beforeActiveStories.*'           =>  'numeric',
            'story.afterActiveStories.*'            =>  'numeric'
        ));

        /**
         * Update Route
         */
        $now = Carbon::now();

        // print_r($request->refuge['afterActiveRefuges']);
        // print($request->refuge['afterActiveRefuges'][0]);

        /**
         * Update Route
         * > get route duration in seconds
         * > update new
         */
        $route_duration =   $request->information['day'] * 86400 +
                            $request->information['hour'] * 3600 +
                            $request->information['min'] * 60;

        $route = DB::table('routes')
                        ->where('id', $request->route_id)
                        ->update([
                            'name'          =>  $request->route['name'],
                            'description'   =>  $request->description['detail'],
                            'difficulty'    =>  $request->information['difficulty'],
                            'duration'      =>  $route_duration,
                            'updated_at'    =>  $now
                        ]);

        /**
         * Delete & Insert Refuges
         * > if not active refuges
         * > do not need before active refuges & stories mayby
         */
        $refuge = DB::table('route_refuge')
                        ->where('route_id', $request->route_id)
                        ->delete();

        if(!empty($request->refuge['afterActiveRefuges'])) {
            for ($i = 0; $i < count($request->refuge['afterActiveRefuges']); $i++) {
                $insert_data = array(
                    'route_id'      =>  $request->route_id,
                    'refuge_id'     =>  $request->refuge['afterActiveRefuges'][$i],
                    'created_at'    =>  $now
                );
                DB::table('route_refuge')->insert($insert_data);
            }
        }

        /**
         * Delete & Insert Stories
         * > if not active story
         * > do not need before active refuges & stories mayby
         */
        $story = DB::table('route_story')
                        ->where('route_id', $request->route_id)
                        ->delete();

        if(!empty($request->story['afterActiveStories'])) {
            for ($i = 0; $i < count($request->story['afterActiveStories']); $i++) {
                $insert_data = array(
                    'route_id'      =>  $request->route_id,
                    'story_id'      =>  $request->story['afterActiveStories'][$i],
                    'created_at'    =>  $now
                );
                DB::table('route_story')->insert($insert_data);
            }
        }

        $token = $this->refreshtoken->refreshToken();

        return response()->json([
            'Route Updated',
            'token'     =>  $token
        ], 200);
    }


    /**
     * Get Full Route
     * > get basic route info
     * > get route gps data
     * > get stories for this route
     * > get basic refuge information
     * > get contact for refuge
     */
    public function getFullRoute(Request $request) {
        $route_id = $request->{'route_id'};

        $route = DB::table('routes')
                        ->select('name', 'description', 'difficulty', 'duration')
                        ->where('id', $route_id)
                        ->get();

        $story = DB::table('story')
                        ->join('route_story', 'story.id', '=', 'route_story.story_id')
                        ->select('story.title', 'story.description')
                        ->where('route_story.route_id', $route_id)
                        ->get();

        $refuge = DB::table('route_refuge')
                            ->join('refuges', 'route_refuge.refuge_id', '=', 'refuges.id')
                            ->join('refuge_information', 'route_refuge.refuge_id', '=', 'refuge_information.refuge_id')
                            ->join('refuge_road', 'route_refuge.refuge_id', '=', 'refuge_road.refuge_id')
                            ->select(
                                'refuges.name',
                                'refuge_information.refuge_id', 'refuge_information.open', 'refuge_information.close',
                                'refuge_information.water', 'refuge_information.food', 'refuge_information.beds',
                                'refuge_road.refuge_id', 'refuge_road.road', 'refuge_road.macadam', 'refuge_road.foot'
                            )
                            ->where('route_refuge.route_id', $route_id)
                            ->get();


        $contact = DB::table('route_refuge')
                            ->join('refuge_contacts', 'route_refuge.refuge_id', '=', 'refuge_contacts.refuge_id')
                            ->select('refuge_contacts.refuge_id', 'refuge_contacts.person', 'refuge_contacts.email', 'refuge_contacts.phone')
                            ->where('route_refuge.route_id', $route_id)
                            ->get();



        /**
         * Create Contacts Array
         * > create empty contacts array in refuge object
         */
        foreach ($refuge as $add_contacts) {
            $add_contacts->contacts = [];
        }

        /**
         * Push contacts to refuge
         * 1) loop contacts
         * 2) loop refuge
         * 3) if contact refuge is is the same as refuge id push it to refuge
         */
        foreach ($contact as $item_contact) {
            foreach ($refuge as $item_refuge) {
                if ($item_contact->refuge_id == $item_refuge->refuge_id) {
                    array_push($item_refuge->contacts, $item_contact);
                }
            }
        }

        $token = $this->refreshtoken->refreshToken();

        return response()->json([
            'route'         =>  $route,
            'story'         =>  $story,
            'refuge'        =>  $refuge,
            'token'         =>  $token
        ], 200);


    }


    /**
     * Get Full Route GPS
     * > get route gps data
     */
    public function getFullRouteGPS(Request $request) {
        $route_id = $request->{'route_id'};

        $route = DB::table('routes')
                        ->select('duration')
                        ->where('id', $route_id)
                        ->get();

        $route_gps = DB::table('routes_gps')
                        ->select('longitude', 'latitude', 'altitude')
                        ->where('route_id', $route_id)
                        ->get();

        $refuge = DB::table('route_refuge')
                            ->join('refuges', 'route_refuge.refuge_id', '=', 'refuges.id')
                            ->select(
                                'refuges.name', 'refuges.longitude', 'refuges.latitude'
                            )
                            ->where('route_refuge.route_id', $route_id)
                            ->get();

        return response()->json([
            'route'         =>  $route,
            'route_gps'     =>  $route_gps,
            'refuge'        =>  $refuge
        ], 200);
    }


    /**
     * Post Route GPS Data File KML
     */
    public function postFileKML(Request $request) {
        if($request->hasFile('file')) {
            /**
             * Store Uploaded File
             * > get file
             * > get original file name
             * > get original file name extension
             * > store file in public uploads folder
             * > return unique file name
             */
            $file = $request->file('file');
            $fileName = $file->getClientOriginalName();
            $fileNameExt = explode('.', $fileName);
            $fileStored = Storage::disk('public')->put('uploads', $file);

            return response()->json([
                'fileStored'    =>  $fileStored,
                'fileStoredExt' =>  $fileNameExt[1]
            ], 200);

        } else {
            return 'No file uploaded';
        }

    }

    /**
     * Post Route GPS Data File GPX
     */
    public function postFileGPX(Request $request) {
        if($request->hasFile('file')) {
            /**
             * Store Uploaded File
             * > get file
             * > get original file name
             * > get original file name extension
             * > store file in public uploads folder
             * > return unique file name
             */
            $file = $request->file('file');
            $fileName = $file->getClientOriginalName();
            $fileNameExt = explode('.', $fileName);
            $fileStored = Storage::disk('public')->put('uploads', $file);

            return response()->json([
                'fileStored'    =>  $fileStored,
                'fileStoredExt' =>  $fileNameExt[1]
            ], 200);

        } else {
            return 'No file uploaded';
        }

    }

    /**
     * Post Route Data KML
     *
     * > Verify request data
     * > Post data
     */
    public function postRouteKML(Request $request) {
        // Get default limit
        $normalTimeLimit = ini_get('max_execution_time');

        // Set new limit
        ini_set('max_execution_time', 1200);


        $this->validate($request, array(
            'route.mountain'                =>  'required|numeric',
            'route.name'                    =>  'required|string|max:60',
            'route.routeFile'               =>  'required|string',
            'information.difficulty'        =>  'required|numeric',
            'information.day'               =>  'required|numeric',
            'information.hour'              =>  'required|numeric',
            'information.min'               =>  'required|numeric',
            'description.detail'            =>  'required',
            'refuge.refuges.*'              =>  'numeric',
            'story.stories.*'               =>  'numeric',
        ));

        $now = Carbon::now();


        /**
         * Post Route
         * > get route duration in seconds
         * > post new route
         */
        $route_duration =   $request->information['day'] * 86400 +
                            $request->information['hour'] * 3600 +
                            $request->information['min'] * 60;

        $route_id = DB::table('routes')
                        ->insertGetId([
                            'name'          =>  $request->route['name'],
                            'description'   =>  $request->description['detail'],
                            'difficulty'    =>  $request->information['difficulty'],
                            'duration'      =>  $route_duration,
                            'mountain_id'   =>  $request->route['mountain'],
                            'created_at'    =>  $now,
                            'updated_at'    =>  $now
                        ]);

        /*
         * Get Coordinates from .kml file
         * >> ALERT <<
         *     - Maximum execution time of 30 seconds exceeded Laravel - update php.ini - put 10 minutes
         *     - Google Maps = 2,500 free requests per day
         * > load file from storage as xml file
         * > target coordinates container & get coordinates data
         * > coordinates
         *     > remove \n - new line from text
         *     > trim whitespace from start
         *     > remove ending characters ( 0  )
         * > create array data with explode
         */
        $file = Storage::disk('public')->get($request->route['routeFile']);
        $XMLfile = simplexml_load_string($file);
        $coordinates_string = $XMLfile->Document->Placemark->LineString->coordinates;
        $coordinates_clean = preg_replace('/\n/', '', $coordinates_string);
        $coordinates_cleaner = trim($coordinates_clean);
        $coordinates_cleanest = substr($coordinates_cleaner, 0, -2);
        $coordinates = explode(',0 ', $coordinates_cleanest);


        /**
         * Post GPS Coordinates from .kml file
         * > loop through all coordinates & get combined long & lat values
         * > create single coordinates data from individual values
         * > define longitude & latitude
         * > get elevation
         */
        foreach ($coordinates as $value) {
            $coordinate = explode(',', $value);
            $longitude = $coordinate[0];
            $latitude = $coordinate[1];

            $elevation_data = \GoogleMaps::load('elevation')
                ->setParamByKey('locations', $latitude . ',' . $longitude)
                ->get();

            $elevation_json = json_decode($elevation_data);
            $altitude_decimal = $elevation_json->results[0]->elevation;
            $altitude = round($altitude_decimal);

            $gps_route = DB::table('routes_gps')
                        ->insert([
                            'route_id'          =>  $route_id,
                            'longitude'         =>  $longitude,
                            'latitude'          =>  $latitude,
                            'altitude'          =>  $altitude,
                            'created_at'        =>  $now,
                            'updated_at'        =>  $now
                        ]);

        }

        unset($file);


        /**
         * Connect routes with refuges
         * > get indivudual refuge
         * > insert route with refuge to transition database
         */
        $refuge = $request->refuge['refuges'];
        $refuge_number = count($refuge);

        for($i = 0; $i < $refuge_number; $i++) {
            $insert_route_refuge_data = array(
                'route_id'          =>  $route_id,
                'refuge_id'         =>  $refuge[$i],
                'created_at'        =>  $now
            );
            DB::table('route_refuge')->insert($insert_route_refuge_data);
        }


        /**
         * Connect routes with stories
         * > get indivudual story
         * > insert route with story to transition database
         */
        $story = $request->story['stories'];
        $story_number = count($story);

        for($i = 0; $i < $story_number; $i++) {
            $insert_route_story_data = array(
                'route_id'          =>  $route_id,
                'story_id'          =>  $story[$i],
                'created_at'        =>  $now
            );
            DB::table('route_story')->insert($insert_route_story_data);
        }

        /**
         * Delete file from storage
         */
        Storage::disk('public')->delete($request->route['routeFile']);

        // Restore default limit
        ini_set('max_execution_time', $normalTimeLimit);

        $token = $this->refreshtoken->refreshToken();

        return response()->json([
            'Route Data Saved',
            'token'     =>  $token
        ], 200);

    }


    /**
     * Post Route Data GPX
     *
     * > Verify request data
     * > Post Data
     */
    public function postRouteGPX(Request $request) {
        // Get default limit
        $normalTimeLimit = ini_get('max_execution_time');

        // Set new limit
        ini_set('max_execution_time', 1200);

        $this->validate($request, array(
            'route.mountain'                =>  'required|numeric',
            'route.name'                    =>  'required|string|max:60',
            'route.routeFile'               =>  'required|string',
            'information.difficulty'        =>  'required|numeric',
            'information.day'               =>  'required|numeric',
            'information.hour'              =>  'required|numeric',
            'information.min'               =>  'required|numeric',
            'description.detail'            =>  'required',
            'refuge.refuges.*'              =>  'numeric',
            'story.stories.*'               =>  'numeric',
        ));

        $now = Carbon::now();

        /**
         * Post Route
         * > get route duration in seconds
         * > post new route
         */
        $route_duration =   $request->information['day'] * 86400 +
                            $request->information['hour'] * 3600 +
                            $request->information['min'] * 60;

        $route_id = DB::table('routes')
                        ->insertGetId([
                            'name'          =>  $request->route['name'],
                            'description'   =>  $request->description['detail'],
                            'difficulty'    =>  $request->information['difficulty'],
                            'duration'      =>  $route_duration,
                            'mountain_id'   =>  $request->route['mountain'],
                            'created_at'    =>  $now,
                            'updated_at'    =>  $now
                        ]);


        /**
         * Post Coordinates from .gpx file
         * >> ALERT <<
         *     - Maximum execution time of 30 seconds exceeded Laravel - update php.ini - put 10 minutes
         *     - Google Maps = 2,500 free requests per day
         * > get file from storage
         * > load file
         * > cycle through array & determine longitude & latitude
         * > find elevation
         * > insert values into database
         */
        $file = Storage::disk('public')->get($request->route['routeFile']);
        $XMLfile = simplexml_load_string($file);

        foreach($XMLfile->trk->trkseg->trkpt as $coordinate) {
            $longitude = $coordinate['lon'];
            $latitude = $coordinate['lat'];

            $elevation_data = \GoogleMaps::load('elevation')
                ->setParamByKey('locations', $latitude . ',' . $longitude)
                ->get();

            $elevation_json = json_decode($elevation_data);
            $altitude_decimal = $elevation_json->results[0]->elevation;
            $altitude = round($altitude_decimal);

            $gps_route = DB::table('routes_gps')
                        ->insert([
                            'route_id'          =>  $route_id,
                            'longitude'         =>  $longitude,
                            'latitude'          =>  $latitude,
                            'altitude'          =>  $altitude,
                            'created_at'        =>  $now,
                            'updated_at'        =>  $now
                        ]);

        }

        unset($xml);


        /**
         * Connect routes with refuges
         * > get indivudual refuge
         * > insert route with refuge to transition database
         */
        $refuge = $request->refuge['refuges'];
        $refuge_number = count($refuge);

        for($i = 0; $i < $refuge_number; $i++) {
            $insert_route_refuge_data = array(
                'route_id'          =>  $route_id,
                'refuge_id'         =>  $refuge[$i],
                'created_at'        =>  $now
            );
            DB::table('route_refuge')->insert($insert_route_refuge_data);
        }


        /**
         * Connect routes with stories
         * > get indivudual story
         * > insert route with story to transition database
         */
        $story = $request->story['stories'];
        $story_number = count($story);

        for($i = 0; $i < $story_number; $i++) {
            $insert_route_story_data = array(
                'route_id'          =>  $route_id,
                'story_id'          =>  $story[$i],
                'created_at'        =>  $now
            );
            DB::table('route_story')->insert($insert_route_story_data);
        }

        /**
         * Delete file from storage
         */
        Storage::disk('public')->delete($request->route['routeFile']);

        // Restore default limit
        ini_set('max_execution_time', $normalTimeLimit);

        $token = $this->refreshtoken->refreshToken();

        return response()->json([
            'Route Data Saved',
            'token'     =>  $token
        ], 200);

    }


    /**
     * Post Route Custom Data
     *
     * > Verify request data
     * > Post Data
     */
    public function postRouteCustom(Request $request) {
        // Get default limit
        $normalTimeLimit = ini_get('max_execution_time');

        // Set new limit
        ini_set('max_execution_time', 1200);


        $this->validate($request, array(
            'route.mountain'                =>  'required|numeric',
            'route.name'                    =>  'required|string|max:60',
            'customroute.*.lng'             =>  'required|numeric',
            'customroute.*.lat'             =>  'required|numeric',
            'information.difficulty'        =>  'required|numeric',
            'information.day'               =>  'required|numeric',
            'information.hour'              =>  'required|numeric',
            'information.min'               =>  'required|numeric',
            'description.detail'            =>  'required',
            'refuge.refuges.*'              =>  'numeric',
            'story.stories.*'               =>  'numeric',
        ));

        $now = Carbon::now();

        /**
         * Post Route
         * > get route duration in seconds
         * > post new route
         */
        $route_duration =   $request->information['day'] * 86400 +
                            $request->information['hour'] * 3600 +
                            $request->information['min'] * 60;

        $route_id = DB::table('routes')
                        ->insertGetId([
                            'name'          =>  $request->route['name'],
                            'description'   =>  $request->description['detail'],
                            'difficulty'    =>  $request->information['difficulty'],
                            'duration'      =>  $route_duration,
                            'mountain_id'   =>  $request->route['mountain'],
                            'created_at'    =>  $now,
                            'updated_at'    =>  $now
                        ]);



        /**
         * Post Coordinates from Custom Route
         * >> ALERT <<
         *     - Maximum execution time of 30 seconds exceeded Laravel - update php.ini - put 10 minutes
         *     - Google Maps = 2,500 free requests per day
         * > cycle through array & determine longitude & latitude
         * > find elevation
         * > insert values into database
         */
        foreach($request->customroute as $coordinate) {
            $longitude = $coordinate['lng'];
            $latitude = $coordinate['lat'];

            $elevation_data = \GoogleMaps::load('elevation')
                ->setParamByKey('locations', $latitude . ',' . $longitude)
                ->get();

            $elevation_json = json_decode($elevation_data);
            $altitude_decimal = $elevation_json->results[0]->elevation;
            $altitude = round($altitude_decimal);

            $gps_route = DB::table('routes_gps')
                        ->insert([
                            'route_id'          =>  $route_id,
                            'longitude'         =>  $longitude,
                            'latitude'          =>  $latitude,
                            'altitude'          =>  $altitude,
                            'created_at'        =>  $now,
                            'updated_at'        =>  $now
                        ]);

        }


        /**
         * Connect routes with refuges
         * > get indivudual refuge
         * > insert route with refuge to transition database
         */
        $refuge = $request->refuge['refuges'];
        $refuge_number = count($refuge);

        for($i = 0; $i < $refuge_number; $i++) {
            $insert_route_refuge_data = array(
                'route_id'          =>  $route_id,
                'refuge_id'         =>  $refuge[$i],
                'created_at'        =>  $now
            );
            DB::table('route_refuge')->insert($insert_route_refuge_data);
        }


        /**
         * Connect routes with stories
         * > get indivudual story
         * > insert route with story to transition database
         */
        $story = $request->story['stories'];
        $story_number = count($story);

        for($i = 0; $i < $story_number; $i++) {
            $insert_route_story_data = array(
                'route_id'          =>  $route_id,
                'story_id'          =>  $story[$i],
                'created_at'        =>  $now
            );
            DB::table('route_story')->insert($insert_route_story_data);
        }


        // Restore default limit
        ini_set('max_execution_time', $normalTimeLimit);

        $token = $this->refreshtoken->refreshToken();

        return response()->json([
            'Route Data Saved',
            'token'     =>  $token
        ], 200);
    }


    /**
     * Delete Route
     */
    public function deleteRoute(Request $request) {
        $this->validate($request, array(
            'data.route'                    =>  'required|numeric',
        ));

        $route = DB::table('routes')
                        ->where('id', $request->data['route'])
                        ->delete();

        $token = $this->refreshtoken->refreshToken();

        return response()->json([
            'Route Deleted',
            'token'     =>  $token
        ], 200);
    }

}
