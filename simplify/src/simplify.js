(function ($) {
  String.prototype.replaceAll = function (needle, replace) {
    return this.replace(new RegExp(needle, 'gi'), replace);
  };

  var translate = function(source) {
    return source
      // Replace V with B
      .replaceAll('v', 'b')

      // Replace Ce, Ci with Se, Si and accents
      .replaceAll('c([eiéí])', 's' + '$1')

      // Replace XC with CS
      .replaceAll('xc', 'cs')

      // Replace X with CS
      .replaceAll('x', 'cs')

      // Replace Ch with X
      .replaceAll('ch', 'x')

      // Replace K, Q with C
      .replaceAll('k|qu|q', 'c')

      // Replace Ge, Gi with J
      .replaceAll('g([ei])', 'j$1')

      // Replace Gu with G
      .replaceAll('gu([eiéí])', 'g$1')

      // Replace Gü with Gu
      .replaceAll('ü', 'u')

      // Remove H
      .replaceAll('h', '')

      // Replace LL with Y
      .replaceAll('ll', 'y')

      // Replace Z with S
      .replaceAll('z', 's');
  };

  $.fn.simplify = function () {
    this.each(function() {
      var $this = $(this),
        isValuable = !!$this.val(),
        source = $this.val() || $this.text(),
        result = translate(source);

      if (isValuable) {
        $this.val(result);
      } else {
        $this.text(result);
      }
    });

    return this;
  };
}(jQuery));
