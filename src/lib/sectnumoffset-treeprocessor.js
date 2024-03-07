Opal.modules["CrossDocumentReferencesMacro/extension"] = function(Opal) {/* Generated by Opal 1.7.3 */
  var $klass = Opal.klass, $truthy = Opal.truthy, $rb_plus = Opal.rb_plus, $eqeq = Opal.eqeq, $hash2 = Opal.hash2, $def = Opal.def, self = Opal.top, $nesting = [], $$ = Opal.$r($nesting), nil = Opal.nil, $$$ = Opal.$$$;

  Opal.add_stubs('include,use_dsl,named,name_positional_attributes,[],nil?,+,document,==,attributes,render,create_anchor');
  
  nil;
  self.$include($$$('Asciidoctor'));
  return (function($base, $super) {
    var self = $klass($base, $super, 'CrossDocumentReferencesMacro');

    
    
    self.$use_dsl();
    self.$named("extref");
    self.$name_positional_attributes("attributes");
    return $def(self, '$process', function $$process(parent, target, attrs) {
      var self = this, destination = nil, text = nil, anchor = nil, doc = nil;

      
      destination = target;
      text = attrs['$[]'](1);
      anchor = "";
      if (!$truthy(attrs['$[]'](2)['$nil?']())) {
        anchor = $rb_plus("#", attrs['$[]'](2))
      };
      doc = parent.$document();
      if ($eqeq(doc.$attributes()['$[]']("isonline"), "1")) {
        return self.$create_anchor(parent, text, $hash2(["type", "target"], {"type": "link", "target": "" + (destination) + (anchor)})).$render()
      } else if ($eqeq(doc.$attributes()['$[]']("doctype"), "book")) {
        return self.$create_anchor(parent, text, $hash2(["type", "target"], {"type": "link", "target": "../" + (destination) + "/index.html" + (anchor)})).$render()
      } else {
        return self.$create_anchor(parent, text, $hash2(["type", "target"], {"type": "link", "target": "" + (destination) + "/index.html" + (anchor)})).$render()
      };
    });
  })($nesting[0], $$$($$$($$('Asciidoctor'), 'Extensions'), 'InlineMacroProcessor'));
};

Opal.queue(function(Opal) {/* Generated by Opal 1.7.3 */
  var $send = Opal.send, self = Opal.top, $nesting = [], $$ = Opal.$r($nesting), nil = Opal.nil, $$$ = Opal.$$$;

  Opal.add_stubs('require,register,inline_macro');
  
  
  self.$require("CrossDocumentReferencesMacro/extension");;
  return $send($$$($$('Asciidoctor'), 'Extensions'), 'register', [], function $$1(){var self = $$1.$$s == null ? this : $$1.$$s;

    return self.$inline_macro($$('CrossDocumentReferencesMacro'))}, {$$s: self});
});

Opal.modules["GitReferencesMacro/extension"] = function(Opal) {/* Generated by Opal 1.7.3 */
  var $klass = Opal.klass, $truthy = Opal.truthy, $def = Opal.def, self = Opal.top, $nesting = [], $$ = Opal.$r($nesting), nil = Opal.nil, $$$ = Opal.$$$;

  Opal.add_stubs('include,use_dsl,named,[],to_i');
  
  nil;
  self.$include($$$('Asciidoctor'));
  return (function($base, $super) {
    var self = $klass($base, $super, 'GitReferencesMacro');

    
    
    self.$use_dsl();
    self.$named("gitref");
    return $def(self, '$process', function $$process(parent, target, attrs) {
      var hash = nil, repository = nil, length = nil, url = nil;

      
      hash = target;
      repository = ($truthy((repository = attrs['$[]']("repository"))) ? ("" + (repository)) : ("src"));
      length = ($truthy((length = attrs['$[]']("length"))) ? (length.$to_i()) : (12));
      url = "https://cgit.freebsd.org/" + (repository) + "/commit/?id=" + (hash);
      return "<a href=\"" + (url) + "\">" + (hash['$[]'](0, length)) + "</a>";
    });
  })($nesting[0], $$$($$$($$('Asciidoctor'), 'Extensions'), 'InlineMacroProcessor'));
};

Opal.queue(function(Opal) {/* Generated by Opal 1.7.3 */
  var $send = Opal.send, self = Opal.top, $nesting = [], $$ = Opal.$r($nesting), nil = Opal.nil, $$$ = Opal.$$$;

  Opal.add_stubs('require,register,inline_macro');
  
  
  self.$require("GitReferencesMacro/extension");;
  return $send($$$($$('Asciidoctor'), 'Extensions'), 'register', [], function $$1(){var self = $$1.$$s == null ? this : $$1.$$s;

    return self.$inline_macro($$('GitReferencesMacro'))}, {$$s: self});
});

Opal.modules["InterDocumentReferencesMacro/extension"] = function(Opal) {/* Generated by Opal 1.7.3 */
  var $klass = Opal.klass, $eqeq = Opal.eqeq, $hash2 = Opal.hash2, $def = Opal.def, self = Opal.top, $nesting = [], $$ = Opal.$r($nesting), nil = Opal.nil, $$$ = Opal.$$$;

  Opal.add_stubs('include,use_dsl,named,name_positional_attributes,[],document,==,attributes,render,create_anchor');
  
  nil;
  self.$include($$$('Asciidoctor'));
  return (function($base, $super) {
    var self = $klass($base, $super, 'InterDocumentReferencesMacro');

    
    
    self.$use_dsl();
    self.$named("crossref");
    self.$name_positional_attributes("attributes");
    return $def(self, '$process', function $$process(parent, target, attrs) {
      var self = this, destination = nil, anchor = nil, text = nil, doc = nil;

      
      destination = target;
      anchor = attrs['$[]'](1);
      text = attrs['$[]'](2);
      doc = parent.$document();
      if ($eqeq(doc.$attributes()['$[]']("book"), "true")) {
        if ($eqeq(doc.$attributes()['$[]']("isonline"), "1")) {
          return self.$create_anchor(parent, text, $hash2(["type", "target"], {"type": "link", "target": "./#" + (anchor)})).$render()
        } else {
          return self.$create_anchor(parent, text, $hash2(["type", "target"], {"type": "link", "target": "./index.html#" + (anchor)})).$render()
        }
      } else if ($eqeq(doc.$attributes()['$[]']("isonline"), "1")) {
        return self.$create_anchor(parent, text, $hash2(["type", "target"], {"type": "link", "target": "../" + (destination) + "/#" + (anchor)})).$render()
      } else {
        return self.$create_anchor(parent, text, $hash2(["type", "target"], {"type": "link", "target": "../" + (destination) + "/index.html#" + (anchor)})).$render()
      };
    });
  })($nesting[0], $$$($$$($$('Asciidoctor'), 'Extensions'), 'InlineMacroProcessor'));
};

Opal.queue(function(Opal) {/* Generated by Opal 1.7.3 */
  var $send = Opal.send, self = Opal.top, $nesting = [], $$ = Opal.$r($nesting), nil = Opal.nil, $$$ = Opal.$$$;

  Opal.add_stubs('require,register,inline_macro');
  
  
  self.$require("InterDocumentReferencesMacro/extension");;
  return $send($$$($$('Asciidoctor'), 'Extensions'), 'register', [], function $$1(){var self = $$1.$$s == null ? this : $$1.$$s;

    return self.$inline_macro($$('InterDocumentReferencesMacro'))}, {$$s: self});
});

Opal.modules["ManPageMacro/extension"] = function(Opal) {/* Generated by Opal 1.7.3 */
  var $klass = Opal.klass, $truthy = Opal.truthy, $def = Opal.def, self = Opal.top, $nesting = [], $$ = Opal.$r($nesting), nil = Opal.nil, $$$ = Opal.$$$;

  Opal.add_stubs('include,use_dsl,named,name_positional_attributes,[]');
  
  nil;
  self.$include($$$('Asciidoctor'));
  return (function($base, $super) {
    var self = $klass($base, $super, 'ManPageMacro');

    
    
    self.$use_dsl();
    self.$named("man");
    self.$name_positional_attributes("section");
    return $def(self, '$process', function $$process(parent, target, attrs) {
      var manname = nil, section = nil, url = nil;

      
      manname = target;
      section = ($truthy((section = attrs['$[]']("section"))) ? ("" + (section)) : (""));
      url = "https://man.freebsd.org/cgi/man.cgi?query=" + (manname) + "&sektion=" + (section) + "&format=html";
      return "<a href=\"" + (url) + "\">" + (manname) + "(" + (section) + ")</a>";
    });
  })($nesting[0], $$$($$$($$('Asciidoctor'), 'Extensions'), 'InlineMacroProcessor'));
};

Opal.queue(function(Opal) {/* Generated by Opal 1.7.3 */
  var $send = Opal.send, self = Opal.top, $nesting = [], $$ = Opal.$r($nesting), nil = Opal.nil, $$$ = Opal.$$$;

  Opal.add_stubs('require,register,inline_macro');
  
  
  self.$require("ManPageMacro/extension");;
  return $send($$$($$('Asciidoctor'), 'Extensions'), 'register', [], function $$1(){var self = $$1.$$s == null ? this : $$1.$$s;

    return self.$inline_macro($$('ManPageMacro'))}, {$$s: self});
});

Opal.modules["PackagesMacro/extension"] = function(Opal) {/* Generated by Opal 1.7.3 */
  var $klass = Opal.klass, $truthy = Opal.truthy, $rb_minus = Opal.rb_minus, $def = Opal.def, self = Opal.top, $nesting = [], $$ = Opal.$r($nesting), nil = Opal.nil, $$$ = Opal.$$$;

  Opal.add_stubs('include,use_dsl,named,name_positional_attributes,include?,[],-,index');
  
  nil;
  self.$include($$$('Asciidoctor'));
  return (function($base, $super) {
    var self = $klass($base, $super, 'PackagesMacro');

    
    
    self.$use_dsl();
    self.$named("package");
    self.$name_positional_attributes("pkgname");
    return $def(self, '$process', function $$process(parent, target, attrs) {
      var pkgorigin = nil, pkgname = nil, url = nil;

      
      pkgorigin = target;
      if ($truthy(pkgorigin['$include?']("@"))) {
        pkgorigin = pkgorigin['$[]'](Opal.Range.$new(0, $rb_minus(pkgorigin.$index("@"), 1), false))
      };
      pkgname = ($truthy((pkgname = attrs['$[]']("pkgname"))) ? ("" + (pkgname)) : ("" + (target)));
      url = "https://cgit.freebsd.org/ports/tree/" + (pkgorigin) + "/";
      return "<a class=\"package\" href=\"" + (url) + "\">" + (pkgname) + "</a>";
    });
  })($nesting[0], $$$($$$($$('Asciidoctor'), 'Extensions'), 'InlineMacroProcessor'));
};

Opal.queue(function(Opal) {/* Generated by Opal 1.7.3 */
  var $send = Opal.send, self = Opal.top, $nesting = [], $$ = Opal.$r($nesting), nil = Opal.nil, $$$ = Opal.$$$;

  Opal.add_stubs('require,register,inline_macro');
  
  
  self.$require("PackagesMacro/extension");;
  return $send($$$($$('Asciidoctor'), 'Extensions'), 'register', [], function $$1(){var self = $$1.$$s == null ? this : $$1.$$s;

    return self.$inline_macro($$('PackagesMacro'))}, {$$s: self});
});

Opal.queue(function(Opal) {/* Generated by Opal 1.7.3 */
  var $send = Opal.send, $eqeq = Opal.eqeq, $truthy = Opal.truthy, $hash2 = Opal.hash2, $rb_plus = Opal.rb_plus, self = Opal.top, $nesting = [], $$ = Opal.$r($nesting), nil = Opal.nil;

  Opal.add_stubs('include,register,treeprocessor,process,==,attr,attr?,to_s,each,find_by,level,numeral=,+,numeral');
  
  nil;
  self.$include($$('Asciidoctor'));
  return $send($$('Extensions'), 'register', [], function $$1(){var self = $$1.$$s == null ? this : $$1.$$s;

    return $send(self, 'treeprocessor', [], function $$2(){var self = $$2.$$s == null ? this : $$2.$$s;

      return $send(self, 'process', [], function $$3(document){var book = nil, sectnumoffset = nil;

        
        if (document == null) document = nil;
        if (($truthy(document['$attr?']("sectnumoffset")) && ($eqeq((book = document.$attr("book", false)), false)))) {
          
          sectnumoffset = document.$attr("sectnumoffset", "0").$to_s();
          return $send($send(document, 'find_by', [$hash2(["context"], {"context": "section"})], function $$4(sect){
            
            if (sect == null) sect = nil;
            return sect.$level()['$=='](1);}), 'each', [], function $$5(sect){var $a;

            
            if (sect == null) sect = nil;
            return ($a = [$rb_plus($rb_plus(sectnumoffset.$to_s(), "."), sect.$numeral().$to_s())], $send(sect, 'numeral=', $a), $a[$a.length - 1]);});
        } else {
          return nil
        };})}, {$$s: self})}, {$$s: self});
});
