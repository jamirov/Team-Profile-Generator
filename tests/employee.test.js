const Employee = require('../lib/employee');

describe("Employee", () => {
    describe("Employee", () => {
      it("should return an object containing a 'Employee'", () => {
        const obj = new Employee();
  
        expect("name" in obj).toEqual(true);
      });
  
      it("should set 'name' when created", () => {
        const name = "John";
  
        const obj = new Employee(name);
  
        expect(obj.name).toEqual(name);
      });
  
      
    });
});