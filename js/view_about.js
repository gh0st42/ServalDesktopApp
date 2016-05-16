
function draw_aboutview() {
  console.log("draw_aboutview");
    $('#about').html(
      `<h2>Serval Desktop App</h2>
      <div>Copyright: Lars Baumgaertner (c) 2016</div>
      <h2>serval-dna</h2>
      <div><pre id="serval_version"></pre></div>`
    );
}

draw_aboutview();

servalVersion(function(code, stdout, stderr) {
  $("#serval_version").text(stdout);
});
