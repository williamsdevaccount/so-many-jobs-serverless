const Service = require('./service');

describe('Service Class',()=>{
   const getEvent = ()=>{
    return require('../../test/fixtures/event.json');
   };
   const service = new Service(getEvent());
   describe('#headers',()=>{
      it('should return all headers in the event',()=>{
        let headers = service.headers;
        expect(headers).toHaveProperty('User-Agent');
        expect(headers).toHaveProperty('Host');
      });
   });
   describe('#pathParams',()=>{
       it('should return valid pathParams from fixture',()=>{
           let pathParams = service.pathParams;
           expect(pathParams).toHaveProperty('id');
           expect(pathParams.id).toEqual(1);
       });
   });
   describe('#httpMethod',()=>{
       it('should return valid httpMethod from fixture',()=>{
           let http = service.httpMethod;
           expect(http).toEqual('GET');
       });
   });
    describe('#queryString',()=>{
        it('should return valid queryString from fixture',()=>{
            let qs = service.queryString;
            expect(qs).toHaveProperty('type');
            expect(qs.type).toEqual('new');
        });
    });
    describe('#body',()=>{
        it('should return valid body from fixture',()=>{
            let body = service.body;
            expect(body).toHaveProperty('id');
            expect(body.id).toEqual(1);
        });
    });
    const testProxy = (res,status,body)=>{
      expect(res).toHaveProperty('statusCode');
      expect(res).toHaveProperty('body');
      expect(res.statusCode).toEqual(status);
      expect(res.body).toEqual(JSON.stringify(body));
    };
    describe('#proxy',()=>{
        it('should return valid res with defaults set',()=>{
            let res = service.proxy();
            testProxy(res,200,{});
        });
        it('should return valid with non defaults set',()=>{
            let body = {
              error : {
                  message  :'not found'
              }
            };
            let status = 404;
           let res = service.proxy(body,status);
           testProxy(res,status,body);
        });
    });
});