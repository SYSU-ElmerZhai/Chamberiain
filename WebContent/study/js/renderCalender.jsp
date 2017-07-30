<%@ page language="java"  import="java.util.*,java.sql.*,org.json.*,java.io.*"
contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%
    request.setCharacterEncoding("utf-8");
    String dataDate = request.getParameter("date");
    System.out.println(dataDate);
    
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
   	
   	String sql="select * from dataList";
   	ResultSet  rs = stmt.executeQuery(sql);
   	ResultSetMetaData metaData = rs.getMetaData();
   	int columnCount = metaData.getColumnCount();
   	
   	JSONArray array= new JSONArray();
   	
   	while(rs.next()){
   		JSONObject jsonObj = new JSONObject();
   		for(int i=1;i<=columnCount;i++) {
   			String columnName = metaData.getColumnLabel(i);
   			String value=rs.getString(columnName);
   			jsonObj.put(columnName,value);
   		}
   		array.put(jsonObj+"\n");
   	} 
   	rs.close();
   	stmt.close();
   	con.close();
   	//设置将字符以“UTF-8”编码输出到客户端浏览器
   	response.setCharacterEncoding("utf-8");
   	//获取PrintWriter输出流
   	PrintWriter output  = response.getWriter();
   	//response.setStatus(200, "ok");
   	output.write(array.toString());
   	
   	
    
    %>
