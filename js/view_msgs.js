
function draw_msgview() {
  console.log("draw_msgview");
  $('#messages').html(
    `<div role="tabpanel" class="tab-pane" id="meshms">
                <div class="col-lg-3 col-md-3 col-sm-3">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <h3 class="panel-title">Peers</h3>
                        </div>
                        <div class="panel-body">
                            <div class="form-group-sm ">
                                <div class="list-group list-group-scrollable" id="lg_peers" name="lg_peers"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-9 col-md-9 col-sm-9">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <h3 class="panel-title">Messages</h3>
                        </div>
                        <div class="panel-body">
                            <div class="form-group-sm ">
                                <div class="list-group list-group-scrollable" id="lg_messages" name="lg_messages"></div>
                                <div class="input-group" id="messages" name="messages">
                                    <input class="form-control" type="text" id="inp_message" name="inp_message">
                                    <span class="input-group-btn">
                                        <button class="btn btn-sm btn-default" type="button" id="btn_sendmessage"
                                               name="btn_sendmessage" value="Send" disabled="true">
                                            <span class="glyphicon glyphicon-send" aria-hidden="true"></span>
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
  );
}

function redraw_peers() {
  var contacts_list = $('#lg_peers')
  contacts_list.empty();

  $.each(peerlist, function (index, peer) {
    //if ($.inArray(peer, previous_peerlist) == -1) {
      console.log("peer");
      contacts_list.append(
        '<a id="contact_' + peer + '" name="contact_' + peer + '" data-peer="' + peer + '" class="list-group-item list-group-item-ellipsis unselectable" onclick="reloadMessagelist(this)">' +
        '<span>' + peer + '</span>' +
        '</a>'
      );
    //}
  });

}

draw_msgview();

var peerlist_timer = setInterval(redraw_peers, 5000);