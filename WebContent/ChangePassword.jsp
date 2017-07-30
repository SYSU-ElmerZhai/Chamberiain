<%@ page language="java"  import="java.util.*,java.sql.*"
contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
    request.setCharacterEncoding("utf-8");
    	
    //修改密码部分
    String newPassword=request.getParameter("inputPassword");
    String confirmPassword=request.getParameter("confirmPassword");
    String userPhoneNumber=request.getParameter("userPhoneNumber");
    System.out.println(userPhoneNumber);
    
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
   	
   	if(request.getMethod().equalsIgnoreCase("post")) {
   		String sql="select * from users where phoneNumber="+"'"+userPhoneNumber+"'";
   		ResultSet rs = stmt.executeQuery(sql);
   		if(!rs.next()) {
   			out.print("<script language='JavaScript'>alert('还未用该手机号注册，请事先进行注册');window.location.href='FirstPage_v1.html';</script>"); 
   			
   		}else {
   			String userName=rs.getString("username");
   			String updateSQL="update users set password='"+confirmPassword+"' where phoneNumber='"+userPhoneNumber+"'";
   			int cnt=stmt.executeUpdate(updateSQL);
   			
   			out.print("<script language='JavaScript'>alert('用户名为"+userName+"的账号密码已经成功修改，请前往登录！');window.location.href='FirstPage_v1.html';</script>"); 
   			System.out.println(cnt);
   		}   		
		rs.close();
		stmt.close();
		con.close();
   	}

%>
