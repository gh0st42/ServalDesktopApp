require('os');
var fs = require('fs');

function btnApplyDebugSetting() {
    console.log("btnApplyDebugSetting()");
    alert("Function not implemented!");
}
function draw_debug_settings() {
    // TODO
}


function btnApplyIflist() {
    console.log("btnApplyIflist()");
    alert("Function not implemented!");
}
function draw_network_iflist() {
    var networkInterfaces = [];
    var iflist_html = "";
    for (var key in os.networkInterfaces()) {
        networkInterfaces.push(key);
        iflist_html += "<input type=\"checkbox\" /> " + key + " <br />";
    }
    iflist_html += "<input type=\"checkbox\" /> Custom: <input type=\"text\" id=\"custom_if\" /> <br />";
    console.log(networkInterfaces);
    $('#iflist').html(iflist_html);
}

function btnApplyExpertSettings() {
    console.log("btnApplyExpertSettings()");

    var configdata = $('#expertsettingscontent').val();
    var configfile = servalinstance_path + "/serval.conf"

    try {
        fs.writeFileSync(configfile, configdata, 'utf8');
    } catch (e) {
        console.log(e);
    }
}
function draw_expert_settings() {
    var configfile = servalinstance_path + "/serval.conf"
    console.log("draw_expert_settings()");
    var configdata = "";
    try {
        configdata = fs.readFileSync(configfile, 'utf8');
    } catch (e) { }

    console.log(configdata);
    $('#expertsettings').html("<textarea cols=40 rows=25 id='expertsettingscontent'>" + configdata + "</textarea>");
}

function draw_settings() {
    console.log("draw_settings");
    $('#settings').html(
        `
      <div class="panel panel-default">
        <div class="panel-heading">Interface List</div>
        <div class="panel-body">
            <div id="iflist"></div>
            <hr>
            <button type="button" class="btn btn-default" onclick="btnApplyIflist()"><span class="glyphicon glyphicon-save"></span> Save</button>
            <button type="button" class="btn btn-default" onclick="draw_network_iflist()"><span class="glyphicon glyphicon-refresh"></span> Reload</button>
        </div>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading">Debug Settings</div>
        <div class="panel-body">
            <div id="debugsettings"></div>
            <hr>
            <button type="button" class="btn btn-default" onclick="btnApplyDebugSetting()"><span class="glyphicon glyphicon-save"></span> Save</button>
            <button type="button" class="btn btn-default" onclick="draw_debug_settings()"><span class="glyphicon glyphicon-refresh"></span> Reload</button>
        </div>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading">Expert Settings</div>
        <div class="panel-body">
            <div id="expertsettings"></div>
            <hr>
            <button type="button" class="btn btn-default" onclick="btnApplyExpertSettings()"><span class="glyphicon glyphicon-save"></span> Save</button>
            <button type="button" class="btn btn-default" onclick="draw_expert_settings()"><span class="glyphicon glyphicon-refresh"></span> Reload</button>
        </div>
      </div>
      `
    );
    draw_network_iflist();
    draw_expert_settings();
}

draw_settings();


