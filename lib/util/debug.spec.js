const debug = require('./debug');



describe('Debug class Test',()=>{
   describe('#json',()=>{
     it('should pretty print valid js object',()=>{
       let str = debug.json({
           valid : true,
           msg : 'valid obj'
       });
       expect(str).toBeTruthy();
     });
     it('should throw error if not a valid js object',()=>{
       expect(()=>{
           debug.json([1,2,4,5]);
       }).toThrow();
     });
   });
});