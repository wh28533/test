package users;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/loginEmail")
public class loginEmail extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html; charset=utf-8");

        MemberDAO dao = new MemberDAO();
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        System.out.println("[loginEmail.java] Recieve the email : " + email);
        
        PrintWriter out = response.getWriter();

        boolean checkEmail = dao.loginEmail(email, password);

        if(checkEmail) {
        	out.print("success");
        } else {
        	out.print("not-success");
        }
    }
}