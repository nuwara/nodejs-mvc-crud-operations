const Employee = require("../model/Employee");

// emloyee_index, emloyee_create_get, emloyee_create_post, emloyee_edit, emloyee_update, emloyee_delete

const emloyee_index = (req, res) => {
    Employee.find()
      .then((employees) => {
        res.render("index", { employees: employees, success: req.flash("message") });
      })
      .catch((err) => console.log(err));
  }
  
const emloyee_create_get = (req, res) => {
    res.render("create");
  }
  
const emloyee_create_post = (req, res) => {
    const newData = {
      name: req.body.name,
      skills: req.body.skills,
      roll: req.body.roll,
    };
    if (req.file) {
      newData.image = req.file.filename;
    }
    const newEmployee = new Employee(newData);
    newEmployee
      .save()
      .then(() =>{
		req.flash("message", "employee were added successfully");
		res.redirect("/employees")
	  })
      .catch((err) => console.log(err));
  }
  
const emloyee_edit = (req, res) => {
    Employee.findById(req.params.employeeId)
      .then((result) => res.render("edit", { result: result }))
      .catch((err) => console.log(err));
  }
  
const emloyee_update = (req, res) => {
    const id = req.params.employeeId;
    const updates = {
      name: req.body.name,
      skills: req.body.skills,
      roll: req.body.roll,
    };
    if (req.file) {
      updates.image = req.file.filename;
    }
    Employee.findByIdAndUpdate(id, updates)
      .then(() =>{ 
		req.flash("message", "employee were updated successfully");
		res.redirect("/employees")
	  })
      .catch((err) => console.log(err));
  }
  
const emloyee_delete = (req, res) => {
    Employee.findByIdAndDelete(req.params.employeeId)
      .then(() => {
		req.flash("message", "employee were deleted successfully");
		res.redirect("/employees")
	  })
      .catch((err) => console.log(err));
  }
  
module.exports = {
	emloyee_index,
	emloyee_create_get,
	emloyee_create_post,
	emloyee_edit,
	emloyee_update,
	emloyee_delete
}