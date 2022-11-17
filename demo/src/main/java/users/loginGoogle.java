package users;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/loginGoogle")
public class loginGoogle extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html; charset=utf-8");

        MemberDAO dao = new MemberDAO();
        String email = request.getParameter("email");
        System.out.println("Recieve the email : " + email);
        
        PrintWriter out = response.getWriter();

        boolean checkEmail = dao.isThereEmail(email);

        if(checkEmail) {
            out.print("usable");
        } else {
            out.print("not-usable");
        }
    }
}