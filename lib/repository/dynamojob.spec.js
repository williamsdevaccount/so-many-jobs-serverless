const Repo = require('./dynamojob');
const repo = new Repo();
const USER_ID = 1;
let jobId = 1;

describe('JobRepository test', () => {
    const getCount = () => {
        jobId++;
        console.log(jobId);
        return jobId;
    };
    const setCount = (count)=>{
      jobId = count;
    };
    describe('#all',()=>{
       it('should get a list of jobs with a valid user id',(done)=>{
           return repo.all()
               .then(data =>{
                   console.log(JSON.stringify(data,null,'\t'));
                   expect(data).not.toBeNull();
                   expect(data.Items.length).toBeGreaterThan(0);
                   setCount(data.Items.length);
                   done();
               })
               .catch(err =>{
                   console.log(err);
                   expect(err).toBeNull();
                   done();
               });
       });
    });
    describe('#get',()=>{
        it('should get a single job with a valid user id and job id',(done)=>{
            return repo.get()
                .then(data =>{
                    console.log(JSON.stringify(data,null,'\t'));
                    expect(data).not.toBeNull();
                    done();
                })
                .catch(err =>{
                    console.log(err);
                    expect(err).toBeNull();
                    done();
                });
        });
    });
    describe('#save', () => {
        let job = {
            userId: USER_ID,
            jobId: getCount(),
            title: 'my cool job',
            description: 'my cool description',
            applied: true,
            dateApplied: '2017-09-01'
        };
        it('should save a valid job into the datastore', () => {
            expect.assertions(1);
            return repo.save(job)
                .then((data) => {
                    console.log(JSON.stringify(data,null,'\t'));
                    expect(data).not.toBeNull()
                })
                .catch((err) => {
                    console.log(JSON.stringify(err,null,'\t'));
                    expect(err).toBeNull();
                });
        });
    });
    describe('#delete',()=>{
        it('should delete a single job with a valid user id and job id',(done)=>{
            return repo.delete()
                .then(data =>{
                    console.log(JSON.stringify(data,null,'\t'));
                    expect(data).not.toBeNull();
                    done();
                })
                .catch(err =>{
                    console.log(err);
                    expect(err).toBeNull();
                    done();
                });
        });
    });
});