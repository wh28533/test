package users;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/checkEmail")
public class checkEmail extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html; charset=utf-8");
        PrintWriter out = response.getWriter();

        MemberDAO dao = new MemberDAO();
        String email = request.getParameter("email");
        System.out.println("[checkEmail.java] Recieve the email : " + email);
   

        boolean isThereEmail = dao.isThereEmail(email);

        if(isThereEmail) {
            out.print("not-usable");
        } else {
            out.print("usable");
        }
    }
}