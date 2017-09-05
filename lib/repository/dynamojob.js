const AWS = require('aws-sdk');
AWS.config.update({region: "us-east-1"});

/**
 * The JobRepository class is responsible to serve as the data persistance layer for the job service. This particular service uses dynamodb as the persistance layer.
 * @requires module:aws-sdk
 */
class JobRepository{
    /**
     *
     * @param {string} table - the name of the table for wish to perform the job operations on. defaults to 'Jobs'.
     */
    constructor(table = 'Jobs'){
        this.table = table;
        this.client = new AWS.DynamoDB.DocumentClient();
    }

    /**
     * persists a job in the data store.
     * @param {object} job - the job information you wish to persist to the data store. required fields in object are jobId and userId.
     * @return {Promise<PromiseResult<D, E>>} - returns a promise for the operation.
     */
    save(job = {}){
            let params ={
                TableName : this.table,
                Item : job
            };
            return this.client.put(params).promise();
    }

    /**
     * fetches all persisted jobs related to a single user.
     * @param {number} user - the user id you wish get all the jobs for.
     * @return {Promise<PromiseResult<D, E>>} - returns a promise for the operation.
     */
    all(user = 1){
        let params = {
            TableName: this.table,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': user
            }
        };
        return this.client.query(params).promise();
    }
    /**
     * fetches a single persisted job related to a single user based off of the input id.
     * @param {number} user - the user id you wish get the job for.
     * @param {number} job - the job id of the job you wish to get from datastore.
     * @return {Promise<PromiseResult<D, E>>} - returns a promise for the operation.
     */
    get(user = 1, job = 1){
        let params = {
            TableName: this.table,
            Key : {
                userId : user,
                jobId : job
            }
        };
        return this.client.get(params).promise();
    }
    /**
     * deletes a single persisted job related to a single user based off of the input id.
     * @param {number} user - the user id you wish find the job to delete for.
     * @param {number} job - the job id of the job you wish to delete from datastore.
     * @return {Promise<PromiseResult<D, E>>} - returns a promise for the operation.
     */
    delete(user = 1,job = 1){
        let params = {
            TableName: this.table,
            Key : {
                userId : user,
                jobId : job
            }
        };
        return this.client.delete(params).promise();
    }
}
module.exports = JobRepository;