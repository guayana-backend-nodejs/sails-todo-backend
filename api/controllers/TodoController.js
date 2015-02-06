/**
 * TodoController
 *
 * @description :: Server-side logic for managing todoes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	index: function(req,res,next){

		Todo.find({}, function(err,response){
				if (err)
					return res.badRequest({
						'status': '500',
						'response': err
					});

			return res.ok({
				'status': 'GET_TODOS_SUCCESS',
				'response': response
			});
		});
	},

create: function(req, res, next){

		Todo.create(req.params.all(), function(err, response){

			if (err)
					return res.badRequest({
						'status': '500',
						'response': err
					});

			return res.ok({
				'status': 'CREATE_TODO_SUCCESS',
				'response': response
			});
		});
	},
clear: function(req, res, next){

		Todo.find({name: ""}, function (err, response){
				if(err) 
					return res.badRequest({
						'status': '500',
						'response': err
					});

				console.log(response);

				if (!_.isEmpty(response)){

				async.map(response, function(todo, callback){

						var itemId = todo.id;
						console.log(itemId);

						Todo.destroy({id: itemId}).exec(function(err) {
							if (err)  callback(err);
							callback();
						});

						}, function(err, results){

						if (err)
							return res.badRequest({
							'status': '500',
							'response': err
						});

						return res.ok({
							'status': 'success',
							'response': results
						});
				});
					
				}else{
					return res.ok({
						'status': 'NOT FOUND',
						'response': response
					});
				}
				
		});
	}
};

