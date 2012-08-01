var app = app || {};

// --------- Remote Dao --------- //
(function($) {

	function RemoteDao() {
	}

	// ------ DAO Interface Implementation ------ //
	RemoteDao.prototype.getIdName = function(objectType) {
		return "id";
	}


	RemoteDao.prototype.get = function(objectType, id) {
		var data = {
			objType : objectType
		};

		var paramIdName = "obj_id";
		data[paramIdName] = id;

		return $.ajax({
			type : "GET",
			url : contextPath + "/daoGet.json",
			data : data,
			dataType : "json"
		}).pipe(function(val) {
			return val.result;
		});

	}

	/**
	 * DAO Interface: Return an array of values or a deferred object (depending of DAO impl) for this objectType and options
	 * @param {Object} objectType
	 * @param {Object} opts
	 *           opts.pageIndex       {Number} Index of the page, starting at 0.
	 *           opts.pageSize        {Number} Size of the page
	 *           opts.match           {Object}
	 *           opts.orderBy         {String}
	 *           opts.orderType       {String}
	 *           opts withResultCount {Boolean} if this is true, resultSet with count will be returned
	 */
	// for now, just support opts.orderBy
	RemoteDao.prototype.list = function(objectType, opts) {
		var data = {
			objType : objectType
		};

		if(opts) {
			data.opts = JSON.stringify(opts);
		}
		return $.ajax({
			type : "GET",
			url : contextPath + "/daoList.json",
			data : data,
			dataType : "json"
		}).pipe(function(val) {
			var resultSet = val.result;

			if(opts) {
				if(opts.withResultCount) {
					return val;
				}
				//				no client side sort, only server
				//				if (opts.orderBy) {
				//					resultSet = brite.util.array.sortBy(resultSet, opts.orderBy)
				//				}
			}
			return resultSet;
		});

	}

	// to reuse update
	RemoteDao.prototype.create = function(objectType, data) {
		var reqData = {
			action : "daoSave",
			objType : objectType,
			objJson : JSON.stringify(data),
			create : true
		};
		var dfd = $.ajax({
			type : "POST",
			url : jsonUrl,
			data : reqData,
			dataType : "json"
		}).pipe(function(val) {
			if(val.result.type == "appValidationError") {
				return $.Deferred().reject(val.result.failedProps).promise();
			}
 			return val.result;
		});

		return dfd.promise();
	}


	RemoteDao.prototype.update = function(objectType, id, data) {
		var reqData = {
			action : "daoSave",
			objType : objectType,
			obj_id : id,
			objJson : JSON.stringify(data),
			create : false
		};

		return $.ajax({
			type : "POST",
			url : jsonUrl,
			data : reqData,
			dataType : "json"
		}).pipe(function(val) {
			if(val.result.type == "appValidationError") {
				return $.Deferred().reject(val.result.failedProps).promise();
			}
			return val.result;
		});

	}


	RemoteDao.prototype.remove = function(objectType, id) {
		var reqData = {
			action : "daoDelete",
			objType : objectType
		}
		reqData.obj_id = id;

		var dfd = $.ajax({
			type : "POST",
			url : jsonUrl,
			data : reqData,
			dataType : "json"
		}).pipe(function(val) {
			return id;
		});

		return dfd.promise();
	}


	brite.dao.RemoteDao = RemoteDao;
	// ------ /DAO Interface Implementation ------ //

})(jQuery);
// --------- /Remote Dao --------- //


