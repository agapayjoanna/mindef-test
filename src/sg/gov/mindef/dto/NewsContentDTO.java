package sg.gov.mindef.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;

public class NewsContentDTO {

	private String guid;
	private String title;
	private String content;
	private Date postedDate;
	private String newsType;
	private String category;
	private NewsImageDTO topImage;
	private List<NewsImageDTO> images;

	public String getGuid() {
		return guid;
	}

	public void setGuid(String guid) {
		this.guid = guid;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public List<NewsImageDTO> getImages() {
		if (images == null) {
			images = new ArrayList<NewsImageDTO>();
		}
		return images;
	}

	public void setImages(List<NewsImageDTO> images) {
		this.images = images;
	}

	public String getNewsType() {
		return newsType;
	}

	public void setNewsType(String newsType) {
		this.newsType = newsType;
	}

	public Date getPostedDate() {
		return postedDate;
	}

	public void setPostedDate(Date postedDate) {
		this.postedDate = postedDate;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public NewsImageDTO getTopImage() {
		return topImage;
	}

	public void setTopImage(NewsImageDTO topImage) {
		this.topImage = topImage;
	}

}
