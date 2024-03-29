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
