/* Generated by Opal 0.11.99.dev */
Opal.modules["CrossDocumentReferencesMacro/extension"] = function(Opal) {
  function $rb_plus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $truthy = Opal.truthy, $hash2 = Opal.hash2;

  Opal.add_stubs(['$==', '$include', '$use_dsl', '$named', '$name_positional_attributes', '$[]', '$nil?', '$+', '$document', '$attributes', '$render', '$create_anchor']);
  
  if ($$($nesting, 'RUBY_ENGINE')['$==']("opal")) {
  } else {
    nil
  };
  self.$include($$$('::', 'Asciidoctor'));
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'CrossDocumentReferencesMacro');

    var $nesting = [self].concat($parent_nesting), $CrossDocumentReferencesMacro_process$1;

    
    self.$use_dsl();
    self.$named("extref");
    self.$name_positional_attributes("attributes");
    return (Opal.def(self, '$process', $CrossDocumentReferencesMacro_process$1 = function $$process(parent, target, attrs) {
      var self = this, destination = nil, text = nil, anchor = nil, doc = nil;

      
      destination = target;
      text = attrs['$[]'](1);
      anchor = "";
      if ($truthy(attrs['$[]'](2)['$nil?']())) {
      } else {
        anchor = $rb_plus("#", attrs['$[]'](2))
      };
      doc = parent.$document();
      if (doc.$attributes()['$[]']("isonline")['$==']("1")) {
        return self.$create_anchor(parent, text, $hash2(["type", "target"], {"type": "link", "target": "" + (destination) + (anchor)})).$render()
      } else if (doc.$attributes()['$[]']("doctype")['$==']("book")) {
        return self.$create_anchor(parent, text, $hash2(["type", "target"], {"type": "link", "target": "" + "../" + (destination) + "/index.html" + (anchor)})).$render()
      } else {
        return self.$create_anchor(parent, text, $hash2(["type", "target"], {"type": "link", "target": "" + (destination) + "/index.html" + (anchor)})).$render()
      };
    }, $CrossDocumentReferencesMacro_process$1.$$arity = 3), nil) && 'process';
  })($nesting[0], $$$($$$($$($nesting, 'Asciidoctor'), 'Extensions'), 'InlineMacroProcessor'), $nesting);
};

/* Generated by Opal 0.11.99.dev */
(function(Opal) {
  var $$1, self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $send = Opal.send;

  Opal.add_stubs(['$==', '$require', '$register', '$inline_macro']);
  
  if ($$($nesting, 'RUBY_ENGINE')['$==']("opal")) {
    
    self.$require("CrossDocumentReferencesMacro/extension");
  } else {
    nil
  };
  return $send($$$($$($nesting, 'Asciidoctor'), 'Extensions'), 'register', [], ($$1 = function(){var self = $$1.$$s || this;

  return self.$inline_macro($$($nesting, 'CrossDocumentReferencesMacro'))}, $$1.$$s = self, $$1.$$arity = 0, $$1));
})(Opal);

/* Generated by Opal 0.11.99.dev */
Opal.modules["GitReferencesMacro/extension"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $truthy = Opal.truthy;

  Opal.add_stubs(['$==', '$include', '$use_dsl', '$named', '$[]', '$to_i']);
  
  if ($$($nesting, 'RUBY_ENGINE')['$==']("opal")) {
  } else {
    nil
  };
  self.$include($$$('::', 'Asciidoctor'));
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'GitReferencesMacro');

    var $nesting = [self].concat($parent_nesting), $GitReferencesMacro_process$1;

    
    self.$use_dsl();
    self.$named("gitref");
    return (Opal.def(self, '$process', $GitReferencesMacro_process$1 = function $$process(parent, target, attrs) {
      var self = this, hash = nil, repository = nil, length = nil, url = nil;

      
      hash = target;
      repository = (function() {if ($truthy((repository = attrs['$[]']("repository")))) {
        return "" + (repository)
      } else {
        return "src"
      }; return nil; })();
      length = (function() {if ($truthy((length = attrs['$[]']("length")))) {
        return length.$to_i()
      } else {
        return 12
      }; return nil; })();
      url = "" + "https://cgit.freebsd.org/" + (repository) + "/commit/?id=" + (hash);
      return "" + "<a href=\"" + (url) + "\">" + (hash['$[]'](0, length)) + "</a>";
    }, $GitReferencesMacro_process$1.$$arity = 3), nil) && 'process';
  })($nesting[0], $$$($$$($$($nesting, 'Asciidoctor'), 'Extensions'), 'InlineMacroProcessor'), $nesting);
};

/* Generated by Opal 0.11.99.dev */
(function(Opal) {
  var $$1, self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $send = Opal.send;

  Opal.add_stubs(['$==', '$require', '$register', '$inline_macro']);
  
  if ($$($nesting, 'RUBY_ENGINE')['$==']("opal")) {
    
    self.$require("GitReferencesMacro/extension");
  } else {
    nil
  };
  return $send($$$($$($nesting, 'Asciidoctor'), 'Extensions'), 'register', [], ($$1 = function(){var self = $$1.$$s || this;

  return self.$inline_macro($$($nesting, 'GitReferencesMacro'))}, $$1.$$s = self, $$1.$$arity = 0, $$1));
})(Opal);
