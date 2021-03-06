var $ = require('jquery');
var Game = require('./game');
var jsonpack = require('jsonpack');
// var game = new Game(jsonpack.unpack(result), names, 300, $('#playground'));
var Map = require('./game/map');

$(function() {
  maps.forEach(function(map) {
    var mapModel = new Map(map, function() {
      $('#playground').hide();
      $('p.hint').show();
      $('p.hint').html('载入地图“' + map.name + '”中...');
      $.get('/replay?user1=' + encodeURIComponent(user1) + '&user2=' + encodeURIComponent(user2) + '&map=' + map.id, function(data) {
        $('p.hint').hide();
        new Game(map.data.map, jsonpack.unpack(data.replay), data.names, 300, $('#playground'));
        $('#playground').show();
      }).fail(function(res, _, err) {
        if (res.responseJSON && res.responseJSON.err) {
          alert(res.responseJSON.err);
        } else {
          alert(err);
        }
        $('p.hint').hide();
      });
    });
    var $li = $('<li></li>');
    mapModel.render($li, 200);
    $('.js-select-map').append($li);
  });
});
