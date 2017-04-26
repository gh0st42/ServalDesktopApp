
function draw_statusview() {
  console.log("draw_statusview");
  $('#status').html(
    `<div class="btn-group" role="group" aria-label="...">
        <button type="button" class="btn btn-default">Left</button>
        <button type="button" class="btn btn-default">Middle</button>
        <button type="button" class="btn btn-default">Right</button>
      </div>\

      <div class="panel panel-default">
        <div class="panel-heading">Serval Status</div>
        <div class="panel-body">
          <button type="button" class="btn btn-default" onclick="refreshStatus()"><span class="glyphicon glyphicon-refresh"></span> Status</button>
          <button type="button" class="btn btn-default" onclick="btnStart()"><span class="glyphicon glyphicon-play"></span></button>
          <button type="button" class="btn btn-default" onclick="btnStop()"><span class="glyphicon glyphicon-stop"></span></button>
          <button type="button" class="btn btn-default" onclick="btnLog()"><span class="glyphicon glyphicon-refresh"></span> Log</button>


          <!--<textarea rows="25" cols="80" id="logoutput" readonly="true"> </textarea>-->
          <div class="pre-scrollable terminal container" id="logoutput">
            Press "Refresh log" button!
          </div>
        </div>
      </div>`
  );
}

draw_statusview();

function btnLog() {
  servalGetCurrentLog(function (err, data) {
    //console.log(data);
    var logoutput = $("#logoutput");
    logoutput.html("<pre class='terminal'>" + data + "</pre>");
    //logoutput.scrollTop = logoutput.scrollHeight;
    // TODO: DIRTY HACK!
    logoutput.scrollTop(9999999);
  });
}

function btnStart() {
  servalStart(function (code, stdout, stderr) {
    sleep(1000).then(() => {
      console.log("setting config");
      servalConfigSet("api.restful.users." + username + ".password", password, function (code, stdout, stderr) {
        servalRestful("keyring/identities.json", function (result) {
          console.log(result["rows"]);
          if (result["rows"].length < 1) {
            servalKeyringAdd(null);
          } else {
            alert(result["rows"][0]);
          }
        });
      });
      });
    });
    refreshStatus();
    setTimeout(function () {
      document.getElementById('servalstatusiframe').src += '';

      servalGetMySID(function (code, stdout, stderr) {
        console.log('Exit code:', code);
        console.log('Program output:', stdout);
        console.log('Program stderr:', stderr);
        var lines = stdout.split("\n");
        if (lines.length > 1) {
          for (var i = 2; i < lines.length; i++) {
            console.log(lines[i])
          }
        }
      });
    }, 5000);
  }
function btnStop() {
      servalStop(null);
      refreshStatus();
    }
