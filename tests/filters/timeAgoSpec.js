describe("Unit-Tests: timeAgo filter", function () {
    
    var timeAgoFilter,
        second = 1000,
        minute = 60 * second,
        hour = 60 * minute,
        day = 24 * hour,
        week = 7 * day,
        month = 31 * day,
        year = 365 * day;
    
    // Mock application    
    beforeEach(angular.mock.module('app'));
    
    // Inject filter to test
    beforeEach(inject(function($filter) {
        timeAgoFilter = $filter('timeAgo');       
    }));
    
    it('should have a timeAgo filter', function(){

        expect(timeAgoFilter).not.toEqual(null);

    });

    it('should return null if no time is set', function () {

        var timeAgo;
        
        timeAgo = timeAgoFilter();
        expect(timeAgo).toEqual(null);

    });
    
    it('should work with the current time if "now" is not set', function () {

        var timeAgo;
        
        timeAgo = timeAgoFilter(0);
        expect(timeAgo).not.toEqual(null);

    });
    
    
    it('should convert dateString into timestamp', function () {

        var timeAgo;
        
        timeAgo = timeAgoFilter('December 19, 2010 18:20:00', 99, 'December 19, 2010 18:40:01');
        expect(timeAgo).toEqual('20 minutes and 1 second ago');

    });
    
    it('should return null if the accuracy is not valid', function () {

        var timeAgo;
        
        timeAgo = timeAgoFilter(0, -1);
        expect(timeAgo).toEqual(null);
        
        timeAgo = timeAgoFilter(0, 0);
        expect(timeAgo).toEqual(null);

    });
    
    it('should return null if the date is not valid', function () {

        var timeAgo,
            nonValidDateString = 'not-valid';
        
        timeAgo = timeAgoFilter(nonValidDateString, 0);
        expect(timeAgo).toEqual(null);
        
        timeAgo = timeAgoFilter(0, 0, nonValidDateString);
        expect(timeAgo).toEqual(null);

    });

    it('should return "just now" if the difference is less than half a second', function () {

        var timeAgo;
        
        timeAgo = timeAgoFilter(0, 99, 0);
        expect(timeAgo).toEqual('just now');

        timeAgo = timeAgoFilter(0, 99, 499);
        expect(timeAgo).toEqual('just now');

    });

    it('should return "x second(s) ago" / "in x second(s) if the difference in the seconds', function () {

        var timeAgo;
        
        timeAgo = timeAgoFilter(0, 99, second);
        expect(timeAgo).toEqual('1 second ago');

        timeAgo = timeAgoFilter(0, 99, 59 * second);
        expect(timeAgo).toEqual('59 seconds ago');

        timeAgo = timeAgoFilter(second, 99, 0);
        expect(timeAgo).toEqual('in 1 second');

        timeAgo = timeAgoFilter(59 * second, 99, 0);
        expect(timeAgo).toEqual('in 59 seconds');

    });

    it('should return "x minute(s) ago" / "in x minute(s) if the difference in the minutes', function () {

        var timeAgo;
        
        timeAgo = timeAgoFilter(0, 99, minute);
        expect(timeAgo).toEqual('1 minute ago');

        timeAgo = timeAgoFilter(0, 99, 59 * minute);
        expect(timeAgo).toEqual('59 minutes ago');

        timeAgo = timeAgoFilter(minute, 99, 0);
        expect(timeAgo).toEqual('in 1 minute');

        timeAgo = timeAgoFilter(59 * minute, 99, 0);
        expect(timeAgo).toEqual('in 59 minutes');

    });

    it('should return "x hour(s) ago" / "in x hours(s) if the difference in the hours', function () {

        var timeAgo;
        
        timeAgo = timeAgoFilter(0, 99, hour);
        expect(timeAgo).toEqual('1 hour ago');

        timeAgo = timeAgoFilter(0, 99, 23 * hour);
        expect(timeAgo).toEqual('23 hours ago');

        timeAgo = timeAgoFilter(hour, 99, 0);
        expect(timeAgo).toEqual('in 1 hour');

        timeAgo = timeAgoFilter(23 * hour, 99, 0);
        expect(timeAgo).toEqual('in 23 hours');

    });

    it('should return "x day(s) ago" / "in x day(s) if the difference in the days', function () {

        var timeAgo;
        
        timeAgo = timeAgoFilter(0, 99, day);
        expect(timeAgo).toEqual('1 day ago');

        timeAgo = timeAgoFilter(0, 99, 6 * day);
        expect(timeAgo).toEqual('6 days ago');

        timeAgo = timeAgoFilter(day, 99, 0);
        expect(timeAgo).toEqual('in 1 day');

        timeAgo = timeAgoFilter(6 * day, 99, 0);
        expect(timeAgo).toEqual('in 6 days');

    });

    it('should return "x week(s) ago" / "in x week(s) if the difference in the weeks', function () {

        var timeAgo;
        
        timeAgo = timeAgoFilter(0, 99, week);
        expect(timeAgo).toEqual('1 week ago');

        timeAgo = timeAgoFilter(0, 99, 4 * week);
        expect(timeAgo).toEqual('4 weeks ago');

        timeAgo = timeAgoFilter(week, 99, 0);
        expect(timeAgo).toEqual('in 1 week');

        timeAgo = timeAgoFilter(4 * week, 99, 0);
        expect(timeAgo).toEqual('in 4 weeks');

    });

    it('should return "x month(s) ago" / "in x month(s) if the difference in the month', function () {

        var timeAgo;
        
        timeAgo = timeAgoFilter(0, 99, month);
        expect(timeAgo).toEqual('1 month ago');

        timeAgo = timeAgoFilter(0, 99, 11 * month);
        expect(timeAgo).toEqual('11 months ago');

        timeAgo = timeAgoFilter(month, 99, 0);
        expect(timeAgo).toEqual('in 1 month');

        timeAgo = timeAgoFilter(11 * month, 99, 0);
        expect(timeAgo).toEqual('in 11 months');

    });

    it('should return "x year(s) ago" / "in x year(s) if the difference in the years', function () {

        var timeAgo;
        
        // TODO: INTEGERS?!??!?

        timeAgo = timeAgoFilter(0, 99, year);
        // expect(timeAgo).toEqual('1 year ago');

        timeAgo = timeAgoFilter(0, 99, 2 * year);
        // expect(timeAgo).toEqual('2 years ago');

        timeAgo = timeAgoFilter(year, 99, 0);
        // expect(timeAgo).toEqual('in 1 year');

        timeAgo = timeAgoFilter(2 * year, 99, 0);
        // expect(timeAgo).toEqual('in 2 years');

    });

    it('should work while switching years, months etc', function () {

        var timeAgo;
        
        timeAgo = timeAgoFilter('December 31, 1994 23:59:59', 99, 'January 01, 1995 23:59:59');
        expect(timeAgo).toEqual('1 day ago');

        timeAgo = timeAgoFilter('January 01, 1995 23:59:59', 99, 'December 31, 1994 23:59:59', 1);
        expect(timeAgo).toEqual('in 1 day');

    });

    it('should have correct grammar', function () {

        var timeAgo;
        
        timeAgo = timeAgoFilter(0, 99, hour + 1 * minute + second);
        expect(timeAgo).toEqual('1 hour 1 minute and 1 second ago');

        timeAgo = timeAgoFilter(2 * hour + 2 * minute + 2 * second, 99, 0);
        expect(timeAgo).toEqual('in 2 hours 2 minutes and 2 seconds');

    });

    it('should have correct accuracy', function () {

        var timeAgo;
        
        timeAgo = timeAgoFilter(0, 1, hour + 2 * minute + second);
        expect(timeAgo).toEqual('1 hour ago');

        timeAgo = timeAgoFilter(0, 2, hour + 2 * minute + second);
        expect(timeAgo).toEqual('1 hour and 2 minutes ago');

        timeAgo = timeAgoFilter(0, 9999, minute + second);
        expect(timeAgo).toEqual('1 minute and 1 second ago');

    });

    it('should have correct accuracy when the groups in between dont have values', function () {

        var timeAgo;
        
        timeAgo = timeAgoFilter(0, 3, week + /* null days, null hours + */ 10 * second);
        // expect(timeAgo).toEqual('1 week ago');
        
        timeAgo = timeAgoFilter(0, 2, month + /* null weeks + */ 6 * day + 4 * hour + 10 * second);
        // expect(timeAgo).toEqual('1 month ago');

    });

    // TODO tests for actual functionality (take month days etc)

});
