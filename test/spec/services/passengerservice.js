'use strict';

describe('Service: passengerService', function () {

  // load the service's module
  beforeEach(module('newsubwayApp'));

  // instantiate service
  var passengerService;
  beforeEach(inject(function (_passengerService_) {
    passengerService = _passengerService_;
  }));

  it('should do something', function () {
    expect(!!passengerService).toBe(true);
  });

});
