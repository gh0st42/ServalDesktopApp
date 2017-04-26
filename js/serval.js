var shell = require('shelljs');

//var servalinstance_path = process.cwd() + "/servalinstancepath";
var servalinstance_path = "/tmp/servalinstancepath";
var servalbinary = "bin/servald-" + process.platform;
var username="albert";
var password="einstein"
var peerlist=[];

function _dummycallback(code, stdout, stderr) {

}
function _dummysuccess(result) {

}
function servalStatus(callBack) {
  if(callBack == null)
    callBack = _dummycallback;
  var child = shell.exec("SERVALINSTANCE_PATH=" + servalinstance_path + " " + servalbinary + " status", callBack);
}

function servalVersion(callBack) {
  if(callBack == null)
    callBack = _dummycallback;
  var child = shell.exec("SERVALINSTANCE_PATH=" + servalinstance_path + " " + servalbinary + " version", callBack);
}

function servalStart(callBack) {
  if(callBack == null)
    callBack = _dummycallback;
  var child = shell.exec("SERVALINSTANCE_PATH=" + servalinstance_path + " " + servalbinary + " start", callBack);
}

function servalStop(callBack) {
  if(callBack == null)
    callBack = _dummycallback;
  var child = shell.exec("SERVALINSTANCE_PATH=" + servalinstance_path + " " + servalbinary + " stop", callBack);
}

function servalConfigSet(key, value, callBack) {
  if(callBack == null)
    callBack = _dummycallback;
  var child = shell.exec("SERVALINSTANCE_PATH=" + servalinstance_path + " " + servalbinary + " config set " + key + " " + value, callBack);
}

function servalGetCurrentLog(callBack) {
  var fs = require('fs');
  if(callBack == null)
    callBack = _dummycallback;
  fs.readFile(servalinstance_path+"/serval.log", 'utf8', callBack);
}

function servalGetMySID(callBack) {
  if(callBack == null)
    callBack = _dummycallback;
  var child = shell.exec("SERVALINSTANCE_PATH=" + servalinstance_path + " " + servalbinary + " id self", callBack);
}

function servalKeyringAdd(callBack) {
  if(callBack == null)
    callBack = _dummycallback;
  var child = shell.exec("SERVALINSTANCE_PATH=" + servalinstance_path + " " + servalbinary + " keyring add", callBack);
}

var doStatusPoll = false;
var serval_status = "n/a";

function servalRestful(uri, successfunc) {
  if(successfunc == null)
    successfunc = _dummysuccess;
  $.ajax({
    url: "http://127.0.0.1:4110/restful/" + uri,
    beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Basic " + window.btoa(username + ":" + password));
    },
    success: function(result) {
        //console.log(result);
        successfunc(result);
    }
});
}
function servalStartStatusPoll() {
  doStatusPoll = true;
  servalAutoUpdateStatus();
}
function servalStopStatusPoll() {
  doStatusPoll = false;
}
function servalAutoUpdateStatus() {
  if(doStatusPoll == true) {
    servalGetStatus();
    setTimeout(servalAutoUpdateStatus, 5000);
  }
}
function servalGetStatus() {
  servalStatus(function(code, stdout, stderr) {
    var lines = stdout.split("\n");
    for(var i=0; i<lines.length; i++) {
      if(lines[i].indexOf('status:') == 0) {
        serval_status=lines[i].substring('status:'.length);
        if(serval_status == "running") {
          servalGetPeers();
        }        
      }
    }
  });
}
function servalGetPeers() {
  servalGetAllPeers(function(code, stdout, stderr) {
    //console.log("Print Peers:");
    var lines = stdout.split("\n");
    var pl = []
    for(var i=0; i<lines.length; i++) {
      /*if(lines[i].indexOf('status:') == 0) {
        serval_status=lines[i].substring('status:'.length);
      }*/
      
      if(lines[i].length > 32) {
//        console.log("FOUND:" + lines[i]);
        pl.push(lines[i]);
      }            
    }
    peerlist = pl.sort().filter(function(n){ return n != undefined });
    //console.log(peerlist);
  });
}
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
function servalGetAllPeers(callBack) {
  if(callBack == null)
    callBack = _dummycallback;
  var child = shell.exec("SERVALINSTANCE_PATH=" + servalinstance_path + " " + servalbinary + " id allpeers", callBack);
}