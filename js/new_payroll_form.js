let isUpdate = false;
let employeePayrollObj = {};

window.addEventListener("DOMContentLoaded", (event) => {
    const name = document.querySelector("#name");
    const textError = document.querySelector(".text-error");
    name.addEventListener("input", function() {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            new EmployeePayroll().name = name.value;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });

    const salary = document.querySelector("#salary");
    const output = document.querySelector(".salary-output");
    output.textContent = salary.value;
    salary.addEventListener("input", function() {
        output.textContent = salary.value;
    });

    const startdate = document.querySelector("#startDate");
    startdate.addEventListener("input", function() {
        let date = new Date(Date.parse(getInputValueById('#month') + " " + getInputValueById('#day') + " " + getInputValueById('#year')));
        try {
            (new EmployeePayroll()).startDate = date;
            setTextValue('.date-error', "");
        } catch (e) {
            setTextValue('.date-error', e);
        }
    });

    checkForUpdate();
});

const save = () => {
    try {
        let employeePayrollData = createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData);
    } catch (e) {
        return;
    }
}

const resetForm = () => {
    setValue('#name', '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary', '');
    setTextValue('.salary-output', getInputValueById('#salary'));
    setValue('#notes', '');
    setValue('#day', '0');
    setValue('#month', '0');
    setValue('#year', '0');
}
const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}
const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

function createAndUpdateStorage(employeePayrollData) {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if (employeePayrollList != undefined) {
        employeePayrollList.push(employeePayrollData);
    } else {
        employeePayrollList = [employeePayrollData];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayroll();
    employeePayrollData.id = createNewEmployeeId();
    employeePayrollData.name = getInputValueById('#name');
    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.notes = getInputValueById('#notes');
    let date = getInputValueById('#month') + " " + getInputValueById('#day') + " " + getInputValueById('#year');
    employeePayrollData.startDate = new Date(date);
    window.alert(employeePayrollData.toString());
    return employeePayrollData;
}

const createNewEmployeeId = () => {
    let empID = localStorage.getItem("EmployeeID");
    empID = !empID ? 1 : (parseInt(empID) + 1).toString();
    localStorage.setItem("EmployeeID", empID);
    return empID;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if (item.checked)
            selItems.push(item.value);
    });
    return selItems;
}

const checkForUpdate = () => {
    const employeePayrollJSON = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJSON ? true : false;
    if (!isUpdate) return;
    empPayrollObj = JSON.parse(employeePayrollJSON);
    setForm();
}

const setForm = () => {
    setValue('#name', empPayrollObj._name);
    setSelectedValues('[name=profile]', empPayrollObj._profilePic);
    setSelectedValues('[name=gender]', empPayrollObj._gender);
    setSelectedValues('[name=department]', empPayrollObj._department);
    setValue('#salary', empPayrollObj._salary);
    setTextValue('.salary-output', empPayrollObj._salary);
    setValue('#notes', empPayrollObj._notes);
    console.log(empPayrollObj._startDate);
    let date = stringifyDate(empPayrollObj._startDate).split(" ");
    console.log(date);
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);
}

const stringifyDate = (date) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const newDate = !date ? "undefined" : new Date(Date.parse(date)).toLocaleDateString('en-IN', options);
    return newDate;
}

const setSelectedIndex = (id, index) => {
    const element = document.querySelector(id);
    element.selectedIndex = index;
}

const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        } else if (item.value === value) item.checked = true;
    });
}