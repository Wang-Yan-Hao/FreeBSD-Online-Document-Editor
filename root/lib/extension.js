/* Generated by Opal 0.11.99.dev */
(function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass;

  Opal.add_stubs(['$==', '$include', '$use_dsl', '$named', '$register', '$document']);
  
  if ($$($nesting, 'RUBY_ENGINE')['$==']("opal")) {
  } else {
    nil
  };
  self.$include($$$('::', 'Asciidoctor'));
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'PackagesMacro');

    var $nesting = [self].concat($parent_nesting), $PackagesMacro_process$1;

    
    self.$use_dsl();
    self.$named("package");
    return (Opal.def(self, '$process', $PackagesMacro_process$1 = function $$process(parent, target, attrs) {
      var self = this, packagename = nil;

      
      packagename = target;
      target = "" + "https://cgit.freebsd.org/ports/tree/" + (target) + "/pkg-descr";
      parent.$document().$register("links", target);
      return "" + "<a class=\"package\" href=\"" + (target) + "\">" + (packagename) + "</a>";
    }, $PackagesMacro_process$1.$$arity = 3), nil) && 'process';
  })($nesting[0], $$$($$$($$($nesting, 'Asciidoctor'), 'Extensions'), 'InlineMacroProcessor'), $nesting);
})(Opal);
