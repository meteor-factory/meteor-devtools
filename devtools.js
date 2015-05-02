var RX_TEMPLATE = /^Template\.(.*)$/;

Meteor.startup(function () {
  $(window).mousemove(function (e) {
    if (! e.originalEvent.data ||
        ! e.originalEvent.data.handledByDevTools) {
      hideOverlay();
    }
  });

  Template.forEach(function (t) {
    var isTemplate = RX_TEMPLATE.test(t.viewName);
    var name;

    if (isTemplate) {
      name = t.viewName.match(RX_TEMPLATE)[1];
      addOverlayHooks(name);
    }
  });
});

function showOverlay (target, templateName) {
  $('.devtools-overlay').remove();
  $('.devtools-overlay-children').remove();

  $('<div class="devtools-overlay">' +
      '<span class="devtools-overlay-text">' +
        templateName +
      '</span>' +
    '</div>')
    .appendTo('body')
    .css({
      display: 'block',
      top: $(target).offset().top + 'px',
      left: $(target).offset().left + 'px',
      width: $(target).outerWidth() + 'px',
      height: $(target).outerHeight() + 'px',
    });

  $(target).find('[data-devtools-template]').each(function (e) {
    $('<div class="devtools-overlay-children"></div>')
      .appendTo('body')
      .css({
        top: $(this).offset().top + 'px',
        left: $(this).offset().left + 'px',
        width: $(this).outerWidth() + 'px',
        height: $(this).outerHeight() + 'px'
      });
  });
}

function hideOverlay () {
  $('.devtools-overlay').remove();
  $('.devtools-overlay-children').remove();
}

function addOverlayHooks (templateName) {
  Template[templateName].hooks({
    rendered: function () {
      $(this.firstNode).attr('data-devtools-template', templateName);

      $(this.firstNode).mousemove(function (e) {
        var node = e.currentTarget;

        if (e.originalEvent.data &&
            e.originalEvent.data.handledByDevTools) {
          return;
        }

        e.originalEvent.data = {
          handledByDevTools: true
        };

        if (! $(node).data('devtools-active')) {
          $(node).data('devtools-active', true);
          $(node).on('contextmenu', function (e) {
            e.preventDefault();
            e.stopPropagation();
            alert(templateName);
          });
        }

        showOverlay(node, templateName);
      });
    }
  });
}