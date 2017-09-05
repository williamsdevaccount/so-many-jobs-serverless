const JobService = require('../lib/service/job');
const log = require('winston');
const debug = require('../lib/util/debug');
const Repository = require('../lib/repository/dynamojob');
const repo = new Repository();
log.level = 'debug';
const serverError = {
  error : {
      message : 'Internal Server Error'
  }
};
module.exports.create = (event,context,callback)=>{
    const service = new JobService(event,context,callback,repo);
    const res = {
      message : 'Job Created'
    };
    const failed = (error)=>{
        log.debug(`create-job error : ${debug.json(error)}`);
        service.error(serverError);
    };
    const created = ()=>{
      service.success(res,201);
    };
    service.save()
        .then(created)
        .catch(failed);
};
module.exports.all = (event,context,callback)=>{
  let service = new JobService(event,context,callback,repo);
    const failed = (error)=>{
        log.debug(`all-job error : ${debug.json(error)}`);
        service.error(serverError);
    };
    const fetch = (data)=>{
        log.debug(`all res : ${debug.json(data)}`);
        let res = {
          jobs : data.Items
        };
        service.success(res,200);
    };
  service.all()
      .then(fetch)
      .catch(failed);
};
module.exports.get = (event,context,callback)=>{
    let service = new JobService(event,context,callback,repo);
    const failed = (error)=>{
        log.debug(`get-job error : ${debug.json(error)}`);
        service.error(serverError);
    };
    const fetch = (data)=>{
        log.debug(`get res : ${debug.json(data)}`);
        service.success(data.Item,200);
    };
    service.get()
        .then(fetch)
        .catch(failed);
};
module.exports.delete = (event,context,callback)=>{
    let service = new JobService(event,context,callback,repo);
    const failed = (error)=>{
        log.debug(`delete-job error : ${debug.json(error)}`);
        service.error(serverError);
    };
    const deleted = (data)=>{
        log.debug(`delete res : ${debug.json(data)}`);
        service.success({},204);
    };
    service.delete()
        .then(deleted)
        .catch(failed);
};