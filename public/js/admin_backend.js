// student get profile
function stu_dir() {
    $.ajax({
        url: "/users/get_student_dir",
        success: function (student) {
            var wall = $('#profile-well');
            student.forEach(stu => {
                wall.append(`
                    <div class="card" style="height: 200px;padding: 10px;margin: 50px;box-shadow: 2px 2px 11px rgba(185, 181, 181, 0.87);">
                    <div class="col-sm-3">
                    <img src="img/uploads/${stu.profile}" class="img-circle" style="height: 180px;">
                    </div>
                    <div class="col-sm-9"> 
                    <h3>${stu.fname} ${stu.mname} ${stu.lname} ${stu.mname}</h3>
                    <h5>Email: ${stu.email}</h5>
                    <h5>Address: ${stu.address}</h5>
                    <h5>City: ${stu.city}</h5>
                    <h5>Mobile: ${stu.number}</h5>
                    <h5>Department: ${stu.department}</h5>
                    </div>
                    </div>
                    `);
            });
        }
    });
}
function staff_dir() {
    $.ajax({
        url: "/users/get_staff_dir",
        success: function (staff) {
            var wall = $('#profile-well');
            staff.forEach(staff => {
                wall.append(`
                    <div class="card" style="height: 250px;padding: 10px;margin: 50px;box-shadow: 2px 2px 11px rgba(185, 181, 181, 0.87);">
                    <div class="col-sm-3">
                    <img src="img/uploads/${staff.profile}" class="img-circle" style="height: 180px;">
                    </div>
                    <div class="col-sm-9"> 
                    <h3>${staff.fname} ${staff.mname} ${staff.lname}</h3>
                    <h5>Email: ${staff.email}</h5>
                    <h5>Address: ${staff.address}</h5>
                    <h5>City: ${staff.city}</h5>
                    <h5>Mobile: ${staff.number}</h5>
                    <h5>Department: ${staff.department}</h5>
                    <h5>DPost: ${staff.post}</h5>
                    </div>
                    </div>
                    `);
            });
        }
    });
}

function staff_leave() {
    $.ajax({
        url: "/get_leave_staff",
        success: function (leave) {
            console.log(leave);
            for (let i = 0; i < leave.length; i++) {
                var leave_str = `<div class="list-group-item">
                <b>${leave[i].name}</b> take a leave for "${leave[i].reason}" this reason from <b>${leave[i].start_date}</b> to <b>${leave[i].end_date}</b>
                <span class="glyphicon glyphicon-remove delete_leave" data_id="${leave[i]._id}" style="color: red "></span>
          </div>`;
                $(".content #home .list-group").append(leave_str);
                if(i == leave.length-1){
                    $(".delete_leave").click(function () {
                        $.ajax({
                            type: "POST",
                            url: "/delete_leave_staff",
                            data: "id="+ $(this).attr("data_id"),
                            success: function (leave1) {location.reload();}
                        });
                    });
                }
            }
        }
    });
}

function leave() {
    $.ajax({
        url: "/get_leave",
        success: function (leave) {
            console.log(leave);
            for (let i = 0; i < leave.length; i++) {
                var leave_str = `<div class="list-group-item">
            <b>${leave[i].name}</b> take a leave for "${leave[i].reason}" this reason from <b>${leave[i].start_date}</b> to <b>${leave[i].end_date}</b>
            <span class="glyphicon glyphicon-remove delete_leave" data_id="${leave[i]._id}" style="color: red "></span>
            </div>`;
                $(".content #home .list-group").append(leave_str);
                if(i == leave.length-1){
                    $(".delete_leave").click(function () {
                        $.ajax({
                            type: "POST",
                            url: "/delete_leave",
                            data: "id="+ $(this).attr("data_id"),
                            success: function (leave1) {location.reload();}
                        });
                    });
                }
            }
            
        }
    });
}















