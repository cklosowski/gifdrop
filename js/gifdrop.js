// Generated by CoffeeScript 1.7.1
(function() {
  var $, app,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  $ = window.jQuery;

  app = window.gifdropApp = {
    init: function() {
      this.images = new this.Images(_.toArray(gifdropSettings.attachments));
      this.view = new this.ImagesListView({
        collection: this.images
      });
      return this.view.init();
    }
  };

  $(function() {
    var uploadError, uploadFilesAdded, uploadProgress, uploadStart, uploadSuccess, uploader;
    uploadProgress = function(uploader, file) {
      return console.log('uploadProgress');
    };
    uploadStart = function(uploader) {
      return console.log('uploadStart');
    };
    uploadError = function() {
      return alert('error');
    };
    uploadSuccess = function(attachment) {
      var img;
      console.log(attachment);
      img = attachment.attributes.sizes.full;
      return app.images.add({
        id: attachment.id,
        width: img.width,
        height: img.height,
        src: img.url
      });
    };
    uploadFilesAdded = function(uploader, files) {
      return $.each(files, function(i, file) {
        if (i > 0) {
          return uploader.removeFile(file);
        }
      });
    };
    uploader = new wp.Uploader({
      container: $('.wrapper'),
      browser: $('.browser'),
      dropzone: $('.wrapper'),
      success: uploadSuccess,
      error: uploadError,
      params: {
        post_id: gifdropSettings.id
      },
      supports: {
        dragdrop: true
      },
      plupload: {
        runtimes: "html5",
        filters: [
          {
            title: "Image",
            extensions: "jpg,jpeg,gif,png"
          }
        ]
      }
    });
    if (uploader.supports.dragdrop) {
      uploader.uploader.bind("BeforeUpload", uploadStart);
      uploader.uploader.bind("UploadProgress", uploadProgress);
      return uploader.uploader.bind("FilesAdded", uploadFilesAdded);
    } else {
      uploader.uploader.destroy();
      return uploader = null;
    }
  });

  app.Image = (function(_super) {
    __extends(Image, _super);

    function Image() {
      return Image.__super__.constructor.apply(this, arguments);
    }

    return Image;

  })(Backbone.Model);

  app.Images = (function(_super) {
    __extends(Images, _super);

    function Images() {
      return Images.__super__.constructor.apply(this, arguments);
    }

    Images.prototype.model = app.Image;

    return Images;

  })(Backbone.Collection);

  app.ImagesListView = (function(_super) {
    __extends(ImagesListView, _super);

    function ImagesListView() {
      return ImagesListView.__super__.constructor.apply(this, arguments);
    }

    ImagesListView.prototype.template = wp.template('gifs');

    ImagesListView.prototype.initialize = function() {
      return this.listenTo(this.collection, 'add', this.prependView);
    };

    ImagesListView.prototype.prependView = function(model, collection, options) {
      return this.addView(model, {
        at: 0
      });
    };

    ImagesListView.prototype.addView = function(model, options) {
      this.views.add('.giflist', new app.ImageListView({
        model: model
      }), options);
      return console.log('addView');
    };

    ImagesListView.prototype.addSubviews = function() {
      var gif, _i, _len, _ref, _results;
      _ref = this.collection.models;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        gif = _ref[_i];
        _results.push(this.addView(gif));
      }
      return _results;
    };

    ImagesListView.prototype.init = function() {
      this.addSubviews();
      this.render();
      $('.gifs').html(this.$el);
      console.log(this.el);
      return this.views.ready();
    };

    return ImagesListView;

  })(wp.Backbone.View);

  app.ImageListView = (function(_super) {
    __extends(ImageListView, _super);

    function ImageListView() {
      return ImageListView.__super__.constructor.apply(this, arguments);
    }

    ImageListView.prototype.className = 'gif';

    ImageListView.prototype.template = wp.template('gif');

    ImageListView.prototype.prepare = function() {
      return this.model.toJSON();
    };

    return ImageListView;

  })(wp.Backbone.View);

  $(function() {
    return app.init();
  });

}).call(this);


//# sourceMappingURL=gifdrop.map
