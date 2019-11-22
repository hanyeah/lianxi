var hanyeah = hanyeah || {};

hanyeah._getXmlHttp = function(){
  var xmlhttp;
  if (window.XMLHttpRequest){
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else {
  // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  return xmlhttp;
}

hanyeah.toSerchStr = function(o){
  var a = [];
  for(let key in o){
    if(o.hasOwnProperty(key)){
      a.push(key + "=" + o[key]);
    }
  }
  return a.join("&");
}

hanyeah.get = function(url, callBack, async, contentType = "application/x-www-form-urlencoded"){
  var xmlhttp = hanyeah._getXmlHttp();
  
  var f = function(){
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
      callBack(xmlhttp.responseText);
    }
  }
  if (async) {
    xmlhttp.onreadystatechange = f;
    xmlhttp.open("GET",url,async);
    xmlhttp.setRequestHeader("Content-Type", contentType);
    xmlhttp.send();
  } else {
    xmlhttp.open("GET",url,async);
    xmlhttp.setRequestHeader("Content-Type", contentType);
    xmlhttp.send();
    f();
  }
}

hanyeah.post = function(url, param, callBack, async, contentType = "application/x-www-form-urlencoded"){
  var xmlhttp = hanyeah._getXmlHttp();
  var f = function(){
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
      callBack(xmlhttp.responseText);
    }
  }
  var s = hanyeah.toSerchStr(param);
  if (async) {
    xmlhttp.onreadystatechange = f;
    xmlhttp.open("POST",url,async);
    xmlhttp.setRequestHeader("Content-Type", contentType);
    xmlhttp.send(s);
  } else {
    xmlhttp.open("POST",url,async);
    xmlhttp.setRequestHeader("Content-Type", contentType);
    xmlhttp.send(s);
    f();
  }
}

hanyeah.userNameInput = function(s){
  s.value=s.value.replace(/[^\w\u4E00-\u9FA5]/g, '')
}

hanyeah.passWordInput = function(s){
  s.value=s.value.replace(/\s+/g,'');
}

hanyeah.emailInput = function(s){
  //
}

hanyeah.checkUserName = function(userName){
  if(userName.match(/\s/)){
    return "用户名不能包含空字符";
  }
  if(userName.length < 2){
    return "用户名要不少于两个字符";
  }
  if(userName.length > 50){
    return "用户名不能多于50个字符";
  }
  return null;
}

hanyeah.checkEmail = function(email){
  var re2 = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!re2.test(email)){
      return "邮箱格式不正确";
  }
  if(userName.length > 50){
    return "邮箱不能多于50个字符";
  }
  return null;
}

hanyeah.checkPassWord = function(password, password_){
  if(password!==password_){
    return "两次输入密码不一致";
  }
  if(password.length < 6){
    return "密码至少要6个字符";
  }
  if(userName.length > 8){
    return "邮箱不能多于8个字符";
  }
  return null;
}