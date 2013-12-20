/*global application:false, console:false*/
application.filter('timeAgo', function () {
    'use strict';

    return function (time, accuracy, now) {

        var ago, difference, seconds, localstuff, timeArray, i;

        if (time === undefined || time === null || accuracy < 1) {
            return null;
        }

        if (accuracy === undefined || accuracy === null) {
            accuracy = 1;
        }

        if (now === undefined || now === null) {
            now = new Date();
        } else {
            now = new Date(now);
        }

        ago = new Date(time);
        difference = Math.abs(Math.round((now - ago) / 1000));

        if (difference === 0) {
            return 'just now';
        }

        function format(quantity, called) { // TODO rename called

            if (quantity < 1) {
                return null;
            }

            var pluralisation = (quantity > 1) ? 1 : 0;
            return quantity + ' ' + called[pluralisation];

        }

        // TODO rework that uneven months etc are shown
        seconds = [ // TODO rename seconds
            356 * 24 * 60 * 60,
            31 * 24 * 60 * 60,
            7 * 24 * 60 * 60,
            24 * 60 * 60,
            60 * 60,
            60,
            1
        ];
        localstuff = [ // TODO rename localstuff
            ['year', 'years'],
            ['month', 'months'],
            ['week', 'weeks'],
            ['day', 'days'],
            ['hour', 'hours'],
            ['minute', 'minutes'],
            ['second', 'seconds']
        ];

        timeArray = [];

        for (i = 0; i !== seconds.length; i++) {

            var tmp_count = Math.floor(difference / seconds[i]); // TODO rename tmp
            var tmp_string = format(tmp_count, localstuff[i]);

            if (tmp_string !== null) {

                timeArray.push(tmp_string);

            }

            difference -= tmp_count * seconds[i];

        }

        // console.log(timeArray);

        // Remove too high accuracy
        timeArray.length = Math.min(timeArray.length, accuracy);

        // Create a string of stuff
        if (timeArray.length === 1) {
            var time_string = timeArray[0];
        } else {
            var time_string = timeArray.slice(0, -1).join(' ') + ' and ' + timeArray[timeArray.length - 1];
        }

        return (ago > now) ? 'in ' + time_string : time_string + ' ago';


    };

});