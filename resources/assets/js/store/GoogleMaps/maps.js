/**
 * Auth Module
 */
import * as MutationTypes from '../MutationTypes.js';
import swal from 'sweetalert2';

const state = {
    zoom: 9,
    center: {
        lat: 45.80,
        lng: 15.97
    },
    distance: {
        zoom: 9,
        width: 192,
        kilometers: '40 km',
        duration: 0
    },
    map: null,
    mapType: false,
    refuges: [],
    refugeMarkers: [],
    path: [],
    routePath: [],
    elevation: [],
    route: {
        distance: null,
        duration: null,
    },
    showMapInfo: false,

    userLocationButton: false,
    targetLocationButton: false,
    marker: null,
    markerid: null,
    userLocation: {
        lat: null,
        lng: null,
    },
    userMarkers: [],
    targetMarker: [],
    userPathMarkers: {
        enableMarkers: false,
        clearMarkers: false,
        markers: []
    }
}

const mutations = {
    [MutationTypes.GOOGLE_MAPS](state) {
        /**
         * Map Styling
         * > custom maps syling
         */
        var mapStyle = [
            {
                "featureType": "all",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "weight": "2.00"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#9c9c9c"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "lightness": "20"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 45
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#7b7b7b"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#46bcec"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#c8d7d4"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#070707"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            }
        ]

        /**
         * Create Google Map
         */
        state.map = new google.maps.Map(document.getElementById('map'), {
            zoom: state.zoom,
            center: new google.maps.LatLng(state.center.lat, state.center.lng),
            styles: mapStyle,
            disableDefaultUI: true
        });

        /**
         * Zoom Change for Distance Visualization
         * > set state zoom level to google maps zoom level
         * > set visual distance ruler width & distance
         */
        google.maps.event.addListener(state.map, 'zoom_changed', function() {
            state.distance.zoom = state.map.getZoom();
            var zoomLevel = state.map.getZoom()

            switch (zoomLevel) {
                case 9:
                    state.distance.kilometers = '40 km';
                    state.distance.width = 192;
                    break;
                case 10:
                    state.distance.kilometers = '20 km';
                    state.distance.width = 192;
                    break;
                case 11:
                    state.distance.kilometers = '10 km';
                    state.distance.width = 192;
                    break;
                case 12:
                    state.distance.kilometers = '5 km';
                    state.distance.width = 192;
                    break;
                case 13:
                    state.distance.kilometers = '2 km';
                    state.distance.width = 153;
                    break;
                case 14:
                    state.distance.kilometers = '1 km';
                    state.distance.width = 153;
                    break;
                case 15:
                    state.distance.kilometers = '500 m';
                    state.distance.width = 153;
                    break;
                case 16:
                    state.distance.kilometers = '200 m';
                    state.distance.width = 122;
                    break;
                case 17:
                    state.distance.kilometers = '100 m';
                    state.distance.width = 122;
                    break;
                case 18:
                    state.distance.kilometers = '50 m';
                    state.distance.width = 122;
                    break;
                case 19:
                    state.distance.kilometers = '25 m';
                    state.distance.width = 122;
                    break;
                case 20:
                    state.distance.kilometers = '10 m';
                    state.distance.width = 98;
                    break;
                default:
                    break;
            }

        });

        /**
         * Restrict Zoom Out Level & Add Boundaries to Map
         * > bounds for Croatia
         *     - South-West
         *     - North-East
         * > listen for the dragend event & reposition
         *     - if we're out of bounds - Move the map back within the bounds
         * > Limit the zoom level
         */
        const strictBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(42.27, 13.40),
            new google.maps.LatLng(46.58, 19.42)
        );

        google.maps.event.addListener(state.map, 'dragend', function() {
            if (strictBounds.contains(state.map.getCenter())) return;

            var c = state.map.getCenter(),
                x = c.lng(),
                y = c.lat(),
                maxX = strictBounds.getNorthEast().lng(),
                maxY = strictBounds.getNorthEast().lat(),
                minX = strictBounds.getSouthWest().lng(),
                minY = strictBounds.getSouthWest().lat();

            if (x < minX) x = minX;
            if (x > maxX) x = maxX;
            if (y < minY) y = minY;
            if (y > maxY) y = maxY;

            state.map.setCenter(new google.maps.LatLng(y, x));
        });

        google.maps.event.addListener(state.map, 'zoom_changed', function() {
            if (state.map.getZoom() < 9) {
                state.map.setZoom(9);
            }
        });
    },




    [MutationTypes.GOOGLE_MAPS_TYPE](state) {
        if(state.mapType == false) {
            state.map.setMapTypeId('terrain');
            state.mapType = true;
        } else {
            state.map.setMapTypeId('roadmap');
            state.mapType = false;
        }
    },




    [MutationTypes.GET_FULL_ROUTE_GPS](state, { response }) {
        /**
         * Push refuge(markers) to refuges array
         */
        response.data.refuge.forEach(function(refuge) {
            state.refuges.push({ name: refuge.name, lat: refuge.latitude, lng: refuge.longitude });
        });
        /**
         * Push path points to paths array
         * > must for new google.maps.LatLng(lat,lng) for easy polyline reading
         */
        response.data.route_gps.forEach(function(gpaths) {
            state.path.push(new google.maps.LatLng(gpaths.latitude, gpaths.longitude));
        });
        /**
         * Push altitude points to elevation array
         */
        response.data.route_gps.forEach(function(elevate) {
            state.elevation.push(elevate.altitude);
        });
        /**
         * Set route duration
         */
        state.route.duration = response.data.route[0].duration;
        /**
         * Zoom In
         * > populate marker list
         * > set new zoom level
         * > set google maps center to first marker lat & lng in marker list
         */
        state.zoom = 12;
        state.distance.zoom = 12;
        state.distance.kilometers = '5 km';
        state.distance.width = 192;
        state.center.lat = state.refuges[0].lat;
        state.center.lng = state.refuges[0].lng;

        /**
         * Show Map Info
         */
        state.showMapInfo = true;
    },




    [MutationTypes.SHOW_FULL_ROUTE_GPS](state) {
        /**
         * Refuge Markers
         * > loop for each refuge
         */
        var refugeIcon = {
            url: 'img/cabin.png',
            scaledSize: new google.maps.Size(36, 36),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(10,50)
        };

        state.refuges.forEach(function(googlemarker) {
            var marker = new MarkerWithLabel({
                map: state.map,
                position: new google.maps.LatLng(googlemarker.lat, googlemarker.lng),
                icon: refugeIcon,
                labelContent: googlemarker.name,
                labelAnchor: new google.maps.Point(70, 12),
                labelClass: "refugeMarker",
                labelInBackground: true
            });
            state.refugeMarkers.push(marker);
        });

        /**
         * Route Path
         * > create a path polyline & set it to map
         */
        state.routePath = new google.maps.Polyline({
            path: state.path,
            geodesic: true,
            strokeColor: '#DD12BF',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });
        state.routePath.setMap(state.map);

        /**
         * Zoom In & set New Map Center
         */
        state.map.setZoom(state.zoom);
        var newMapCenter = new google.maps.LatLng(state.center.lat, state.center.lng);
        state.map.setCenter(newMapCenter);

    },




    [MutationTypes.CLEAR_FULL_ROUTE_GPS](state) {
        /**
         * Clear Route
         * > clear list of refuges
         * > remove refuge markers from the map
         * > remove path
         * > remove path from map
         * > remove elevation data
         * > remove distance
         * > remove duration
         * > set map to original coordinates & zoom
         */
        state.showMapInfo = false;
        state.refuges = [];

        for(var i = 0; i < state.refugeMarkers.length; i++) {
            state.refugeMarkers[i].setMap(null);
        }

        state.path = [];
        state.routePath.setMap(null);
        state.elevation = [];

        state.route.distance = null;
        state.route.duration = null;

        state.map.setZoom(9);
        var newMapCenter = new google.maps.LatLng(45.80, 15.97);
        state.map.setCenter(newMapCenter);

    },




    [MutationTypes.ELEVATION_CHART](state) {
        /**
         * Google Chart
         * > load chart
         * > set columns with elevation data (first column would be good for distance)
         * > loop through elevation data and add rows
         * > hide x axis in options
         * > draw chart
         */
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            var data = new google.visualization.DataTable();
            data.addColumn('number', 'Empty');
            data.addColumn('number', 'Altitude');

            for (var i = 0; i < state.elevation.length; i++) {
                var row = [i, state.elevation[i]];
                data.addRow(row);
            }

            var options = {
                curveType: 'function',
                legend: { position: 'top' },
                hAxis: { textPosition: 'none' },
            };

            var chart = new google.visualization.LineChart(document.getElementById('elevationChart'));

            chart.draw(data, options);
        }

    },




    [MutationTypes.SHOW_USER_LOCATION](state) {
        /**
         * User Location Marker
         * > markerIcon > anchor >
         *     > 0 0 is starting position (like origin) but for image
         *     > first number left right, second up down (18, 0)
         *     > you can center image depending on the size
         * > location button pressed
         */
        var markerIcon = {
            url: 'img/user-location.png',
            scaledSize: new google.maps.Size(36, 36),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(18,32)
        };

        state.marker = new MarkerWithLabel({
            map: state.map,
            position: new google.maps.LatLng(state.userLocation.lat, state.userLocation.lng),
            icon: markerIcon
        });

        state.userLocationButton = true;
    },




    [MutationTypes.HIDE_USER_LOCATION](state) {
        /**
         * Remove User Location Marker
         * > stop navigation watch services
         * > remove marker from map
         * > set marker id, lat & lng to null
         * > user location button un-pressed
         */
        navigator.geolocation.clearWatch(state.markerid);
        state.marker.setMap(null);
        state.markerid = null;
        state.userLocation.lat = null;
        state.userLocation.lng = null;
        state.userLocationButton = false;
    },




    [MutationTypes.SHOW_TARGET_LOCATION](state) {
        /**
         * Show Target Location
         * > add google event listener & let if fire only once
         * > activate target location button
         * > add target marker
         * > set state target marker
         */
        google.maps.event.addListener(state.map, 'click', function(event) {
            targetLocation(event.latLng);
            google.maps.event.clearListeners(state.map, 'click');
        });

        state.targetLocationButton = true;

        var targetIcon = {
            url: 'img/target-flag.png',
            scaledSize: new google.maps.Size(36, 36),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(18,32)
        };

        function targetLocation(location) {
            var marker = new MarkerWithLabel({
                map: state.map,
                position: location,
                draggable: true,
                icon: targetIcon,
                labelAnchor: new google.maps.Point(70, 12),
                labelInBackground: true
            });

            state.targetMarker = marker;
        }
    },




    [MutationTypes.HIDE_TARGET_LOCATION](state) {
        /**
         * Hide Target Location
         * > deactivate target location button
         * > remove target marker from map if we added marker on map
         */
        state.targetLocationButton = false;
        state.targetMarker.setMap(null);
    },




    [MutationTypes.CREATE_USER_PATH_MARKER](state) {
        /**
         * Custom Path
         * > click event listener to add marker on map
         * > create unique id for every marker
         * > get gps coordinates & push them in array
         */
        google.maps.event.addListener(state.map, 'click', function(event) {
            addMarker(event.latLng);
        });


        /**
         * Add Marker
         * > path icon
         * > userMarkers (important for clearing markers)
         * > userPathMarkers (store lat & lng)
         */
        var pathIcon = {
            url: 'img/path-point.png',
            scaledSize: new google.maps.Size(10, 10),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(5,5)
        };

        function addMarker(location) {
            var marker = new MarkerWithLabel({
                map: state.map,
                position: location,
                icon: pathIcon,
                labelAnchor: new google.maps.Point(70, 12),
                labelInBackground: true
            });

            state.userMarkers.push(marker);
            state.userPathMarkers.markers.push({ lat: marker.getPosition().lat(), lng: marker.getPosition().lng() });
        }


    },




    [MutationTypes.CLEAR_USER_PATH_MARKERS](state) {
        /**
         * Remove Path Markers
         * > remove gps markers
         * > remove google position markers
         * > remove click event
         */
        state.userPathMarkers.markers = [];
        for (var i = 0; i < state.userMarkers.length; i++) {
            state.userMarkers[i].setMap(null);
        }
        google.maps.event.clearListeners(state.map, 'click');
    }
}

const actions = {
    [MutationTypes.GOOGLE_MAPS]({commit}) {
        commit(MutationTypes.GOOGLE_MAPS)
    },




    [MutationTypes.GOOGLE_MAPS_TYPE]({commit}) {
        commit(MutationTypes.GOOGLE_MAPS_TYPE)
    },




    [MutationTypes.GET_FULL_ROUTE_GPS]({commit}, data) {
        const token = localStorage.getItem('token');
        return new Promise((resolve, reject) => {
            axios.post('api/get-full-route-gps' + '?token=' + token, data)
                    .then((response) => {
                        if(response.status == 200) {
                            commit(MutationTypes.GET_FULL_ROUTE_GPS, { response });
                            commit(MutationTypes.ELEVATION_CHART);
                            commit(MutationTypes.SHOW_FULL_ROUTE_GPS);
                            resolve();
                        }
                    })
                    .catch((error) => {
                        swal({
                            type: 'error',
                            title: 'Route GPS Not Loaded! Try Again!'
                        }).catch(swal.noop)
                        console.log(error);
                        reject();
                    })
        })
    },




    [MutationTypes.CLEAR_FULL_ROUTE_GPS]({commit}) {
        commit(MutationTypes.CLEAR_FULL_ROUTE_GPS)
    },




    [MutationTypes.ELEVATION_CHART]({commit}) {
        commit(MutationTypes.ELEVATION_CHART);
    },




    [MutationTypes.SHOW_USER_LOCATION]({commit}) {
        if(state.userLocationButton == false) {
            if('geolocation' in navigator) {
                state.markerid = navigator.geolocation.watchPosition(function(position) {
                    state.userLocation.lat = position.coords.latitude;
                    state.userLocation.lng = position.coords.longitude;
                    commit(MutationTypes.SHOW_USER_LOCATION);
                });
            } else {
                console.log('Geolocation services not available');
            }
        } else {
            commit(MutationTypes.HIDE_USER_LOCATION);
        }
    },




    [MutationTypes.SHOW_TARGET_LOCATION]({commit}) {
        if(state.targetLocationButton == false) {
            commit(MutationTypes.SHOW_TARGET_LOCATION);
        } else {
            commit(MutationTypes.HIDE_TARGET_LOCATION);
        }
    },




    [MutationTypes.CREATE_USER_PATH_MARKER]({commit}) {
        if(state.userPathMarkers.enableMarkers) {
            state.userPathMarkers.enableMarkers = false;
        } else {
            commit(MutationTypes.CREATE_USER_PATH_MARKER)
        }
    },




    [MutationTypes.CLEAR_USER_PATH_MARKERS]({commit}) {
        commit(MutationTypes.CLEAR_USER_PATH_MARKERS)
    }

}

export default {
    state,
    mutations,
    actions,
}