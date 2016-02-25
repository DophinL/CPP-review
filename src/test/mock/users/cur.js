/**
 * Created by Dophin on 16/2/20.
 */
module.exports = function(req, res, next) {
    var result = {
        "code": "200",
        "data": {
            "id": 2,
            "userId": "H4866",
            "userName": "Dophin",
            "email": "940101379@qq.com",
            "state": 1,
            "dept1ID": "1002",
            "dept1Name": "人力资源部",
            "dept2ID": "001",
            "dept2Name": "杭州人力资源中心",
            "dept3ID": "002",
            "dept3Name": "EHR产品组",
            "pLevel": "P3-1",
            "mLevel": "M2-2",
            "roleList": [],
            "menuList": [
                {
                    "id": 1,
                    "menuName": "能力图谱",
                    "menuCode": "map",
                    "url": null,
                    "parentId": null,
                    "orderNum": 1,
                    "children": [ ]
                },
                {
                    "id": 2,
                    "menuName": "代办事项",
                    "menuCode": "",
                    "url": null,
                    "parentId": null,
                    "orderNum": 2,
                    "children": [
                        {
                            "id": 3,
                            "menuName": "提名",
                            "menuCode": "nom",
                            "url": "qualification/nominate/index",
                            "parentId": 2,
                            "orderNum": 1,
                            "children": null
                        },
                        {
                            "id": 4,
                            "menuName": "提名审核",
                            "menuCode": "nomCheck",
                            "url": null,
                            "parentId": 2,
                            "orderNum": 2,
                            "children": null
                        },
                        {
                            "id": 5,
                            "menuName": "材料审核",
                            "menuCode": "",
                            "url": null,
                            "parentId": 2,
                            "orderNum": 4,
                            "children": null
                        },
                        {
                            "id": 7,
                            "menuName": "答辩安排",
                            "menuCode": "",
                            "url": null,
                            "parentId": 2,
                            "orderNum": 6,
                            "children": null
                        },
                        {
                            "id": 8,
                            "menuName": "初审评价",
                            "menuCode": "",
                            "url": null,
                            "parentId": 2,
                            "orderNum": 7,
                            "children": null
                        },
                        {
                            "id": 9,
                            "menuName": "答辩评价",
                            "menuCode": "",
                            "url": null,
                            "parentId": 2,
                            "orderNum": 8,
                            "children": null
                        },
                        {
                            "id": 11,
                            "menuName": "生效审批",
                            "menuCode": "",
                            "url": null,
                            "parentId": 2,
                            "orderNum": 10,
                            "children": null
                        }
                    ]
                },
                {
                    "id": 14,
                    "menuName": "进度查询",
                    "menuCode": "progress",
                    "url": null,
                    "parentId": null,
                    "orderNum": 3,
                    "children": [ ]
                },
                {
                    "id": 20,
                    "menuName": "个人中心",
                    "menuCode": "mycenter",
                    "url": "mycenter/page/display/index,mycenter/page/edit/index",
                    "parentId": null,
                    "orderNum": 4,
                    "children": [ ]
                }
            ]
        },
        "msg": null
    };

    res.write(JSON.stringify(result));


    res.end();
};