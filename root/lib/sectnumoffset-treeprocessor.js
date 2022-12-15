Opal.modules["CrossDocumentReferencesMacro/extension"] = function(Opal) {/* Generated by Opal 1.5.1 */
  var self = Opal.top, $nesting = [], $$ = Opal.$r($nesting), nil = Opal.nil, $$$ = Opal.$$$, $klass = Opal.klass, $truthy = Opal.truthy, $rb_plus = Opal.rb_plus, $eqeq = Opal.eqeq, $hash2 = Opal.hash2, $def = Opal.def;

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
    }, 3);
  })($nesting[0], $$$($$$($$('Asciidoctor'), 'Extensions'), 'InlineMacroProcessor'));
};

(function(Opal) {/* Generated by Opal 1.5.1 */
  var self = Opal.top, $nesting = [], $$ = Opal.$r($nesting), nil = Opal.nil, $$$ = Opal.$$$, $send = Opal.send;

  Opal.add_stubs('require,register,inline_macro');
  
  
  self.$require("CrossDocumentReferencesMacro/extension");;
  return $send($$$($$('Asciidoctor'), 'Extensions'), 'register', [], function $$1(){var self = $$1.$$s == null ? this : $$1.$$s;

    return self.$inline_macro($$('CrossDocumentReferencesMacro'))}, {$$arity: 0, $$s: self});
});

Opal.modules["GitReferencesMacro/extension"] = function(Opal) {/* Generated by Opal 1.5.1 */
  var self = Opal.top, $nesting = [], $$ = Opal.$r($nesting), nil = Opal.nil, $$$ = Opal.$$$, $klass = Opal.klass, $truthy = Opal.truthy, $def = Opal.def;

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
    }, 3);
  })($nesting[0], $$$($$$($$('Asciidoctor'), 'Extensions'), 'InlineMacroProcessor'));
};

(function(Opal) {/* Generated by Opal 1.5.1 */
  var self = Opal.top, $nesting = [], $$ = Opal.$r($nesting), nil = Opal.nil, $$$ = Opal.$$$, $send = Opal.send;

  Opal.add_stubs('require,register,inline_macro');
  
  
  self.$require("GitReferencesMacro/extension");;
  return $send($$$($$('Asciidoctor'), 'Extensions'), 'register', [], function $$1(){var self = $$1.$$s == null ? this : $$1.$$s;

    return self.$inline_macro($$('GitReferencesMacro'))}, {$$arity: 0, $$s: self});
});

Opal.modules["InterDocumentReferencesMacro/extension"] = function(Opal) {/* Generated by Opal 1.5.1 */
  var self = Opal.top, $nesting = [], $$ = Opal.$r($nesting), nil = Opal.nil, $$$ = Opal.$$$, $klass = Opal.klass, $eqeq = Opal.eqeq, $hash2 = Opal.hash2, $def = Opal.def;

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
      if ($eqeq(doc.$attributes()['$[]']("book"), "True")) {
        if ($eqeq(doc.$attributes()['$[]']("isonline"), 1)) {
          return self.$create_anchor(parent, text, $hash2(["type", "target"], {"type": "link", "target": "./#" + (anchor)})).$render()
        } else {
          return self.$create_anchor(parent, text, $hash2(["type", "target"], {"type": "link", "target": "./index.html#" + (anchor)})).$render()
        }
      } else if ($eqeq(doc.$attributes()['$[]']("isonline"), 1)) {
        return self.$create_anchor(parent, text, $hash2(["type", "target"], {"type": "link", "target": "../" + (destination) + "/#" + (anchor)})).$render()
      } else {
        return self.$create_anchor(parent, text, $hash2(["type", "target"], {"type": "link", "target": "../" + (destination) + "/index.html#" + (anchor)})).$render()
      };
    }, 3);
  })($nesting[0], $$$($$$($$('Asciidoctor'), 'Extensions'), 'InlineMacroProcessor'));
};

(function(Opal) {/* Generated by Opal 1.5.1 */
  var self = Opal.top, $nesting = [], $$ = Opal.$r($nesting), nil = Opal.nil, $$$ = Opal.$$$, $send = Opal.send;

  Opal.add_stubs('require,register,inline_macro');
  
  
  self.$require("InterDocumentReferencesMacro/extension");;
  return $send($$$($$('Asciidoctor'), 'Extensions'), 'register', [], function $$1(){var self = $$1.$$s == null ? this : $$1.$$s;

    return self.$inline_macro($$('InterDocumentReferencesMacro'))}, {$$arity: 0, $$s: self});
});

Opal.modules["ManPageMacro/extension"] = function(Opal) {/* Generated by Opal 1.5.1 */
  var self = Opal.top, $nesting = [], $$ = Opal.$r($nesting), nil = Opal.nil, $$$ = Opal.$$$, $klass = Opal.klass, $truthy = Opal.truthy, $def = Opal.def;

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
      url = "https://www.freebsd.org/cgi/man.cgi?query=" + (manname) + "&sektion=" + (section) + "&format=html";
      return "<a href=\"" + (url) + "\">" + (manname) + "(" + (section) + ")</a>";
    }, 3);
  })($nesting[0], $$$($$$($$('Asciidoctor'), 'Extensions'), 'InlineMacroProcessor'));
};

(function(Opal) {/* Generated by Opal 1.5.1 */
  var self = Opal.top, $nesting = [], $$ = Opal.$r($nesting), nil = Opal.nil, $$$ = Opal.$$$, $send = Opal.send;

  Opal.add_stubs('require,register,inline_macro');
  
  
  self.$require("ManPageMacro/extension");;
  return $send($$$($$('Asciidoctor'), 'Extensions'), 'register', [], function $$1(){var self = $$1.$$s == null ? this : $$1.$$s;

    return self.$inline_macro($$('ManPageMacro'))}, {$$arity: 0, $$s: self});
});

Opal.modules["PackagesMacro/extension"] = function(Opal) {/* Generated by Opal 1.5.1 */
  var self = Opal.top, $nesting = [], $$ = Opal.$r($nesting), nil = Opal.nil, $$$ = Opal.$$$, $klass = Opal.klass, $def = Opal.def;

  Opal.add_stubs('include,use_dsl,named,register,document');
  
  nil;
  self.$include($$$('Asciidoctor'));
  return (function($base, $super) {
    var self = $klass($base, $super, 'PackagesMacro');

    
    
    self.$use_dsl();
    self.$named("package");
    return $def(self, '$process', function $$process(parent, target, attrs) {
      var packagename = nil;

      
      packagename = target;
      target = "https://cgit.freebsd.org/ports/tree/" + (target) + "/pkg-descr";
      parent.$document().$register("links", target);
      return "<a class=\"package\" href=\"" + (target) + "\">" + (packagename) + "</a>";
    }, 3);
  })($nesting[0], $$$($$$($$('Asciidoctor'), 'Extensions'), 'InlineMacroProcessor'));
};

(function(Opal) {/* Generated by Opal 1.5.1 */
  var self = Opal.top, $nesting = [], $$ = Opal.$r($nesting), nil = Opal.nil, $$$ = Opal.$$$, $send = Opal.send;

  Opal.add_stubs('require,register,inline_macro');
  
  
  self.$require("PackagesMacro/extension");;
  return $send($$$($$('Asciidoctor'), 'Extensions'), 'register', [], function $$1(){var self = $$1.$$s == null ? this : $$1.$$s;

    return self.$inline_macro($$('PackagesMacro'))}, {$$arity: 0, $$s: self});
});

(function(Opal) {/* Generated by Opal 1.5.1 */
  var self = Opal.top, $nesting = [], $$ = Opal.$r($nesting), nil = Opal.nil, $send = Opal.send, $eqeq = Opal.eqeq, $truthy = Opal.truthy, $hash2 = Opal.hash2, $rb_plus = Opal.rb_plus;

  Opal.add_stubs('include,register,treeprocessor,process,==,attr,attr?,to_s,each,find_by,level,numeral=,+,numeral');
  
  nil;
  self.$include($$('Asciidoctor'));
  return $send($$('Extensions'), 'register', [], function $$1(){var self = $$1.$$s == null ? this : $$1.$$s;

    return $send(self, 'treeprocessor', [], function $$2(){var self = $$2.$$s == null ? this : $$2.$$s;

      return $send(self, 'process', [], function $$3(document){var book = nil, sectnumoffset = nil;

        
        
        if (document == null) document = nil;;
        if (($truthy(document['$attr?']("sectnumoffset")) && ($eqeq((book = document.$attr("book", false)), false)))) {
          
          sectnumoffset = document.$attr("sectnumoffset", "0").$to_s();
          return $send($send(document, 'find_by', [$hash2(["context"], {"context": "section"})], function $$4(sect){
            
            
            if (sect == null) sect = nil;;
            return sect.$level()['$=='](1);}, 1), 'each', [], function $$5(sect){var $a;

            
            
            if (sect == null) sect = nil;;
            return ($a = [$rb_plus($rb_plus(sectnumoffset.$to_s(), "."), sect.$numeral().$to_s())], $send(sect, 'numeral=', $a), $a[$a.length - 1]);}, 1);
        } else {
          return nil
        };}, 1)}, {$$arity: 0, $$s: self})}, {$$arity: 0, $$s: self});
});
