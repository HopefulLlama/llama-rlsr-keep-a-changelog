const llamaRlsrKeepAChangelog = require('../../src/llama-rlsr-keep-a-changelog');

describe('llama-rlsr-keep-a-changelog', () => {
	it('should contain two methods', () => {
		expect(typeof llamaRlsrKeepAChangelog.updateChangelog).toBe('function');
		expect(typeof llamaRlsrKeepAChangelog.updateDiff).toBe('function');
	});
});