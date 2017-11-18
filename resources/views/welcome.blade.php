<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>MountGeo</title>

        <!-- Favicon Icon -->
        <link rel="shortcut icon" href="{{ asset('favicon.png') }}">

        <!-- Google Fonts -->
        <link href='//fonts.googleapis.com/css?family=Ceviche One' rel='stylesheet'>

        <script
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB6DGiJ9ZOK-m9-5ES0YLvcHk6AMWP5tg4&v=3">
        </script>
        <!-- Marker With Label -->
        <script
            src="http://cdn.sobekrepository.org/includes/gmaps-markerwithlabel/1.9.1/gmaps-markerwithlabel-1.9.1.min.js">
        </script>

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
