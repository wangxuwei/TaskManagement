(function($){
	/**
	 * Create a SQLiteDao type 
	 * 
	 * @param {String} tableName. create a table for dao with the tableName.
	 * @param {String} identity. the primary key of the table.
	 * @param {Array} tableDefine. each object for a column in Array, exclude the primary column.
	 * 			Example format:
	 * 			new SQLiteDao("tableName", "id", [{column:'name',dtype:'TEXT'},{column:'email',dtype:'TEXT'},{column:'sex',dtype:'INTEGER'}]);
	 * 
	 */
	function SQLiteDao(tableName, identity, tableDefine){
		this.init(tableName, identity, tableDefine);
	}

	SQLiteDao.prototype.init = function(tableName, identity, tableDefine){
		app.SQLiteDB.transaction(function(transaction){
			var createSql = "CREATE TABLE IF NOT EXISTS " + tableName + " ("+ identity + " INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT";
			var dlen = tableDefine.length;
			for(var i = 0; i < dlen; i++){
				var field = tableDefine[i];
				createSql += "," + field.column + " " + field.dtype;
			}
			createSql += ");";
			transaction.executeSql(createSql,null,function(a,b){
			},function(a,b){
				console.log(b);
			});
		});
		this._identity = identity;
		this._tableName = tableName;
		return this;
	}

	// --------- DAO Interface Implementation --------- //
	/**
	 * DAO Interface: Return the property ID name
	 * @param {string} the objectType
	 * @return the id (this is not deferred), default value is "id"
	 * @throws error if dao cannot be found
	 */
	SQLiteDao.prototype.getIdName = function(objectType){
		return this._identity || "id";
	}

	
	/**
	 * DAO Interface: Return a deferred object for this objectType and id.
	 * @param {String} objectType
	 * @param {Integer} id
	 * @return
	 */
	SQLiteDao.prototype.get = function(objectType, id){
		var dao = this;
		var dfd = $.Deferred();
		if(id){
			var sql = "SELECT * FROM " + dao._tableName + " where "
					+ dao.getIdName(dao._tableName) + "=" + id;
			app.SQLiteDB.transaction(function(transaction){
				transaction.executeSql(sql, [], function(transaction, results){
					var row = results.rows.item(0);
					dfd.resolve(row);
				});
			});
		}else{
			dfd.resolve(null);
		}

		return dfd.promise();
	}

	
	/**
	 * DAO Interface: Return a deferred object for this objectType and options
	 * @param {String} objectType
	 * @param {Object} opts 
	 *           opts.pageIndex {Number} Index of the page, starting at 0.
	 *           opts.pageSize  {Number} Size of the page
	 *           opts.match     {Object} add condition with expr 'like' in the where clause.
	 *           opts.equal     {Object} add condition with expr '=' in the where clause.
	 *           opts.ids     	{Array}  add condition with expr ' id in (...)' in the where clause.
	 *           opts.orderBy   {String}
	 *           opts.orderType {String} "asc" or "desc"
	 */
	SQLiteDao.prototype.list = function(objectType, opts){
		var dao = this;
		var resultSet;

		var dfd = $.Deferred();
		app.SQLiteDB.transaction(function(transaction){
			var condition = "";
			if(opts){
				if(opts.match){
					var filters = opts.match;
					for(var k in filters){
						condition += " and " + k + " like '%" + filters[k] + "%'";
					}
				}
				
				if(opts.equal){
					var filters = opts.equal;
					for(var k in filters){
						condition += " and " + k + "='" + filters[k] + "'";
					}
				}
				

				if(opts.ids && $.isArray(opts.ids)){
					var ids = opts.ids;
					condition += dao.getIdName(dao._tableName) + " and in (";
					for ( var i = 0; i < ids.length; i++) {
						condition += "'" + ids[i] + "'";
						if (i != ids.length - 1) {
							condition += ",";
						}
					}
					condition += ")";
				}
				
				if(opts.orderBy){
					condition += " order by "+ opts.orderBy;
					if(opts.orderType){
						condition += " " + opts.orderType;
					}
				}
				
				if(opts.pageIndex || opts.pageIndex == 0){
					condition += " limit " + (opts.pageIndex * opts.pageSize);
					if(opts.pageSize){
						condition += ","+opts.pageSize;
					}else{
						condition += ", -1";
					}
				}
			}
			
			
			var listSql = "SELECT " + " * " + "FROM " + dao._tableName + " where 1=1 " + condition;
			transaction.executeSql((listSql), [],function(transaction, results){
				dfd.resolve(parseRows2Json(results.rows));
			});

		});
		return dfd.promise();
	}

	
	/**
	 * DAO Interface: Create a new instance of the object for a give objectType and data. <br />
	 *
	 * The DAO resolve with the newly created data.
	 *
	 * @param {String} objectType
	 * @param {Object} data
	 */
	SQLiteDao.prototype.create = function(objectType, data){
		var dao = this;
		var newId;
		var insSql = "INSERT INTO " + dao._tableName + " (";
		var idx = 0;
		var values = "";
		var valus = [];
		for(var k in data){
			if(idx > 0){
				insSql += ",";
				values += ",";
			}
			insSql += k;
			values += "?";
			valus[idx] = data[k];
			idx++;
		}

		insSql += " ) VALUES (" + values + ");";
		var dfd = $.Deferred();
		
		app.SQLiteDB.transaction(function(transaction){
			transaction.executeSql(insSql, valus,function(transaction, results){
				var obj = $.extend({},data);
				obj.id = results.insertId;
				dfd.resolve(obj);
			},function(a,b){
				console.log(b);
			});
		});
		return dfd.promise();
	}

	/**
	 * DAO Interface: update a existing id with a set of property/value data.
	 *
	 * The DAO resolve with the updated data.
	 *
	 * @param {String} objectType
	 * @param {Integer} id
	 * @param {Object} data
	 */
	SQLiteDao.prototype.update = function(objectType, id, data){
		var dao = this;
		var uptSql = "UPDATE " + dao._tableName + " set ";
		var idx = 0;
		for(var k in data){
			if(idx > 0){
				uptSql += ",";
			}
			uptSql += k + "='" + data[k] + "'";
			idx++;
		}

		uptSql += " where " + dao.getIdName(dao._tableName) + "=" + id;
		var dfd = $.Deferred();
		app.SQLiteDB.transaction(function(transaction){
			transaction.executeSql((uptSql), [],function(transaction, results){
				var obj = $.extend({},data);
				obj.id = id;
				dfd.resolve(obj);
			});
		});
		return dfd.promise();
	}

	/**
	 * DAO Interface: remove an instance of objectType for a given type and id.
	 *
	 * The DAO resolve with the id.
	 * 
	 * @param {String} objectType
	 * @param {Integer} id
	 * 
	 */
	SQLiteDao.prototype.remove = function(objectType, id){
		var dao = this;
		var dfd = $.Deferred();
		app.SQLiteDB.transaction(function(transaction){

			var delSql = "DELETE FROM " + dao._tableName + " where ";
			var condition = "1 != 1";
			if(id){
				condition = dao.getIdName(dao._tableName) + " = '" + id + "'";
			}
			delSql = delSql + condition;
			transaction.executeSql((delSql), [],function(transaction, results){
				dfd.resolve(id);
			});

		});
		return dfd.promise();

	}
	
	// -------- Custom Interface Implementation --------- //
	/**
	 * DAO Interface: remove an instance of objectType for a given type and ids.
	 *
	 * The DAO resolve with the ids.
	 * 
	 * @param {String} objectType
	 * @param {Array} ids
	 * 
	 */
	SQLiteDao.prototype.removeAll = function(objectType, ids){
		var dao = this;
		var dfd = $.Deferred();
		app.SQLiteDB.transaction(function(transaction){

			var delSql = "DELETE FROM " + dao._tableName + " where ";
			var condition = "1 != 1";
			if(ids){
				condition = dao.getIdName(dao._tableName) + " in (";
				for ( var i = 0; i < ids.length; i++) {
					condition += "'" + ids[i] + "'";
					if (i != ids.length - 1) {
						condition += ",";
					}
				}
				condition += ")";
			}
			delSql = delSql + condition;
			transaction.executeSql((delSql), [],function(transaction, results){
				dfd.resolve(ids);
			});

		});
		return dfd.promise();

	}
	
	/**
	 * DAO Interface: Create instances of the object for a give objectType and objs. <br />
	 *
	 * The DAO resolve with the newly created data.
	 *
	 * @param {String} objectType
	 * @param {Array} array of data
	 */
	SQLiteDao.prototype.createAll = function(objectType, objs){
		var dao = this;
		var dfd = $.Deferred();
		var returnArray = [];
		app.SQLiteDB.transaction(function(transaction){
			for(var i = 0; i < objs.length; i++){
				
				var data = objs[i];
				var insSql = "INSERT INTO " + dao._tableName + " (";
				var idx = 0;
				var values = "";
				var valuesArray = [];
				for(var k in data){
					if(idx > 0){
						insSql += ",";
						values += ",";
					}
					insSql += k;
					values += "?";
					valuesArray.push(data[k]);
					idx++;
				}

				insSql += " ) VALUES (" + values + ");";
				if(i < objs.length - 1){
					transaction.executeSql(insSql, valuesArray,function(transaction, results){
						var obj = $.extend({},data);
						obj.id = results.insertId;
						returnArray.push(obj);
					});
				}else{
					transaction.executeSql(insSql, valuesArray,function(transaction, results){
						var obj = $.extend({},data);
						obj.id = results.insertId;
						returnArray.push(obj);
						dfd.resolve(returnArray);
					});
				}
			}
			
			
		});
		return dfd.promise();
	}
	
	
	/**
	 * DAO Interface: Return a deferred object for this objectType and options
	 * @param {String} objectType
	 * @param {Object} opts 
	 *           opts.match     {Object} add condition with expr 'like' in the where clause.
	 *           opts.equal     {Object} add condition with expr '=' in the where clause.
	 *           opts.ids     	{Array}  add condition with expr ' id in (...)' in the where clause.
	 */
	SQLiteDao.prototype.getCount = function(objectType, opts){
		var dao = this;
		var resultSet;

		var dfd = $.Deferred();
		app.SQLiteDB.transaction(function(transaction){
			var condition = "";
			if(opts){
				if(opts.match){
					var filters = opts.match;
					for(var k in filters){
						condition += " and " + k + " like '%" + filters[k] + "%'";
					}
				}
				
				if(opts.equal){
					var filters = opts.equal;
					for(var k in filters){
						condition += " and " + k + "='" + filters[k] + "'";
					}
				}
				
				if(opts.ids && $.isArray(opts.ids)){
					var ids = opts.ids;
					condition += dao.getIdName(dao._tableName) + " and in (";
					for ( var i = 0; i < ids.length; i++) {
						condition += "'" + ids[i] + "'";
						if (i != ids.length - 1) {
							condition += ",";
						}
					}
					condition += ")";
				}
				
			}
			
			
			var listSql = "SELECT " + "count(*) as 'count' " + "FROM " + dao._tableName + " where 1=1 " + condition;
			transaction.executeSql((listSql), [],function(transaction, results){
				dfd.resolve(results.rows.item(0).count);
			});

		});
		return dfd.promise();
	}
	
	// -------- /Custom Interface Implementation --------- //
	
	// --------- /DAO Interface Implementation --------- //
	brite.dao.SQLiteDao = SQLiteDao;

	function parseRows2Json(rows){
		var json = [];
		var rlen = rows.length;
		for(var i = 0; i < rlen; i++){
			json.push(rows.item(i));
		}
		return json;
	}
})(jQuery);