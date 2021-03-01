/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let createEmployeeRecord = function (record) {
    let employee = {
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee;
}

let createEmployeeRecords = function(records) {
    let employees = records.map(e => createEmployeeRecord(e));
    return employees;
} 

let createTimeInEvent = function(dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    this.timeInEvents.push(
        {
            type: "TimeIn",
            hour: parseInt(hour),
            date: date
        }
    );
    return this
}

let createTimeOutEvent = function(dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    });
    return this
}

let hoursWorkedOnDate = function(dateStamp) {
    let timeIn = this.timeInEvents.find(e => e.date === dateStamp)
    let timeOut = this.timeOutEvents.find(e => e.date === dateStamp)

    let hoursWorked = (timeOut.hour - timeIn.hour) / 100;
    return hoursWorked;
}

let wagesEarnedOnDate = function(dateStamp) {
    return this.payPerHour * hoursWorkedOnDate.call(this, dateStamp);
}

let findEmployeeByFirstName = function(employees, firstName) {
    let employee = employees.find(e => e.firstName === firstName);
    return employee;
}

let calculatePayroll = function(employees) {
    let payroll = employees.reduce(function (total, e) {
        return total + allWagesFor.call(e);
    }, 0)
    return payroll;
}