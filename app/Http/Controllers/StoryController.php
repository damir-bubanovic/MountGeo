<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Repositories\JWTRefreshRepository;

class StoryController extends Controller
{
    /**
     * Refresh Token Constructor
     */
    private $refreshtoken;

    public function __construct(JWTRefreshRepository $refreshtoken) {
        $this->refreshtoken = $refreshtoken;
    }

    /**
     * Get Stories
     * 1) Verify request data
     * 2) Get stories from database from specific mountain id
     */
    public function getStories(Request $request) {
        $this->validate($request, array(
            'mountain_id'            =>  'required|numeric',
        ));

        $mountain_id = $request->{'mountain_id'};

        $stories = DB::table('story')
                        ->select('id', 'title')
                        ->where('mountain_id', $mountain_id)
                        ->orderBy('id', 'desc')
                        ->get();

        return response()->json([
            'stories'  =>  $stories
        ], 200);

    }

    /**
     * Get Story
     * 1) Verify request data
     * 2) Get story from database from specific story id
     */
    public function getStory(Request $request) {
        $this->validate($request, array(
            'story'            =>  'required|numeric',
        ));

        $story_id = $request->{'story'};

        $story = DB::table('story')
                        ->select('id', 'title', 'description', 'created_at', 'updated_at')
                        ->where('id', $story_id)
                        ->get();

        return response()->json([
            'story'  =>  $story
        ], 200);

    }


    /**
     * Post Story
     */
    public function postStory(Request $request) {
        $this->validate($request, array(
            'data.mountain'            =>  'required|numeric',
            'data.title'               =>  'required|string|max:60',
            'data.detail'              =>  'required'
        ));

        /**
         * Post Story to Database
         */
        $now = Carbon::now();

        $story = DB::table('story')
                        ->insert([
                            'title'         =>  $request->data['title'],
                            'description'   =>  $request->data['detail'],
                            'mountain_id'   =>  $request->data['mountain'],
                            'created_at'    =>  $now
                        ]);

        $token = $this->refreshtoken->refreshToken();

        return response()->json([
            'Story Saved',
            'token'     =>  $token
        ], 200);
    }


    /**
     * Update Story
     */
    public function updateStory(Request $request) {
        $this->validate($request, array(
            'data.story'               =>  'required|numeric',
            'data.title'               =>  'required|string|max:60',
            'data.detail'              =>  'required'
        ));

        /**
         * Update Story
         */
        $now = Carbon::now();

        $store = DB::table('story')
                        ->where('id', $request->data['story'])
                        ->update([
                            'title'         =>  $request->data['title'],
                            'description'   =>  $request->data['detail'],
                            'updated_at'    =>  $now
                        ]);

        $token = $this->refreshtoken->refreshToken();

        return response()->json([
            'Story Updated',
            'token'     =>  $token
        ], 200);
    }


    /**
     * Delete Story
     */
    public function deleteStory(Request $request) {
        $this->validate($request, array(
            'data.story'                    =>  'required|numeric',
        ));

        $story = DB::table('story')
                        ->where('id',$request->data['story'])
                        ->delete();

        $token = $this->refreshtoken->refreshToken();

        return response()->json([
            'Story Deleted',
            'token'     =>  $token
        ], 200);
    }

}
