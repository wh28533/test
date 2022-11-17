package users;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/registerGoogle")
public class registerGoogle extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html; charset=utf-8");

        MemberDAO dao = new MemberDAO();
        String email = request.getParameter("email");
        String name = request.getParameter("name");
        String department = request.getParameter("department");
        String position = request.getParameter("position");
        String country = request.getParameter("country");
        String city = request.getParameter("city");

        System.out.println("[registerGoogle.java] Recieve the email : " + email);
        
        PrintWriter out = response.getWriter();

        boolean register = dao.registerGoogle(email, name, department, position, country, city);

        if(register) {
        	out.print("not-success");
        } else {
            out.print("success");
        }
    }
}