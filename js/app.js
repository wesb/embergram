Embergram = Ember.Application.create();

Embergram.Image = Ember.Object.extend({
  thumbnail_url: null,
  isLiked: false
});

Embergram.imagesController = Ember.ArrayController.create({
  content: [],
  createImage: function(thumbnail_url) {
    var image = Embergram.Image.create({ thumbnail_url: thumbnail_url });
    this.pushObject(image);
  },
  loadImages: function(){
    this.clear();
    // Load the popular images from instagram
    $.getJSON('https://api.instagram.com/v1/media/popular?client_id=49a422e3020c43259c55e1c59722cdd6&callback=?', function(response) {
      $.each(response.data, function(index, record){
        Embergram.imagesController.createImage(record.images.thumbnail.url);
      });
    });
  },
  liked: function() {
    return this.filterProperty('isLiked', true);
  }.property('@each.isLiked'),
  toggleLiked: function(event){
    toggled_value = !Ember.getPath(event.context, 'content.isLiked');
    Ember.setPath(event.context, 'content.isLiked', toggled_value);
  }
});

Embergram.LikedView = Ember.View.extend({
  likedBinding: 'Embergram.imagesController.liked',

  likedCount: function() {
    return this.get('liked').get('length');
  }.property('liked')
});

$(function(){
  Embergram.imagesController.loadImages();
});
