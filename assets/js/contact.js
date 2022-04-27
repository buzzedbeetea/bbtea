
window.onload= function(){
    form = document.getElementById("contactForm")
    console.log(form);
    form.addEventListener("submit", function(e){
      e.preventDefault();
                var nameVal = $('#name').val(),
                    x = $('#email').val(),
                    atpos = x.indexOf("@"),
                    dotpos = x.lastIndexOf(".");
                    console.log(nameVal);
                $('.styledLabel').removeAttr('role');
                if (nameVal === "" || (!nameVal.match(/^[a-zA-Z\s]+$/))) {
                    $('#name').attr('aria-invalid', 'true').next('.styledLabel').attr({
                        'role': 'alert',
                        'data-text': 'Please enter Name'
                    });
                    return false;
                } else {
                    $('#name').attr('aria-invalid', 'false');
                }
                if (x == "") {
                    $('#email').attr('aria-invalid', 'true').next('.styledLabel').attr({
                        'role': 'alert',
                        'data-text': 'Please enter email address'
                    });
                    return false;
                } else if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
                    $('#email').attr('aria-invalid', 'true').next('.styledLabel').attr({
                        'role': 'alert',
                        'data-text': 'Please enter correct email address'
                    });
                    return false;
                } else {
                    $('#email').attr('aria-invalid', 'false');
                }
                if ($('#message').val() === '') {
                    $('#message').attr('aria-invalid', 'true').next('.styledLabel').attr({
                        'role': 'alert',
                        'data-text': 'Please enter message'
                    });
                    return false;
                } else {
                    $('#message').attr('aria-invalid', 'false');
                }
                dataString = {
                    "name": $("#name").val(),
                    "email": $("#email").val(),
                    "message": $("#message").val()
                }
                $('#messageStatus').css("color", "#c22085").html('Please Wait, submitting your message').attr({
                    'role': 'alert'
                });
    
                function ajax(method, url, data, success, error) {
                    var xhr = new XMLHttpRequest();
                    xhr.open(method, url);
                    xhr.setRequestHeader("Accept", "application/json");
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState !== XMLHttpRequest.DONE) return;
                        if (xhr.status === 200) {
                            success(xhr.response, xhr.responseType);
                        } else {
                            error(xhr.status, xhr.response, xhr.responseType);
                        }
                    };
                    xhr.send(data);
                }
                var formData = new FormData(form);
                ajax('POST', 'https://formsubmit.co/buzzedbeetea@gmail.com', formData, function(data) {
                    console.log(data);
                    $('#messageStatus').css("color", "#c22085").html("Thank You! Your message has been submitted successfully.").attr({
                        'role': 'alert'
                    });
                }, function() {
                    $('#messageStatus').css("color", "#c22085").html("Oops!The mail service seems to be down!<br> you can resubmit or reach me on <a href='mailto:buzzedbeetea@gmail.com'>mailto:buzzedbeetea@gmail.com</a>").attr({
                        'role': 'alert'
                    });
                });
                return false;
    });
  };
  