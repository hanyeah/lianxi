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

hanyeah.get = function(url, callBack, async){
  var xmlhttp = hanyeah._getXmlHttp();
  var f = function(){
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
      callBack(xmlhttp.responseText);
    }
  }
  if (async) {
    xmlhttp.onreadystatechange = f;
    xmlhttp.open("GET",url,async);
    xmlhttp.send();
  } else {
    xmlhttp.open("GET",url,async);
    xmlhttp.send();
    f();
  }
}

hanyeah.post = function(url, param, callBack, async){
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
    xmlhttp.send(s);
  } else {
    xmlhttp.open("POST",url,async);
    xmlhttp.send(s);
    f();
  }
}


hanyeah.checkUserName = function(userName){
  userName = userName.replace(/\s/g, "");
  if(userName.length < 2){
    return "用户名要不少于两个字符";
  }
  return null;
}

hanyeah.checkEmail = function(email){
  var re2 = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!re2.test(email)){
      return "邮箱格式不正确";
  }
  return null;
}

hanyeah.checkPassWord = function(password, password_){
  if(password!==password_){
    return "两次输入密码不一致";
  }
  return null;
}