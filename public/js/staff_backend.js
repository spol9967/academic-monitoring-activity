var staff_data = null;
$("#wait").css("display", "block");
$("#wait2").css("display", "block");
$("#wait3").css("display", "block");


$.ajax({
    url: "users/get_staff",
    success: function (staff) {
        staff_data = staff;
        if (staff === "") {
            alert('Something went wrong, Please Login again');
            window.location = '/';
        }
        $('span[data="staff_id"]').html(staff.id);
        $('span[data="staff_email"]').html(staff.email);
        $('span[data="staff_fname"]').html(staff.fname);
        $('span[data="staff_lname"]').html(staff.lname);
        $('span[data="staff_mname"]').html(staff.mname);
        $('span[data="staff_address"]').html(staff.address);
        $('span[data="staff_city"]').html(staff.city);
        $('span[data="staff_number"]').html(staff.number);
        $('span[data="staff_department"]').html(staff.department);
        $('span[data="staff_year"]').html(staff.post);
        $('span[data="staff_profile"]').html(`<img src="img/uploads/${staff.profile}" class="img-responsive center" style="border-radius: 50%;"alt="avtar"></img>`);
        $("#wait").css("display", "none");
    }
});

$.ajax({
    url: "/get_report_sta",
    success: function (report) {
        $('span[data="report_month"]').html(report[0].month);
        $('span[data="report_total_days"]').html(report[0].total_days);
        $('span[data="report_present"]').html(report[0].present);
        $('span[data="report_absent"]').html(report[0].total_days - report[0].present);
        $('span[data="report_leave_taken"]').html(report[0].leave_taken);
        $('span[data="report_avrage"]').html(Math.floor(report[0].present / report[0].total_days * 100));


        var width = $(".skills.html").text();
        $(".skills.html").css({
            "width": width
        });
        var width2 = $(".skills.css").text();
        $(".skills.css").css({
            "width": width2
        });
        var width3 = $(".skills.js").text();
        $(".skills.js").css({
            "width": width3
        });
        $("#wait3").css("display", "none");
    }
});

$.ajax({
    url: "/get_notification",
    success: function (noti) {
        for (let i = noti.length - 1; i >= 0; i--) {
            $("#accordion").append(`<div class="panel panel-default post">
            <div class="panel-heading">
            <h4 class="panel-title">
            <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">${noti[i].header}</a>
            </h4>
            </div><div id="collapse1" class="panel-collapse collapse in">
            <div class="panel-body">${noti[i].description}</div>
            </div>
            </div>
            `);
        };
        $("#wait2").css("display", "none");
    }
});

$.ajax({
    url: "/get_leave",
    success: function (leave) {
        console.log(leave);
        for (let i = 0; i < leave.length; i++) {
            var leave_str = `<ul class="bg-light text-dark">
            <li><b>From</b>: ${leave[i].id}</li>
        <li><b>To</b>: ${leave[i].to}</li>
        <li><b>Reason</b>: ${leave[i].reason}</li>
        <li>Leave from <b>${leave[i].start_date}</b> to <b>${leave[i].end_date}</b></li>
      </ul>   `;
            $("#newleaverep .abc1").append(leave_str);
        }
    }
});


$("#submitupdate").click(function (e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "/add_leave_staff",
        data: $("#Leave .abc1 input,#Leave .abc1 select,#Leave .abc1 textarea").serialize() + "&id=" + staff_data.id + "&name=" + staff_data.fname,
        success: function (result) {
            if (result) {
                alert("Leave apllied successfully");
            } else { alert(staff_data.fname + " You already apply for a leave"); }

        }
    })
})

$.ajax({
    url: "/get_leave_staff",
    success: function (leave) {
        console.log(leave);
        for (let i = 0; i < leave.length; i++) {
            var leave_str = `<div class="alert alert-info">
            Lectures of <b>${leave[i].name}</b> is free from <b>${leave[i].start_date}</b> to <b>${leave[i].end_date}</b>
          </div>`;
            $(".notificati.leave.tt").append(leave_str);
        }
    }
});



$("#change_pass").click(function () {
    var old_pass = $("input[name='old_pass']").val();
    var new_pass = $("input[name='new_pass']").val();
    if ($(".cform input[name='old_pass']").val() != staff_data.password) {
        $(".cform .alert-danger").show();
    }
    else if ($(".cform input[name='new_pass']").val() == $(".cform input[name='new_pass2']").val()) {
        $("#change_pass").html('<i class="fa fa-circle-o-notch fa-spin"></i> Loading');
        var dataString = 'old_pass=' + old_pass + '&new_pass=' + new_pass;
        $.ajax({
            type: "POST",
            url: "users/change_password",
            data: dataString,
            success: function (student) {
                $("#change_pass").html('Upadte Password');
                $(".cform .alert-success").show();
                $(".cform .alert-warning").hide();
                $(".cform .alert-danger").hide();
                return true;
            }
        });

    } else {
        $(".cform .alert-warning").show();
        return false;
    }
})