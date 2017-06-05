'use strict';

describe('Service: Redit', function () {

  // load the service's module
  beforeEach(module('newsubwayApp'));

  // instantiate service
  var Redit;
  beforeEach(inject(function (_Redit_) {
    Redit = _Redit_;
  }));

  it('should do something', function () {
    expect(!!Redit).toBe(true);
  });

});
