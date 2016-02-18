(function(module) {
  var articlesController = {};

  Article.createTable();  // Ensure the database table is properly initialized

  articlesController.index = function(ctx, next) {
    articleView.index(ctx.articles);
  };

  /* This method saves our articles array as a new property on the page.js context object.
  This method assigns the loadById method to the articlesController that is then set
  to a function that takes the paramaters 'ctx' and 'next'.

  It then instantiates another function called articleData that takes the 'article' parameter,
  and assigns the article content to the ctx.articles. Then preforms the next method on the
  routes.js page, articlesController.index.

  The findWhere method, on our Article object, accepts 3 paramaters: field,
  value, and callback.  This is used to get our author data from the database
  and is accessed by grabbing the author/data from our articles table. */

  articlesController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };

    Article.findWhere('id', ctx.params.id, articleData);
  };

  /* This method saves our articles array as a new property on the page.js context object.
  This method assigns the loadByAuthor method to the articlesController that is then set
  to a function that takes the paramaters 'ctx' and 'next'.

  It then instantiates another function called authorData that takes the 'articlesByAuthor'
  parameter, and assigns the articlesByAuthor content to the ctx.articles. Then preforms the next
  method on the routes.js page, articlesController.index.

  The findWhere method, on our Article object, accepts 3 paramaters: field,
  value, and callback. This is used to get our author data from the database
  and is accessed by grabbing the author/data from our articles table.  We are using
  the context object in order to retrieve the author name from our current url params,
  allowing us to make the appropriate query. */

  articlesController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };

    Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData);
  };

  /* This method assigns the loadByCategory method to the articlesController that is then set
  to a function that takes the paramaters 'ctx' and 'next'.

  It then instantiates another function called categoryData that takes the 'articlesByCategory'
  parameter, and assigns the articlesByCategory content to the ctx.articles. Then preforms the next
  method on the routes.js page, articlesController.index.


  */

  // COMMENT: What does this method do?  What is it's execution path?
  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  articlesController.loadAll = function(ctx, next) {
    var articleData = function(allArticles) {
      ctx.articles = Article.all;
      next();
    };

    if (Article.all.length) {
      ctx.articles = Article.all;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };


  module.articlesController = articlesController;
})(window);
