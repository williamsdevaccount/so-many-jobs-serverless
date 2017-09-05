const log = require('winston');
const _ = require('lodash');

/**
 * Generic Service class that every service inherits from.
 * @requires lodash
 * @requires winston
 */
class Service{
    /**
     *
     * @param {object} event - the event passed in from the lambda function
     * @param {object} context - the context passed in from the lambda function
     * @param {function} callback - the callback function passed in from lambda
     */
    constructor(event = {},context = {},callback = null){
        this.event = event;
        this.context = context;
        this.callback = callback;
    }

    /**
     * returns the headers from event object.
     * @return {object}
     */
    get headers(){
        return _.get(this.event,'headers',{});
    }

    /**
     * returns the pathParameters from the event object.
     * @return {object}
     */
    get pathParams(){
        return _.get(this.event,'pathParameters',{});
    }

    /**
     * returns the httpMethod from the event object.
     * @return {string|null}
     */
    get httpMethod(){
        return _.get(this.event,'httpMethod',null);
    }

    /**
     * returns the query string key value pairs from the event object.
     * @return {object}
     */
    get queryString(){
        return _.get(this.event,'queryStringParameters',{});
    }

    /**
     * returns the body from the event object.
     * @return {object}
     */
    get body(){
        return _.get(this.event,'body',{});
    }

    /**
     *
     * @param {object} data - the object to return the client. defaults to {}.
     * @param {number} code - the status code for the response. defaults to 200.
     * @return {{statusCode: number, body : string}}
     */
    proxy(data = {},code = 200){
        return {
            statusCode : code,
            body : JSON.stringify(data)
        };
    }

    /**
     * fires off the callback function with the intention of a successfully message back to client.
     * @param {object} data - the object to return the client. defaults to {}.
     * @param {number} status - the status code for the response. defaults to 200.
     */
    success(data = {},status = 200){
        this.callback(null,this.proxy(data,status));
    }
    /**
     * fires off the callback function with the intention of a failure message back to client.
     * @param {object} error - the error to return the client. defaults to {}.
     * @param {number} status - the status code for the response. defaults to 500.
     */
    error(error = {},status = 500){
        this.callback(null,this.proxy(error,status));
    }
}
module.exports = Service;