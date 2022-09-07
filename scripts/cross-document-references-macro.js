module.exports = function (registry) {
	registry.inlineMacro('extref', function () {
		var self = this
		self.process(function (parent, target, attrs) {
			var destination = target
			text = attrs[1]
			anchor = ""

			if (!attrs[2].nil) {
				anchor = "#" + attrs[2]
			}

			doc = parent.document

			// if (doc.attributes['isonline'] == "1"){
			// 	(create_anchor parent, text, type: : link, target: % (#{ destination }#{ anchor })).render
            //     return self.createAnchor(parent, text, { 'type': link }).convert()
            // }
            // else{
			// 	if (doc.attributes['doctype'] == "book"){
			// 		(create_anchor parent, text, type: : link, target: % (../#{ destination } / index.html#{ anchor })).render
            //     }
            //     else{
			// 		(create_anchor parent, text, type: : link, target: % (#{ destination } /index.html#{anchor})).render
            //     }
            // }
		})
	})
}