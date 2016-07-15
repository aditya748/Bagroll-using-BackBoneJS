var Blog=Backbone.Model.extend({
	defaults:{
		author:'',
		title:'',
		url:''
	}
});

var Blogs=Backbone.Collection.extend({});

var blog1=new Blog({
	author:'Aditya',
	title:'barbad hai',
	url:'adityakibarbadi.com'
});

var blog2=new Blog({
	author:'Aditya',
	title:'barbad hai',
	url:'adityakibarbadi.com'
});

var blogs=new Blogs([blog1,blog2]);

var BlogView=Backbone.View.extend({
	model:new Blog(),
	tagName:'tr',
	initialize:function() {
		this.template=_.template($('.blogs-list-template').html());
	},
	events:{
		'click .blog-edit':'edit',
		'click .blog-update':'update'
	},
	edit:function(){
		console.log("wjjj");
		$('.blog-edit').hide();
		$('.cancel').show();
		$('.blog-submit').hide();
		$('.blog-update').show();

		var author=$('.author').html();
		var title=$('.title').html();
		var url=$('.url').html();

		this.$('.author').html('<input type="text" class="form-control author-update" value="'+author+'" >');
		this.$('.title').html('<input type="text" class="form-control title-update" value="'+title+'" >');
		this.$('.url').html('<input type="text" class="form-control url-update" value="'+url+'" >');
	},
	update:function(){
		this.model.set('author',$('.author-update').val());
		this.model.set('title',$('.title-update').val());
		this.model.set('url',$('.url-update').val());
	},
	render:function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

var BlogViews=Backbone.View.extend({
	model:blogs,
	el:$('.blog-list'),
	initialize:function(){
		var self=this;
		this.model.on('add',this.render,this);
		this.model.on('change',function(){
			setTimeout(function(){
				self.render()
			},30)
		},this);
	},
	render:function(){
		$('.blog-list').html('');
		var self=this;
		_.each(this.model.toArray(),function(blog){
			//console.log(blog);
			$('.blog-list').append((new BlogView({model:blog})).render().$el);
		});
		return this;
	}
})

var blogview=new BlogViews();

$('document').ready(function(){
	$('.add-blog').click(function(){
		var blog=new Blog({
			author:$('.author-input').val(),
			title:$('.title-input').val(),
			url:$('.url-input').val()
		});
		console.log(blog.toJSON());
		blogs.add(blog.toJSON());
	})
})