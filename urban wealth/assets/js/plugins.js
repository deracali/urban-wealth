// Avoid `console` errors in browsers that lack a console.
(function() {
  var mngnod;
  var noop = function () {};
  var mngnods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
  ];
  var length = mngnods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    mngnod = mngnods[length];

    // Only stub undefined mngnods.
    if (!console[mngnod]) {
      console[mngnod] = noop;
    }
  }
}());

// Place any jQuery/helper plugins in here.
