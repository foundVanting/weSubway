'use strict';

describe('Filter: trustedFilter', function () {

  // load the filter's module
  beforeEach(module('newsubwayApp'));

  // initialize a new instance of the filter before each test
  var trustedFilter;
  beforeEach(inject(function ($filter) {
    trustedFilter = $filter('trustedFilter');
  }));

  it('should return the input prefixed with "trustedFilter filter:"', function () {
    var text = 'angularjs';
    expect(trustedFilter(text)).toBe('trustedFilter filter: ' + text);
  });

});
