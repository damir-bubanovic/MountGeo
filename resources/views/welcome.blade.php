<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <!-- Google Maps Verification -->
        <meta name="google-site-verification" content="q6wLTHty_P7L7TahD49WU0Gk7c4s0Vzs2I2HMTdjOmM" />

        <title>MountGeo</title>

        <!-- Favicon Icon -->
        <link rel="shortcut icon" href="{{ asset('favicon.png') }}">

        <!-- Google Fonts -->
        <link href='//fonts.googleapis.com/css?family=Ceviche One' rel='stylesheet'>

        <!-- Test GoogleMaps -->
        {{-- <script
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB6DGiJ9ZOK-m9-5ES0YLvcHk6AMWP5tg4&v=3">
        </script> --}}

        <!-- Test GoogleMaps -->
        <script
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCnCMsb5RhAGbI1QIHaxAQA8McFQfJGls8&v=3">
        </script>

        <!-- Marker With Label -->
        {{ Html::script('js/markerwithlabel.js') }}

        <!-- Google Chart -->
        <script
            src="https://www.gstatic.com/charts/loader.js">
        </script>

        <!-- BASIC CSS -->
        {{ Html::style('css/app.css') }}

    </head>
    <body>
        <div id="app">
            <app-starter></app-starter>
        </div>

        <!-- BASIC SCRIPT -->
        {{ Html::script('js/app.js') }}
    </body>
</html>
