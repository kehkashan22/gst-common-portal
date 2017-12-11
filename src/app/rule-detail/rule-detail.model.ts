export class RuleDetail {

    public id: string;
    public video_url: string;
    public name: string;
    public number: string;
    public related_section: string;
    public footnotes: string;
    public text: string;

    constructor(id: string, video_url: string, name: string, number: string, related_section: string, footnotes: string, text: string) {
      this.id = id;
      this.video_url = video_url;
      this.name = name;
      this.number = number
      this.related_section = related_section;
      this.footnotes = footnotes;
      this.text = text;
    }
  }
