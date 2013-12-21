# ng-timeago

A filter for angularjs, which displays timestamps or dateStrings in the format "... years ... months etc ago" or  "in ... years ... months etc"

# Demo

[You can see a demo of it working here](https://rawgithub.com/queicherius/ng-timeago/master/index.html)

# Usage

```
{{ 'December 19, 2013 18:40:01' | timeAgo }}
```

Returns (given today is December 21, 2013) "2 days ago".

# Configuration

```
{{ 'December 19, 2013 18:40:01' | timeAgo:accuracy:now }}
```

## accuracy (default: 1)

You can define how accurate the result may be. It displays the given number of groups (year, month, week, day, hour, minute, second) starting at the first group with a value higher than 0.

### Examples:

- The time is 1 year 1 month 1 weeks and 1 day ago and the accuracy is set to 3 => "1 year 1 month and 1 day ago"
- The time is 1 year 1 month 0 weeks and 1 day ago and the accuracy is set to 3 => "1 year and 1 month ago"
- The time is 1 year 0 months 0 weeks and 1 day ago and the accuracy is set 3 => "1 year ago"
- The time is 1 months 0 weeks and 1 day ago and the accuracy is set 2 => "1 month ago"


## now (default: current time)

You can define the time to compare against.

```
{{ 'December 19, 2013 18:40:01' | timeAgo:1:'December 19, 2013 18:40:02' }}
```

Returns "1 second ago"