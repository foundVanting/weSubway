'use strict';

describe('Service: unlockService', function () {

  // load the service's module
  beforeEach(module('newsubwayApp'));

  // instantiate service
  var unlockService;
  beforeEach(inject(function (_unlockService_) {
    unlockService = _unlockService_;
  }));

  it('should do something', function () {
    expect(!!unlockService).toBe(true);
  });

});
