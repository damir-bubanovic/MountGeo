<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/register', 'AuthController@register');
Route::post('/login', 'AuthController@login');
Route::post('/logout', 'AuthController@logout');

Route::group(['middleware' => 'auth.jwt'], function()
{
    Route::get('/home', 'HomeController@index');

    Route::post('/create-mountain', 'MountainController@postMountain');
    Route::get('/get-mountains', 'MountainController@getMountains');

    Route::post('/create-file-kml', 'RouteController@postFileKML');
    Route::post('/create-file-gpx', 'RouteController@postFileGPX');
    Route::post('/create-route-kml', 'RouteController@postRouteKML');
    Route::post('/create-route-gpx', 'RouteController@postRouteGPX');
    Route::post('/create-route-custom', 'RouteController@postRouteCustom');
    Route::post('/get-routes', 'RouteController@getRoutes');
    Route::post('/get-full-route', 'RouteController@getFullRoute');
    Route::post('/get-full-route-gps', 'RouteController@getFullRouteGPS');

    Route::post('/get-stories', 'StoryController@getStories');
    Route::post('/create-story', 'StoryController@postStory');

    Route::post('/get-refuges', 'RefugeController@getRefuges');
    Route::post('/create-refuge', 'RefugeController@postRefuge');
});
