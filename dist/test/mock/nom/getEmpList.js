module.exports=function(e,t){for(var p=10,o={code:200,msg:"列表"},a=[],s=["晋级","晋等","不调整",""],d=["A+","A","B+","B","C","F"],n=0;p>n;n++){var m=parseInt(500*Math.random()),i={id:n,deptId:"d_"+m,deptName:"部门_"+m,empId:"e_"+m,empName:"应聘者_"+m,empUpInfo:{backReason:n%2==0?"":"t434 34est 退回理由 李依依",empId:"e_"+m,empName:"应聘者_"+m,lineM:{comId:"",empId:"",empName:"",exception:1,levelAdjust:"",levelNew:"",lineType:"",result1St:0,result2nd:0,reviewStep:"",skip:1,upType:s[n%8],exceptionReason:"破格原因破格原因破格原因破格原因破格原因破格原因破格原因"},lineP:{comId:"",empId:"",empName:"",exception:0,levelAdjust:"P4-3",levelNew:"",lineType:"",result1St:0,result2nd:3,reviewStep:"",skip:0,upType:s[n%4],exceptionReason:"破格原因"},nomId:"",nomName:"",nomStep:"",postL1IdNew:"postLId"+n,postL1NameNew:"职位类别1"+n,postL2IdNew:"postLId"+n,postL2NameNew:"职位类别2"+n,postL3IdNew:"postLId"+n,postL3NameNew:"职位类别3"+n,up:parseInt(3*Math.random()),upDate:"2015-10-20",upReason:"upReason"},entryDate:"2009-10-20",kpi:d[n%7],lastUpDate:n%2==0?"2015-10-20":null,mLevel:"M3-1",mPositionId:n%3!=0?"mPositionId"+m:"",mPositionName:n%3!=0?"管理级职位名称_"+m:"",pLevel:"P3-1",pPositionId:n%2!=0?"pPositionId"+m:"",pPositionName:n%2!=0?"专业级职位名称_"+m:"",postL1Id:"postLId"+n,postL1Name:"职位类别1"+n,postL2Id:"postLId"+n,postL2Name:"职位类别2"+n,postL3Id:"postLId"+n,postL3Name:"职位类别3"+n,salaryRate:parseInt(100*Math.random())/100,upNumber:parseInt(10*Math.random())};a.push(i)}o.data={data:a,totalPages:20,currentPage:1};var I=JSON.stringify(o);t.write(I),t.end()};