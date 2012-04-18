Embergram = Ember.Application.create();

Embergram.Image = Ember.Object.extend({
  thumbnail_url: null
});

Embergram.imagesController = Ember.ArrayController.create({
  content: [],
  createImage: function(thumbnail_url) {
    var image = Embergram.Image.create({ thumbnail_url: thumbnail_url });
    this.pushObject(image);
  }
});

$(function(){
  // Load the popular images from instagram
  $.getJSON('https://api.instagram.com/v1/media/popular?client_id=49a422e3020c43259c55e1c59722cdd6&callback=?', function(response) {
    $.each(response.data, function(index, record){
      Embergram.imagesController.createImage(record.images.thumbnail.url);
    });
  });
});
