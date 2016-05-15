
function autoRefresh() {
  refreshStatus();
  setTimeout(autoRefresh, 2000);
}
function refreshStatus() {
  $("#serval_status").html(serval_status);
}

var shell = require('shelljs');

servalStatus(function(code, stdout, stderr) {
  console.log('Exit code:', code);
  console.log('Program output:', stdout);
  console.log('Program stderr:', stderr);
  var lines = stdout.split("\n");
  for(var i=0; i<lines.length; i++) {
    if(lines[i].indexOf('status:') == 0) {
      $("#serval_status").html(lines[i].substring('status:'.length));

    }
  }
});
servalStartStatusPoll();
autoRefresh();
