// TESTING
const expect = require('chai').expect;
const sinon = require('sinon');
// APP
const Utils = require('./index.js');
// MOCK
const subject = new Utils('mockTable', 'local');

describe('Class: Utils', () => {
    describe('Method: unMarshall(marshaledItem)', () => {
        it('should un-marshal all dynamo results.', () => {
            expect(subject.unMarshall({ 'SS': ['foo', 'bar'] })).to.deep.equal(['foo', 'bar']);
            expect(subject.unMarshall({ 'S': 'bar' })).to.deep.equal('bar');
            expect(subject.unMarshall({ 'NS': ['42', '43'] })).to.deep.equal(['42', '43']);
            expect(subject.unMarshall({ 'L': [{ 'S': 'foo' }, { 'S': 'bar' }, { 'S': 'foo' }] }))
                .to.deep.equal(['foo', 'bar', 'foo']);
            // This is required because chai can't deep equal mixed types\
            const polyTypeTest = subject.unMarshall({ 'L': [{ 'N': '42' }, { 'S': 'foo' }, { 'NULL': true }] })
            expect(polyTypeTest[0]).to.equal('42');
            expect(polyTypeTest[1]).to.equal('foo');
            expect(polyTypeTest[2]).to.equal(true);
        });
    });
});
