class EmployeePayroll {

    constructor() {

    }
    get id() {
        return this._id;
    }

    set id(id) {
        let idRegex = RegExp('[1-9]{1}[0-9]*');
        if (idRegex.test(id))
            this._id = id;
        else
            throw 'Id is incorrect';
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    get gender() {
        return this._gender;
    }
    set gender(gender) {
        this._gender = gender;
    }
    get salary() {
        return this._salary;
    }
    set salary(salary) {
        this._salary = salary;
    }
    get startDate() {
        return this._startDate;
    }
    set startDate(startDate) {
        this._startDate = startDate;
    }
    get departments() {
        return this._departments;
    }
    set departments(departments) {
        this._departments = departments;
    }

    toString() {
        const format = { year: "numeric", month: "long", day: "numeric" };
        const date = this.startDate === undefined ? "undefined" : this.startDate.toLocaleDateString("en-IN", format);
        return "id = " + this.id + ", name = " + this.name + ", salary = " + this.salary + ", gender = " + this.gender + ", start date = " + this.startDate + ", departments = " + this.departments;
    }
}