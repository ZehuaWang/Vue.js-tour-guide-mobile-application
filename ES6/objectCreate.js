//allows you to create the prototype for the object you want, without having to define a constructor function.
var roles = {
	type: "Admin", 
	displayType : function() {
		console.log(this.type);
	}
}

var super_role = Object.create(roles);
super_role.displayType();

var guest_role = Object.create(roles);
guest_role.type = "Guest";
guest_role.displayType();