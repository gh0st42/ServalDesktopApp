
function draw_homeview() {
  console.log("draw_homeview");
    $('#home').html(
      `<p class="stats"></p>
      <iframe src="http://127.0.0.1:4110/" id="servalstatusiframe"></iframe>`
    );
}

draw_homeview();

var os = require('os');
var prettyBytes = require('pretty-bytes');

$('.stats').append('Hostname: <span>' + os.hostname() + '</span><br/>');
$('.stats').append('Number of cpu cores: <span>' + os.cpus().length + '</span><br/>');
$('.stats').append('Free memory: <span>' + prettyBytes(os.freemem())+ '</span><br/>');
$('.stats').append('Total memory: <span>' + prettyBytes(os.totalmem())+ '</span><br/>');
$('.stats').append('Uptime: <span>' + os.uptime() + 's</span><br/>');
