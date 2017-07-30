<%@ page language="java"  import="java.util.*,java.sql.*"
contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%	
    request.setCharacterEncoding("utf-8");
    String dataIn=request.getParameter("_dataIn");
    String dateIn=request.getParameter("_dateIn");
    String dataOut=request.getParameter("_dataOut");
    String dateOut=request.getParameter("_dateOut");
    
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
   	
   	String sql_in="select * from datalist where dataDate="+dateIn+"";
   	ResultSet rs_in = stmt.executeQuery(sql_in);
   	if(rs_in.next()){
   		String sql_update=" update datalist set dataIn="+dataIn+" where dataDate="+dateIn+"";
   		int cnt=stmt.executeUpdate(sql_update);
   	} else {
   		String sql_insert="insert into datalist values("+dateIn+","+dataIn+",0)";
   		int cnt=stmt.executeUpdate(sql_insert);
   	}
   	
   	String sql_out="select * from datalist where dataDate="+dateOut+"";
   	ResultSet rs_out=stmt.executeQuery(sql_out);
   	if(rs_out.next()){
   		String sql_update="update datalist set dataOut="+dataOut+" where dataDate="+dateOut+"";
   		int cnt=stmt.executeUpdate(sql_update);
   	
   	} else {
   		String sql_insert="insert into datalist values("+dataOut+",0"+dataOut+")";
   		int cnt=stmt.executeUpdate(sql_insert);
   	}
   	//out.print("<script language='JavaScript'>window.location.href='ImportData_v1.html';</script>"); 
    %>