'use strict';

const { lambdaHandler } = require('../../src/index');
const { expect, describe, it } = require('@jest/globals');

describe('Unit test for app handler', function () {
    it('verifies successful response', async () => {
        const event = {
            httpMethod: 'GET'
        };
        const context = {};
        
        const result = await lambdaHandler(event, context);
        
        expect(result).toHaveProperty('statusCode');
        expect(result.statusCode).toEqual(200);
        expect(result).toHaveProperty('body');
        
        const response = JSON.parse(result.body);
        
        expect(response).toHaveProperty('message');
        expect(response.message).toEqual('hello world');
    });
});
