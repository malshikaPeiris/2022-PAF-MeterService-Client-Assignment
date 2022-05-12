package com;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.Meter;

import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

@WebServlet("/MeterAPI")
public class MeterAPI extends HttpServlet
{
	private static final long serialVersionUID = 1L;
    
	Meter meterObj = new Meter(); 
	
    public MeterAPI() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//NOT USED
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			 throws ServletException, IOException
	{
		String output = meterObj.insertMeter(
				            request.getParameter("account_no"),
							request.getParameter("name"),
							request.getParameter("address"),
							request.getParameter("units"),
							request.getParameter("date")
							
							);
		
		response.getWriter().write(output);
	}

	// Convert request parameters to a Map
	private static Map getParasMap(HttpServletRequest request)
    {
		Map<String, String> map = new HashMap<String, String>();
		try
		{
			Scanner scanner = new Scanner(request.getInputStream(), "UTF-8");
			String queryString = scanner.hasNext() ?
					scanner.useDelimiter("\\A").next() : "";
			        scanner.close();
	 
			String[] params = queryString.split("&");
			for (String param : params)
			{ 
				String[] p = param.split("=");
				map.put(p[0], p[1]);
		    }
		 }
				
		 catch (Exception e)
	     {
		 }
		 
		return map;
	}


	protected void doPut(HttpServletRequest request, HttpServletResponse response)
			 throws ServletException, IOException
	{
		Map paras = getParasMap(request);
		String output = meterObj.updateMeter(
				                           paras.get("hidMeterIDSave").toString(),
										   paras.get("account_no").toString(),
										   paras.get("name").toString(),
										   paras.get("address").toString(),
										   paras.get("units").toString(),
										   paras.get("date").toString()
										   );
			
		response.getWriter().write(output);
	}
			
	protected void doDelete(HttpServletRequest request, HttpServletResponse response)
			 throws ServletException, IOException
	{
		Map paras = getParasMap(request);
		String output = meterObj.deleteMeter(paras.get("id").toString());
		response.getWriter().write(output);
	}
	
	

}

