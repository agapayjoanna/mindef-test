package sg.gov.mindef.servlet;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.fileupload.FileItem;

import com.ibm.workplace.wcm.api.exceptions.DocumentRetrievalException;

import sg.gov.mindef.XMLtoXML;

public class FileServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public void doPost(HttpServletRequest request, HttpServletResponse response) {
		String fileDirectory = request.getParameter("fileDirectory");
		if (fileDirectory != null && !fileDirectory.isEmpty()) {
			File file = new File(fileDirectory);
			System.out.println("Get Files");
			getFiles(file.listFiles());
		}
		// boolean multipart = ServletFileUpload.isMultipartContent(request);
		// if(multipart){
		// FileItemFactory factory = new DiskFileItemFactory();
		// ServletFileUpload upload = new ServletFileUpload(factory);
		// List items = null;
		// try{
		// items = upload.parseRequest(request);
		// Iterator iterator = items.iterator();
		// while(iterator.hasNext()){
		// FileItem item = (FileItem) iterator.next();
		// if(!item.isFormField()){
		// System.out.println("Shane baho ug tae.");
		// InputStream is = item.getInputStream();
		// XMLtoXML.readFromXML(is);
		// }
		// }
		// }catch(FileUploadException e){
		// e.printStackTrace();
		// } catch (IOException e) {
		// // TODO Auto-generated catch block
		// e.printStackTrace();
		// }
		// }
	}

	public static void getFiles(File[] listFiles) {
		for (File file : listFiles) {
			if (file.isDirectory()) {
				System.out.println("Directory path -----------"
						+ file.getPath());
				getFiles(file.listFiles());
			} else {
				System.out.println("File Name:" + file.getName());

				InputStream inputStream;
				try {
					if(getFileExtensionName(file).indexOf("xml") != -1){
						
						inputStream = new FileInputStream(file);
						XMLtoXML.readFromXML(inputStream,file.getAbsolutePath());
					}
				} catch (FileNotFoundException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (DocumentRetrievalException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

			}
		}
	}

	public static String getFileExtensionName(File f) {
		if (f.getName().indexOf(".") == -1) {
			return "";
		} else {
			return f.getName().substring(f.getName().length() - 3,
					f.getName().length());
		}
	}

}
