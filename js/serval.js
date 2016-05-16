var shell = require('shelljs');

var servalinstance_path = process.cwd() + "/servalinstancepath";
var servalbinary = "bin/servald-" + process.platform;

function _dummycallback(code, stdout, stderr) {

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
  var child = shell.exec("SERVALINSTANCE_PATH=" + servalinstance_path + " " + servalbinary + " config set " + key + "=" + value, callBack);
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

var doStatusPoll = false;
var serval_status = "n/a";

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
      }
    }
  });
}
