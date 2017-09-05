const Service = require('./service');
const Repo = require('../repository/dynamojob');
const log = require('winston');

/**
 * Job Service class for job service functions.
 * @requires lodash
 * @requires winston
 * @requires module:lib/repositorydynamojob
 */
class JobService extends Service{
    /**
     *
     * @param {object} event - the event passed in from the lambda function
     * @param {object} context - the context passed in from the lambda function
     * @param {function} callback - the callback function passed in from lambda
     * @param {object} repository - the data persistance repository object to pass into the JobService,defaults to dynamojobrepository.
     */
    constructor(event = {},context = {},callback = null,repository = new Repo()){
        super(event,context,callback);
        this.repository = repository;
        this._userId = this.getUser();
    }

    /**
     * initially sets the userId for the service to get jobs related to, tries to fetch it from the header, defaults to 1.
     * @return {number} - the user id.
     */
    getUser(){
        try{
               if (!isNaN(parseInt(this.headers.user))) {
                   return parseInt(this.headers.user);
               }
           return 1;
        }
        catch(e){
         return 1;
        }
    }
    set userId (userId){
        this._userId = userId;
    }
    get userId (){
        return this._userId !== null ? this._userId : 1;
    }

    /**
     * Will create a new job tied to the current user set in the service. the only required field is the jobId which is a number.
     * @param {object} job - the object containing the job information you wish to save. defaults to the event's body object.
     * @return {Promise} - returns a promise object from the repository for the save operation.
     */
    save(job = JSON.parse(this.body)){
        const newJob = Object.assign({userId : this._userId},job);
        log.debug(newJob);
        return this.repository.save(newJob);
    }
    /**
     * Will get all jobs related to the userId passed into the function.
     * @param {number} userId - the userId you wish to fetch all the jobs related to. defaults to the current services set user id.
     * @return {Promise} - returns a promise object from the repository for the get all operation.
     */
    all(userId = this.userId){
        return this.repository.all(userId);
    }
    /**
     * Will get a single job related to the userId set in the service.
     * @param {number} jobId - the jobId you wish to fetch the job related to.
     * @return {Promise} - returns a promise object from the repository for the get operation.
     */
    get (jobId = parseInt(this.pathParams.id)){
        return this.repository.get(this._userId,jobId);
    }
    /**
     * Will delete a single job related to the userId set in the service.
     * @param {number} jobId - the jobId of the job you wish to delete.
     * @return {Promise} - returns a promise object from the repository for the delete operation.
     */
    delete(jobId = parseInt(this.pathParams.id)){
        return this.repository.delete(this._userId,jobId);
    }
}

module.exports = JobService;