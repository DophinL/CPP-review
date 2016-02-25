/**
 * 
 */
module.exports = function(req, res, next) {
	var count = 10;
	var result = {
		"code":200,
		"msg":"列表"
	};
	var data = [];
	var upTypes = ["晋级","晋等","不调整",""];
	var kpiList = ["A+","A","B+","B","C","F"];
	for(var i = 0; i < count; i++){
		var rand = parseInt(Math.random()*500);
		var item = {
				"id": i,
				"deptId": "d_" + rand, 
			    "deptName": "部门_"+ rand, 
			    "empId": "e_"+ rand, 
			    "empName": "应聘者_" + rand, 
			    "empUpInfo": {//晋升信息
			        "backReason": i % 2 == 0? "": "t434 34est 退回理由 李依依", //
			        "empId": "e_"+ rand,
			        "empName": "应聘者_" + rand, 
			        "lineM": {
			            "comId": "", 
			            "empId": "", 
			            "empName": "", 
			            "exception": 1, //破格
			            "levelAdjust": "", 
			            "levelNew": "", 
			            "lineType": "", 
			            "result1St": 0, 
			            "result2nd": 0, 
			            "reviewStep": "", 
			            "skip": 1, //跳级
			            "upType": upTypes[i%8],//晋级金等
			            "exceptionReason":"破格原因破格原因破格原因破格原因破格原因破格原因破格原因"
			        }, 
			        "lineP": {
			            "comId": "", 
			            "empId": "", 
			            "empName": "", 
			            "exception": 0, 
			            "levelAdjust": "P4-3",
			            "levelNew": "", 
			            "lineType": "", 
			            "result1St": 0,
			            "result2nd": 3,
			            "reviewStep": "", 
			            "skip": 0, 
			            "upType": upTypes[i%4],
			            "exceptionReason":"破格原因"
			        }, 
			        "nomId": "", 
			        "nomName": "", 
			        "nomStep": "", 
			        "postL1IdNew": "postLId"+ i, 
			        "postL1NameNew": "职位类别1"+ i, 
			        "postL2IdNew": "postLId"+ i, 
			        "postL2NameNew": "职位类别2"+ i, 
			        "postL3IdNew": "postLId"+ i, 
			        "postL3NameNew": "职位类别3"+ i, 
			        "up": parseInt(Math.random()*3), //0:没有操作， 1提名2：不提名
			        "upDate": "2015-10-20", 
			        "upReason": "upReason"
			    }, 
			    "entryDate": "2009-10-20", 
			    "kpi": kpiList[i%7], 
			    "lastUpDate": i%2 == 0 ?"2015-10-20":null, 
			    "mLevel": "M3-1", 
			    "mPositionId": i % 3 != 0 ? "mPositionId" + rand : "", 
			    "mPositionName": i % 3 != 0 ? "管理级职位名称_"+ rand : "",  
			    "pLevel": "P3-1", 
			    "pPositionId": i % 2 != 0 ? "pPositionId" + rand : "", 
			    "pPositionName": i % 2 != 0 ? "专业级职位名称_" + rand : "",  
			    "postL1Id": "postLId"+ i, 
			    "postL1Name": "职位类别1"+ i, 
			    "postL2Id": "postLId"+ i, 
			    "postL2Name": "职位类别2"+ i, 
			    "postL3Id": "postLId"+ i, 
			    "postL3Name": "职位类别3"+ i, 
			    "salaryRate": parseInt(Math.random()*100)/100, //穿透率
			    "upNumber": parseInt(Math.random()*10)
		};
		data.push(item);
	}
	result.data = {
		"data": data,
		"totalPages": 20,
		"currentPage":1
	};
	var stringTest = JSON.stringify(result);


  res.write(stringTest);


  res.end();
};
