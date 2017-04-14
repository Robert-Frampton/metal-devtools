jest.unmock('../processStateValues');

import processStateValues from '../processStateValues';

import {Map} from 'immutable';

const BOOLEAN = true;
const EMPTY_STRING = '';
const MAP = Map();
const NULL = null;
const NUMBER = 1234;
const OBJECT = {};
const STRING = 'foo';

describe('processStateValues', () => {
	test('should return same value if string or number', () => {
		expect(processStateValues(NUMBER)).toBe(NUMBER);
		expect(processStateValues(STRING)).toBe(STRING);
	});

	test('should return function in an array if it is an object', () => {
		const arr = processStateValues(OBJECT);

		expect(typeof arr[0]).toBe('function');
	});

	test('should return function in an array if it is an immutable type', () => {
		const arr = processStateValues(MAP);

		expect(typeof arr[0]).toBe('function');
	});

	test('should return stringify if boolean', () => {
		expect(processStateValues(BOOLEAN)).toBe(BOOLEAN.toString());
	});

	test('should return empty quotes if value is empty string', () => {
		expect(processStateValues(EMPTY_STRING)).toBe('""');
	});

	test('should return "null" if null type', () => {
		expect(processStateValues(NULL)).toBe('null');
	});
});
