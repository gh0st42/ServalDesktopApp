
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
        var x = contacts_list.append(
            '<a id="contact_' + peer + '" name="contact_' + peer + '" data-peer="' + peer + '" class="list-group-item list-group-item-ellipsis unselectable" onclick="reloadMessagelist(this)">' +
            '<span>' + peer + '</span>' +
            '</a>'
        );
        if (selected_peer_id == peer) {
            contacts_list.children().last().addClass("active");
        }
        //}
    });
    //console.log("SE " + selected_peer);  


}

draw_msgview();

setTimeout(redraw_peers, 1000);
var peerlist_timer = setInterval(redraw_peers, 5000);
var msgs_timer = setInterval(stupidAutorefreshMsgs, 1000);
var selected_peer_id = null;

$("#inp_message").keyup(function (e) {
    if (e.keyCode == 13) {
        submitMessage();
    } else if ($(this).val() == "") {
        $("#btn_sendmessage").attr('disabled', 'disabled');
    } else {
        $("#btn_sendmessage").removeAttr('disabled');
    }
});

$("#btn_sendmessage").click(function () {
    submitMessage();
});

function getSelectedPeer() {
    peers = $('#lg_peers').children()
    act_peer = null;
    peers.each(function (i) {
        if ($.inArray("active", peers[i].classList) >= 0) {
            act_peer = peers[i];
        }
    });
    return act_peer;
}

function submitMessage() {
    var message = $('#inp_message');

    if (myid == null || message.val().length < 1)
        return

    var params = new FormData();
    params.append("message", new Blob([message.val()], { type: "text/plain; charset=utf-8" }));

    servalRestfulPost("meshms/" + myid + "/" + selected_peer_id + "/sendmessage", params, function (result) {
        message.val('');
        $("#btn_sendmessage").attr('disabled', 'disabled');
        console.log(result);
        reloadMessagelist(getSelectedPeer());
    });
}

var myid = null;
function stupidAutorefreshMsgs() {
    reloadMessagelist(getSelectedPeer());
}
function reloadMessagelist(selected_peer_element) {
    console.log("reload: " + selected_peer_element)
    if (selected_peer_element == null) {
        return;
    }
    var peer = selected_peer_element.dataset.peer;
    selected_peer_id = peer;
    redraw_peers();
    console.log(peer);
    servalRestful("keyring/identities.json", function (result) {
        console.log(result["rows"]);
        myid = result["rows"][0][0];
        if (myid != null) {
            servalRestful("meshms/" + myid + "/" + peer + "/messagelist.json", function (result) {
                console.log(result);
                var lg_messages = $("#lg_messages");
                lg_messages.empty();

                result["rows"].reverse().forEach(function (element) {
                    console.log(element);
                    if (element[0] == "<" || element[0] == ">") {
                        lg_messages.append(
                            '<div>' +
                            '<div class="list-group-timestamp">' + convertUnixTimestamp(element[9]) + '</div>' +
                            '<a class="list-group-item' + (element[0] == "<" ? ' list-group-item-info' : ' outgoing-message') + '">' +
                            element[6] +
                            '</a>' +
                            '</div>'
                        );
                    }
                }, this);
                lg_messages.scrollTop(lg_messages.prop("scrollHeight"));
            });
        }
    });
}