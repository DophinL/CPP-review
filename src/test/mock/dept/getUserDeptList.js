var rnd = function (min, max) {
	// rnd(10), 返回[0-10)之间的数字
	// rnd(10, 100), 返回[10, 100)之间的数字
	if (typeof max == 'undefined') {
		max = min;
		min = 0;
	}

	return (min + Math.floor(Math.random() * (max - min)));
};

module.exports = function(req, res, next) {
	var query = req.query,
		depth = query.depth,
		parentId = query.parentId;

	var result = {
		code: 200,
		msg: '',
		data: []
	};

	var i = 0,
		len = rnd(3, 10),
		item;

	for (; i < len; i++) {
		item = {
			deptId: [i].join('00'),
			deptName: '部门_' + i
		};
		result.data.push(item);
	}

	res.send(result);
};
