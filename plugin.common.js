'use strict';

class A {
  constructor() {
    this.a = 1;
  }

  get aPlusOne() {
    return this.a + 1;
  }
}

exports.A = A;
