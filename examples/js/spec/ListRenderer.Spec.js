describe('ListRenderer', function() {

    afterEach(function(){
        var container = document.getElementById('xhtmlToTest');
        container.innerHTML = '';
    });

    beforeEach(function() {

	this.addMatchers({
	    toContainAnElement: function(HTMLElementType) {
		var figures = this.actual.getElementsByTagName(HTMLElementType);
		return (figures.length > 0);
	    },

	    toContainClass: function(classname) {
		return CUORE.Dom.hasClass(this.actual,classname);
	    },

	    toContainAsFirstElement: function(HTMLElementType) {
		var tagName=this.actual.childNodes[0].tagName;
		var hasElement =(tagName.toLowerCase() === HTMLElementType.toLowerCase())
		return hasElement;
	    }
	})

    });

    it("inherits Renderer", function() {
        var aRenderer = new ListRenderer();
        expect(aRenderer instanceof ListRenderer).toBeTruthy();
        expect(aRenderer instanceof CUORE.Renderer).toBeTruthy();
    });

    it("renderizes an unordered list with class gallery", function() {
        var container = createTestContainer();
        var aComponent = getDummyComponent();

        var aRenderer = new ListRenderer();
        aRenderer.setContainer(container.id);

        aRenderer.render(aComponent);

        var DOMElement = document.getElementById(container.id);
        expect(DOMElement).toContainAsFirstElement('ul');
        var innerElement = DOMElement.childNodes[0];
    });

    it("renderizes an li by tweet", function () {
        var container = createTestContainer();
        var aComponent = getDummyComponent();

        var aRenderer = new ListRenderer();
        aRenderer.setContainer(container.id);

        aRenderer.render(aComponent);

        var expectedTemplate = '{{#tweets}}<li><h4>{{user}}</h4><img src="{{photo}}"><p>{{content}}</p></li>{{/tweets}}';
        var expectedHTML = Mustache.render(expectedTemplate, {tweets: aComponent.tweets()});
        var DOMElement = document.getElementById(container.id)

        expect(DOMElement.firstChild.innerHTML).toEqual(expectedHTML);
    });

    var createTestContainer = function() {
       var container = document.createElement('div');
       container.id = "testingContainer";
       var panel = document.getElementById("xhtmlToTest");
       panel.appendChild(container);

       return container;
    };

    var getDummyComponent = function() {
       var aComponent = {};

       aComponent.isEnabled = jasmine.createSpy().andReturn(true);
       aComponent.getText = jasmine.createSpy().andReturn('anyText');
       aComponent.getName = jasmine.createSpy().andReturn('anyName');
       aComponent.doYouReplace = jasmine.createSpy().andReturn(true);
       aComponent.doYouHijack = jasmine.createSpy().andReturn(false);
       aComponent.getContainer = jasmine.createSpy().andReturn("testingContainer");

        var anItem = {
            'user': 'aUser',
            'photo': 'aPhoto',
            'content': 'someContent'
        };

       aComponent.tweets=jasmine.createSpy().andReturn([anItem,anItem,anItem]);

       aComponent.item =jasmine.createSpy().andReturn(anItem);
       aComponent.size = jasmine.createSpy().andReturn(3);
       return aComponent;
   };



});
