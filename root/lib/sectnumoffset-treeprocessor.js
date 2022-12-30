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

/* Generated by Opal 0.11.99.dev */
Opal.modules["InterDocumentReferencesMacro/extension"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $hash2 = Opal.hash2;

  Opal.add_stubs(['$==', '$include', '$use_dsl', '$named', '$name_positional_attributes', '$[]', '$document', '$attributes', '$render', '$create_anchor']);
  
  if ($$($nesting, 'RUBY_ENGINE')['$==']("opal")) {
  } else {
    nil
  };
  self.$include($$$('::', 'Asciidoctor'));
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'InterDocumentReferencesMacro');

    var $nesting = [self].concat($parent_nesting), $InterDocumentReferencesMacro_process$1;

    
    self.$use_dsl();
    self.$named("crossref");
    self.$name_positional_attributes("attributes");
    return (Opal.def(self, '$process', $InterDocumentReferencesMacro_process$1 = function $$process(parent, target, attrs) {
      var self = this, destination = nil, anchor = nil, text = nil, doc = nil;

      
      destination = target;
      anchor = attrs['$[]'](1);
      text = attrs['$[]'](2);
      doc = parent.$document();
      if (doc.$attributes()['$[]']("book")['$==']("True")) {
        if (doc.$attributes()['$[]']("isonline")['$=='](1)) {
          return self.$create_anchor(parent, text, $hash2(["type", "target"], {"type": "link", "target": "" + "./#" + (anchor)})).$render()
        } else {
          return self.$create_anchor(parent, text, $hash2(["type", "target"], {"type": "link", "target": "" + "./index.html#" + (anchor)})).$render()
        }
      } else if (doc.$attributes()['$[]']("isonline")['$=='](1)) {
        return self.$create_anchor(parent, text, $hash2(["type", "target"], {"type": "link", "target": "" + "../" + (destination) + "/#" + (anchor)})).$render()
      } else {
        return self.$create_anchor(parent, text, $hash2(["type", "target"], {"type": "link", "target": "" + "../" + (destination) + "/index.html#" + (anchor)})).$render()
      };
    }, $InterDocumentReferencesMacro_process$1.$$arity = 3), nil) && 'process';
  })($nesting[0], $$$($$$($$($nesting, 'Asciidoctor'), 'Extensions'), 'InlineMacroProcessor'), $nesting);
};

/* Generated by Opal 0.11.99.dev */
(function(Opal) {
  var $$1, self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $send = Opal.send;

  Opal.add_stubs(['$==', '$require', '$register', '$inline_macro']);
  
  if ($$($nesting, 'RUBY_ENGINE')['$==']("opal")) {
    
    self.$require("InterDocumentReferencesMacro/extension");
  } else {
    nil
  };
  return $send($$$($$($nesting, 'Asciidoctor'), 'Extensions'), 'register', [], ($$1 = function(){var self = $$1.$$s || this;

  return self.$inline_macro($$($nesting, 'InterDocumentReferencesMacro'))}, $$1.$$s = self, $$1.$$arity = 0, $$1));
})(Opal);

/* Generated by Opal 0.11.99.dev */
Opal.modules["ManPageMacro/extension"] = function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $truthy = Opal.truthy;

  Opal.add_stubs(['$==', '$include', '$use_dsl', '$named', '$name_positional_attributes', '$[]']);
  
  if ($$($nesting, 'RUBY_ENGINE')['$==']("opal")) {
  } else {
    nil
  };
  self.$include($$$('::', 'Asciidoctor'));
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'ManPageMacro');

    var $nesting = [self].concat($parent_nesting), $ManPageMacro_process$1;

    
    self.$use_dsl();
    self.$named("man");
    self.$name_positional_attributes("section");
    return (Opal.def(self, '$process', $ManPageMacro_process$1 = function $$process(parent, target, attrs) {
      var self = this, manname = nil, section = nil, url = nil;

      
      manname = target;
      section = (function() {if ($truthy((section = attrs['$[]']("section")))) {
        return "" + (section)
      } else {
        return ""
      }; return nil; })();
      url = "" + "https://www.freebsd.org/cgi/man.cgi?query=" + (manname) + "&sektion=" + (section) + "&format=html";
      return "" + "<a href=\"" + (url) + "\">" + (manname) + "(" + (section) + ")</a>";
    }, $ManPageMacro_process$1.$$arity = 3), nil) && 'process';
  })($nesting[0], $$$($$$($$($nesting, 'Asciidoctor'), 'Extensions'), 'InlineMacroProcessor'), $nesting);
};

/* Generated by Opal 0.11.99.dev */
(function(Opal) {
  var $$1, self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $send = Opal.send;

  Opal.add_stubs(['$==', '$require', '$register', '$inline_macro']);
  
  if ($$($nesting, 'RUBY_ENGINE')['$==']("opal")) {
    
    self.$require("ManPageMacro/extension");
  } else {
    nil
  };
  return $send($$$($$($nesting, 'Asciidoctor'), 'Extensions'), 'register', [], ($$1 = function(){var self = $$1.$$s || this;

  return self.$inline_macro($$($nesting, 'ManPageMacro'))}, $$1.$$s = self, $$1.$$arity = 0, $$1));
})(Opal);

/* Generated by Opal 0.11.99.dev */
Opal.modules["PackagesMacro/extension"] = function(Opal) {
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
};

/* Generated by Opal 0.11.99.dev */
(function(Opal) {
  var $$1, self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $send = Opal.send;

  Opal.add_stubs(['$==', '$require', '$register', '$inline_macro']);
  
  if ($$($nesting, 'RUBY_ENGINE')['$==']("opal")) {
    
    self.$require("PackagesMacro/extension");
  } else {
    nil
  };
  return $send($$$($$($nesting, 'Asciidoctor'), 'Extensions'), 'register', [], ($$1 = function(){var self = $$1.$$s || this;

  return self.$inline_macro($$($nesting, 'PackagesMacro'))}, $$1.$$s = self, $$1.$$arity = 0, $$1));
})(Opal);

/* Generated by Opal 0.11.99.dev */
(function(Opal) {
  function $rb_plus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
  function $rb_minus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
  var $$1, self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $send = Opal.send, $truthy = Opal.truthy, $hash2 = Opal.hash2;

  Opal.add_stubs(['$==', '$include', '$register', '$treeprocessor', '$process', '$attr?', '$attr', '$to_s', '$each', '$find_by', '$level', '$+', '$numeral', '$numeral=', '$-']);
  
  if ($$($nesting, 'RUBY_ENGINE')['$==']("opal")) {
  } else {
    nil
  };
  self.$include($$($nesting, 'Asciidoctor'));
  return $send($$($nesting, 'Extensions'), 'register', [], ($$1 = function(){var self = $$1.$$s || this, $$2;

  return $send(self, 'treeprocessor', [], ($$2 = function(){var self = $$2.$$s || this, $$3;

    return $send(self, 'process', [], ($$3 = function(document){var self = $$3.$$s || this, $a, $$4, $$5, book = nil, sectnumoffset = nil;

      
        
        if (document == null) {
          document = nil;
        };
        if ($truthy(($truthy($a = document['$attr?']("sectnumoffset")) ? (book = document.$attr("book", false))['$=='](false) : $a))) {
          
          sectnumoffset = document.$attr("sectnumoffset", "0").$to_s();
          return $send($send(document, 'find_by', [$hash2(["context"], {"context": "section"})], ($$4 = function(sect){var self = $$4.$$s || this;

          
            
            if (sect == null) {
              sect = nil;
            };
            return sect.$level()['$=='](1);}, $$4.$$s = self, $$4.$$arity = 1, $$4)), 'each', [], ($$5 = function(sect){var self = $$5.$$s || this, $writer = nil;

          
            
            if (sect == null) {
              sect = nil;
            };
            $writer = [$rb_plus($rb_plus(sectnumoffset.$to_s(), "."), sect.$numeral().$to_s())];
            $send(sect, 'numeral=', Opal.to_a($writer));
            return $writer[$rb_minus($writer["length"], 1)];}, $$5.$$s = self, $$5.$$arity = 1, $$5));
        } else {
          return nil
        };}, $$3.$$s = self, $$3.$$arity = 1, $$3))}, $$2.$$s = self, $$2.$$arity = 0, $$2))}, $$1.$$s = self, $$1.$$arity = 0, $$1));
})(Opal);
