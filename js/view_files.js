
function draw_fileview() {
  console.log("draw_fileview");
    $('#files').html(
      `      
      <div class="panel panel-primary">
                    <div class="panel-heading">
                        <h3 class="panel-title">Rhizome</h3>
                    </div>
                    <div class="panel-body">
                        <div class="form-group-sm">
                            <div class="col-sm4" id="file_list" name="file_list">
                                <div class="input-group" id="search" name="search">
                                    <input class="form-control" type="text" id="inp_filename" name="inp_filename"
                                           placeholder="Search for a file...">
                                    <span class="input-group-btn">
                                        <input class="btn btn-sm btn-default" type="button" id="btn_clearsearchfile"
                                               name="btn_clearsearchfile" value="Clear">
                                    </span>
                                </div>
                                <div class="list-group list-group-scrollable" id="lg_files" name="lg_files"></div>
                                <form class="input-group" id="publish_file" name="publish_file" method="POST"
                                      enctype="multipart/form-data">
                                    <span class="input-group-btn">
                                        <span class="btn btn-sm btn-primary btn-file">
                                            Browse<input id="btn_selectfile" name="btn_selectfile" type="file">
                                        </span>
                                    </span>
                                    <input id="txt_filename" name="txt_filename" type="text" class="form-control"
                                           placeholder="Select a file to publish" readonly>
                                    <span class="input-group-btn">
                                        <input class="btn btn-sm btn-default" type="button" id="btn_publishfile"
                                               name="btn_publishfile" value="Publish" disabled="true">
                                    </span>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
      `
    );
}

draw_fileview();
