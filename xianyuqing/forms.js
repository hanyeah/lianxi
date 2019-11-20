"use strict"

function checkPassword(str)
{
    //var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;
    //return re.test(str);
    return (str.length>=2);
}

function checkFormSignup(form)
{	
    // Username validation
    if(form.up_user.value.length < 2)
    {
        alert("Error: Username with 2 characters minimum required");
        form.up_user.focus();
        return false;
    }

    var re = /^\w+$/;
    if(!re.test(form.up_user.value))
    {
        alert("Error: Username must contain only letters, numbers and underscores!");
        form.up_user.focus();
        return false;
    }

    // Email validation
    if(form.up_email.value == "")
    {
        alert("Error: Email address incorrect. Ex: yourname@youremail.com");
        form.up_email.focus();
        return false;
    }

    var re2 = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re2.test(form.up_email.value))
    {
        alert("Error: Email address incorrect. Ex: yourname@youremail.com");
        form.up_email.focus();
        return false;
    }

    // Password validation
    if(form.up_password.value == form.up_password_.value && form.up_password.value.length > 0 && form.up_password_.value.length > 0)
    {
        if(!checkPassword(form.up_password.value))
        {
            alert("A password with 2 characters minimum required");
            form.up_password.focus();
            return false;
        }
    }
    else
    {
        alert("Error: Please check that you've entered and confirmed your password.");
        form.up_password.focus();
        return false;
    }

    return true;
}

function validateSignup()
{      
   var form = document.forms["formRegistration"];
   if(checkFormSignup(form))
   {
       form.submit();
       return true;
   }
   return false;
}

function checkFormSignin(form)
{
    // Username validation
    if(form.user.value.length < 2)
    {
        alert("Error: Username with 2 characters minimum required");
        form.user.focus();
        return false;
    }

    var re = /^\w+$/;
    if(!re.test(form.user.value))
    {
        alert("Error: Username must contain only letters, numbers and underscores!");
        form.user.focus();
        return false;
    }

    // Password validation
    if(!checkPassword(form.password.value))
    {
        alert("The password you have entered is not valid! 2 characters minimum");
        form.password.focus();
        return false;
    }
    return true;
}

function validateSignin()
{      
   var form = document.forms["formLogin"];
   if(checkFormSignin(form))
   {
       form.submit();
       return true;
   }
   return false;
}

function checkFormPassChange(form)
{		
    // Password validation
    if(form.npassword.value == form.npassword_.value && form.npassword.value.length > 0 && form.npassword_.value.length > 0 && form.opassword.value.length > 0)
    {
        if(form.npassword.value == form.opassword.value)
        {
            alert("Your new password should be different from your old password.");
            form.npassword.focus();
            return false;
        }

        if(!checkPassword(form.npassword.value))
        {
            alert("Your new password should have at least 2 characters.");
            form.npassword.focus();
            return false;
        }
    }
    else
    {
        alert("Error: Please check that you've entered and confirmed your password.");
        form.npassword.focus();
        return false;
    }

    return true;
}

function validatePassChange()
{      
   var form = document.forms["formPass"];
   if(checkFormPassChange(form))
   {
       form.submit();
       return true;
   }
   return false;
}

function checkFormDeleteAcc(form)
{
    if(!checkPassword(form.dpassword.value))
    {
        alert("Your new password should have at least 2 characters.");
        form.dpassword.focus();
        return false;
    }
    return true;
}

function validateDeleteAcc()
{
   var form = document.forms["formAcc"];
   if(checkFormDeleteAcc(form))
   {
        var r=confirm("Are you sure you want to delete your account and all your data? You will not be able to recover your information.")
        if (r==true)
        {
            form.submit();
            return true;
        }
        else
        {
            return false;
        }
   }
   return false;
}

function checkFormPassRecovery(form)
{		
        // Email validation
    if(form.email.value == "")
    {
        alert("Error: Email address incorrect. Ex: yourname@youremail.com");
        form.email.focus();
        return false;
    }

    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(form.email.value))
    {
        alert("Error: Email address incorrect. Ex: yourname@youremail.com");
        form.email.focus();
        return false;
    }

    return true;
}

function validateRecovery()
{      
   var form = document.forms["formRecovery"];
   if(checkFormPassRecovery(form))
   {
       form.submit();
       return true;
   }
   return false;
}