function loadSVGAndAppend(container) {
  var $img = container;
  var imgID = $img.attr('data-id');
  var imgClass = $img.attr('data-class');
  var imgURL = $img.attr('data-src');

  if(!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")) {
    var img = jQuery('<img/>');
    if(typeof imgID !== 'undefined')
      $img.attr('id', imgID);

    if(typeof imgClass !== 'undefined')
      $img.attr('class', imgClass+' replaced-svg');

    $img.attr('src', imgURL.replace("svg", "png"));
    return;
  }

  jQuery.get(imgURL, function(data) {
    var $svg = jQuery(data).find('svg');

    if(typeof imgID !== 'undefined')
      $svg = $svg.attr('id', imgID);

    if(typeof imgClass !== 'undefined')
      $svg = $svg.attr('class', imgClass+' replaced-svg');

    $svg = $svg.removeAttr('xmlns:a');

    $img.replaceWith($svg);
  }, 'xml');
}

function duplicateParagraphs() {
  jQuery('[data-copy-from]').each(function() {
    var target = jQuery(jQuery(this).attr('data-copy-from'));
    if (target.length > 0) {
      jQuery(this).html(target.html());
    }
  });
}
jQuery(document).ready(function() {
  jQuery('div.inlineSvg').each(function() {
    loadSVGAndAppend(jQuery(this));
  });
  duplicateParagraphs();
  learnMore.createList(learnMoreEntries, 2, '#readingList');
});
