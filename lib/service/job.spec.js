const JobService = require('./job');

describe('Job Service Test',()=>{
    const getEvent = function(){
      return JSON.parse(JSON.stringify(require('../../test/fixtures/event.json')));
    };
    const getService = (event)=>{
      return new JobService(event,null,null);
    };
    describe('#getUser',()=>{
        it('should get default user if not present in header',()=>{
            expect(getService(getEvent()).getUser()).toBe(1);
        });
        it('should get user in header',()=>{
            let newEvent = getEvent();
            newEvent.headers.user = 0;
            expect(getService(newEvent).getUser()).toBe(0);
        });
    });
    describe('#userId',()=>{
        it('should get valid user',()=>{
            expect(getService(getEvent()).userId).toBe(1);
        });
    });
    describe('#save',()=>{
        it('should save job');
    });
    describe('#all',()=>{
        it('should get all jobs');
    });
    describe('#get',()=>{
        it('should get job');
    });
    describe('#delete',()=>{
        it('should delete properly');
    });
});