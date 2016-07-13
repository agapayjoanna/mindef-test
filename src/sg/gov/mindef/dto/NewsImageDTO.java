package sg.gov.mindef.dto;

public class NewsImageDTO {

	private String name;
	private String src;
	private String altText;
	private boolean isGallery = false;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSrc() {
		return src;
	}
	public void setSrc(String src) {
		this.src = src;
	}
	public String getAltText() {
		return altText;
	}
	public void setAltText(String altText) {
		this.altText = altText;
	}
	public boolean isGallery() {
		return isGallery;
	}
	public void setGallery(boolean isGallery) {
		this.isGallery = isGallery;
	}
	
	
}
