const request = require('supertest');
const URL = 'http://localhost:3000';
const debug = require('../../lib/util/debug');
const userId = '0';
const jobID = 1000;
describe('Job API functional test',()=>{
   describe('GET /jobs',()=>{
      it('should get all jobs with valid user id',()=>{
        return request(URL)
            .get('/jobs')
            .set('user',userId)
            .set('Accept', 'application/json')
            .then(res =>{
                console.log(debug.json(res));
                expect(res.statusCode).toBe(200);
                expect(res).toHaveProperty('text');
                let body = JSON.parse(res.text);
                expect(body).toHaveProperty('jobs');
                expect(body.jobs.length).toBeGreaterThan(0);
            });

      });
       it('should get empty array with non existant user id',()=>{
           return request(URL)
               .get('/jobs')
               .set('Accept', 'application/json')
               .set('user','4343')
               .then(res =>{
                   console.log(debug.json(res));
                   expect(res.statusCode).toBe(200);
                   expect(res).toHaveProperty('text');
                   let body = JSON.parse(res.text);
                   expect(body).toHaveProperty('jobs');
                   expect(body.jobs.length).toBeLessThanOrEqual(0);
               });
       });
   });
    describe('POST /jobs',()=>{
        let job = {
            jobId : jobID,
            title : 'blah',
            description : 'test',
            applied : false,
            salary : 1
        };
        it('should create a new job with a valid user id',()=>{
            return request(URL)
                .post('/jobs')
                .send(job)
                .set('user',userId)
                .set('Accept', 'application/json')
                .then(res =>{
                    expect(res.statusCode).toBe(201);
                });

        });
        it('should throw an error for a non existent user.');
        it('should throw an error if the jobID is invalid');
    });
    describe('GET /jobs/{id}',()=>{
       it('should get the newly created job',()=>{
         return request(URL)
             .get(`/jobs/${jobID}`)
             .set('user',userId)
             .set('Accept', 'application/json')
             .then(res =>{
                expect(res.statusCode).toBe(200);
                 expect(res).toHaveProperty('text');
                 let body = JSON.parse(res.text);
                 expect(body).toHaveProperty('jobId',jobID);
             });
       });
       it('should throw a not found error if the job id with the specific user is not found.');
    });
    describe('DELETE /jobs/{id}',()=>{
        it('should delete the newly created test job',()=>{
            return request(URL)
                .delete(`/jobs/${jobID}`)
                .set('user',userId)
                .set('Accept', 'application/json')
                .then(res =>{
                    expect(res.statusCode).toBe(204);
                });
        });
        it('should throw a not found error if the job id with the specific user is not found.');
    });

});