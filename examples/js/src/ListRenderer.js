ListRenderer = CUORE.Class(CUORE.Renderer, {

    init: function() {
        ListRenderer.parent.init.call(this);
        this.setTagName('ul');
    },

    paint: function(component) {
        ListRenderer.parent.paint.call(this, component);
        this.updateWhenDrawn(component);
    },

    updateWhenDrawn: function(component) {
        this.panel.innerHTML = this._template({'tweets': component.tweets()});
    },

    _template: function(tweets){
      var template = '{{#tweets}}<li><h4>{{user}}</h4><img src="{{photo}}"><p>{{content}}</p></li>{{/tweets}}';

      return Mustache.render(template, tweets)
    },

    _getTemplateSystem: function(){
        return Mustache.render;
    }

});
