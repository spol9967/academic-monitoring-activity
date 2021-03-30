var student_data = null;
$("#wait").css("display", "block");
$("#wait2").css("display", "block");
$("#wait3").css("display", "block");
$(".wait4").css("display", "block");


$.ajax({
    url: "users/get_student",
    success: function (student) {
        student_data = student;
        console.log(student);
        if (student === "") {
            alert('Something went wrong, Please Login again');
            window.location = '/';
        }
        $('span[data="stu_id"]').html(student.id);
        $('span[data="stu_email"]').html(student.email);
        $('span[data="stu_fname"]').html(student.fname);
        $('span[data="stu_lname"]').html(student.lname);
        $('span[data="stu_mname"]').html(student.mname);
        $('span[data="stu_momname"]').html(student.momname);
        $('span[data="stu_address"]').html(student.address);
        $('span[data="stu_city"]').html(student.city);
        $('span[data="stu_number"]').html(student.number);
        $('span[data="stu_department"]').html(student.department);
        $('span[data="stu_year"]').html(student.year);
        $('span[data="stu_profile"]').html(`<img src="img/uploads/${student.profile}" class="img-responsive center" style="border-radius: 50%;"alt="avtar"></img>`);



        $("#wait").css("display", "none");
    }
});

$.ajax({
    url: "/get_report_stu",
    success: function (report) {
        $('span[data="report_month"]').html(report[0].month);
        $('span[data="report_total_days"]').html(report[0].total_days);
        $('span[data="report_ut1"]').html(report[0].ut1);
        $('span[data="report_ut2"]').html(report[0].ut2);
        $('span[data="report_present"]').html(report[0].present);
        $('span[data="report_absent"]').html(report[0].total_days - report[0].present);
        $('span[data="report_leave_taken"]').html(report[0].leave_taken);
        $('span[data="report_avrage"]').html(Math.floor(report[0].present / report[0].total_days * 100));

        $(".wait4").css("display", "none");
        $('.counter').counterUp({
            delay: 10,
            time: 1000
        });
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
            $("#accordion").append(`<div class="panel panel-default">
                <div class="panel-heading">
                <h4 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">${noti[i].header}</a>
                </h4>
                </div><div id="collapse1" class="panel-collapse collapse in">
                <div class="panel-body">${noti[i].description}</div>
                </div>
                </div>
                `);
        }
        $("#wait2").css("display", "none");
    }
});

$("#change_pass").click(function () {
    var old_pass = $("input[name='old_pass']").val();
    var new_pass = $("input[name='new_pass']").val();
    if ($(".cform input[name='old_pass']").val() != student_data.password) {
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

$("#submitupdate").click(function (e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "/add_leave",
        data: $("#Leave .abc1 input,#Leave .abc1 select,#Leave .abc1 textarea").serialize() + "&id=" + student_data.id+ "&name=" + student_data.fname,
        success: function (result) {
            if (result) {
                alert("Leave apllied successfully");
            } else { alert(student_data.fname + " You already apply for a leave"); }
        }
    })
})










