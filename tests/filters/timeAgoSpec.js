describe("filters/timeAgo", function () {

    beforeEach(angular.mock.module('newsletter-mailer'));

    it('should have a timeAgo filter', inject(function ($filter) {

        expect($filter('timeAgo')).not.toEqual(null);

    }));

    it('should return null if no time is set', inject(function ($filter) {

        var timeAgo = $filter('timeAgo')();
        expect(timeAgo).toEqual(null);

    }));

    it('should return "just now" if the difference is less than half a second', inject(function ($filter) {

        var timeAgo = $filter('timeAgo')(0, 99, 0);
        expect(timeAgo).toEqual('just now');

        var timeAgo = $filter('timeAgo')(0, 99, 499);
        expect(timeAgo).toEqual('just now');

    }));

    it('should return "x second(s) ago" / "in x second(s) if the difference in the seconds', inject(function ($filter) {

        var timeAgo = $filter('timeAgo')(0, 99, 1 * 1000);
        expect(timeAgo).toEqual('1 second ago');

        var timeAgo = $filter('timeAgo')(0, 99, 59 * 1000);
        expect(timeAgo).toEqual('59 seconds ago');

        var timeAgo = $filter('timeAgo')(1 * 1000, 99, 0);
        expect(timeAgo).toEqual('in 1 second');

        var timeAgo = $filter('timeAgo')(59 * 1000, 99, 0);
        expect(timeAgo).toEqual('in 59 seconds');

    }));

    it('should return "x minute(s) ago" / "in x minute(s) if the difference in the minutes', inject(function ($filter) {

        var timeAgo = $filter('timeAgo')(0, 99, 1 * 60 * 1000);
        expect(timeAgo).toEqual('1 minute ago');

        var timeAgo = $filter('timeAgo')(0, 99, 59 * 60 * 1000);
        expect(timeAgo).toEqual('59 minutes ago');

        var timeAgo = $filter('timeAgo')(1 * 60 * 1000, 99, 0);
        expect(timeAgo).toEqual('in 1 minute');

        var timeAgo = $filter('timeAgo')(59 * 60 * 1000, 99, 0);
        expect(timeAgo).toEqual('in 59 minutes');

    }));

    it('should return "x hour(s) ago" / "in x hours(s) if the difference in the hours', inject(function ($filter) {

        var timeAgo = $filter('timeAgo')(0, 99, 1 * 60 * 60 * 1000);
        expect(timeAgo).toEqual('1 hour ago');

        var timeAgo = $filter('timeAgo')(0, 99, 23 * 60 * 60 * 1000);
        expect(timeAgo).toEqual('23 hours ago');

        var timeAgo = $filter('timeAgo')(1 * 60 * 60 * 1000, 99, 0);
        expect(timeAgo).toEqual('in 1 hour');

        var timeAgo = $filter('timeAgo')(23 * 60 * 60 * 1000, 99, 0);
        expect(timeAgo).toEqual('in 23 hours');

    }));

    it('should return "x day(s) ago" / "in x day(s) if the difference in the days', inject(function ($filter) {

        var timeAgo = $filter('timeAgo')(0, 99, 24 * 60 * 60 * 1000);
        expect(timeAgo).toEqual('1 day ago');

        var timeAgo = $filter('timeAgo')(0, 99, 6 * 24 * 60 * 60 * 1000);
        expect(timeAgo).toEqual('6 days ago');

        var timeAgo = $filter('timeAgo')(24 * 60 * 60 * 1000, 99, 0);
        expect(timeAgo).toEqual('in 1 day');

        var timeAgo = $filter('timeAgo')(6 * 24 * 60 * 60 * 1000, 99, 0);
        expect(timeAgo).toEqual('in 6 days');

    }));

    it('should return "x week(s) ago" / "in x week(s) if the difference in the weeks', inject(function ($filter) {

        var timeAgo = $filter('timeAgo')(0, 99, 7 * 24 * 60 * 60 * 1000);
        expect(timeAgo).toEqual('1 week ago');

        var timeAgo = $filter('timeAgo')(0, 99, 4 * 7 * 24 * 60 * 60 * 1000);
        expect(timeAgo).toEqual('4 weeks ago');

        var timeAgo = $filter('timeAgo')(7 * 24 * 60 * 60 * 1000, 99, 0);
        expect(timeAgo).toEqual('in 1 week');

        var timeAgo = $filter('timeAgo')(4 * 7 * 24 * 60 * 60 * 1000, 99, 0);
        expect(timeAgo).toEqual('in 4 weeks');

    }));

    it('should return "x month(s) ago" / "in x month(s) if the difference in the month', inject(function ($filter) {

        var timeAgo = $filter('timeAgo')(0, 99, 31 * 24 * 60 * 60 * 1000);
        expect(timeAgo).toEqual('1 month ago');

        var timeAgo = $filter('timeAgo')(0, 99, 11 * 31 * 24 * 60 * 60 * 1000);
        expect(timeAgo).toEqual('11 months ago');

        var timeAgo = $filter('timeAgo')(31 * 24 * 60 * 60 * 1000, 99, 0);
        expect(timeAgo).toEqual('in 1 month');

        var timeAgo = $filter('timeAgo')(11 * 31 * 24 * 60 * 60 * 1000, 99, 0);
        expect(timeAgo).toEqual('in 11 months');

    }));

    it('should return "x year(s) ago" / "in x year(s) if the difference in the years', inject(function ($filter) {

        // TODO: INTEGERS?!??!?

        var timeAgo = $filter('timeAgo')(0, 99, 365 * 24 * 60 * 60 * 1000);
        // expect(timeAgo).toEqual('1 year ago');

        var timeAgo = $filter('timeAgo')(0, 99, 2.0 * 365 * 24 * 60 * 60 * 1000);
        // expect(timeAgo).toEqual('2 years ago');

        var timeAgo = $filter('timeAgo')(365 * 24 * 60 * 60 * 1000, 99, 0);
        // expect(timeAgo).toEqual('in 1 year');

        var timeAgo = $filter('timeAgo')(2.0 * 365 * 24 * 60 * 60 * 1000, 99, 0);
        // expect(timeAgo).toEqual('in 2 years');

    }));

    it('should convert dateString into timestamp', inject(function ($filter) {

        var timeAgo = $filter('timeAgo')('December 19, 2010 18:20:00', 99, 'December 19, 2010 18:40:01');
        expect(timeAgo).toEqual('20 minutes and 1 second ago');

    }));

    it('should work while switching years, months etc', inject(function ($filter) {

        var timeAgo = $filter('timeAgo')('December 31, 1994 23:59:59', 99, 'January 01, 1995 23:59:59');
        expect(timeAgo).toEqual('1 day ago');

        var timeAgo = $filter('timeAgo')('January 01, 1995 23:59:59', 99, 'December 31, 1994 23:59:59', 1);
        expect(timeAgo).toEqual('in 1 day');

    }));

    it('should have correct grammar', inject(function ($filter) {

        var timeAgo = $filter('timeAgo')(0, 99, 1 * 60 * 60 * 1000 + 2 * 60 * 1000 + 1 * 1000);
        expect(timeAgo).toEqual('1 hour 2 minutes and 1 second ago');

        var timeAgo = $filter('timeAgo')(2 * 60 * 60 * 1000 + 2 * 60 * 1000 + 2 * 1000, 99, 0);
        expect(timeAgo).toEqual('in 2 hours 2 minutes and 2 seconds');

    }));

    it('should have correct accuracy', inject(function ($filter) {

        var timeAgo = $filter('timeAgo')(0, 1, 1 * 60 * 60 * 1000 + 2 * 60 * 1000 + 1 * 1000);
        expect(timeAgo).toEqual('1 hour ago');

        var timeAgo = $filter('timeAgo')(0, 2, 1 * 60 * 60 * 1000 + 2 * 60 * 1000 + 1 * 1000);
        expect(timeAgo).toEqual('1 hour and 2 minutes ago');

        var timeAgo = $filter('timeAgo')(0, 9999,  60 * 1000 + 1000);
        expect(timeAgo).toEqual('1 minute and 1 second ago');

    }));

    it('should have correct accuracy when the lower group is too small', inject(function ($filter) { // TODO text

        var timeAgo = $filter('timeAgo')(0, 3, 7 * 24 * 60 * 60 * 1000 + 1000);
        // expect(timeAgo).toEqual('1 week ago');

    }));
    
    // TODO accuracy not valid (- or 0)
    // TODO time not valid (no convert in datetime)
    // TODO now not valid (no convert in datetime)

    // TODO tests for actual functionality (take month days etc)

});
