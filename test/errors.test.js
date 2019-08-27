'use strict';

const { test } = require('tap');
const { LDAPError, ConnectionError, AbandonedError, TimeoutError, LDAP_OTHER } = require('../lib');

test('basic error', function (t) {
  const msg = 'mymsg';
  const err = new LDAPError(msg, null, null);
  t.ok(err);
  t.equal(err.name, 'LDAPError');
  t.equal(err.code, LDAP_OTHER);
  t.equal(err.dn, '');
  t.equal(err.message, msg);
  t.end();
});

test('"custom" errors', function (t) {
  const errors = [
    { name: 'ConnectionError', func: ConnectionError },
    { name: 'AbandonedError', func: AbandonedError },
    { name: 'TimeoutError', func: TimeoutError }
  ];

  errors.forEach(function (entry) {
    const msg = entry.name + 'msg';
    const err = new entry.func(msg);
    t.ok(err);
    t.equal(err.name, entry.name);
    t.equal(err.code, LDAP_OTHER);
    t.equal(err.dn, '');
    t.equal(err.message, msg);
  });

  t.end();
});
