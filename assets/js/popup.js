function sendemail() {

    var online = navigator.onLine;
    
    if(online){
        var name = $('#Name').val();
        var email = $('#Email').val();
        var Subject = $('#Subject').val();
        var message = $('#message').val();
    
        var Body = 'Name: ' + name + '<br>Email: ' + email + '<br>Subject: ' + Subject + '<br>Message: ' + message;

        Email.send({
            SecureToken : "1f1124e5-9654-4a34-93bf-8876aaf38661",
            To : 'ravindu.20210572@iit.ac.lk',
            From : 'ravindulayanga999@gmail.com',
            Subject : "Message from the Portfolio",
            Body : Body
        }).then(
            message => {
                if (message == 'OK') {
    
                    let main = document.getElementById("main");
                    let popup = document.getElementById("popup");
                    main.classList.add("new_main");
                    popup.classList.add("new_pop");
                }
                else {
                    let main = document.getElementById("main");
                    let popup = document.getElementById("error");
                    main.classList.add("new_main");
                    popup.classList.add("new_error");
                }
            }
       );


    }else{
        let main = document.getElementById("main");
        let popup = document.getElementById("error");
        main.classList.add("new_main");
        popup.classList.add("new_error");
    }
}
//ok button of popup window
function Okay(){
    let main = document.getElementById("main");
    let popup = document.getElementById("popup");
    main.classList.remove("new_main");
    popup.classList.remove("new_pop");
    window.location.reload();
}

function error(){
    let main = document.getElementById("main");
    let popup = document.getElementById("error");
    main.classList.remove("new_main");
    popup.classList.remove("new_error");
}
  
