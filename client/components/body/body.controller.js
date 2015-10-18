'use strict';

angular.module('abctechApp')
    .controller('BodyCtrl', function($scope, $location, $http, $interval) {


        $scope.currentValue = 0;
        $scope.currentChange = 0;
        $scope.allLabels = ['test'];
        $scope.allData = [1];

        // Chart.js Data
        $scope.data = {
            labels: $scope.allLabels,
            datasets: [{
                label: 'Nasdaq',
                fillColor: 'rgba(220,220,220,0.2)',
                strokeColor: 'rgba(220,220,220,1)',
                pointColor: 'rgba(220,220,220,1)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(220,220,220,1)',
                data: $scope.allData
            }]
        };

        $scope.getData = function() {
            $http.get('/api/datas').success(function(data) {
                console.log('success');
                $scope.currentValue = data[0].index;
                $scope.currentChange = data[0].percentChange;
                $scope.data.datasets[0].data = _.pluck(data, 'index').reverse();
                $scope.data.labels = _.pluck(data, 'dateString').reverse();
            });
        };

        //get the initial data
        $scope.getData();

        $scope.test = function() {
            console.log('this is one of those test');
        };

        //run interval to get the data every one minute
        $interval(function() {

            $scope.getData();

        }, 60000);

        // Chart.js Options
        $scope.options = {

            // Sets the chart to be responsive
            responsive: true,

            ///Boolean - Whether grid lines are shown across the chart
            scaleShowGridLines: true,

            //String - Colour of the grid lines
            scaleGridLineColor: "rgba(0,0,0,.05)",

            //Number - Width of the grid lines
            scaleGridLineWidth: 1,

            //Boolean - Whether the line is curved between points
            bezierCurve: true,

            //Number - Tension of the bezier curve between points
            bezierCurveTension: 0.4,

            //Boolean - Whether to show a dot for each point
            pointDot: true,

            //Number - Radius of each point dot in pixels
            pointDotRadius: 4,

            //Number - Pixel width of point dot stroke
            pointDotStrokeWidth: 1,

            //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
            pointHitDetectionRadius: 20,

            //Boolean - Whether to show a stroke for datasets
            datasetStroke: true,

            //Number - Pixel width of dataset stroke
            datasetStrokeWidth: 2,

            //Boolean - Whether to fill the dataset with a colour
            datasetFill: true,

            // Function - on animation progress
            onAnimationProgress: function() {},

            // Function - on animation complete
            onAnimationComplete: function() {},

            //String - A legend template
            legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
        };

    });