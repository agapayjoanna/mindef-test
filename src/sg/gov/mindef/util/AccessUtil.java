package sg.gov.mindef.util;

import java.io.File;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import sg.gov.mindef.dto.NewsContentDTO;
import sg.gov.mindef.dto.NewsImageDTO;

import com.ibm.workplace.wcm.api.AuthoringTemplate;
import com.ibm.workplace.wcm.api.ChildPosition;
import com.ibm.workplace.wcm.api.Content;
import com.ibm.workplace.wcm.api.DateComponent;
import com.ibm.workplace.wcm.api.Document;
import com.ibm.workplace.wcm.api.DocumentId;
import com.ibm.workplace.wcm.api.DocumentIdIterator;
import com.ibm.workplace.wcm.api.DocumentLibrary;
import com.ibm.workplace.wcm.api.DocumentLibraryACL;
import com.ibm.workplace.wcm.api.DocumentType;
import com.ibm.workplace.wcm.api.DocumentTypes;
import com.ibm.workplace.wcm.api.Folder;
import com.ibm.workplace.wcm.api.ImageComponent;
import com.ibm.workplace.wcm.api.LibraryMemberRole;
import com.ibm.workplace.wcm.api.LibraryProperties;
import com.ibm.workplace.wcm.api.LibraryResourceType;
import com.ibm.workplace.wcm.api.OptionSelectionComponent;
import com.ibm.workplace.wcm.api.OptionType;
import com.ibm.workplace.wcm.api.PresetFolderType;
import com.ibm.workplace.wcm.api.Repository;
import com.ibm.workplace.wcm.api.RichTextComponent;
import com.ibm.workplace.wcm.api.ShortTextComponent;
import com.ibm.workplace.wcm.api.SiteArea;
import com.ibm.workplace.wcm.api.SiteAreaPrototype;
import com.ibm.workplace.wcm.api.SiteAreaTemplate;
import com.ibm.workplace.wcm.api.Taxonomy;
import com.ibm.workplace.wcm.api.UserProfile;
import com.ibm.workplace.wcm.api.WCM_API;
import com.ibm.workplace.wcm.api.Workspace;
import com.ibm.workplace.wcm.api.exceptions.AuthorizationException;
import com.ibm.workplace.wcm.api.exceptions.ComponentNotFoundException;
import com.ibm.workplace.wcm.api.exceptions.DocumentCreationException;
import com.ibm.workplace.wcm.api.exceptions.DocumentRetrievalException;
import com.ibm.workplace.wcm.api.exceptions.DocumentSaveException;
import com.ibm.workplace.wcm.api.exceptions.DuplicateChildException;
import com.ibm.workplace.wcm.api.exceptions.DuplicateComponentException;
import com.ibm.workplace.wcm.api.exceptions.IllegalDocumentTypeException;
import com.ibm.workplace.wcm.api.exceptions.IllegalTypeChangeException;
import com.ibm.workplace.wcm.api.exceptions.OperationFailedException;
import com.ibm.workplace.wcm.api.exceptions.ServiceNotAvailableException;
import com.ibm.ws.natv.util.LibraryLoader;

public class AccessUtil {
	
	private static final String CURRENT_CONTENT_LIBRARY = "iMindef Content";
	private static final String CURRENT_DESIGN_LIBRARY = "iMindef Design";

	public static Workspace getContentWorkspace()
			throws ServiceNotAvailableException, OperationFailedException {
		Repository repository = WCM_API.getRepository();
		Workspace workspace = repository.getSystemWorkspace();
		workspace.setCurrentDocumentLibrary(workspace
				.getDocumentLibrary(CURRENT_CONTENT_LIBRARY));
		return workspace;

	}

	public static Workspace getDesignWorkspace()
			throws ServiceNotAvailableException, OperationFailedException {
		Repository repository = WCM_API.getRepository();
		Workspace workspace = repository.getSystemWorkspace();
		workspace.setCurrentDocumentLibrary(workspace
				.getDocumentLibrary(CURRENT_DESIGN_LIBRARY));
		return workspace;

	}

	public DocumentId<Document> getAuthoringTemplate() {
		DocumentId<Document> authoringtemplate = null;
		try {
			Workspace workspace = getDesignWorkspace();
			DocumentIdIterator<Document> itr = workspace.findByName(
					DocumentTypes.AuthoringTemplate, "Official Releases");
			while (itr.hasNext()) {
				System.out.println("Authoring Template Found");
				authoringtemplate = itr.next();
			}
		} catch (ServiceNotAvailableException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (OperationFailedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return authoringtemplate;

	}

	public DocumentId<Document> getContentSiteArea(String name) {
		DocumentId<Document> siteAreaId = null;
		try {
			Workspace workspace = getContentWorkspace();
			DocumentIdIterator<Document> itr = workspace.findByName(
					DocumentTypes.SiteArea, name);
			while (itr.hasNext()) {
				System.out.println("SiteArea Found");
				siteAreaId = itr.next();
			}
		} catch (ServiceNotAvailableException e) {
			e.printStackTrace();
		} catch (OperationFailedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return siteAreaId;
	}

	public void createContent(NewsContentDTO dto) throws ParseException,
			DocumentRetrievalException, ServiceNotAvailableException,
			OperationFailedException{
		Workspace workspace = getContentWorkspace();
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(dto.getPostedDate());
		String year = String.valueOf(calendar.get(Calendar.YEAR));
		String monthName = Utility.getMonthInString(calendar
				.get(Calendar.MONTH));
		System.out.println("News Year--------" + year);
		System.out.println("News Month--------" + monthName);
		DocumentId<Document> monthDocumentId = null;
		System.out.println("Current category-----------" + dto.getCategory());
		findByCategory(dto.getCategory());
		DocumentId<Document> siteAreaId = getContentSiteArea("Press Room");
		try {
			if (findSiteAreaByYear(year) == null) {
				// year site area
				SiteArea siteArea = workspace.createSiteArea(siteAreaId, null,
						ChildPosition.END);
				siteArea.setName(year);
				siteArea.setTitle(year);
				workspaceSave(workspace, siteArea);
				System.out.println("Site Area for year ---------- " + year
						+ "has been created");

				SiteArea siteAreaMonth = workspace.createSiteArea(
						siteArea.getId(), null, ChildPosition.END);

				siteAreaMonth.setName(monthName);
				siteAreaMonth.setDescription(monthName);
				workspaceSave(workspace, siteAreaMonth);
				monthDocumentId = siteAreaMonth.getId();

				System.out.println("Site Area for month ---------- "
						+ monthName + "has been created");
			} else {

				System.out.println("Year Already Exist " + year);
				// SiteArea siteArea = (SiteArea) workspace.getById(siteAreaId);
				// DocumentIdIterator<Document>siteAreaITR =
				// siteArea.getAllDirectChildren();
				// if(siteAreaITR.hasNext()){
				// DocumentId<Document> documentId = siteAreaITR.next();
				// System.out.println("Month Name----------"+documentId.getName());
				// if(documentId.getName().equalsIgnoreCase(monthName)){
				// monthDocumentId = documentId;
				// }
				// }
				String path = "iMindef Content/Official Release/Press Room/"
						+ year + "/" + monthName;
				DocumentIdIterator<Document> itr = findSiteAreaByPath(
						workspace, path);
				DocumentId<Document> siteAreaIdyear = findSiteAreaByYear(year);
				if (itr.hasNext()) {
					monthDocumentId = itr.next();
					System.out.println(monthDocumentId.getName() +"has been fetch successfully");
				} else {
					SiteArea siteAreaMonth = workspace.createSiteArea(
							siteAreaIdyear, null, ChildPosition.END);
					siteAreaMonth.setName(monthName);
					siteAreaMonth.setTitle(monthName);
					workspaceSave(workspace, siteAreaMonth);
					monthDocumentId = siteAreaMonth.getId();
					System.out.println("New Site Area for month ---------- "
							+ monthName + "has been created");
				}

			}
			if(!isContentExists(year, monthName, dto.getTitle())){
				Content content = workspace.createContent(getAuthoringTemplate(),
						monthDocumentId, null, ChildPosition.END);
				content.setName(dto.getTitle().replaceAll("[^a-zA-Z0-9]", " "));
				
				content.setTitle(dto.getTitle());
				// content.createComponent("Content",
				// DocumentTypes.RichTextComponent);
				// Title(ShortText) component
				ShortTextComponent stc = (ShortTextComponent) content
						.getComponent("Title");
				stc.setText(dto.getTitle());

				// DateComponent
				DateComponent dateCmpt = (DateComponent) content
						.getComponent("Date");
				DateFormat postedDate = new SimpleDateFormat(
						"EEE, d MMMMM yyyy HH:mm:ss z");
				String strPostedDate = postedDate.format(dto.getPostedDate());
				dateCmpt.setDate(postedDate.parse(strPostedDate));
				// RTE Component
				RichTextComponent rte = (RichTextComponent) content
						.getComponent("Content");
				rte.setRichText(dto.getContent());
				System.out.println("Title------"+ dto.getTitle());
				System.out.println("Content---------"+ dto.getContent());
				OptionSelectionComponent osc = (OptionSelectionComponent) content.getComponent("Category");
				System.out.println("Category Name" + osc.getName());
				osc.setOptionType(OptionType.USE_TAXONOMY);
				DocumentId[] categories = new DocumentId[] {findByCategory(dto.getCategory())};
				osc.setCategorySelections(categories);
//				List<NewsImageDTO> list = dto.getImages();
//				if(!list.isEmpty()){
//					ImageComponent imgCmpt=null;
//					for(NewsImageDTO img: list){
//						System.out.println("Image Name----- " +img.getName());
//						if(!content.hasComponent(img.getName())){
//							imgCmpt = content.createComponent(img.getName(), DocumentTypes.ImageComponent);
//						} else {
//							imgCmpt = (ImageComponent) content.getComponent(img.getName());
//						}
//						imgCmpt.setNameTag(img.getName()+".jpg");
//						imgCmpt.setResource(img.getName()+".jpg", new File(img.getSrc()));
//						content.setComponent(img.getName(), imgCmpt);
//					}
//				}
				content.setComponent("Title", stc);
				content.setComponent("Date", dateCmpt);
				content.setComponent("Content", rte);
				content.setComponent("Category", osc);
				workspaceSave(workspace, content);
				

				System.out.println("Content Created");
			}
		} catch (ServiceNotAvailableException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (OperationFailedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (DocumentCreationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (AuthorizationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalDocumentTypeException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ComponentNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalTypeChangeException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	@SuppressWarnings("unchecked")
	public boolean isContentExists(String year, String month, String title)
			throws ServiceNotAvailableException, OperationFailedException {
		String path = "iMindef Content/Official Release/Press Room/"
				+ year + "/" + month;
		boolean contentExists = false;
		Workspace workspace = getContentWorkspace();
		DocumentIdIterator<Document> itr = workspace.findByPath(path, Workspace.WORKFLOWSTATUS_ALL);
		if(itr.hasNext()){
			try {
				DocumentId<Document> id = itr.next();
				SiteArea siteArea = (SiteArea) workspace.getById(id,true);
				DocumentIdIterator<Document> itr2 = siteArea.getChildren();
				while(itr2.hasNext()){
					DocumentId<Document> eachContent= itr2.next();
					if(eachContent.getName().equalsIgnoreCase(title)){
						contentExists = true;
						break;
					}
				}
			} catch (DocumentRetrievalException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (AuthorizationException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return contentExists;
	}

	public DocumentId<Document> findSiteAreaByYear(Object name)
			throws ServiceNotAvailableException, OperationFailedException {
		DocumentId<Document> id = null;
		Workspace workspace = getContentWorkspace();
		DocumentIdIterator<Document> itr = workspace.findByName(
				DocumentTypes.SiteArea, name.toString());
		if (itr.hasNext()) {
			id = itr.next();
		}
		return id;

	}

	public static void workspaceSave(Workspace workspace, Document document) {
		try {
			String[] error = workspace.save(document);
			System.out.println("Workspace Save ----" + Arrays.toString(error));
			System.out.println("Content has been created" + error.length);

		} catch (DocumentSaveException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (AuthorizationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (DuplicateChildException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public static DocumentIdIterator<Document> findSiteAreaByPath(
			Workspace workspace, String path) {
		@SuppressWarnings("deprecation")
		DocumentIdIterator<Document> itr = workspace.findByPath(path,
				Workspace.WORKFLOWSTATUS_ALL);
		return itr;
	}
	

	public static DocumentId<Document> findByCategory(String category){
		DocumentId<Document> id = null;
		try {
			Workspace workspace = getContentWorkspace();
			DocumentIdIterator<Document> itr = workspace.findByName(DocumentTypes.Category, category);
			if(itr.hasNext()){
				id= itr.next();
				System.out.println("Selected Category -------" + id.getName());
			}
			
		} catch (ServiceNotAvailableException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (OperationFailedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return id;
		
	}

}
