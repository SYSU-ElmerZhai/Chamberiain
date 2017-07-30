<%@ page language="java"  import="java.util.*,java.sql.*"
contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%
    request.setCharacterEncoding("utf-8");
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
   	
   	
   	if(request.getMethod().equalsIgnoreCase("post")){
   		//System.out.println(sign_UserName);
   		String sql="select * from users where username="+"'"+sign_UserName+"'";
   		
   	   	ResultSet rs = stmt.executeQuery(sql);
   	    //System.out.println("已经执行sql语句");
   	    if(!rs.next()) {
   	    	out.print("<script language='JavaScript'>window.location.href='FirstPage_v1.html';alert('该用户不存在，请注册之后再请登录');</script>"); 
   	    	//out.print("<script language='JavaScript'>window.location.href='ImportData_v1.html';</script>");
   	    }else {
   	   	   		
   	   	   		String get_password=rs.getString("password");
   			    if(sign_Password.equals(get_password)) {
   			    	
   			    	session.putValue("username",sign_UserName);
   	   	   	  		out.print("<script language='JavaScript'>window.location.href='ImportData_v1.jsp';</script>");

   	   	   			System.out.println(sign_UserName);
   	   	   	   	}else{

   	   	  	  		out.print("<script language='JavaScript'> window.location.href='FirstPage_v1.html'; alert('密码错误');</script>"); 
   	   	   	   	}
   	   	   	
   	    }
		rs.close();
		stmt.close();
		con.close();

   	}
   
   	

    %>