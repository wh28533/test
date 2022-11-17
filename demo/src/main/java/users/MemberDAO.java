package users;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.DriverManager;
import java.sql.ResultSet;



public class MemberDAO {
    private Connection con;
    private PreparedStatement pstmt;

    public MemberDAO() {
    	System.out.println("hi i'm MemberDAO()");
    } 

    public boolean isThereEmail(String email) {
    	boolean valid = true; 
	    try{
	      Class.forName("com.mysql.cj.jdbc.Driver");  
		  Connection conn = DriverManager.getConnection("jdbc:mysql://13.125.153.63:3306/drnear_db?user=nearbrain&password=75363303");
		  
		  
	      PreparedStatement pst = conn.prepareStatement("Select email from users where email=?");
	      pst.setString(1, email);
	      ResultSet rs = pst.executeQuery();                        
	      if(rs.next()){     // ID & PW is matched
	    	  valid = true;
	      }   
	      else{ // ID & PW isn't matched
	    	  valid = false;
	      }  
	    }
	    catch(Exception e){
	    	System.out.println("isThereEmail - Something went wrong !! Please try again");      
	    	System.out.println(e);
	    }      

        return valid;
    }
    
    public boolean loginEmail(String email, String password) {
    	boolean valid = true; 
	    try{
	      Class.forName("com.mysql.cj.jdbc.Driver");  
		  Connection conn = DriverManager.getConnection("jdbc:mysql://13.125.153.63:3306/drnear_db?user=nearbrain&password=75363303");
		  
		  
	      PreparedStatement pst = conn.prepareStatement("Select email, password from users where email=? and password=?");
	      pst.setString(1, email);
	      pst.setString(2, password);
	      ResultSet rs = pst.executeQuery();                        
	      if(rs.next()){     // ID & PW is matched
	    	  valid = true;
	    	  System.out.println("loginEmail - yes");  
	      }   
	      else{ // ID & PW isn't matched
	    	  valid = false;
	    	  System.out.println("loginEmail - no");  
	      }  
	    }
	    catch(Exception e){
	    	System.out.println("loginEmail - Something went wrong !! Please try again");      
	    	System.out.println(e);
	    }      

        return valid;
    }
    
    
    public boolean registerEmail(String em, String pw, String na, String de, String po, String co, String ci) {
    	boolean valid = false; //validation check value

    	try{
    		// MySQL database connection
    	    Class.forName("com.mysql.cj.jdbc.Driver");  
    	    Connection conn = DriverManager.getConnection("jdbc:mysql://13.125.153.63:3306/drnear_db?user=nearbrain&password=75363303&useSSL=false");
    	    
    	    PreparedStatement ps = conn.prepareStatement("insert into users(email,password,name,department,position,country,city) values(?,?,?,?,?,?,?)");
		    ps.setString(1, em);
		    ps.setString(2, pw);
		    ps.setString(3, na);
		    ps.setString(4, de);
		    ps.setString(5, po);
		    ps.setString(6, co);
		    ps.setString(7, ci);
		    valid = ps.execute();
    	   }
    	   catch(Exception e){      
    		   System.out.println("registerEmail - Something went wrong !! Please try again");   
    		   System.out.println(e);
    		   valid= false;
    	   }  

        return valid;
    	
    }
    
    public boolean registerGoogle(String em, String na, String de, String po, String co, String ci) {
    	boolean valid = false; //validation check value
    	String pw = "GOOGLE";
    	
    	try{
    		// MySQL database connection
    	    Class.forName("com.mysql.cj.jdbc.Driver");  
    	    Connection conn = DriverManager.getConnection("jdbc:mysql://13.125.153.63:3306/drnear_db?user=nearbrain&password=75363303&useSSL=false");
    	    
    	    PreparedStatement ps = conn.prepareStatement("insert into users(email,password,name,department,position,country,city) values(?,?,?,?,?,?,?)");
		    ps.setString(1, em);
		    ps.setString(2, pw);
		    ps.setString(3, na);
		    ps.setString(4, de);
		    ps.setString(5, po);
		    ps.setString(6, co);
		    ps.setString(7, ci);
		    valid = ps.execute();
    	   }
    	   catch(Exception e){      
    		   System.out.println("registerGoogle - Something went wrong !! Please try again");   
    		   System.out.println(e);
    		   valid= false;
    	   }  

        return valid;
    	
    }
    
}
    