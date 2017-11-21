<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class StoryController extends Controller
{
    /**
     * Get Stories
     * 1) Verify request data
     *     >> ALERT <<
     *         - how do you validate object, research for mountain id
     * 2) Get stories from database from specific mountain id
     */
    public function getStories(Request $request) {
        $user = JWTAuth::parseToken()->toUser();

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
        $user = JWTAuth::parseToken()->toUser();

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

        return response()->json([
            'Story Saved'
        ], 200);
    }

}
