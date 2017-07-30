<%@ page language="java"  import="java.util.*,java.sql.*"
contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%	
    request.setCharacterEncoding("utf-8");
    String dataIn=request.getParameter("u-dataIn");
    String dataOut=request.getParameter("u-dataOut");
    String timeInfo=request.getParameter("u-timeInfo");
    System.out.println(timeInfo);
    System.out.println(dataIn);
    System.out.println(dataOut);
   	String sign_UserName=request.getParameter("inputUserName");
   	//out.print("<script language='JavaScript'>console.log("+"'"+sign_UserName+"'"+")</script>"); 
   	String sign_Password=request.getParameter("inputPassword")+"";
   	//out.print("<script language='JavaScript'>console.log("+"'"+sign_Password+"'"+")</script>"); 
    
    //JDBC 驱动名及数据库URL
   String JDBC_DBIVER="com.mysql.jdbc.Driver";
   String DB_URL = "jdbc:mysql://127.0.0.1:3306/WebsiteUsers"
   			+ "?autoReconnect=true&useUnicode=true"
			+ "&characterEncoding=UTF-8&useSSL=true"; 
   	String user="root";
   	String password="14353384";
   	
   	//注册JDBC驱动
   	Class.forName("com.mysql.jdbc.Driver");
   	//System.out.println("连接数据库...");
   	
   	Connection con = DriverManager.getConnection(DB_URL,user,password);
   	Statement stmt = con.createStatement();
   	
   	String sql="update dataList set dataIn="+dataIn+",dataOut="+dataOut+" where dataDate="+timeInfo+"";
   	int cnt = stmt.executeUpdate(sql);
  	System.out.println(cnt);
  	
  	out.print("<script language='JavaScript'>window.location.href='ImportData_v1.html';</script>"); 
    %>